# GitHub Setup Guide

## Prerequisites

1. Install Git: https://git-scm.com/downloads
2. Create a GitHub account: https://github.com/signup

## Step 1: Initialize Git Repository

Open your terminal/command prompt in the project folder and run:

```bash
git init
```

## Step 2: Add All Files

```bash
git add .
```

## Step 3: Create Initial Commit

```bash
git commit -m "Initial commit: CBC EMEA Knowledge Assistant"
```

## Step 4: Create GitHub Repository

1. Go to https://github.com/new
2. Enter repository name: `CBC-chat-bot` (or your preferred name)
3. Choose Public or Private
4. Do NOT initialize with README (we already have one)
5. Click "Create repository"

## Step 5: Connect Local Repository to GitHub

Replace `YOUR_USERNAME` with your GitHub username:

```bash
git remote add origin https://github.com/YOUR_USERNAME/CBC-chat-bot.git
```

## Step 6: Push to GitHub

```bash
git branch -M main
git push -u origin main
```

## Step 7: Enable GitHub Pages (Optional)

To host your project online for free:

1. Go to your repository on GitHub
2. Click "Settings"
3. Scroll down to "Pages" in the left sidebar
4. Under "Source", select "main" branch
5. Click "Save"
6. Your site will be available at: `https://YOUR_USERNAME.github.io/cbc-emea-knowledge-assistant/`

## Future Updates

After making changes to your code:

```bash
git add .
git commit -m "Description of your changes"
git push
```

## Common Git Commands

- Check status: `git status`
- View commit history: `git log`
- Create new branch: `git checkout -b branch-name`
- Switch branches: `git checkout branch-name`
- Pull latest changes: `git pull`

## Troubleshooting

### Authentication Issues

If you encounter authentication errors, you may need to:

1. Use a Personal Access Token instead of password
2. Set up SSH keys

See: https://docs.github.com/en/authentication

### Large Files

If you have large files (>100MB), consider using Git LFS:
```bash
git lfs install
git lfs track "*.large-file-extension"
```

## Collaboration

To allow others to contribute:

1. Add them as collaborators in repository Settings > Collaborators
2. Or accept Pull Requests from forks

## Resources

- Git Documentation: https://git-scm.com/doc
- GitHub Guides: https://guides.github.com/
- GitHub Desktop (GUI): https://desktop.github.com/
