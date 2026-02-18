const RESPONSES = {
  onboarding: {
    keywords: ["onboard", "new client", "client onboarding", "onboarding process"],
    answer: `<p>The <strong>CBC EMEA Client Onboarding Process</strong> follows a structured 4-phase approach designed to ensure smooth project kick-off and alignment:</p>
      <p><strong>Phase 1 – Discovery (Days 1–3):</strong> A dedicated Account Manager conducts a requirements workshop with the client's stakeholders. A technical assessment is completed and a Client Profile Document is created.</p>
      <p><strong>Phase 2 – Scoping & Proposal (Days 4–7):</strong> The solutions team reviews requirements, defines deliverables, timelines, and assigns a Lead Consultant. The Statement of Work (SoW) is drafted and reviewed internally before client sign-off.</p>
      <p><strong>Phase 3 – Onboarding Setup (Days 8–14):</strong> System access is provisioned, a Kick-off Meeting is scheduled, and the client is added to the CBC EMEA project portal.</p>
      <p><strong>Phase 4 – Project Initiation:</strong> First sprint or milestone is defined, communication cadence is agreed (weekly check-ins, monthly QBRs), and escalation paths are documented.</p>`,
    sources: ["Client Onboarding SOP · p.4–9", "Project Delivery Framework · p.12"]
  },
  ikeja: {
    keywords: ["ikeja", "ikeja project", "ikeja migration", "ikeja group"],
    answer: `<p>The <strong>Ikeja Group Infrastructure Migration</strong> was completed in Q3 2024 and stands as one of CBC EMEA's flagship case studies.</p>
      <p><strong>Challenge:</strong> Ikeja needed to migrate 14 legacy on-premise servers across 3 European sites to a hybrid Azure/AWS environment — with zero downtime tolerance due to 24/7 wind turbine monitoring systems.</p>
      <p><strong>CBC EMEA Approach:</strong> A phased lift-and-shift strategy was used over 12 weeks. A shadow environment was built in parallel, with a 2-week parallel-run validation before each site cutover.</p>
      <p><strong>Team:</strong> Led by <strong>Madam Patricia</strong> (CBC Gedu General Manager) with support from <strong>Mr Muhidin</strong> (Cyber Security Expert) and a 4-person delivery team.</p>
      <p><strong>Outcome:</strong> Migration completed 6 days ahead of schedule. 99.97% uptime maintained throughout. Client reported a 34% reduction in infrastructure costs post-migration.</p>`,
    sources: ["Ikeja Group Case Study · Full Report", "Infrastructure Migration Guide · p.22–31"]
  },
  cloud: {
    keywords: ["cloud", "azure", "aws", "migration experience", "who has experience", "cloud expertise", "cloud migration"],
    answer: `<p>Based on the <strong>CBC EMEA Staff Skills Matrix</strong>, the following consultants have certified cloud migration experience:</p>
      <p><strong>Daniel Mwangi</strong> — Senior Cloud Architect. Azure Solutions Architect Expert certified. Led 6 enterprise migrations in the past 2 years including Ikeja Group. Available from March 2025.</p>
      <p><strong>Priya Shankar</strong> — Cloud Infrastructure Consultant. AWS Certified Solutions Architect. Specialises in hybrid cloud environments and DevOps pipelines. Currently on a client engagement until end of February.</p>
      <p><strong>James Okafor</strong> — Mid-level Cloud Engineer. Azure & GCP experience. Supported 4 migrations as part of larger teams. Good fit for smaller-scale projects.</p>
      <p>For capacity planning or to assign resources to a project, contact the <strong>Resource Management team</strong> via the internal portal.</p>`,
    sources: ["Staff Skills Matrix · Cloud Specialists tab", "Project Delivery Framework · Resource Allocation · p.18"]
  },
  cybersecurity: {
    keywords: ["cyber security", "cybersecurity", "security expert", "security experience", "infosec", "penetration testing", "security consultant"],
    answer: `<p>Based on the <strong>CBC EMEA Staff Skills Matrix</strong>, the following consultants have certified cyber security experience:</p>
      <p><strong>Mr Muhidin</strong> — Senior Security Consultant. CISSP and CEH certified. Specialises in security audits, penetration testing, and compliance frameworks. Supported the Ikeja Group migration with security architecture. Available from April 2025.</p>
      <p><strong>Mr Jerry</strong> — Information Security Analyst. CompTIA Security+ and CISM certified. Focuses on threat detection, incident response, and security monitoring. Currently available for new engagements.</p>
      <p><strong>Mr Tobi</strong> — Security Operations Specialist. Experience with SIEM tools, vulnerability assessments, and security policy development. Good fit for ongoing security operations projects.</p>
      <p>For capacity planning or to assign resources to a project, contact the <strong>Resource Management team</strong> via the internal portal.</p>`,
    sources: ["Staff Skills Matrix · Security Specialists tab", "Project Delivery Framework · Resource Allocation · p.18"]
  },
  delivery: {
    keywords: ["delivery", "project delivery", "framework", "how do we deliver", "delivery framework"],
    answer: `<p>The <strong>CBC EMEA Project Delivery Framework</strong> is built on a hybrid Agile-Waterfall methodology, adapted for IT services and consulting engagements.</p>
      <p><strong>Key Phases:</strong></p>
      <p><strong>1. Initiation</strong> — Project charter created, sponsor signed off, core team assembled. Duration: 1–2 weeks depending on project size.</p>
      <p><strong>2. Planning</strong> — Work Breakdown Structure (WBS) defined, risks logged in the Risk Register, RACI matrix completed. Tooling: Jira + Confluence.</p>
      <p><strong>3. Execution</strong> — 2-week sprints for delivery tasks. Weekly internal standups, biweekly client status reports, monthly steering committee meetings.</p>
      <p><strong>4. Quality Assurance</strong> — All deliverables pass through a peer-review gate before client handover. Sign-off tracked via the CBC Delivery Portal.</p>
      <p><strong>5. Closure</strong> — Lessons Learned session, client satisfaction survey, and project archiving into the knowledge base.</p>`,
    sources: ["Project Delivery Framework · p.3–17", "Client Onboarding SOP · p.18"]
  },
  gdpr: {
    keywords: ["gdpr", "compliance", "data protection", "eu clients", "privacy"],
    answer: `<p>CBC EMEA's <strong>GDPR Compliance Playbook</strong> outlines the mandatory steps for all client engagements involving EU personal data.</p>
      <p><strong>Data Processing Agreements (DPAs):</strong> A signed DPA must be in place before any client data is accessed. Legal reviews all DPAs — standard turnaround is 3 business days.</p>
      <p><strong>Data Handling:</strong> All client data must be stored in EU-region cloud environments only (Frankfurt or Dublin Azure regions). No client data to be stored on local machines.</p>
      <p><strong>Breach Protocol:</strong> Any suspected data breach must be reported to the Data Protection Officer (<strong>dpo@cbcemea.com</strong>) within 2 hours. The DPO then manages the 72-hour regulatory reporting window.</p>
      <p><strong>Staff Training:</strong> All staff must complete the annual GDPR refresher module on the Learning Portal. New starters complete it within their first 2 weeks.</p>`,
    sources: ["GDPR Compliance Playbook · p.2–11", "Client Onboarding SOP · GDPR Checklist · p.21"]
  },
  sla: {
    keywords: ["sla", "service level", "tier 1", "incident", "response time"],
    answer: `<p>CBC EMEA's <strong>Service Level Agreements</strong> are tiered by incident severity as defined in the Service Delivery Framework:</p>
      <p><strong>Tier 1 – Critical:</strong> Complete service outage or security breach. Response within <strong>15 minutes</strong>, resolution target <strong>4 hours</strong>. 24/7 on-call engineer assigned immediately.</p>
      <p><strong>Tier 2 – High:</strong> Significant degradation affecting business operations. Response within <strong>1 hour</strong>, resolution target <strong>8 hours</strong> during business hours.</p>
      <p><strong>Tier 3 – Medium:</strong> Partial functionality impacted. Response within <strong>4 hours</strong>, resolution within <strong>2 business days</strong>.</p>
      <p><strong>Tier 4 – Low:</strong> Minor issues or requests. Response within <strong>1 business day</strong>, resolution within <strong>5 business days</strong>.</p>
      <p>SLA performance is reviewed monthly in the Service Review with each client. Breach credits apply as per individual client contracts.</p>`,
    sources: ["Project Delivery Framework · SLA Matrix · p.29", "Client Onboarding SOP · p.15"]
  },
  default: {
    answer: `<p>I found some relevant information across CBC EMEA's knowledge base, though I don't have a highly specific match for that query.</p>
      <p>For best results, try asking about <strong>specific projects</strong> (e.g. Ikeja, etc...), <strong>internal processes</strong> (onboarding, delivery, GDPR), <strong>team expertise</strong> (who knows Azure, cloud migrations), or <strong>policies and SLAs</strong>.</p>
      <p>If this is a topic that should be in our knowledge base but isn't, you can flag it to the <strong>Knowledge Management team</strong> to get it added.</p>`,
    sources: ["CBC EMEA Knowledge Base · General Index"]
  }
};

function matchResponse(text) {
  const lower = text.toLowerCase();
  console.log('Searching for:', lower);
  for (const [key, data] of Object.entries(RESPONSES)) {
    if (key === 'default') continue;
    console.log('Checking', key, 'with keywords:', data.keywords);
    if (data.keywords.some(k => lower.includes(k))) {
      console.log('Matched:', key);
      return data;
    }
  }
  console.log('No match found, returning default');
  return RESPONSES.default;
}

function removeWelcome() {
  const w = document.getElementById('welcome');
  if (w) w.remove();
}

function appendMessage(role, html, sources) {
  const container = document.getElementById('messages');
  const div = document.createElement('div');
  div.className = `msg ${role}`;

  const avatarDiv = document.createElement('div');
  avatarDiv.className = 'msg-avatar';
  avatarDiv.textContent = role === 'user' ? 'JS' : '🤖';

  const bodyDiv = document.createElement('div');
  bodyDiv.className = 'msg-body';

  const nameDiv = document.createElement('div');
  nameDiv.className = 'msg-name';
  nameDiv.textContent = role === 'user' ? 'You' : 'CBC Knowledge Assistant';

  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  bubble.innerHTML = html;

  if (sources && sources.length) {
    const sourceDiv = document.createElement('div');
    sourceDiv.className = 'sources';
    sources.forEach(s => {
      const chip = document.createElement('div');
      chip.className = 'source-chip';
      chip.innerHTML = `📎 ${s}`;
      sourceDiv.appendChild(chip);
    });
    bubble.appendChild(sourceDiv);
  }

  bodyDiv.appendChild(nameDiv);
  bodyDiv.appendChild(bubble);
  div.appendChild(avatarDiv);
  div.appendChild(bodyDiv);
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
  return bubble;
}

function showTyping() {
  const container = document.getElementById('messages');
  const div = document.createElement('div');
  div.className = 'msg ai';
  div.id = 'typing-indicator';

  const avatarDiv = document.createElement('div');
  avatarDiv.className = 'msg-avatar';
  avatarDiv.textContent = '🤖';

  const bodyDiv = document.createElement('div');
  bodyDiv.className = 'msg-body';

  const nameDiv = document.createElement('div');
  nameDiv.className = 'msg-name';
  nameDiv.textContent = 'CBC Knowledge Assistant';

  const typingBubble = document.createElement('div');
  typingBubble.className = 'typing-bubble';
  typingBubble.innerHTML = '<span></span><span></span><span></span>';

  bodyDiv.appendChild(nameDiv);
  bodyDiv.appendChild(typingBubble);
  div.appendChild(avatarDiv);
  div.appendChild(bodyDiv);
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

function removeTyping() {
  const t = document.getElementById('typing-indicator');
  if (t) t.remove();
}

function sendQuestion(text) {
  removeWelcome();
  appendMessage('user', `<p>${text}</p>`);
  document.getElementById('sendBtn').disabled = true;
  showTyping();

  const delay = 1200 + Math.random() * 800;
  setTimeout(() => {
    removeTyping();
    const resp = matchResponse(text);
    appendMessage('ai', resp.answer, resp.sources);
    document.getElementById('sendBtn').disabled = false;
  }, delay);
}

function sendFromInput() {
  const input = document.getElementById('input');
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  autoResize(input);
  sendQuestion(text);
}

function handleKey(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendFromInput();
  }
}

function autoResize(el) {
  el.style.height = 'auto';
  el.style.height = Math.min(el.scrollHeight, 120) + 'px';
}

function resetChat() {
  const messagesContainer = document.getElementById('messages');
  messagesContainer.innerHTML = `
    <div class="welcome" id="welcome">
      <div class="welcome-icon">🧠</div>
      <h2>Welcome to CBC EMEA Knowledge Assistant</h2>
      <p>Instantly search across all internal documents, past projects, SOPs, and team expertise. No more digging through folders or waiting for a colleague to reply.</p>
      <div class="suggestions">
        <button class="suggestion-btn" onclick="sendQuestion('What is the standard process for onboarding a new client at CBC EMEA?')">
          <span class="s-icon">📋</span>
          What is our client onboarding process?
        </button>
        <button class="suggestion-btn" onclick="sendQuestion('Who at CBC EMEA has experience with cyber security?')">
          <span class="s-icon">👥</span>
          Who has cyber security expertise?
        </button>
        <button class="suggestion-btn" onclick="sendQuestion('How did CBC EMEA handle the Ikeja infrastructure migration project?')">
          <span class="s-icon">🏗️</span>
          Tell me about the Ikeja project
        </button>
        <button class="suggestion-btn" onclick="sendQuestion('What are the key steps in our project delivery framework?')">
          <span class="s-icon">🚀</span>
          How does our delivery framework work?
        </button>
      </div>
    </div>
  `;
  document.getElementById('input').value = '';
  document.getElementById('sendBtn').disabled = false;
}
