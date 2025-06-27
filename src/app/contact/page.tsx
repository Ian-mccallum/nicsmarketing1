'use client'

import { useEffect } from 'react';

export default function ContactPage() {
  useEffect(() => {
    // Load Calendly widget script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script when component unmounts
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="contact-page">
      {/* Header with Logo */}
      <header className="header">
        <div className="container">
          <div className="logo-container">
            <img 
              src="/nmlogo.png" 
              alt="Nic's Marketing" 
              className="logo"
              onError={(e) => {
                console.error('Logo failed to load');
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        </div>
      </header>

      <div className="contact-content">
        <div className="container">
          <div className="contact-header">
            <a href="/" className="back-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to Home
            </a>
            <h1>Schedule Your Free Consultation</h1>
            <p>Ready to transform your brand? Let's hop on a phone call and discuss how we can take your business to the next level.</p>
          </div>

          <div className="contact-grid">
            <div className="contact-info">
              <div className="info-card">
                <div className="info-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>What to Expect</h3>
                <ul>
                  <li>60-minute strategy session</li>
                  <li>Analysis of your current marketing</li>
                  <li>Custom recommendations</li>
                  <li>Clear next steps</li>
                  <li>No pressure, no sales pitch</li>
                </ul>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>Why Schedule?</h3>
                <ul>
                  <li>Get personalized insights</li>
                  <li>Understand your unique challenges</li>
                  <li>See if we're the right fit</li>
                  <li>Learn actionable strategies</li>
                  <li>Start your transformation journey</li>
                </ul>
              </div>
            </div>

            <div className="calendly-container">
              <div 
                className="calendly-inline-widget" 
                data-url="https://calendly.com/nicsmarketing1/30min?background_color=000000&text_color=ffffff&primary_color=c3c3c3"
                style={{ minWidth: '320px', height: '700px' }}
              />
            </div>
          </div>

          <div className="contact-footer">
            <p>Can't find a time that works? <a href="/questions">Contact us</a> and we'll find a time that fits your schedule.</p>
          </div>
        </div>
      </div>
    </div>
  );
} 