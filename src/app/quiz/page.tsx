'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Select from 'react-select';

interface QuizData {
  businessName: string;
  industry: string;
  websiteUrl: string;
  currentRevenue: string;
  adSpend: string;
  challenges: string[];
  timeline: string;
  name: string;
  email: string;
}

const QUIZ_STEPS = [
  {
    id: 'brand-profile',
    title: 'Brand Profile',
    description: 'Tell us about your business'
  },
  {
    id: 'budget-scale',
    title: 'Budget & Scale',
    description: 'Current revenue and ad spend'
  },
  {
    id: 'goals-challenges',
    title: 'Goals & Challenges',
    description: 'What you want to achieve'
  },
  {
    id: 'timeline',
    title: 'When Can You Start?',
    description: 'Your timeline expectations'
  },
  {
    id: 'contact',
    title: 'Contact Information',
    description: 'How to reach you'
  }
];

const INDUSTRY_OPTIONS = [
  "Clothing Brand",
  "Fashion/Beauty",
  "Tech/Gadgets", 
  "Health/Wellness",
  "Home/Lifestyle",
  "Food/Beverage",
  "Sports/Fitness",
  "Service Business",
  "SaaS/Software",
  "Digital Products",
  "Other"
];

const INDUSTRY_SELECT_OPTIONS = INDUSTRY_OPTIONS.map(option => ({ value: option, label: option }));

const REVENUE_OPTIONS = [
  "None",
  "$100-$499",
  "$500-$999", 
  "$1,000-$2,500",
  "$2,500-$5,000",
  "$5,000+"
];

const REVENUE_SELECT_OPTIONS = REVENUE_OPTIONS.map(option => ({ value: option, label: option }));

const AD_SPEND_OPTIONS = [
  "None",
  "$25-$150",
  "$150-$500",
  "$500-$1,000", 
  "$1,000+"
];

const AD_SPEND_SELECT_OPTIONS = AD_SPEND_OPTIONS.map(option => ({ value: option, label: option }));

const CHALLENGE_OPTIONS = [
  "Low conversion rates",
  "High customer acquisition cost",
  "Inconsistent results",
  "Scaling effectively",
  "Brand awareness",
  "Competition",
  "Low traffic",
  "Poor engagement",
  "No clear strategy",
  "Budget constraints"
];

const TIMELINE_OPTIONS = [
  "ASAP (within 30 days)",
  "1-2 months",
  "3-6 months", 
  "6+ months",
  "Not sure yet"
];

// Confetti Component
const Confetti = ({ isActive }: { isActive: boolean }) => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    color: string;
    size: number;
    delay: number;
  }>>([]);

  useEffect(() => {
    if (isActive) {
      // Create confetti particles in waves
      const createWave = (waveIndex: number) => {
        const particlesPerWave = 25;
        const waveDelay = waveIndex * 200; // 200ms between waves
        
        return Array.from({ length: particlesPerWave }, (_, i) => ({
          id: waveIndex * particlesPerWave + i,
          x: Math.random() * window.innerWidth,
          y: -30 - (Math.random() * 50), // More spread vertically
          vx: (Math.random() - 0.5) * 20, // Much wider horizontal spread
          vy: Math.random() * 6 + 4, // Faster falling
          color: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#FF8C42', '#9370DB'][Math.floor(Math.random() * 10)],
          size: Math.random() * 25 + 12, // Much bigger particles
          delay: waveDelay + (Math.random() * 100) // Random delay within wave
        }));
      };

      // Create 4 waves of confetti
      const allParticles = [
        ...createWave(0),
        ...createWave(1),
        ...createWave(2),
        ...createWave(3)
      ];
      
      setParticles(allParticles);

      // Animate confetti with staggered start
      const interval = setInterval(() => {
        setParticles(prev => 
          prev.map(particle => {
            const timeSinceStart = Date.now() - (window as any).confettiStartTime;
            if (timeSinceStart < particle.delay) {
              return particle; // Don't move yet
            }
            
            return {
              ...particle,
              x: particle.x + particle.vx,
              y: particle.y + particle.vy,
              vy: particle.vy + 0.15 // More gravity
            };
          }).filter(particle => {
            const timeSinceStart = Date.now() - (window as any).confettiStartTime;
            if (timeSinceStart < particle.delay) {
              return true; // Keep particles that haven't started yet
            }
            return particle.y < window.innerHeight + 150; // Keep particles that haven't fallen off screen
          })
        );
      }, 30); // Faster animation

      // Set start time for staggered animation
      (window as any).confettiStartTime = Date.now();

      return () => clearInterval(interval);
    }
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="confetti-container">
      {particles.map(particle => {
        const timeSinceStart = Date.now() - (window as any).confettiStartTime;
        const isVisible = timeSinceStart >= particle.delay;
        
        return (
          <div
            key={particle.id}
            className="confetti-particle"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              backgroundColor: particle.color,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              transform: `rotate(${particle.x * 0.2}deg)`,
              opacity: isVisible ? 1 : 0,
              transition: isVisible ? 'opacity 0.3s ease' : 'none'
            }}
          />
        );
      })}
    </div>
  );
};

export default function QuizPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [quizData, setQuizData] = useState<QuizData>({
    businessName: '',
    industry: '',
    websiteUrl: '',
    currentRevenue: '',
    adSpend: '',
    challenges: [],
    timeline: '',
    name: '',
    email: ''
  });
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [qualificationScore, setQualificationScore] = useState(0);
  const [isQualified, setIsQualified] = useState(false);

  // Instant scroll to top function
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  // Auto scroll to top when component mounts or completion state changes
  useEffect(() => {
    if (isCompleted) {
      scrollToTop();
    }
  }, [isCompleted]);

  // Auto scroll to top when step changes
  useEffect(() => {
    if (currentStep >= 0) {
      scrollToTop();
    }
  }, [currentStep]);

  const handleInputChange = (field: keyof QuizData, value: string | string[]) => {
    setQuizData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleChallengeToggle = (challenge: string) => {
    setQuizData(prev => ({
      ...prev,
      challenges: prev.challenges.includes(challenge)
        ? prev.challenges.filter(c => c !== challenge)
        : [...prev.challenges, challenge]
    }));
  };

  const nextStep = () => {
    if (currentStep < QUIZ_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
      // Instant scroll to top
      window.scrollTo(0, 0);
    } else {
      // Calculate qualification score when completing the quiz
      const score = calculateQualificationScore(quizData);
      const result = getQualificationResult(score, quizData.businessName, quizData.name, quizData);
      setQualificationScore(score);
      setIsQualified(result.qualified);
      setIsCompleted(true);
      // Instant scroll to top for results
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      // Instant scroll to top
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // Here you would typically send the data to your backend
      console.log('Quiz data:', quizData);
    }, 1000);
  };

  const progress = ((currentStep + 1) / QUIZ_STEPS.length) * 100;
  const isHalfway = currentStep === 2; // Step 3 of 5 (0-indexed, so step 2)

  // Points system for qualification
  const calculateQualificationScore = (data: QuizData) => {
    let score = 0;
    
    // Industry scoring (0-10 points)
    const industryScores: { [key: string]: number } = {
      "Clothing Brand": 10,
      "Fashion/Beauty": 10,
      "Tech/Gadgets": 10,
      "Health/Wellness": 10,
      "Home/Lifestyle": 10,
      "Food/Beverage": 10,
      "Sports/Fitness": 10,
      "Service Business": 10,
      "Digital Products": 10,
      "Other": 10,
      "SaaS/Software": 5 // Less favorable
    };
    score += industryScores[data.industry] || 0;
    
    // Website scoring (0-15 points)
    if (!data.websiteUrl || data.websiteUrl.trim() === '') {
      score += 10; // No website
    } else {
      score += 15; // Has website
    }
    
    // Revenue scoring (0-25 points)
    const revenueScores: { [key: string]: number } = {
      "None": 25,
      "$100-$499": 20,
      "$500-$999": 20,
      "$1,000-$2,500": 10, // Medium favorable
      "$2,500-$5,000": 5, // Medium favorable
      "$5,000+": 5 // Much less favorable
    };
    score += revenueScores[data.currentRevenue] || 0;
    
    // Ad spend scoring (0-25 points)
    const adSpendScores: { [key: string]: number } = {
      "None": 25, // Highest favorable
      "$25-$150": 20, // High favorability
      "$150-$500": 10, // Decent
      "$500-$1,000": 5, // Lower favorable
      "$1,000+": 0 // Lower favorable
    };
    score += adSpendScores[data.adSpend] || 0;
    
    // Barriers scoring (0-20 points) - More barriers = more points
    const barrierScores: { [key: string]: number } = {
      "Low conversion rates": 7, // Highest
      "Low traffic": 7, // Highest
      "Poor engagement": 7, // Highest
      "High customer acquisition cost": 6,
      "Inconsistent results": 6,
      "Scaling effectively": 5,
      "Brand awareness": 6,
      "Competition": 6,
      "No clear strategy": 5,
      "Budget constraints": 1
    };
    
    data.challenges.forEach(challenge => {
      score += barrierScores[challenge] || 0;
    });
    
    // Cap barriers at 20 points
    const barrierPoints = data.challenges.reduce((total, challenge) => {
      return total + (barrierScores[challenge] || 0);
    }, 0);
    score += Math.min(barrierPoints, 20);
    
    return score;
  };

  const getQualificationResult = (score: number, businessName: string, personName: string, quizData: QuizData) => {
    if (score >= 70) {
      const services = getRecommendedServices(quizData);
      const painPointSolutions = getPainPointSolutions(quizData.challenges);
      const revenueGuarantee = getRevenueGuarantee(quizData.currentRevenue);
      
      return {
        qualified: true,
        message: `Congratulations ${personName}! ${businessName} is exactly the type of business I love working with.`,
        nextSteps: "I'll reach out within 24 hours with next steps.",
        services: services,
        painPointSolutions: painPointSolutions,
        revenueGuarantee: revenueGuarantee
      };
    } else if (score >= 50) {
      const services = getRecommendedServices(quizData);
      const painPointSolutions = getPainPointSolutions(quizData.challenges);
      const revenueGuarantee = getLowerRevenueGuarantee(quizData.currentRevenue);
      
      return {
        qualified: true,
        message: `Good potential ${personName}! I think ${businessName} and I can create great results together.`,
        nextSteps: "I'll review your profile and get back to you within 24 hours with a customized approach.",
        services: services,
        painPointSolutions: painPointSolutions,
        revenueGuarantee: revenueGuarantee
      };
    } else {
      return {
        qualified: false,
        message: `Thanks for your interest ${personName}, but I don't think ${businessName} and I are the right fit right now.`,
        nextSteps: "I focus on businesses that are ready to scale and have the right foundation. However, I'm happy to answer any questions you might have.",
        services: null,
        painPointSolutions: null,
        revenueGuarantee: null,
        showContactOption: true
      };
    }
  };

  const getRecommendedServices = (data: QuizData) => {
    const services = [];
    
    // Industry-specific services
    if (data.industry === "Clothing Brand" || data.industry === "Fashion/Beauty") {
      services.push("Instagram & TikTok Content Strategy", "Influencer Partnership Management", "Visual Brand Identity Enhancement");
    } else if (data.industry === "Tech/Gadgets" || data.industry === "SaaS/Software") {
      services.push("Technical Content Marketing", "Product Demo Videos", "B2B Lead Generation");
    } else if (data.industry === "Health/Wellness" || data.industry === "Sports/Fitness") {
      services.push("Wellness Content Creation", "Community Building", "Transformation Story Marketing");
    } else {
      services.push("Social Media Strategy", "Content Creation", "Brand Positioning");
    }
    
    // Revenue-based services
    if (data.currentRevenue === "None" || data.currentRevenue === "$100-$499") {
      services.push("Brand Foundation Building", "Market Research & Positioning", "Launch Strategy");
    } else if (data.currentRevenue === "$1,000-$2,500" || data.currentRevenue === "$2,500-$5,000") {
      services.push("Scaling Strategy", "Advanced Funnel Optimization", "Customer Retention Programs");
    }
    
    // Ad spend based services
    if (data.adSpend === "None") {
      services.push("Paid Advertising Setup", "Budget Allocation Strategy", "ROI Optimization");
    } else if (data.adSpend === "$1,000+") {
      services.push("Advanced Ad Strategy", "Cross-Platform Optimization", "Creative Testing & Optimization");
    }
    
    return services.slice(0, 5); // Return top 5 services
  };

  const getPainPointSolutions = (challenges: string[]) => {
    const solutions: { [key: string]: string } = {
      "Low conversion rates": "Implement high-converting funnel sequences and A/B testing protocols",
      "High customer acquisition cost": "Optimize ad targeting and create viral referral systems",
      "Inconsistent results": "Establish data-driven processes and automated marketing systems",
      "Scaling effectively": "Build scalable marketing infrastructure and team training programs",
      "Brand awareness": "Create viral content strategies and influencer partnership networks",
      "Competition": "Develop unique positioning and competitive advantage strategies",
      "Low traffic": "Implement multi-channel traffic generation and SEO optimization",
      "Poor engagement": "Create engaging content calendars and community building strategies",
      "No clear strategy": "Develop comprehensive marketing roadmaps and execution plans",
      "Budget constraints": "Create high-ROI marketing strategies and resource optimization"
    };
    
    return challenges.map(challenge => solutions[challenge]).filter(Boolean);
  };

  const getRevenueGuarantee = (currentRevenue: string) => {
    const revenueMap: { [key: string]: string } = {
      "None": "$2,000+ monthly within 90 days",
      "$100-$499": "$1,500+ monthly within 60 days",
      "$500-$999": "$2,500+ monthly within 60 days",
      "$1,000-$2,500": "$4,000+ monthly within 90 days",
      "$2,500-$5,000": "$7,500+ monthly within 90 days",
      "$5,000+": "$10,000+ monthly within 90 days"
    };
    
    return revenueMap[currentRevenue] || "Significant revenue increase within 90 days";
  };

  const getLowerRevenueGuarantee = (currentRevenue: string) => {
    const revenueMap: { [key: string]: string } = {
      "None": "$1,000+ monthly within 60 days",
      "$100-$499": "$750+ monthly within 30 days",
      "$500-$999": "$1,250+ monthly within 30 days",
      "$1,000-$2,500": "$2,000+ monthly within 60 days",
      "$2,500-$5,000": "$5,000+ monthly within 60 days",
      "$5,000+": "$7,500+ monthly within 60 days"
    };
    
    return revenueMap[currentRevenue] || "Significant revenue increase within 60 days";
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Brand Profile
        return (
          <div className="step-content">
            <h2>Tell us about your business</h2>
            
            <div className="form-group">
              <label htmlFor="businessName">Business Name *</label>
              <input
                id="businessName"
                type="text"
                placeholder="Enter your business name"
                value={quizData.businessName}
                onChange={(e) => handleInputChange('businessName', e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="industry">What industry are you in? *</label>
              <Select
                inputId="industry"
                options={INDUSTRY_SELECT_OPTIONS}
                value={INDUSTRY_SELECT_OPTIONS.find(opt => opt.value === quizData.industry) || null}
                onChange={opt => handleInputChange('industry', opt ? opt.value : '')}
                placeholder="Select your industry"
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    color: '#fff',
                    borderColor: state.isFocused ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.15)',
                    boxShadow: 'none',
                    minHeight: '45px',
                    fontSize: '1rem',
                    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                  }),
                  singleValue: (provided) => ({
                    ...provided,
                    color: '#fff',
                    fontSize: '1rem',
                    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                  }),
                  menu: (provided) => ({
                    ...provided,
                    backgroundColor: '#fff',
                    color: '#111',
                    fontSize: '1rem',
                    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    color: '#111',
                    backgroundColor: state.isFocused ? '#eee' : '#fff',
                    fontSize: '1rem',
                    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                  }),
                  placeholder: (provided) => ({
                    ...provided,
                    color: 'rgba(255,255,255,0.5)',
                    fontSize: '1rem',
                    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                  }),
                  input: (provided) => ({
                    ...provided,
                    color: '#fff',
                    fontSize: '1rem',
                    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                  }),
                }}
                theme={theme => ({
                  ...theme,
                  borderRadius: 8,
                  colors: {
                    ...theme.colors,
                    primary25: '#eee',
                    primary: 'rgba(255,255,255,0.3)',
                    neutral0: '#fff',
                    neutral80: '#111',
                  },
                })}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="websiteUrl">Website URL (optional)</label>
              <input
                id="websiteUrl"
                type="url"
                placeholder="https://yourwebsite.com"
                value={quizData.websiteUrl}
                onChange={(e) => handleInputChange('websiteUrl', e.target.value)}
              />
            </div>
          </div>
        );

      case 1: // Budget & Scale
        return (
          <div className="step-content">
            <h2>Current revenue and ad spend</h2>
            
            <div className="form-group">
              <label htmlFor="currentRevenue">What's your current monthly revenue? *</label>
              <Select
                inputId="currentRevenue"
                options={REVENUE_SELECT_OPTIONS}
                value={REVENUE_SELECT_OPTIONS.find(opt => opt.value === quizData.currentRevenue) || null}
                onChange={opt => handleInputChange('currentRevenue', opt ? opt.value : '')}
                placeholder="Select your revenue range"
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    color: '#fff',
                    borderColor: state.isFocused ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.15)',
                    boxShadow: 'none',
                    minHeight: '45px',
                    fontSize: '1rem',
                    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                  }),
                  singleValue: (provided) => ({
                    ...provided,
                    color: '#fff',
                    fontSize: '1rem',
                    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                  }),
                  menu: (provided) => ({
                    ...provided,
                    backgroundColor: '#fff',
                    color: '#111',
                    fontSize: '1rem',
                    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    color: '#111',
                    backgroundColor: state.isFocused ? '#eee' : '#fff',
                    fontSize: '1rem',
                    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                  }),
                  placeholder: (provided) => ({
                    ...provided,
                    color: 'rgba(255,255,255,0.5)',
                    fontSize: '1rem',
                    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                  }),
                  input: (provided) => ({
                    ...provided,
                    color: '#fff',
                    fontSize: '1rem',
                    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                  }),
                }}
                theme={theme => ({
                  ...theme,
                  borderRadius: 8,
                  colors: {
                    ...theme.colors,
                    primary25: '#eee',
                    primary: 'rgba(255,255,255,0.3)',
                    neutral0: '#fff',
                    neutral80: '#111',
                  },
                })}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="adSpend">What's your current monthly ad spend? *</label>
              <Select
                inputId="adSpend"
                options={AD_SPEND_SELECT_OPTIONS}
                value={AD_SPEND_SELECT_OPTIONS.find(opt => opt.value === quizData.adSpend) || null}
                onChange={opt => handleInputChange('adSpend', opt ? opt.value : '')}
                placeholder="Select your ad spend range"
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    color: '#fff',
                    borderColor: state.isFocused ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.15)',
                    boxShadow: 'none',
                    minHeight: '45px',
                    fontSize: '1rem',
                    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                  }),
                  singleValue: (provided) => ({
                    ...provided,
                    color: '#fff',
                    fontSize: '1rem',
                    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                  }),
                  menu: (provided) => ({
                    ...provided,
                    backgroundColor: '#fff',
                    color: '#111',
                    fontSize: '1rem',
                    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    color: '#111',
                    backgroundColor: state.isFocused ? '#eee' : '#fff',
                    fontSize: '1rem',
                    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                  }),
                  placeholder: (provided) => ({
                    ...provided,
                    color: 'rgba(255,255,255,0.5)',
                    fontSize: '1rem',
                    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                  }),
                  input: (provided) => ({
                    ...provided,
                    color: '#fff',
                    fontSize: '1rem',
                    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                  }),
                }}
                theme={theme => ({
                  ...theme,
                  borderRadius: 8,
                  colors: {
                    ...theme.colors,
                    primary25: '#eee',
                    primary: 'rgba(255,255,255,0.3)',
                    neutral0: '#fff',
                    neutral80: '#111',
                  },
                })}
                required
              />
            </div>
          </div>
        );

      case 2: // Goals & Challenges
        return (
          <div className="step-content">
            <h2>What barriers are you facing?</h2>
            <p className="step-description">Select all that apply</p>
            
            <div className="checkbox-group">
              {CHALLENGE_OPTIONS.map((challenge) => (
                <label key={challenge} className="checkbox-option">
                  <input
                    type="checkbox"
                    checked={quizData.challenges.includes(challenge)}
                    onChange={() => handleChallengeToggle(challenge)}
                  />
                  <span className="checkmark"></span>
                  {challenge}
                </label>
              ))}
            </div>
          </div>
        );

      case 3: // Timeline
        return (
          <div className="step-content">
            <h2>When do you want to see results?</h2>
            
            <div className="radio-group">
              {TIMELINE_OPTIONS.map((option) => (
                <label key={option} className="radio-option">
                  <input
                    type="radio"
                    name="timeline"
                    value={option}
                    checked={quizData.timeline === option}
                    onChange={(e) => handleInputChange('timeline', e.target.value)}
                    required
                  />
                  <span className="radio-mark"></span>
                  {option}
                </label>
              ))}
            </div>
          </div>
        );

      case 4: // Contact Info
        return (
          <div className="step-content">
            <h2>How can we reach you?</h2>
            
            <div className="form-group">
              <label htmlFor="name">Your Name *</label>
              <input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={quizData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={quizData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (isCompleted) {
    const result = getQualificationResult(qualificationScore, quizData.businessName, quizData.name, quizData);
    const showConfetti = isQualified && qualificationScore >= 70;
    
    return (
      <div className="quiz-page">
        <div className="bubble-background">
          <div className="bubble"></div>
        </div>
        
        {/* Confetti Animation */}
        <Confetti isActive={showConfetti} />
        
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
        
        <div className="container">
          <div className="quiz-complete">
            <div className={`complete-icon ${isQualified ? 'qualified' : 'not-qualified'}`}>
              <img 
                src={isQualified ? "/check-circle.svg" : "/x-circle.svg"}
                alt={isQualified ? "Qualified" : "Not Qualified"}
                className="qualification-icon"
              />
            </div>
            <h1>{isQualified ? 'You Qualify!' : 'Assessment Complete'}</h1>
            <p className="qualification-message">{result.message}</p>
            
            {isQualified && (
              <>
                {result.revenueGuarantee && (
                  <div className="guarantee-section">
                    <h3>Your Revenue Potential</h3>
                    <div className="guarantee-card">
                      <div className="guarantee-content">
                        <p className="guarantee-text">{result.revenueGuarantee}</p>
                        <h4>Guaranteed Results</h4>
                        <p className="guarantee-note">Based on your current monthly revenue of {quizData.currentRevenue}</p>
                        <div className="guarantee-cta">
                          <p className="next-steps-text">{result.nextSteps}</p>
                          <button 
                            onClick={() => window.location.href = '/contact'}
                            className="btn btn-large btn-claim"
                          >
                            Claim Your Free Consultation
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {result.services && (
                  <div className="services-section">
                    <h3>Recommended Strategy for {quizData.businessName}</h3>
                    <div className="services-grid">
                      {result.services.map((service, index) => (
                        <div key={index} className="service-item">
                          <div className="service-icon">•</div>
                          <span>{service}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {!isQualified && result.showContactOption && (
              <div className="contact-option-section">
                <div className="contact-option-card">
                  <div className="contact-option-content">
                    <h4>Have Questions?</h4>
                    <p>Even though we might not be the right fit right now, I'm happy to answer any questions you have about marketing strategy or business growth.</p>
                    <div className="contact-option-cta">
                      <button 
                        onClick={() => window.location.href = '/questions'}
                        className="btn btn-secondary"
                      >
                        Ask a Question
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="results-summary">
              <h3>Your Profile Summary:</h3>
              <div className="summary-item">
                <strong>Business Name:</strong> {quizData.businessName}
              </div>
              <div className="summary-item">
                <strong>Industry:</strong> {quizData.industry}
              </div>
              {quizData.websiteUrl && (
                <div className="summary-item">
                  <strong>Website:</strong> {quizData.websiteUrl}
                </div>
              )}
              <div className="summary-item">
                <strong>Revenue:</strong> {quizData.currentRevenue}
              </div>
              <div className="summary-item">
                <strong>Ad Spend:</strong> {quizData.adSpend}
              </div>
              <div className="summary-item">
                <strong>Challenges:</strong> {quizData.challenges.join(', ')}
              </div>
              <div className="summary-item">
                <strong>Timeline:</strong> {quizData.timeline}
              </div>
              <div className="summary-item">
                <strong>Name:</strong> {quizData.name}
              </div>
              <div className="summary-item">
                <strong>Email:</strong> {quizData.email}
              </div>
            </div>

            <div className="quiz-actions">
              <Link href="/" className="btn btn-secondary">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-page">
      <div className="bubble-background">
        <div className="bubble"></div>
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
      
      <div className="container">
        <div className="quiz-header">
          <Link href="/" className="back-link">
            ← Back to Home
          </Link>
          <h1>Qualification Assessment</h1>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          {isHalfway && (
            <div className="halfway-message">
              <span className="halfway-text">Halfway! Almost there!</span>
            </div>
          )}
          <p className="progress-text">Step {currentStep + 1} of {QUIZ_STEPS.length}: {QUIZ_STEPS[currentStep].title}</p>
        </div>

        <div className="quiz-content">
          <div className="question-card">
            <div className="step-header">
              <h2>{QUIZ_STEPS[currentStep].title}</h2>
              <p>{QUIZ_STEPS[currentStep].description}</p>
            </div>
            
            {renderStepContent()}

            <div className="step-navigation">
              {currentStep > 0 && (
                <button onClick={prevStep} className="btn btn-secondary">
                  ← Previous
                </button>
              )}
              <button 
                onClick={nextStep}
                className="btn btn-primary"
                disabled={
                  (currentStep === 0 && (!quizData.businessName || !quizData.industry)) ||
                  (currentStep === 1 && (!quizData.currentRevenue || !quizData.adSpend)) ||
                  (currentStep === 3 && !quizData.timeline) ||
                  (currentStep === 4 && (!quizData.name || !quizData.email))
                }
              >
                {currentStep === QUIZ_STEPS.length - 1 ? 'Complete Assessment' : 'Next Step →'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 