# Quick Start Guide

## 🚀 Running Locally (Easiest Method)

### Windows Users:
1. Double-click `start-server.bat`
2. Your browser will open automatically at http://localhost:8000

### Mac/Linux Users:
Run in terminal:
```bash
python3 -m http.server 8000
```
Then open: http://localhost:8000

### Alternative (Any OS):
Simply double-click `index.html` to open in your browser.

---

## 📤 Push to GitHub (First Time)

1. Open terminal/command prompt in this folder

2. Initialize Git:
```bash
git init
git add .
git commit -m "Initial commit"
```

3. Create a new repository on GitHub.com

4. Connect and push (replace YOUR_USERNAME):
```bash
git remote add origin https://github.com/YOUR_USERNAME/your-repo-name.git
git branch -M main
git push -u origin main
```

Done! Your code is now on GitHub.

---

## 🔄 Update GitHub After Changes

```bash
git add .
git commit -m "Describe your changes"
git push
```

---

## 🌐 Share with Others

### Option 1: GitHub Pages (Free Hosting)
1. Go to your GitHub repository
2. Settings → Pages
3. Select "main" branch → Save
4. Share the URL: `https://YOUR_USERNAME.github.io/your-repo-name/`

### Option 2: Share Repository
Others can clone your repository:
```bash
git clone https://github.com/YOUR_USERNAME/your-repo-name.git
cd your-repo-name
```

Then run locally using any method above.

---

## 📝 Customization

- **Add/Edit Answers**: Edit `script.js` → `RESPONSES` object
- **Change Colors**: Edit `styles.css`
- **Modify Layout**: Edit `index.html`

---

## ❓ Need Help?

- Check `README.md` for detailed instructions
- Check `GITHUB_SETUP.md` for GitHub guide
- Python not installed? Download: https://www.python.org/downloads/
