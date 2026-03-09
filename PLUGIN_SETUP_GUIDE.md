# Plugin Setup Guide for CBC Knowledge Assistant

This guide will help you integrate external data sources (Teams, Gmail, SharePoint) into your chatbot.

## 📋 Overview

The plugin system allows your chatbot to:
- Search Microsoft Teams messages and channels
- Search Gmail emails
- Search SharePoint documents
- Combine results from multiple sources
- Provide real-time information instead of static responses

## 🚀 Quick Start

### 1. Include Plugin Files

Add these lines to your `index.html` and `demo.html` before the closing `</body>` tag:

```html
<link rel="stylesheet" href="plugins.css">
<script src="config.js"></script>
<script src="auth.js"></script>
<script src="plugins.js"></script>
<script src="script-integrated.js"></script>
```

### 2. Add Plugin Toggle Button

Add this button to your HTML (inside the `<header>` or anywhere you prefer):

```html
<button class="plugin-toggle" onclick="toggleAuthPanel()" title="Connect Data Sources">
  🔌
</button>
```

### 3. Add Authentication Panel Container

Add this div before the closing `</body>` tag:

```html
<div class="auth-container" id="authContainer">
  <!-- Authentication UI will be inserted here -->
</div>
```

## 🔐 Setting Up OAuth Authentication

### Microsoft Teams & SharePoint Setup

1. **Register an Azure AD Application:**
   - Go to https://portal.azure.com
   - Navigate to "Azure Active Directory" → "App registrations"
   - Click "New registration"
   - Name: "CBC Knowledge Assistant"
   - Supported account types: "Accounts in this organizational directory only"
   - Redirect URI: `https://yourdomain.com` (or `http://localhost:8000` for testing)
   - Click "Register"

2. **Configure API Permissions:**
   - Go to "API permissions"
   - Click "Add a permission"
   - Select "Microsoft Graph"
   - Choose "Delegated permissions"
   - Add these permissions:
     - `User.Read`
     - `Mail.Read`
     - `Chat.Read`
     - `Sites.Read.All`
     - `Files.Read.All`
   - Click "Grant admin consent"

3. **Get Your Credentials:**
   - Go to "Overview" tab
   - Copy "Application (client) ID"
   - Copy "Directory (tenant) ID"
   - Update `config.js` with these values

### Gmail Setup

1. **Create a Google Cloud Project:**
   - Go to https://console.cloud.google.com
   - Create a new project: "CBC Knowledge Assistant"
   - Enable Gmail API:
     - Go to "APIs & Services" → "Library"
     - Search for "Gmail API"
     - Click "Enable"

2. **Create OAuth Credentials:**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth client ID"
   - Application type: "Web application"
   - Name: "CBC Knowledge Assistant"
   - Authorized JavaScript origins: `https://yourdomain.com`
   - Authorized redirect URIs: `https://yourdomain.com`
   - Click "Create"

3. **Get Your Credentials:**
   - Copy "Client ID"
   - Copy "Client secret"
   - Update `config.js` with these values

## ⚙️ Configuration

Edit `config.js` to enable and configure plugins:

```javascript
const CONFIG = {
  teams: {
    enabled: true, // Enable Teams plugin
    clientId: 'your-azure-client-id',
    tenantId: 'your-azure-tenant-id',
    accessToken: null
  },

  gmail: {
    enabled: true, // Enable Gmail plugin
    clientId: 'your-google-client-id',
    clientSecret: 'your-google-client-secret',
    accessToken: null
  },

  sharepoint: {
    enabled: true, // Enable SharePoint plugin
    clientId: 'your-azure-client-id',
    tenantId: 'your-azure-tenant-id',
    siteId: 'your-sharepoint-site-id',
    accessToken: null
  },

  settings: {
    combineResults: true, // Combine plugin results with static responses
    maxResultsPerPlugin: 5,
    cacheDuration: 30,
    debug: true
  }
};
```

## 🔧 Usage

### For Users

1. **Connect Data Sources:**
   - Click the plugin toggle button (🔌)
   - Click "Connect Microsoft Teams" or "Connect Gmail"
   - Sign in with your account
   - Grant permissions

2. **Ask Questions:**
   - Type your question as normal
   - The chatbot will search both static responses AND connected sources
   - Results will show source information (Teams, Gmail, etc.)

### For Developers

**Search across all plugins:**
```javascript
const results = await pluginManager.search('project deadline');
```

**Get specific data:**
```javascript
const message = await pluginManager.getData('gmail', {
  type: 'message',
  id: 'message-id-here'
});
```

**Check active plugins:**
```javascript
console.log(pluginManager.activePlugins);
```

## 📝 Creating Custom Plugins

Create a new plugin by extending `BasePlugin`:

```javascript
class CustomPlugin extends BasePlugin {
  constructor() {
    super('Custom Source');
  }

  async initialize(config) {
    this.apiKey = config.apiKey;
    this.isInitialized = true;
  }

  async search(query) {
    // Implement your search logic
    const response = await fetch(`https://api.example.com/search?q=${query}`, {
      headers: { 'Authorization': `Bearer ${this.apiKey}` }
    });
    
    const data = await response.json();
    
    return data.results.map(item => ({
      source: 'Custom Source',
      title: item.title,
      content: item.description,
      date: item.date,
      url: item.url,
      author: item.author
    }));
  }

  async getData(params) {
    // Implement data retrieval logic
  }
}

// Register the plugin
pluginManager.registerPlugin('custom', new CustomPlugin());
```

## 🔒 Security Best Practices

1. **Never commit API keys to Git:**
   - Add `config.js` to `.gitignore`
   - Use environment variables in production

2. **Use HTTPS in production:**
   - OAuth requires HTTPS for redirect URIs
   - Never use HTTP in production

3. **Implement token refresh:**
   - Access tokens expire (usually after 1 hour)
   - Implement refresh token logic for production

4. **Validate permissions:**
   - Only request necessary permissions
   - Explain to users why permissions are needed

5. **Store tokens securely:**
   - Use secure storage (not localStorage)
   - Consider using backend proxy for token management

## 🐛 Troubleshooting

### "Plugin not initialized" error
- Make sure you've called `pluginManager.activatePlugin()` with valid config
- Check that access token is set

### OAuth redirect not working
- Verify redirect URI matches exactly in Azure/Google console
- Check for HTTPS requirement
- Ensure popup blockers are disabled

### No results from plugins
- Check browser console for errors
- Verify API permissions are granted
- Test API credentials with Postman first

### CORS errors
- APIs must support CORS or use a backend proxy
- Consider implementing a backend service for API calls

## 📚 Additional Resources

- [Microsoft Graph API Documentation](https://docs.microsoft.com/en-us/graph/)
- [Gmail API Documentation](https://developers.google.com/gmail/api)
- [OAuth 2.0 Guide](https://oauth.net/2/)
- [MSAL.js Documentation](https://github.com/AzureAD/microsoft-authentication-library-for-js)

## 🆘 Support

For issues or questions:
1. Check the browser console for error messages
2. Review the configuration in `config.js`
3. Test authentication separately
4. Check API quotas and limits

## 📄 License

This plugin system is part of the CBC Knowledge Assistant project.
