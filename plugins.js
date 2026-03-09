// Plugin System for CBC Knowledge Assistant
// This allows the chatbot to fetch information from external sources

class PluginManager {
  constructor() {
    this.plugins = {};
    this.activePlugins = [];
  }

  // Register a new plugin
  registerPlugin(name, plugin) {
    this.plugins[name] = plugin;
    console.log(`Plugin registered: ${name}`);
  }

  // Activate a plugin
  async activatePlugin(name, config) {
    if (!this.plugins[name]) {
      console.error(`Plugin ${name} not found`);
      return false;
    }

    try {
      await this.plugins[name].initialize(config);
      this.activePlugins.push(name);
      console.log(`Plugin activated: ${name}`);
      return true;
    } catch (error) {
      console.error(`Failed to activate plugin ${name}:`, error);
      return false;
    }
  }

  // Search across all active plugins
  async search(query) {
    const results = [];
    
    for (const pluginName of this.activePlugins) {
      const plugin = this.plugins[pluginName];
      try {
        const pluginResults = await plugin.search(query);
        results.push(...pluginResults);
      } catch (error) {
        console.error(`Error searching ${pluginName}:`, error);
      }
    }

    return results;
  }

  // Get specific data from a plugin
  async getData(pluginName, params) {
    if (!this.plugins[pluginName]) {
      throw new Error(`Plugin ${pluginName} not found`);
    }

    return await this.plugins[pluginName].getData(params);
  }
}

// Base Plugin Class
class BasePlugin {
  constructor(name) {
    this.name = name;
    this.isInitialized = false;
  }

  async initialize(config) {
    throw new Error('initialize() must be implemented by plugin');
  }

  async search(query) {
    throw new Error('search() must be implemented by plugin');
  }

  async getData(params) {
    throw new Error('getData() must be implemented by plugin');
  }
}

// Microsoft Teams Plugin
class TeamsPlugin extends BasePlugin {
  constructor() {
    super('Microsoft Teams');
    this.accessToken = null;
    this.apiBase = 'https://graph.microsoft.com/v1.0';
  }

  async initialize(config) {
    // Initialize with Microsoft Graph API credentials
    this.clientId = config.clientId;
    this.tenantId = config.tenantId;
    this.accessToken = config.accessToken; // In production, use OAuth flow
    this.isInitialized = true;
  }

  async search(query) {
    if (!this.isInitialized) {
      throw new Error('Teams plugin not initialized');
    }

    try {
      // Search Teams messages
      const response = await fetch(`${this.apiBase}/me/messages?$search="${query}"&$top=5`, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      
      return data.value.map(message => ({
        source: 'Microsoft Teams',
        title: message.subject || 'Team Message',
        content: message.bodyPreview,
        date: message.receivedDateTime,
        url: message.webLink,
        author: message.from?.emailAddress?.name
      }));
    } catch (error) {
      console.error('Teams search error:', error);
      return [];
    }
  }

  async getData(params) {
    // Get specific Teams data (channels, files, etc.)
    const { type, id } = params;
    
    switch(type) {
      case 'channel':
        return await this.getChannelMessages(id);
      case 'file':
        return await this.getTeamsFile(id);
      default:
        throw new Error(`Unknown data type: ${type}`);
    }
  }

  async getChannelMessages(channelId) {
    const response = await fetch(`${this.apiBase}/teams/${channelId}/channels`, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`
      }
    });
    return await response.json();
  }
}

// Gmail Plugin
class GmailPlugin extends BasePlugin {
  constructor() {
    super('Gmail');
    this.accessToken = null;
    this.apiBase = 'https://gmail.googleapis.com/gmail/v1';
  }

  async initialize(config) {
    // Initialize with Gmail API credentials
    this.accessToken = config.accessToken; // In production, use OAuth flow
    this.userId = config.userId || 'me';
    this.isInitialized = true;
  }

  async search(query) {
    if (!this.isInitialized) {
      throw new Error('Gmail plugin not initialized');
    }

    try {
      // Search Gmail messages
      const response = await fetch(
        `${this.apiBase}/users/${this.userId}/messages?q=${encodeURIComponent(query)}&maxResults=5`,
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const data = await response.json();
      
      if (!data.messages) return [];

      // Fetch full message details
      const messages = await Promise.all(
        data.messages.map(msg => this.getMessage(msg.id))
      );

      return messages.map(message => ({
        source: 'Gmail',
        title: this.getHeader(message, 'Subject'),
        content: this.getMessageBody(message),
        date: this.getHeader(message, 'Date'),
        author: this.getHeader(message, 'From'),
        url: `https://mail.google.com/mail/u/0/#inbox/${message.id}`
      }));
    } catch (error) {
      console.error('Gmail search error:', error);
      return [];
    }
  }

  async getMessage(messageId) {
    const response = await fetch(
      `${this.apiBase}/users/${this.userId}/messages/${messageId}`,
      {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`
        }
      }
    );
    return await response.json();
  }

  getHeader(message, headerName) {
    const header = message.payload.headers.find(h => h.name === headerName);
    return header ? header.value : '';
  }

  getMessageBody(message) {
    if (message.payload.body.data) {
      return atob(message.payload.body.data.replace(/-/g, '+').replace(/_/g, '/'));
    }
    if (message.payload.parts) {
      const textPart = message.payload.parts.find(part => part.mimeType === 'text/plain');
      if (textPart && textPart.body.data) {
        return atob(textPart.body.data.replace(/-/g, '+').replace(/_/g, '/'));
      }
    }
    return '';
  }

  async getData(params) {
    const { type, id } = params;
    
    switch(type) {
      case 'message':
        return await this.getMessage(id);
      case 'thread':
        return await this.getThread(id);
      default:
        throw new Error(`Unknown data type: ${type}`);
    }
  }

  async getThread(threadId) {
    const response = await fetch(
      `${this.apiBase}/users/${this.userId}/threads/${threadId}`,
      {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`
        }
      }
    );
    return await response.json();
  }
}

// SharePoint/OneDrive Plugin
class SharePointPlugin extends BasePlugin {
  constructor() {
    super('SharePoint');
    this.accessToken = null;
    this.apiBase = 'https://graph.microsoft.com/v1.0';
  }

  async initialize(config) {
    this.accessToken = config.accessToken;
    this.siteId = config.siteId;
    this.isInitialized = true;
  }

  async search(query) {
    if (!this.isInitialized) {
      throw new Error('SharePoint plugin not initialized');
    }

    try {
      const response = await fetch(
        `${this.apiBase}/sites/${this.siteId}/drive/root/search(q='${query}')?$top=5`,
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`
          }
        }
      );

      const data = await response.json();

      return data.value.map(item => ({
        source: 'SharePoint',
        title: item.name,
        content: item.description || 'Document',
        date: item.lastModifiedDateTime,
        url: item.webUrl,
        author: item.lastModifiedBy?.user?.displayName,
        fileType: item.file?.mimeType
      }));
    } catch (error) {
      console.error('SharePoint search error:', error);
      return [];
    }
  }

  async getData(params) {
    const { type, id } = params;
    
    if (type === 'file') {
      return await this.getFileContent(id);
    }
    throw new Error(`Unknown data type: ${type}`);
  }

  async getFileContent(fileId) {
    const response = await fetch(
      `${this.apiBase}/sites/${this.siteId}/drive/items/${fileId}/content`,
      {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`
        }
      }
    );
    return await response.text();
  }
}

// Initialize the plugin manager
const pluginManager = new PluginManager();

// Register plugins
pluginManager.registerPlugin('teams', new TeamsPlugin());
pluginManager.registerPlugin('gmail', new GmailPlugin());
pluginManager.registerPlugin('sharepoint', new SharePointPlugin());

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { pluginManager, BasePlugin };
}
