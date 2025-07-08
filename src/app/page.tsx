'use client'

import { useState } from 'react';

// Temporary data until dependencies are installed
const PAIN_POINTS = [
  {
    id: 1,
    title: "Inconsistent Brand Voice",
    description: "Your brand speaks multiple languages, confusing your audience and diluting your message."
  },
  {
    id: 2,
    title: "Low Conversion Rates",
    description: "Traffic comes in but sales don't follow. Your funnel leaks like a sieve."
  },
  {
    id: 3,
    title: "Stagnant Growth",
    description: "You're stuck in the same revenue cycle, unable to break through to the next level."
  }
];

const SERVICE_BENEFITS = [
  {
    id: 1,
    title: "Clear Positioning",
    description: "Communicate your unique value in under 5 seconds"
  },
  {
    id: 2,
    title: "Conversion-Driven Content",
    description: "Turn posts and ads into sales funnels that actually convert"
  },
  {
    id: 3,
    title: "Transformation Focus",
    description: "Showcase before→after results that prove your worth"
  }
];

const DIGITAL_ADVANTAGES = [
  {
    id: 1,
    title: "Real-Time Trend Mastery",
    description: "I live and breathe today's digital trends—so your brand speaks the language of tomorrow"
  },
  {
    id: 2,
    title: "Gen-Z Insights",
    description: "Direct access to the mindset and behavior of your future customers"
  },
  {
    id: 3,
    title: "Digital-Native Strategy",
    description: "Built-in understanding of how modern consumers discover, engage, and purchase"
  }
];

const NICHE_OPTIONS = [
  "Clothing & Fashion",
  "Beauty & Cosmetics",
  "Technology & Gadgets",
  "Health & Wellness",
  "Food & Beverage",
  "Home & Lifestyle",
  "Other"
];

const AD_SPEND_OPTIONS = [
  "Under $1,000/month",
  "$1,000 - $5,000/month",
  "$5,000 - $10,000/month",
  "$10,000 - $25,000/month",
  "$25,000+/month"
];

const PAIN_POINT_OPTIONS = [
  "Low conversion rates",
  "Inconsistent brand voice",
  "Stagnant growth",
  "Poor ad performance",
  "Lack of customer engagement",
  "Other"
];

const SOCIAL_LINKS = {
  instagram: "https://instagram.com/nicsmarketing",
  twitter: "https://twitter.com/nicsmarketing",
  linkedin: "https://linkedin.com/in/nicsmarketing"
};

export default function Home() {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    niche: '',
    brandUrl: '',
    adSpend: '',
    painPoint: '',
    name: '',
    email: '',
    phone: ''
  });

  const scrollToForm = () => {
    const formElement = document.getElementById('qualification');
    if (formElement) {
      // Calculate the exact position accounting for the fixed header
      const elementRect = formElement.getBoundingClientRect();
      const absoluteElementTop = elementRect.top + window.pageYOffset;
      const headerHeight = 80;
      const targetPosition = absoluteElementTop - headerHeight - 20;
      
      // Scroll directly to the correct position
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsFormSubmitted(true);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="App">
      {/* Single Fluid Floating Bubble */}
      <div className="bubble-background">
        <div className="bubble">
        </div>
      </div>

      {/* Header with Logo */}
      <header className="header">
        <div className="container">
          <div className="logo-container">
            <img 
              src="/nmlogo.png" 
              alt="Nics Marketing" 
              className="logo"
              onError={(e) => {
                console.error('Logo failed to load');
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="fade-in-up">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="text-gradient">Stop Chasing Clients. Become the Brand They Chase.</h1>
              <p>Apply to Work with Nics Marketing to transform your Ecommerce Businesses conversions.</p>
              <button className="btn btn-light-sweep" onClick={scrollToForm}>
                <span style={{ fontWeight: '600' }}>Reserve My Spot</span>
                <svg className="btn-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5V19M12 19L19 12M12 19L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <div className="hero-visual">
              <img src="/Marketing-rafiki.svg" alt="Digital Marketing Strategy" className="hero-svg" />
            </div>
          </div>
        </div>
      </section>

      {/* How I Transform Brands Section */}
      <section className="fade-in-up transform-brands-section">
        <div className="container">
          <h2 className="transform-brands-title">How I Transform Brands</h2>
          <div className="transform-brands-pillars">
            <div className="pillar-card">
              <div className="pillar-icon pillar-icon-positioning">
                {/* Target/Focus Icon */}
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#00FF88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" stroke="#00FF88" strokeWidth="2"/><circle cx="12" cy="12" r="6" stroke="#00FF88" strokeWidth="1.5"/><circle cx="12" cy="12" r="2" fill="#00FF88"/></svg>
              </div>
              <h3>Positioning Overhaul</h3>
              <p className="pillar-quote">“Stop Blending In. Get Crystal Clear.”</p>
              <p>I'll help you distill your unique value into a 5-second hook—so visitors instantly "get" why you're the only choice.</p>
            </div>
            <div className="pillar-card">
              <div className="pillar-icon pillar-icon-conversion">
                {/* Funnel/Conversion Icon */}
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#00FF88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 4h18l-7 8v5l-4 3v-8l-7-8z" stroke="#00FF88" strokeWidth="2" fill="none"/><circle cx="12" cy="19" r="1.5" fill="#00FF88"/></svg>
              </div>
              <h3>Conversion-First Content</h3>
              <p className="pillar-quote">“Don't Just post, bring in sales.”</p>
              <p>Every post, ad, and caption is built to funnel prospects toward the buy button, no more tips without transformation.</p>
            </div>
            <div className="pillar-card">
              <div className="pillar-icon pillar-icon-branding">
                {/* Crown/Brand Icon */}
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#00FF88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 17l5-10 5 6 5-6 5 10z" stroke="#00FF88" strokeWidth="2" fill="none"/><circle cx="12" cy="17" r="2" fill="#00FF88"/></svg>
              </div>
              <h3>Obvious-Choice Branding</h3>
              <p className="pillar-quote">“Become the Brand They Chase.”</p>
              <p>Through strategic messaging and visual cues, I make your brand the obvious, confident solution to your customers' pain.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Villa */}
      <section className="fade-in-up meet-nico-hero">
        <div className="container">
          <div className="meet-nico-content">
            <div className="meet-nico-layout">
              <div className="meet-nico-text">
                <div className="meet-nico-header">
                  <div className="meet-nico-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h2 className="text-gradient">Meet Villa</h2>
                </div>
                
                {/* Photo moved here for mobile-first layout */}
                <div className="meet-nico-photo">
                  <img 
                    src="/IMG_8367.JPG" 
                    alt="Villa" 
                    className="nico-photo"
                    onError={(e) => {
                      console.error('Villa photo failed to load');
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
                
                <p className="meet-nico-intro">
                  At 17 years old, I'm not just another marketer. I'm a true digital native who's grown up in the age of social media, algorithms, and instant gratification.
                </p>
                <div className="meet-nico-highlights">
                  <div className="highlight-item">
                    <div className="highlight-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="highlight-content">
                      <h3>Digital Native Advantage</h3>
                      <p>I don't just study digital trends, I live them. My ethos comes directly from my childhood spent in the digital age.</p>
                    </div>
                  </div>
                  <div className="highlight-item">
                    <div className="highlight-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45768C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="highlight-content">
                      <h3>Gen-Z Insights</h3>
                      <p>I understand the mindset of your future customers because I know what makes people stop scrolling, what drives engagement, and what converts.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="meet-nico-left">
                {/* Photo for desktop layout */}
                <div className="meet-nico-photo">
                  <img 
                    src="/IMG_8367.JPG" 
                    alt="Villa" 
                    className="nico-photo"
                    onError={(e) => {
                      console.error('Villa photo failed to load');
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
                <div className="meet-nico-cta-card">
                  <p className="meet-nico-cta">
                    Ready to work with someone who speaks the language of tomorrow's consumers?
                  </p>
                </div>
              </div>
            </div>
            
            {/* Full-width CTA card for desktop */}
            <div className="meet-nico-desktop-cta">
              <div className="meet-nico-cta-card-wide">
                <p className="meet-nico-cta">
                  Ready to work with someone who speaks the language of tomorrow's consumers?
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pre-Qualification Steps */}
      <section id="qualification" className="fade-in-up">
        <div className="container">
          <div className="qualification-intro">
            <h2>See If You Qualify</h2>
            <p>Let's see if we're a good fit to work together. This quick assessment will help us both understand if we can create the results you're looking for.</p>
          </div>
          
          <div className="qualification-steps">
            <div className="step-card">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Quick Assessment</h3>
                <p>Answer 5 simple questions about your business, goals, and current situation.</p>
              </div>
            </div>
            
            <div className="step-card">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Instant Analysis</h3>
                <p>Get immediate feedback on whether we're a good match and what we can achieve together.</p>
              </div>
            </div>
            
            <div className="step-card">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Next Steps</h3>
                <p>If we're a fit, you'll get a personalized strategy call and action plan within 24 hours.</p>
              </div>
            </div>
          </div>
          
          <div className="qualification-cta">
            <button 
              onClick={() => window.location.href = '/quiz'}
              className="btn btn-large"
            >
              Start Assessment
              <svg className="btn-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <p className="cta-note">Takes less than 2 minutes • No commitment required</p>
          </div>
        </div>
      </section>

      {/* Ready to Get Started Hero */}
      <section className="fade-in-up ready-hero">
        <div className="ready-hero-content">
          <div className="ready-hero-text">
            <h2 className="text-gradient">Ready to Get Started?</h2>
            <p>Transform your brand with a digital native who speaks the language of tomorrow's consumers.</p>
            <div className="ready-hero-actions">
              <button 
                onClick={() => window.location.href = '/quiz'}
                className="btn btn-large"
              >
                Get Started
                <svg className="btn-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <a 
                href="/questions"
                className="ready-hero-link"
              >
                Have questions? Let's talk →
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 