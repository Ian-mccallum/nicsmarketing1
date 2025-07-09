import { NextRequest, NextResponse } from 'next/server';

const WEBHOOK_URL = process.env.NEXT_PUBLIC_WEBHOOK_URL || 'https://hook.us2.make.com/za6hy7vu588fcgad8zdnqhrcl8so435k';

export async function POST(request: NextRequest) {
  console.log('🔵 API route called');
  console.log('🔵 Webhook URL:', WEBHOOK_URL);
  
  try {
    const quizData = await request.json();
    console.log('🔵 Received quiz data:', Object.keys(quizData));
    console.log('🔵 Qualification status:', quizData.isQualified ? '✅ QUALIFIED' : '❌ NOT QUALIFIED');
    console.log('🔵 Qualification score:', quizData.qualificationScore);
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
    
    // Send to webhook in background without waiting
    sendWebhookData(webhookData);

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

// Separate function to handle webhook sending
async function sendWebhookData(data: any) {
  console.log('🔵 Starting webhook send...');
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    console.log('🔵 Making fetch request to:', WEBHOOK_URL);
    
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Nics-Marketing-Quiz/1.0',
      },
      body: JSON.stringify(data),
      signal: controller.signal
    });

    clearTimeout(timeoutId);
    console.log('🔵 Webhook response status:', response.status);

    if (response.ok) {
      const responseText = await response.text();
      console.log('✅ Webhook sent successfully. Response:', responseText);
    } else {
      const errorText = await response.text();
      console.error('❌ Webhook failed:', response.status, errorText);
    }
  } catch (error: any) {
    if (error.name === 'AbortError') {
      console.error('⏰ Webhook timeout');
    } else {
      console.error('❌ Webhook error:', error.message);
      console.error('❌ Full error:', error);
    }
  }
} 