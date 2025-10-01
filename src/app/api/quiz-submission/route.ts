import { NextRequest, NextResponse } from 'next/server';

const WEBHOOK_URL = process.env.WEBHOOK_URL || process.env.NEXT_PUBLIC_WEBHOOK_URL || 'https://hook.us2.make.com/za6hy7vu588fcgad8zdnqhrcl8so435k';

export async function POST(request: NextRequest) {
  console.log('🔵 API route called');
  console.log('🔵 Webhook URL:', WEBHOOK_URL);
  
  try {
    const quizData = await request.json();
    console.log('🔵 Received quiz data:', Object.keys(quizData));
    console.log('🔵 Qualification status:', quizData.isQualified ? '✅ QUALIFIED' : '❌ NOT QUALIFIED');
    console.log('🔵 Qualification score:', quizData.qualificationScore);
    console.log('🔵 Qualification message:', quizData.qualificationMessage);
    console.log('🔵 Next steps:', quizData.nextSteps);
    console.log('🔵 Challenges array:', quizData.challenges);
    console.log('🔵 Challenges text:', quizData.challengesText);
    console.log('🔵 Challenges count:', quizData.challengesCount);
    
    // Add metadata to the data
    const webhookData = {
      ...quizData,
      timestamp: new Date().toISOString(),
      source: 'nics-marketing-quiz',
      userAgent: request.headers.get('user-agent') || 'unknown'
    };

    console.log('🔵 Sending webhook data...');
    
    // For Vercel, we need to handle the webhook call more carefully
    // Try to send immediately, but don't block the response
    try {
      await sendWebhookData(webhookData);
      console.log('✅ Webhook sent successfully');
    } catch (webhookError) {
      console.error('❌ Webhook failed, but continuing:', webhookError);
      // Don't fail the entire request if webhook fails
    }

    console.log('🔵 Returning success response');
    // Return success immediately
    return NextResponse.json({ 
      success: true, 
      message: 'Quiz submitted successfully' 
    });

  } catch (error) {
    console.error('❌ Quiz submission error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit quiz' },
      { status: 500 }
    );
  }
}

// Optimized function for Vercel serverless environment
async function sendWebhookData(data: any) {
  console.log('🔵 Starting webhook send...');
  
  try {
    // Reduced timeout for Vercel (8 seconds to be safe)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    console.log('🔵 Making fetch request to:', WEBHOOK_URL);
    
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Nics-Marketing-Quiz/1.0',
      },
      body: JSON.stringify(data),
      signal: controller.signal,
      // Add keepalive for better connection handling
      keepalive: true
    });

    clearTimeout(timeoutId);
    console.log('🔵 Webhook response status:', response.status);

    if (response.ok) {
      const responseText = await response.text();
      console.log('✅ Webhook sent successfully. Response:', responseText);
    } else {
      const errorText = await response.text();
      console.error('❌ Webhook failed:', response.status, errorText);
      throw new Error(`Webhook failed with status ${response.status}: ${errorText}`);
    }
  } catch (error: any) {
    if (error.name === 'AbortError') {
      console.error('⏰ Webhook timeout');
      throw new Error('Webhook timeout');
    } else {
      console.error('❌ Webhook error:', error.message);
      throw error; // Re-throw to be handled by caller
    }
  }
} 