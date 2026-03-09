// OAuth Authentication Helper for CBC Knowledge Assistant

class AuthManager {
  constructor() {
    this.tokens = {};
  }

  // Microsoft OAuth (for Teams, SharePoint)
  async authenticateMicrosoft(config) {
    const { clientId, tenantId, scopes } = config;
    
    // MSAL (Microsoft Authentication Library) configuration
    const msalConfig = {
      auth: {
        clientId: clientId,
        authority: `https://login.microsoftonline.com/${tenantId}`,
        redirectUri: window.location.origin
      }
    };

    try {
      // In a real implementation, use MSAL.js library
      // This is a simplified example
      const authUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize?` +
        `client_id=${clientId}&` +
        `response_type=token&` +
        `redirect_uri=${encodeURIComponent(window.location.origin)}&` +
        `scope=${encodeURIComponent(scopes.join(' '))}`;

      // Open authentication popup
      const popup = window.open(authUrl, 'Microsoft Login', 'width=500,height=600');
      
      // Wait for authentication
      const token = await this.waitForAuth(popup);
      
      this.tokens.microsoft = token;
      return token;
    } catch (error) {
      console.error('Microsoft authentication failed:', error);
      throw error;
    }
  }

  // Google OAuth (for Gmail)
  async authenticateGoogle(config) {
    const { clientId, scopes } = config;

    try {
      // In a real implementation, use Google Identity Services
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
        `client_id=${clientId}&` +
        `response_type=token&` +
        `redirect_uri=${encodeURIComponent(window.location.origin)}&` +
        `scope=${encodeURIComponent(scopes.join(' '))}`;

      // Open authentication popup
      const popup = window.open(authUrl, 'Google Login', 'width=500,height=600');
      
      // Wait for authentication
      const token = await this.waitForAuth(popup);
      
      this.tokens.google = token;
      return token;
    } catch (error) {
      console.error('Google authentication failed:', error);
      throw error;
    }
  }

  // Wait for OAuth callback
  waitForAuth(popup) {
    return new Promise((resolve, reject) => {
      const checkPopup = setInterval(() => {
        try {
          if (popup.closed) {
            clearInterval(checkPopup);
            reject(new Error('Authentication cancelled'));
            return;
          }

          // Check if popup has redirected back with token
          const url = popup.location.href;
          if (url.includes('access_token')) {
            const params = new URLSearchParams(url.split('#')[1]);
            const token = params.get('access_token');
            
            clearInterval(checkPopup);
            popup.close();
            resolve(token);
          }
        } catch (e) {
          // Cross-origin error - popup still on auth page
        }
      }, 500);

      // Timeout after 5 minutes
      setTimeout(() => {
        clearInterval(checkPopup);
        if (!popup.closed) popup.close();
        reject(new Error('Authentication timeout'));
      }, 300000);
    });
  }

  // Get stored token
  getToken(service) {
    return this.tokens[service];
  }

  // Check if authenticated
  isAuthenticated(service) {
    return !!this.tokens[service];
  }

  // Logout
  logout(service) {
    delete this.tokens[service];
  }
}

// Create global auth manager instance
const authManager = new AuthManager();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { authManager, AuthManager };
}
