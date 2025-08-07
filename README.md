# Rodney Ngwenya - Premium Portfolio Website

A premium, minimalist portfolio website showcasing digital marketing expertise and full-stack development skills. Built with pure HTML5, CSS3, and vanilla JavaScript for optimal performance and GitHub Pages compatibility.

## 🌟 Features

### Interactive Elements
- **Fully Functional Chess Game**: Complete chess implementation with drag-and-drop, legal move validation, check detection, and game reset functionality
- **Animated Music Genre Cards**: 4 interactive cards (Hip-Hop, R&B, Amapiano, House) with unique colored glow effects
- **Email Copywriting Demo**: Disrupt-Intrigue-Click framework showcase with Gmail integration
- **Interactive Skills Matrix**: Animated skill bars with proficiency levels and hover effects
- **Smooth Scrolling Navigation**: Fixed header with active section highlighting

### Design & UX
- **Premium Typography**: Helvetica font family throughout with strategic hierarchy
- **Minimalist Aesthetic**: Clean, expensive-looking design with neutral color palette
- **Responsive Design**: Mobile-first approach with breakpoints for all devices
- **Advanced Animations**: Intersection Observer API for scroll-triggered animations
- **Accessibility**: WCAG compliant with keyboard navigation and screen reader support

### Technical Features
- **Performance Optimized**: Vanilla JavaScript, optimized assets, efficient DOM manipulation
- **GitHub Pages Ready**: No external dependencies, all assets hosted locally
- **SEO Optimized**: Semantic HTML, proper meta tags, structured data
- **Cross-Browser Compatible**: Modern browser support with graceful degradation

## 🎯 Sections

1. **Hero Section**: Full viewport height with centered content and smooth scroll indicator
2. **Interactive Chess**: Fully playable chess game with modern UI
3. **Musical Inspiration**: Animated cards showcasing musical influences
4. **Email Copy Demo**: Conversion copywriting framework demonstration
5. **Project Showcase**: Featured work including Routes Clothing and Simple Bites Kotas
6. **Skills Matrix**: Interactive visualization of technical and creative skills
7. **About**: Professional narrative and educational background
8. **Contact**: Professional contact form with validation and Gmail integration

## 🚀 Quick Start

### Local Development
```bash
# Clone the repository
git clone https://github.com/yourusername/rodney-portfolio.git

# Navigate to project directory
cd rodney-portfolio

# Open in browser (no build process required)
open index.html
# or use a local server
python -m http.server 8000
# or
npx serve .
```

### GitHub Pages Deployment

1. **Fork/Upload to GitHub**:
   - Create a new repository on GitHub
   - Upload all files to the repository
   - Ensure the main HTML file is named `index.html`

2. **Enable GitHub Pages**:
   - Go to repository Settings
   - Scroll to "Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"

3. **Access Your Site**:
   - Your site will be available at: `https://yourusername.github.io/repository-name`
   - Initial deployment may take a few minutes

## 📁 Project Structure

```
/
├── index.html              # Main HTML file
├── css/
│   ├── styles.css         # Main stylesheet
│   └── responsive.css     # Responsive design rules
├── js/
│   ├── main.js           # Core functionality
│   ├── chess.js          # Chess game implementation
│   └── animations.js     # Advanced animations
├── images/               # Image assets (placeholder structure)
│   ├── projects/
│   └── icons/
└── README.md            # Documentation
```

## 🎮 Chess Game Features

- **Complete Implementation**: All chess pieces with proper movement rules
- **Drag & Drop**: Intuitive piece movement with visual feedback
- **Move Validation**: Legal move checking and prevention of invalid moves
- **Check Detection**: Visual indication when kings are in check
- **Game States**: Checkmate and stalemate detection
- **Responsive Design**: Adapts to mobile devices with touch support
- **Reset Functionality**: Start new games instantly

## 🎨 Music Cards Animation

Each music genre card features unique interactions:
- **Hip-Hop**: Golden glow effect (#FFD700)
- **R&B**: Purple glow effect (#9D4EDD)
- **Amapiano**: Green glow effect (#06FFA5)
- **House**: Blue glow effect (#4CC9F0)

Hover effects include:
- Scale transformation (1.05x)
- Vertical translation (-10px)
- Colored shadow glow
- Smooth cubic-bezier transitions

## 📧 Gmail Integration

The email copywriting CTA button opens Gmail with pre-filled:
- **Recipient**: rodney.nd335@gmail.com
- **Subject**: "Email Copy Inquiry"
- **Body**: Professional inquiry template

```javascript
function openGmailCompose() {
  const email = 'rodney.nd335@gmail.com';
  const subject = 'Email Copy Inquiry';
  const body = 'Hi Rodney,\n\nI visited your portfolio and I\'m interested in discussing email copywriting services.\n\nBest regards,';
  const gmailUrl = `https://mail.google.com/mail/?view=cm&to=${email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.open(gmailUrl, '_blank');
}
```

## 🎯 Skills Matrix

Interactive skill visualization with:
- **Web Development**: HTML/CSS (90%), JavaScript (85%), React (80%), Node.js (75%)
- **Digital Marketing**: Copywriting (95%), Email Marketing (90%), SEO (85%), Social Media (80%)
- **Design Tools**: Figma (85%), Photoshop (80%), Illustrator (75%)
- **Languages**: English (100%), Xhosa (95%), Afrikaans (85%)

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 480px
- **Tablet Portrait**: 481px - 768px
- **Tablet Landscape**: 769px - 1024px
- **Desktop**: 1025px - 1440px
- **Large Desktop**: 1441px+

## ♿ Accessibility Features

- **Semantic HTML**: Proper heading hierarchy and landmark elements
- **Keyboard Navigation**: Full keyboard accessibility for all interactive elements
- **Screen Reader Support**: ARIA labels and descriptions
- **Color Contrast**: WCAG AA compliant color ratios
- **Reduced Motion**: Respects user's motion preferences
- **Focus Indicators**: Clear focus states for all interactive elements

## 🔧 Browser Support

- **Modern Browsers**: Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- **Features Used**:
  - CSS Grid and Flexbox
  - Intersection Observer API
  - CSS Custom Properties
  - ES6+ JavaScript features

## 📊 Performance Features

- **Optimized Loading**: Efficient CSS and JavaScript
- **Lazy Loading**: Images load when needed
- **Debounced Events**: Optimized scroll and resize handlers
- **Minimal Dependencies**: Pure vanilla JavaScript, no frameworks
- **Compressed Assets**: Optimized for fast loading

## 🎨 Color Palette

```css
:root {
  --primary-color: #000000;    /* Black */
  --secondary-color: #ffffff;  /* White */
  --accent-color: #ff0000;     /* Red */
  --text-color: #333333;       /* Dark Gray */
  --text-light: #666666;       /* Medium Gray */
  --bg-color: #fafafa;         /* Light Gray */
}
```

## 📞 Contact Information

- **Phone**: +27 84 578 4466
- **Email**: s225280043@mandela.ac.za
- **Business**: rodney.nd335@gmail.com
- **Location**: Gqeberha, Eastern Cape, South Africa
- **Education**: Bachelor of IT (Expected 2025) - Nelson Mandela University

## 📝 License

This project is created for Rodney Ngwenya's portfolio. All rights reserved.

## 🤝 Contributing

This is a personal portfolio website. For suggestions or improvements, please reach out via the contact information provided.

---

**Built with ❤️ using pure HTML, CSS, and JavaScript**
