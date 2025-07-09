'use client';
import { useState } from 'react';
import '../../styles/globals.css';

const privacyPolicy = (
    <div>
    <h1>Privacy Policy</h1>
    <p><strong>Effective Date:</strong> [Insert Date]</p>
    <p>
      Nics Marketing ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website at nicsmarketing.co ("the Website") and use our services.
    </p>
    <p><strong>Contact Information:</strong></p>
    <ul>
      <li><strong>Business Name:</strong> Nics Marketing (DBA of Nicolas Villalobos)</li>
      <li><strong>Owner:</strong> Nicolas Villalobos</li>
      <li><strong>Email:</strong> villa@nicsmarketing.com</li>
      <li><strong>Location:</strong> Illinois, United States</li>
    </ul>
    <h2>Information We Collect</h2>
    <p><strong>Personal Information:</strong></p>
    <ul>
      <li>From Qualification Quiz: Business name, industry/niche, website URL (optional), current monthly revenue, monthly ad spend, business challenges, timeline expectations, your name, email address</li>
      <li>From Contact Forms: Your name, email address, subject line, message content</li>
    </ul>
    <p><strong>Automatically Collected Information:</strong></p>
    <ul>
      <li>IP address, browser type and version, operating system, pages visited, time spent on pages, referring website, user agent information</li>
    </ul>
    <h2>How We Use Your Information</h2>
    <ol>
      <li>To provide services: Process your qualification assessment and provide marketing consultation services</li>
      <li>To communicate: Respond to your inquiries and send follow-up communications</li>
      <li>To improve: Analyze website usage to improve our services and user experience</li>
      <li>To comply with legal requirements</li>
    </ol>
    <h2>Information Sharing and Disclosure</h2>
    <p>We do not sell, trade, or otherwise transfer your personal information to third parties except as described below:</p>
    <ul>
      <li>
        <strong>Service Providers:</strong> We may share your information with trusted third-party service providers who assist us in operating our Website and providing services, including:
        <ul>
          <li>Make.com (Integromat): Processes quiz submissions and stores data in Google Sheets</li>
          <li>Google Sheets: Stores your quiz responses and contact information</li>
          <li>Calendly: Manages appointment scheduling</li>
          <li>FormSubmit: Processes contact form submissions</li>
        </ul>
      </li>
      <li>
        <strong>Legal Requirements:</strong> We may disclose your information if required by law or in response to valid legal process.
      </li>
      <li>
        <strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.
      </li>
    </ul>
    <h2>Data Storage and Security</h2>
    <ul>
      <li><strong>Storage Location:</strong> Your information is stored on secure servers and cloud services, primarily within the United States.</li>
      <li><strong>Security Measures:</strong> We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</li>
      <li><strong>Data Retention:</strong> We retain your personal information for as long as necessary to provide our services and comply with legal obligations. You may request deletion of your information at any time.</li>
    </ul>
    <h2>Third-Party Services</h2>
    <ul>
      <li>
        <strong>Calendly:</strong> Our Website integrates with Calendly for appointment scheduling. Calendly's privacy policy governs their collection and use of your information when you schedule appointments.
      </li>
      <li>
        <strong>Google Sheets:</strong> Quiz responses are stored in Google Sheets through our webhook integration. Google's privacy policy applies to data stored in their services.
      </li>
      <li>
        <strong>FormSubmit:</strong> Contact form submissions are processed by FormSubmit. Their privacy policy governs their handling of your information.
      </li>
    </ul>
    <h2>Your Rights and Choices</h2>
    <ul>
      <li><strong>Access and Correction:</strong> You have the right to access, correct, or update your personal information. Contact us to exercise these rights.</li>
      <li><strong>Opt-Out:</strong> You may opt out of marketing communications by following the unsubscribe instructions in our emails or contacting us directly.</li>
      <li><strong>Data Portability:</strong> You may request a copy of your personal information in a portable format.</li>
      <li><strong>Deletion:</strong> You may request deletion of your personal information, subject to legal retention requirements.</li>
    </ul>
    <h2>Cookies and Tracking Technologies</h2>
    <p>We use cookies and similar technologies to enhance your browsing experience and analyze website usage. You can control cookie settings through your browser preferences.</p>
    <h2>Children's Privacy</h2>
    <p>Our Website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.</p>
    <h2>Changes to This Privacy Policy</h2>
    <p>We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the Effective Date.</p>
    <h2>Contact Us</h2>
    <p>
      If you have questions about this Privacy Policy or our privacy practices, please contact us:<br />
      <strong>Nics Marketing</strong><br />
      Email: <a href="mailto:villa@nicsmarketing.com">villa@nicsmarketing.com</a>
    </p>
    <h2>Illinois-Specific Provisions</h2>
    <p>
      As a business operating in Illinois, we comply with the Illinois Personal Information Protection Act (PIPA) and other applicable state privacy laws. Illinois residents have additional rights regarding their personal information, including the right to be notified of data breaches affecting their information.
    </p>
  </div>
);

const termsOfService = (
    <div>
    <h1>Terms of Service</h1>
    <p><strong>Effective Date:</strong> July 9, 2025</p>
    <p>
      Welcome to Nics Marketing. These Terms of Service ("Terms") govern your use of our website at nicsmarketing.co ("the Website") and the services provided by Nics Marketing, a business operated by Nicolas Villalobos ("we," "our," or "us").
    </p>
    <p>
      By accessing or using our Website and services, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our Website or services.
    </p>
    <p><strong>Contact Information:</strong></p>
    <ul>
      <li><strong>Business Name:</strong> Nics Marketing (DBA of Nicolas Villalobos)</li>
      <li><strong>Owner:</strong> Nicolas Villalobos</li>
      <li><strong>Email:</strong> villa@nicsmarketing.com</li>
      <li><strong>Location:</strong> Illinois, United States</li>
    </ul>
    <h2>Services Description</h2>
    <p>
      Nics Marketing provides digital marketing consultation and strategy services, including but not limited to: brand positioning and strategy development, conversion optimization consulting, digital marketing strategy, content marketing guidance, social media marketing consultation, and e-commerce marketing optimization.
    </p>
    <h2>Website Use and Eligibility</h2>
    <ul>
      <li>You must be at least 18 years old to use our Website and services.</li>
      <li>You agree to use our Website and services only for lawful purposes and in accordance with these Terms.</li>
      <li>You agree not to use the Website in any way that violates applicable laws or regulations, attempt to gain unauthorized access to our systems, interfere with or disrupt the Website, submit false or misleading information, use automated systems to access the Website without consent, or engage in any activity that could harm or impair our Website or services.</li>
    </ul>
    <h2>Qualification Assessment</h2>
    <p>
      Our Website provides a qualification assessment tool to evaluate potential client fit. By participating, you agree to provide accurate information and understand that quiz results are for assessment purposes only and do not guarantee service availability or pricing.
    </p>
    <h2>Consultation and Services</h2>
    <ul>
      <li>Free consultations are provided at our discretion and do not guarantee ongoing service provision.</li>
      <li>Formal service agreements will be provided separately and will supersede these Terms for specific services.</li>
      <li>Services are subject to availability and may change without notice.</li>
    </ul>
    <h2>Intellectual Property</h2>
    <p>
      All content on our Website, including text, graphics, logos, images, and software, is owned by Nics Marketing or its licensors and is protected by copyright, trademark, and other intellectual property laws. You may not copy, reproduce, distribute, or create derivative works from our content without written permission.
    </p>
    <h2>User-Generated Content</h2>
    <ul>
      <li>When you submit information through our Website, you grant us a non-exclusive, royalty-free license to use it for business purposes.</li>
      <li>You represent that you have the right to provide such information.</li>
      <li>You agree not to submit content that is false, violates laws, infringes on rights, contains viruses, or is spam/promotional material.</li>
    </ul>
    <h2>Privacy and Data Protection</h2>
    <p>
      Your privacy is important to us. Our collection, use, and protection of your personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference.
    </p>
    <h2>Disclaimers and Limitations</h2>
    <ul>
      <li>Our services are provided "as is" and "as available".</li>
      <li>We make no warranties about the accuracy, completeness, or usefulness of our services.</li>
      <li>We do not guarantee specific results from our marketing consultation services.</li>
      <li>To the maximum extent permitted by law, Nics Marketing shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or business opportunities.</li>
      <li>Our total liability to you for any claims arising from these Terms or our services shall not exceed the amount you paid us, if any, in the twelve months preceding the claim.</li>
    </ul>
    <h2>Indemnification</h2>
    <p>
      You agree to indemnify and hold harmless Nics Marketing, its owner, employees, and agents from and against any claims, damages, losses, and expenses arising from your use of our Website or services, your violation of these Terms, or your violation of any applicable laws.
    </p>
    <h2>Third-Party Services</h2>
    <p>
      Our Website integrates with third-party services including Calendly, Make.com (Integromat), Google Sheets, and FormSubmit. These services have their own terms of service and privacy policies. We are not responsible for the content, privacy practices, or availability of these third-party services.
    </p>
    <h2>Termination</h2>
    <ul>
      <li>You may stop using our Website and services at any time.</li>
      <li>We may terminate or suspend your access to our Website and services at any time, with or without cause or notice.</li>
      <li>Upon termination, your right to use our Website and services ceases immediately.</li>
    </ul>
    <h2>Governing Law and Jurisdiction</h2>
    <p>
      These Terms are governed by and construed in accordance with the laws of the State of Illinois. Any disputes shall be resolved in the courts of Illinois.
    </p>
    <h2>Changes to Terms</h2>
    <p>
      We reserve the right to modify these Terms at any time. We will notify users of material changes by posting the updated Terms on our Website and updating the Effective Date.
    </p>
    <h2>Severability</h2>
    <p>
      If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that these Terms
    </p>
  </div>
);

export default function PoliciesPage() {
  const [activeTab, setActiveTab] = useState<'privacy' | 'tos'>('privacy');

  return (
    <div className="policies-page">
      <div className="container" style={{ maxWidth: 800, margin: '0 auto' }}>
        <div className="policies-switcher">
          <button
            className={activeTab === 'privacy' ? 'policies-tab active' : 'policies-tab'}
            onClick={() => setActiveTab('privacy')}
          >
            Privacy Policy
          </button>
          <button
            className={activeTab === 'tos' ? 'policies-tab active' : 'policies-tab'}
            onClick={() => setActiveTab('tos')}
          >
            Terms of Service
          </button>
        </div>
        <div className="policies-content card">
          {activeTab === 'privacy' ? privacyPolicy : termsOfService}
        </div>
      </div>
    </div>
  );
} 