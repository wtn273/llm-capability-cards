// Generator functionality

let customCards = [];
let currentEditingCard = null;

document.addEventListener('DOMContentLoaded', function() {
    // Load saved API key if exists
    const savedKey = localStorage.getItem('llm-cards-api-key');
    const savedProvider = localStorage.getItem('llm-cards-provider');
    if (savedKey) {
        document.getElementById('api-key').value = savedKey;
    }
    if (savedProvider) {
        document.getElementById('api-provider').value = savedProvider;
    }

    // Save key link
    document.getElementById('save-key-link').addEventListener('click', function(e) {
        e.preventDefault();
        const key = document.getElementById('api-key').value;
        const provider = document.getElementById('api-provider').value;
        if (key) {
            localStorage.setItem('llm-cards-api-key', key);
            localStorage.setItem('llm-cards-provider', provider);
            alert('API key saved for future sessions.');
        }
    });

    // Generate button
    document.getElementById('generate-btn').addEventListener('click', generateAllCards);

    // Regenerate button
    document.getElementById('regenerate-btn').addEventListener('click', generateAllCards);

    // Print button
    document.getElementById('print-btn').addEventListener('click', printCards);

    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.dataset.filter;
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            document.querySelectorAll('.editable-card').forEach(card => {
                if (filter === 'all' || card.dataset.level === filter) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // Modal close
    document.querySelector('.close-modal').addEventListener('click', closeModal);
    document.getElementById('edit-modal').addEventListener('click', function(e) {
        if (e.target === this) closeModal();
    });

    // Modal save
    document.getElementById('save-card-btn').addEventListener('click', saveCardEdits);

    // Modal regenerate single card
    document.getElementById('regenerate-card-btn').addEventListener('click', regenerateCurrentCard);
});

async function generateAllCards() {
    const domain = document.getElementById('domain-input').value.trim();
    const apiKey = document.getElementById('api-key').value.trim();
    const provider = document.getElementById('api-provider').value;

    if (!domain) {
        showStatus('Please enter your domain/context.', 'error');
        return;
    }

    if (!apiKey) {
        showStatus('Please enter your API key.', 'error');
        return;
    }

    const generateBtn = document.getElementById('generate-btn');
    generateBtn.disabled = true;
    showStatus('Generating custom prompts for your domain... This may take a moment.', 'loading');

    try {
        // Initialize custom cards with default prompts
        customCards = CAPABILITIES.map(cap => ({
            ...cap,
            customPrompts: [...cap.defaultPrompts]
        }));

        // Generate custom prompts for each capability
        const batchSize = 4; // Process in batches to avoid rate limits
        for (let i = 0; i < CAPABILITIES.length; i += batchSize) {
            const batch = CAPABILITIES.slice(i, i + batchSize);
            const promises = batch.map(cap => generatePromptsForCapability(cap, domain, apiKey, provider));
            const results = await Promise.all(promises);

            results.forEach((prompts, idx) => {
                const capIndex = i + idx;
                if (prompts && prompts.length > 0) {
                    customCards[capIndex].customPrompts = prompts;
                }
            });

            // Update status
            showStatus(`Generated ${Math.min(i + batchSize, CAPABILITIES.length)} of ${CAPABILITIES.length} cards...`, 'loading');
        }

        // Render cards
        renderCards();
        document.getElementById('preview-section').style.display = 'block';
        showStatus('Custom cards generated successfully!', 'success');

        // Scroll to preview
        document.getElementById('preview-section').scrollIntoView({ behavior: 'smooth' });

    } catch (error) {
        console.error('Generation error:', error);
        showStatus(`Error: ${error.message}`, 'error');
    } finally {
        generateBtn.disabled = false;
    }
}

async function generatePromptsForCapability(capability, domain, apiKey, provider) {
    const prompt = `You are helping create LLM prompt examples for practitioners in the ${domain} field.

For the capability "${capability.name}" (${capability.definition}), generate exactly 3 example prompts that a ${domain} professional might use with an LLM.

Requirements:
- Each prompt should be specific to ${domain} work
- Each prompt should clearly demonstrate the "${capability.name}" capability
- Prompts should be practical and immediately usable
- Keep each prompt to 1-2 sentences

Return ONLY a JSON array of 3 strings, no other text. Example format:
["Prompt 1 here", "Prompt 2 here", "Prompt 3 here"]`;

    try {
        let response;

        if (provider === 'openai') {
            response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: 'gpt-4o-mini',
                    messages: [{ role: 'user', content: prompt }],
                    temperature: 0.7,
                    max_tokens: 300
                })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error?.message || 'OpenAI API error');
            }

            const data = await response.json();
            const content = data.choices[0].message.content.trim();
            return JSON.parse(content);

        } else if (provider === 'anthropic') {
            response = await fetch('https://api.anthropic.com/v1/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': apiKey,
                    'anthropic-version': '2023-06-01',
                    'anthropic-dangerous-direct-browser-access': 'true'
                },
                body: JSON.stringify({
                    model: 'claude-3-5-haiku-20241022',
                    max_tokens: 300,
                    messages: [{ role: 'user', content: prompt }]
                })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error?.message || 'Anthropic API error');
            }

            const data = await response.json();
            const content = data.content[0].text.trim();
            return JSON.parse(content);
        }

    } catch (error) {
        console.error(`Error generating prompts for ${capability.name}:`, error);
        // Return default prompts on error
        return capability.defaultPrompts;
    }
}

function renderCards() {
    const container = document.getElementById('cards-container');
    container.innerHTML = '';

    customCards.forEach((card, index) => {
        const cardEl = document.createElement('div');
        cardEl.className = 'editable-card';
        cardEl.dataset.level = card.level;
        cardEl.dataset.index = index;

        cardEl.innerHTML = `
            <div class="card-header ${card.level}">
                <div class="card-level">${card.levelName}</div>
                <div class="card-title">${card.name}</div>
            </div>
            <div class="card-body">
                <p class="card-definition">${card.definition}</p>
                <div class="card-prompts">
                    <h4>Example Prompts</h4>
                    <ul>
                        ${card.customPrompts.map(p => `<li>${escapeHtml(p)}</li>`).join('')}
                    </ul>
                </div>
            </div>
            <div class="card-edit-hint">Click to edit prompts</div>
        `;

        cardEl.addEventListener('click', () => openEditModal(index));
        container.appendChild(cardEl);
    });
}

function openEditModal(index) {
    currentEditingCard = index;
    const card = customCards[index];

    document.getElementById('modal-card-title').textContent = `Edit: ${card.name}`;
    document.getElementById('prompt-1').value = card.customPrompts[0] || '';
    document.getElementById('prompt-2').value = card.customPrompts[1] || '';
    document.getElementById('prompt-3').value = card.customPrompts[2] || '';

    document.getElementById('edit-modal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('edit-modal').classList.remove('active');
    document.body.style.overflow = '';
    currentEditingCard = null;
}

function saveCardEdits() {
    if (currentEditingCard === null) return;

    customCards[currentEditingCard].customPrompts = [
        document.getElementById('prompt-1').value.trim(),
        document.getElementById('prompt-2').value.trim(),
        document.getElementById('prompt-3').value.trim()
    ].filter(p => p); // Remove empty prompts

    renderCards();
    closeModal();
}

async function regenerateCurrentCard() {
    if (currentEditingCard === null) return;

    const domain = document.getElementById('domain-input').value.trim();
    const apiKey = document.getElementById('api-key').value.trim();
    const provider = document.getElementById('api-provider').value;
    const card = customCards[currentEditingCard];

    const btn = document.getElementById('regenerate-card-btn');
    btn.disabled = true;
    btn.textContent = 'Regenerating...';

    try {
        const newPrompts = await generatePromptsForCapability(
            CAPABILITIES[currentEditingCard],
            domain,
            apiKey,
            provider
        );

        if (newPrompts && newPrompts.length > 0) {
            document.getElementById('prompt-1').value = newPrompts[0] || '';
            document.getElementById('prompt-2').value = newPrompts[1] || '';
            document.getElementById('prompt-3').value = newPrompts[2] || '';
        }
    } catch (error) {
        alert('Error regenerating prompts. Please try again.');
    } finally {
        btn.disabled = false;
        btn.textContent = 'Regenerate';
    }
}

function printCards() {
    const printLayout = document.getElementById('print-layout');
    const domain = document.getElementById('domain-input').value.trim();

    // Generate print-ready cards
    let html = `
        <div class="print-page">
            <h1 style="text-align: center; margin-bottom: 20px;">LLM Capability Cards - ${escapeHtml(domain)}</h1>
            <div class="print-cards-grid">
    `;

    customCards.forEach((card, index) => {
        // Start new page every 6 cards
        if (index > 0 && index % 6 === 0) {
            html += `
                </div>
            </div>
            <div class="print-page">
                <div class="print-cards-grid">
            `;
        }

        html += `
            <div class="print-card">
                <div class="print-card-header ${card.level}">
                    <div class="print-card-level">${card.levelName}</div>
                    <div class="print-card-title">${card.name}</div>
                </div>
                <div class="print-card-body">
                    <p class="print-card-definition">${card.definition}</p>
                    <div class="print-prompts-label">Example Prompts</div>
                    <ul class="print-card-prompts">
                        ${card.customPrompts.map(p => `<li>${escapeHtml(p)}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
    });

    html += `
            </div>
        </div>
    `;

    printLayout.innerHTML = html;
    window.print();
}

function showStatus(message, type) {
    const status = document.getElementById('generation-status');
    status.textContent = message;
    status.className = 'status-message ' + type;
    if (type === 'loading') {
        status.classList.add('loading-text');
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
