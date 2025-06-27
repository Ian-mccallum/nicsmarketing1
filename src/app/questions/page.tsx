'use client'

import { useState, useEffect } from 'react';

export default function QuestionsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [origin, setOrigin] = useState('');
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // Check if redirected from FormSubmit success and set origin
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOrigin(window.location.origin);
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('success') === 'true') {
        setIsSubmitted(true);
      }
    }
  }, []);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address (e.g., user@domain.com)';
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = 'Subject must be at least 5 characters';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Submit the form to FormSubmit
    const form = e.target as HTMLFormElement;
    form.submit();
  };

  return (
    <div className="questions-page">
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

      <div className="questions-content">
        <div className="container">
          <div className="questions-header">
            <a href="/" className="back-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to Home
            </a>
            <h1>Have Questions?</h1>
            <p>I'm here to help! Send me a message and I'll get back to you within 24 hours.</p>
          </div>

          <div className="questions-grid">
            <div className="questions-info">
              <div className="info-card">
                <div className="info-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>What I Can Help With</h3>
                <ul>
                  <li>General marketing questions</li>
                  <li>Service inquiries</li>
                  <li>Pricing information</li>
                  <li>Process explanations</li>
                  <li>Partnership opportunities</li>
                </ul>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>Response Time</h3>
                <ul>
                  <li>I respond within 24 hours</li>
                  <li>Usually much faster during business hours</li>
                  <li>Detailed, personalized responses</li>
                  <li>No automated replies</li>
                  <li>Direct communication with me</li>
                </ul>
              </div>
            </div>

            <div className="contact-form-container">
              {!isSubmitted ? (
                <form 
                  className="contact-form"
                  action="https://formsubmit.co/422f93ff988f147278110955a929e746"
                  method="POST"
                  onSubmit={handleSubmit}
                >
                  <input type="hidden" name="_next" value={`${origin}/questions?success=true`} />
                  <input type="hidden" name="_subject" value="New Question from Nic's Marketing Website" />
                  <div className="form-group">
                    <label htmlFor="name">Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Your full name"
                      className={errors.name ? 'error' : ''}
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="your.email@example.com"
                      pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                      title="Please enter a valid email address (e.g., user@domain.com)"
                      className={errors.email ? 'error' : ''}
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Subject *</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      placeholder="What's your question about?"
                      className={errors.subject ? 'error' : ''}
                    />
                    {errors.subject && <span className="error-message">{errors.subject}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      placeholder="Tell me more about your question or inquiry..."
                      rows={6}
                      className={errors.message ? 'error' : ''}
                    />
                    {errors.message && <span className="error-message">{errors.message}</span>}
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-large"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="loading"></div>
                        Sending Message...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              ) : (
                <div className="success-message">
                  <div className="success-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h2>Message Sent!</h2>
                  <p>Thank you for reaching out. I'll get back to you within 24 hours with a detailed response.</p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="btn btn-secondary"
                  >
                    Send Another Message
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 