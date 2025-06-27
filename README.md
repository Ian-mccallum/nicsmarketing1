# Nic's Marketing - Next.js TypeScript SPA

A modern, single-page web application built with Next.js and TypeScript for Nic's Marketing agency. This app is designed to pre-qualify brand clients and convert website visitors into qualified leads.

## 🚀 Features

- **Single Page Application**: Smooth scrolling between sections
- **Modern Design**: Black and white theme with floating bubble animations
- **Form Validation**: Comprehensive form validation using Yup and React Hook Form
- **Responsive Design**: Mobile-first approach with responsive breakpoints
- **TypeScript**: Full type safety throughout the application
- **Accessibility**: WCAG compliant with reduced motion support
- **Next.js 14**: Latest features with App Router

## 🛠️ Tech Stack

- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **React Hook Form** - Form management
- **Yup** - Form validation
- **Axios** - HTTP client
- **CSS3** - Styling with animations

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main page component
├── data/
│   └── constants.ts         # Application data and constants
├── types/
│   └── index.ts             # TypeScript type definitions
├── utils/
│   └── validation.ts        # Form validation schemas
└── styles/
    └── globals.css          # Global styles
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nics-marketing-spa
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Design System

### Color Palette
- **Primary Background**: `#000000` (Black)
- **Primary Text**: `#FFFFFF` (White)
- **Accent**: `rgba(255, 255, 255, 0.1)` (Translucent white)

### Typography
- **Headings**: Bold, sans-serif
- **Body**: Regular weight, 16px base size
- **Line Height**: 1.5 for readability

### Animations
- **Floating Bubbles**: Continuous upward motion with horizontal drift
- **Element Entrances**: Fade-in and slide-up animations
- **Interactive Elements**: Hover effects with smooth transitions

## 📝 Form Fields

The application includes a comprehensive pre-qualification form with:

- **Niche Selection**: Dropdown for business category
- **Brand URL**: Website URL input with validation
- **Ad Spend**: Monthly advertising budget selection
- **Pain Points**: Radio button selection for biggest challenges
- **Contact Information**: Name, email, and optional phone

## 🔧 Configuration

### API Endpoint
Update the API endpoint in `src/app/page.tsx`:
```typescript
await axios.post('/api/leads', data);
```

### Social Media Links
Update social media links in `src/data/constants.ts`:
```typescript
export const SOCIAL_LINKS = {
  instagram: "https://instagram.com/your-handle",
  twitter: "https://twitter.com/your-handle",
  linkedin: "https://linkedin.com/in/your-profile"
};
```

## 📱 Responsive Design

The application is built with a mobile-first approach:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## ♿ Accessibility

- WCAG 2.1 AA compliant
- Keyboard navigation support
- Screen reader friendly
- Reduced motion support for users with vestibular disorders
- High contrast ratio (4.5:1 minimum)

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy Options
- **Vercel**: Connect your repository for automatic deployments (recommended)
- **Netlify**: Drag and drop the `.next` folder
- **AWS**: Deploy to AWS Amplify or Elastic Beanstalk
- **Docker**: Use the provided Dockerfile

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 About the Developer

Built by a 17-year-old digital native who understands the language of tomorrow's consumers.

---

**Note**: This is a single-page application designed to convert visitors into qualified leads for Nic's Marketing agency. The form submission currently points to a placeholder API endpoint that should be updated with your actual backend service. 