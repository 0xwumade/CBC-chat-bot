// Demo Plugin System - Simulates API responses without real credentials
// This allows you to see how the plugin system works

// Demo data sources
const DEMO_DATA = {
  teams: [
    {
      source: 'Microsoft Teams',
      title: 'Ikeja Project Update',
      content: 'Great progress on the Ikeja migration! Madam Patricia and Mr Muhidin have completed the security audit. All systems are go for the final phase.',
      date: '2024-03-08T10:30:00Z',
      author: 'Daniel Mwangi',
      url: '#'
    },
    {
      source: 'Microsoft Teams',
      title: 'Security Review Complete',
      content: 'Mr Muhidin has completed the penetration testing for the Ikeja infrastructure. No critical vulnerabilities found. Report attached.',
      date: '2024-03-07T14:20:00Z',
      author: 'Mr Muhidin',
      url: '#'
    }
  ],
  gmail: [
    {
      source: 'Gmail',
      title: 'RE: Ikeja Project Timeline',
      content: 'The migration is ahead of schedule. Madam Patricia confirmed we can proceed with the cutover next week. Client is very pleased with our progress.',
      date: '2024-03-08T09:15:00Z',
      author: 'project-manager@cbcemea.com',
      url: '#'
    },
    {
      source: 'Gmail',
      title: 'Cyber Security Assessment - Ikeja',
      content: 'Completed comprehensive security assessment. All compliance requirements met. Mr Muhidin and team did excellent work on the security architecture.',
      date: '2024-03-06T16:45:00Z',
      author: 'security@cbcemea.com',
      url: '#'
    }
  ],
  sharepoint: [
    {
      source: 'SharePoint',
      title: 'Ikeja Migration Plan v3.2.pdf',
      content: 'Final migration plan including security protocols, rollback procedures, and team assignments. Led by Madam Patricia.',
      date: '2024-03-05T11:00:00Z',
      author: 'Madam Patricia',
      url: '#',
      fileType: 'application/pdf'
    },
    {
      source: 'SharePoint',
      title: 'Security Audit Report - Ikeja.docx',
      content: 'Comprehensive security audit conducted by Mr Muhidin. All systems passed security checks. Ready for production deployment.',
      date: '2024-03-07T13:30:00Z',
      author: 'Mr Muhidin',
      url: '#',
      fileType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    }
  ]
};

// Track connected sources
let connectedSources = {
  teams: false,
  gmail: false,
  sharepoint: false
};

// Toggle authentication panel
function toggleAuthPanel() {
  const panel = document.getElementById('authContainer');
  const overlay = document.getElementById('authOverlay');
  
  panel.classList.toggle('open');
  overlay.classList.toggle('open');
  
  // Prevent body scroll when panel is open
  if (panel.classList.contains('open')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}

// Connect demo sources
function connectTeamsDemo() {
  if (connectedSources.teams) {
    // Disconnect
    connectedSources.teams = false;
    disconnectSource('teams', 'Microsoft Teams');
    showNotification('❌ Microsoft Teams disconnected');
  } else {
    // Connect
    connectedSources.teams = true;
    updateConnectionUI('teams', 'Microsoft Teams');
    showNotification('✅ Microsoft Teams connected (Demo Mode)');
  }
}

function connectGmailDemo() {
  if (connectedSources.gmail) {
    // Disconnect
    connectedSources.gmail = false;
    disconnectSource('gmail', 'Gmail');
    showNotification('❌ Gmail disconnected');
  } else {
    // Connect
    connectedSources.gmail = true;
    updateConnectionUI('gmail', 'Gmail');
    showNotification('✅ Gmail connected (Demo Mode)');
  }
}

function connectSharePointDemo() {
  if (connectedSources.sharepoint) {
    // Disconnect
    connectedSources.sharepoint = false;
    disconnectSource('sharepoint', 'SharePoint');
    showNotification('❌ SharePoint disconnected');
  } else {
    // Connect
    connectedSources.sharepoint = true;
    updateConnectionUI('sharepoint', 'SharePoint');
    showNotification('✅ SharePoint connected (Demo Mode)');
  }
}

// Disconnect a source
function disconnectSource(source, displayName) {
  const btn = document.getElementById(`${source}Btn`);
  btn.classList.remove('connected');
  
  // Update button text based on source
  const icons = {
    teams: '📧',
    gmail: '✉️',
    sharepoint: '📁'
  };
  
  btn.innerHTML = `<span>${icons[source]}</span> Connect ${displayName}`;
  
  // Remove badge by ID
  const badge = document.getElementById(`badge-${source}`);
  if (badge) {
    badge.remove();
  }
}

// Update UI to show connected sources
function updateConnectionUI(source, displayName) {
  const btn = document.getElementById(`${source}Btn`);
  btn.classList.add('connected');
  btn.innerHTML = `<span>✓</span> ${displayName} Connected`;
  
  const sourcesContainer = document.getElementById('connectedSources');
  
  // Check if badge already exists
  const existingBadges = sourcesContainer.querySelectorAll('.source-badge');
  let badgeExists = false;
  existingBadges.forEach(badge => {
    if (badge.textContent.includes(displayName)) {
      badgeExists = true;
    }
  });
  
  // Only add badge if it doesn't exist
  if (!badgeExists) {
    const badge = document.createElement('div');
    badge.className = 'source-badge';
    badge.id = `badge-${source}`;
    badge.innerHTML = `<span>✓</span> ${displayName}`;
    sourcesContainer.appendChild(badge);
  }
}

// Show notification
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 80px;
    right: 20px;
    background: var(--success);
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    z-index: 10000;
    animation: slideIn 0.3s ease;
  `;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Search demo data
function searchDemoPlugins(query) {
  const results = [];
  const lowerQuery = query.toLowerCase();
  
  // Check if query is relevant to demo data
  const relevantKeywords = ['ikeja', 'security', 'migration', 'project', 'patricia', 'muhidin'];
  const isRelevant = relevantKeywords.some(keyword => lowerQuery.includes(keyword));
  
  if (!isRelevant) return results;
  
  // Search connected sources
  if (connectedSources.teams) {
    results.push(...DEMO_DATA.teams);
  }
  
  if (connectedSources.gmail) {
    results.push(...DEMO_DATA.gmail);
  }
  
  if (connectedSources.sharepoint) {
    results.push(...DEMO_DATA.sharepoint);
  }
  
  return results;
}

// Format plugin results for display
function formatPluginResults(results) {
  if (results.length === 0) return '';

  let html = '<div class="plugin-results">';
  html += '<p style="font-size: 12px; color: var(--muted); margin-bottom: 12px;">📡 Results from connected sources:</p>';
  
  results.forEach(result => {
    html += `
      <div class="plugin-result">
        <div class="plugin-source">${result.source}</div>
        <div class="plugin-title"><strong>${result.title}</strong></div>
        <div class="plugin-content">${result.content}</div>
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

function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString();
}

// Override the original sendQuestion to include plugin results
const originalSendQuestion = window.sendQuestion;
window.sendQuestion = async function(text) {
  removeWelcome();
  appendMessage('user', `<p>${text}</p>`);
  document.getElementById('sendBtn').disabled = true;
  showTyping();

  const delay = 1200 + Math.random() * 800;
  
  setTimeout(async () => {
    removeTyping();
    
    // Get static response
    const resp = matchResponse(text);
    
    // Get plugin results
    const pluginResults = searchDemoPlugins(text);
    
    // Combine responses
    let finalAnswer = resp.answer;
    let finalSources = resp.sources || [];
    
    if (pluginResults.length > 0) {
      finalAnswer += formatPluginResults(pluginResults);
      finalSources = [
        ...finalSources,
        ...pluginResults.map(r => `${r.source} · ${r.title}`)
      ];
    }
    
    appendMessage('ai', finalAnswer, finalSources);
    document.getElementById('sendBtn').disabled = false;
  }, delay);
};

// Toggle settings
function toggleSetting(element) {
  element.classList.toggle('active');
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
  
  .notification {
    font-size: 14px;
    font-weight: 600;
  }
`;
document.head.appendChild(style);

// Show welcome message about demo mode
setTimeout(() => {
  if (Object.values(connectedSources).every(v => !v)) {
    showNotification('💡 Click the 🔌 button to connect data sources!');
  }
}, 2000);
