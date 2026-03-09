// Enhanced script.js with plugin integration
// This version combines static responses with dynamic plugin data

// Import existing RESPONSES from script.js
// (In production, you'd merge this with your existing script.js)

async function enhancedMatchResponse(text) {
  const lower = text.toLowerCase();
  console.log('Searching for:', lower);
  
  // First, check static responses
  let staticResponse = null;
  for (const [key, data] of Object.entries(RESPONSES)) {
    if (key === 'default') continue;
    console.log('Checking', key, 'with keywords:', data.keywords);
    if (data.keywords.some(k => lower.includes(k))) {
      console.log('Matched:', key);
      staticResponse = data;
      break;
    }
  }

  // If plugins are enabled, search them too
  if (CONFIG.settings.combineResults && pluginManager.activePlugins.length > 0) {
    try {
      const pluginResults = await pluginManager.search(text);
      
      if (pluginResults.length > 0) {
        // Combine static response with plugin results
        return combineResponses(staticResponse, pluginResults);
      }
    } catch (error) {
      console.error('Plugin search error:', error);
    }
  }

  // Return static response or default
  return staticResponse || RESPONSES.default;
}

function combineResponses(staticResponse, pluginResults) {
  if (!staticResponse) {
    // Only plugin results available
    return {
      answer: formatPluginResults(pluginResults),
      sources: pluginResults.map(r => `${r.source} · ${r.title}`)
    };
  }

  // Combine static and plugin results
  const combinedAnswer = `
    ${staticResponse.answer}
    <p><strong>Additional information from connected sources:</strong></p>
    ${formatPluginResults(pluginResults)}
  `;

  const combinedSources = [
    ...staticResponse.sources,
    ...pluginResults.map(r => `${r.source} · ${r.title}`)
  ];

  return {
    answer: combinedAnswer,
    sources: combinedSources
  };
}

function formatPluginResults(results) {
  if (results.length === 0) return '';

  let html = '<div class="plugin-results">';
  
  results.forEach(result => {
    html += `
      <div class="plugin-result">
        <div class="plugin-source">${result.source}</div>
        <div class="plugin-title"><strong>${result.title}</strong></div>
        <div class="plugin-content">${truncateText(result.content, 200)}</div>
        <div class="plugin-meta">
          ${result.author ? `By ${result.author} · ` : ''}
          ${formatDate(result.date)}
          ${result.url ? ` · <a href="${result.url}" target="_blank">View</a>` : ''}
        </div>
      </div>
    `;
  });
  
  html += '</div>';
  return html;
}

function truncateText(text, maxLength) {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString();
}

// Enhanced sendQuestion function
async function enhancedSendQuestion(text) {
  removeWelcome();
  appendMessage('user', `<p>${text}</p>`);
  document.getElementById('sendBtn').disabled = true;
  showTyping();

  const delay = 1200 + Math.random() * 800;
  
  // Simulate thinking time, then get response
  setTimeout(async () => {
    removeTyping();
    const resp = await enhancedMatchResponse(text);
    appendMessage('ai', resp.answer, resp.sources);
    document.getElementById('sendBtn').disabled = false;
  }, delay);
}

// Initialize plugins on page load
async function initializePlugins() {
  console.log('Initializing plugins...');

  // Check which plugins are enabled in config
  if (CONFIG.teams.enabled && CONFIG.teams.accessToken) {
    await pluginManager.activatePlugin('teams', CONFIG.teams);
  }

  if (CONFIG.gmail.enabled && CONFIG.gmail.accessToken) {
    await pluginManager.activatePlugin('gmail', CONFIG.gmail);
  }

  if (CONFIG.sharepoint.enabled && CONFIG.sharepoint.accessToken) {
    await pluginManager.activatePlugin('sharepoint', CONFIG.sharepoint);
  }

  console.log('Active plugins:', pluginManager.activePlugins);
}

// Add authentication UI
function showAuthenticationUI() {
  const authContainer = document.createElement('div');
  authContainer.className = 'auth-container';
  authContainer.innerHTML = `
    <div class="auth-panel">
      <h3>Connect Data Sources</h3>
      <p>Connect your accounts to get real-time information</p>
      
      <button class="auth-btn" onclick="authenticateTeams()">
        <span>📧</span> Connect Microsoft Teams
      </button>
      
      <button class="auth-btn" onclick="authenticateGmail()">
        <span>✉️</span> Connect Gmail
      </button>
      
      <button class="auth-btn" onclick="authenticateSharePoint()">
        <span>📁</span> Connect SharePoint
      </button>
    </div>
  `;
  
  document.body.appendChild(authContainer);
}

// Authentication functions
async function authenticateTeams() {
  try {
    const token = await authManager.authenticateMicrosoft(CONFIG.teams);
    CONFIG.teams.accessToken = token;
    await pluginManager.activatePlugin('teams', CONFIG.teams);
    alert('Microsoft Teams connected successfully!');
  } catch (error) {
    alert('Failed to connect Microsoft Teams: ' + error.message);
  }
}

async function authenticateGmail() {
  try {
    const token = await authManager.authenticateGoogle(CONFIG.gmail);
    CONFIG.gmail.accessToken = token;
    await pluginManager.activatePlugin('gmail', CONFIG.gmail);
    alert('Gmail connected successfully!');
  } catch (error) {
    alert('Failed to connect Gmail: ' + error.message);
  }
}

async function authenticateSharePoint() {
  try {
    const token = await authManager.authenticateMicrosoft(CONFIG.sharepoint);
    CONFIG.sharepoint.accessToken = token;
    await pluginManager.activatePlugin('sharepoint', CONFIG.sharepoint);
    alert('SharePoint connected successfully!');
  } catch (error) {
    alert('Failed to connect SharePoint: ' + error.message);
  }
}
