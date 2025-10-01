import { NextRequest, NextResponse } from 'next/server';

const WEBHOOK_URL = process.env.WEBHOOK_URL || process.env.NEXT_PUBLIC_WEBHOOK_URL || 'https://hook.us2.make.com/za6hy7vu588fcgad8zdnqhrcl8so435k';

export async function POST(request: NextRequest) {
  try {
    const quizData = await request.json();
    
    // Add metadata to the data
    const webhookData = {
      ...quizData,
      timestamp: new Date().toISOString(),
      source: 'nics-marketing-quiz',
      userAgent: request.headers.get('user-agent') || 'unknown'
    };
    
    // For Vercel, we need to handle the webhook call more carefully
    // Try to send immediately, but don't block the response
    try {
      await sendWebhookData(webhookData);
    } catch (webhookError) {
      // Don't fail the entire request if webhook fails
    }

    // Return success immediately
    return NextResponse.json({ 
      success: true, 
      message: 'Quiz submitted successfully' 
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to submit quiz' },
      { status: 500 }
    );
  }
}

// Optimized function for Vercel serverless environment
async function sendWebhookData(data: any) {
  try {
    // Reduced timeout for Vercel (8 seconds to be safe)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);
    
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

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Webhook failed with status ${response.status}: ${errorText}`);
    }
  } catch (error: any) {
    if (error.name === 'AbortError') {
      throw new Error('Webhook timeout');
    } else {
      throw error; // Re-throw to be handled by caller
    }
  }
} 