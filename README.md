# 🏢 Oberoi Realty Gurgaon - Futuristic Loader Website

A luxurious, dark-themed real estate website featuring an elegant loader animation and modern design for Oberoi Realty's Gurgaon projects.

## ✨ Features

### 🎭 Futuristic Loader
- **Dark Theme**: Elegant black and dark gray background
- **Cinematic Typography**: Playfair Display and Poppins font combination
- **Gold Accents**: Luxury gold (#E8C372) highlighting for brand elements
- **Sequential Animation**: Text lines fade in one by one with GSAP
- **Glowing Underline**: Animated underline effect under "World of Oberoi"
- **Smooth Transitions**: Seamless fade-out to main website

### 🎨 Design Elements
- **Responsive Design**: Optimized for desktop and mobile devices
- **Modern UI**: Clean, minimalist interface with luxury aesthetics
- **Smooth Animations**: GSAP-powered scroll-triggered animations
- **Interactive Elements**: Hover effects and smooth scrolling navigation
- **Custom Scrollbar**: Themed scrollbar matching the design

### 📱 Sections
- **Hero Section**: Full-screen welcome with call-to-action
- **Projects**: Showcase of premium real estate projects
- **About**: Company information and values
- **Contact**: Contact details and information

## 🛠️ Technologies Used

- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with Flexbox and Grid
- **JavaScript**: Interactive functionality
- **GSAP**: Professional animation library
- **Google Fonts**: Playfair Display and Poppins

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, for development)

### Installation

1. **Clone or Download** the project files
2. **Open** `index.html` in your web browser
3. **Enjoy** the futuristic loader experience!

### Development Setup

For local development with a web server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## 📁 Project Structure

```
Oberoi Realty Gurgaon/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and animations
├── script.js           # JavaScript functionality
└── README.md           # Project documentation
```

## 🎯 Loader Animation Sequence

1. **Line 1**: "Welcome to the" fades in from bottom
2. **Line 2**: "World of Oberoi" fades in with slight delay
3. **Subline**: "Crafting timeless experiences..." fades in last
4. **Underline**: Glowing line animates under "World of Oberoi"
5. **Pause**: Brief hold for dramatic effect
6. **Fade Out**: Smooth transition to main website

## 🎨 Color Scheme

- **Background**: `#0e0e0e` (Dark)
- **Secondary Background**: `#1a1a1a` (Lighter dark)
- **Text**: `#ffffff` (White)
- **Accent**: `#E8C372` (Gold)
- **Secondary Accent**: `#f4d03f` (Bright gold)
- **Muted Text**: `#cccccc` (Light gray)

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px

## 🔧 Customization

### Changing Colors
Edit the CSS custom properties in `styles.css`:

```css
:root {
    --primary-bg: #0e0e0e;
    --secondary-bg: #1a1a1a;
    --accent-color: #E8C372;
    --text-color: #ffffff;
}
```

### Modifying Loader Text
Update the text content in `index.html`:

```html
<div class="loader-text">
    <h1 class="line-1">Your Custom Text</h1>
    <h1 class="line-2">Your Brand <span class="highlight">Name</span></h1>
    <p class="subline">Your tagline here.</p>
</div>
```

### Adjusting Animation Timing
Modify the GSAP timeline in `script.js`:

```javascript
loaderTimeline.to(line1, {
    duration: 1.2,  // Adjust duration
    opacity: 1,
    y: 0,
    ease: "power2.out"
})
```

## 🌟 Future Enhancements

- [ ] Add ScrollTrigger plugin for advanced scroll animations
- [ ] Implement image lazy loading for project galleries
- [ ] Add contact form functionality
- [ ] Integrate with CMS for dynamic content
- [ ] Add dark/light theme toggle
- [ ] Implement search functionality
- [ ] Add project filtering system

## 📄 License

This project is created for demonstration purposes. Feel free to use and modify for your own projects.

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For questions or support, please contact:
- **Email**: info@oberoirealty.com
- **Phone**: +91 98765 43210

---

**Built with ❤️ for Oberoi Realty Gurgaon** 