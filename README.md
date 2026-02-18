# CBC EMEA Knowledge Assistant

A demo AI-powered knowledge assistant interface for CBC EMEA IT Services & Consulting.

## Features

- Interactive chat interface
- Pre-configured responses for common queries
- Document source tracking
- Responsive design
- Cyber security expert information

## Project Structure

```
├── index.html      # Main HTML file
├── demo.html       # Alternative HTML file
├── styles.css      # All styling
├── script.js       # JavaScript logic and responses
└── README.md       # This file
```

## Running Locally

### Option 1: Using Python (Recommended)

If you have Python installed:

**Python 3.x:**
```bash
python -m http.server 8000
```

**Python 2.x:**
```bash
python -m SimpleHTTPServer 8000
```

Then open your browser and go to: `http://localhost:8000`

### Option 2: Using Node.js

If you have Node.js installed:

1. Install http-server globally:
```bash
npm install -g http-server
```

2. Run the server:
```bash
http-server
```

Then open your browser and go to: `http://localhost:8080`

### Option 3: Using PHP

If you have PHP installed:

```bash
php -S localhost:8000
```

Then open your browser and go to: `http://localhost:8000`

### Option 4: Using VS Code Live Server

1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

### Option 5: Direct File Opening

Simply double-click `index.html` or `demo.html` to open in your browser (some features may be limited).

## Customization

### Adding New Questions/Answers

Edit the `RESPONSES` object in `script.js`:

```javascript
newTopic: {
  keywords: ["keyword1", "keyword2"],
  answer: `<p>Your answer here</p>`,
  sources: ["Source Document · p.X"]
}
```

### Styling Changes

Modify `styles.css` to change colors, fonts, or layout.

### Updating Security Experts

The cyber security experts are defined in the `cybersecurity` section of `script.js`:
- Mr Muhidin
- Mr Jerry
- Mr Tobi

## Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript
- No external dependencies

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This is a demo project for CBC EMEA.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
