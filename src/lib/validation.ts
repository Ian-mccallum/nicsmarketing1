interface QuizData {
  businessName: string
  industry: string
  websiteUrl?: string
  currentRevenue: string
  adSpend: string
  challenges: string[]
  timeline: string
  name: string
  email: string
}

interface ValidationResult {
  isValid: boolean
  data?: QuizData
  errors?: string[]
}

export function validateAssessmentData(body: any): ValidationResult {
  const errors: string[] = []

  // Required fields
  const requiredFields = [
    'businessName', 'industry', 'currentRevenue', 
    'adSpend', 'challenges', 'timeline', 'name', 'email'
  ]

  for (const field of requiredFields) {
    if (!body[field]) {
      errors.push(`${field} is required`)
    }
  }

  // Email validation
  if (body.email && !isValidEmail(body.email)) {
    errors.push('Invalid email format')
  }

  // Challenges validation
  if (body.challenges && !Array.isArray(body.challenges)) {
    errors.push('Challenges must be an array')
  }

  // Website URL validation (optional)
  if (body.websiteUrl && !isValidUrl(body.websiteUrl)) {
    errors.push('Invalid website URL format')
  }

  if (errors.length > 0) {
    return {
      isValid: false,
      errors
    }
  }

  return {
    isValid: true,
    data: {
      businessName: body.businessName,
      industry: body.industry,
      websiteUrl: body.websiteUrl,
      currentRevenue: body.currentRevenue,
      adSpend: body.adSpend,
      challenges: body.challenges,
      timeline: body.timeline,
      name: body.name,
      email: body.email
    }
  }
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
} 