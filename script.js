// Bloom's Taxonomy level descriptions
const LEVEL_DESCRIPTIONS = {
    create: "Putting elements together to form a coherent whole or making an original product",
    evaluate: "Making judgments based on criteria and standards",
    analyze: "Breaking material into constituent parts and understanding structure",
    apply: "Carrying out or using a procedure in a given situation",
    understand: "Constructing meaning from instructional messages",
    remember: "Retrieving relevant knowledge from long-term memory"
};

// Level order for hierarchy (highest complexity first)
const LEVEL_ORDER = ['create', 'evaluate', 'analyze', 'apply', 'understand', 'remember'];

// Generate card HTML
function createCardHTML(capability) {
    return `
        <div class="card" data-level="${capability.level}" data-capability="${capability.id}">
            <div class="card-header-bar ${capability.level}">${capability.levelName}</div>
            <div class="card-content">
                <div class="card-title-row">
                    <span class="card-icon">${capability.icon}</span>
                    <span class="card-name">${capability.name}</span>
                </div>
                <div class="card-aka ${capability.level}">AKA ${capability.aka}</div>
                <p class="card-definition">${capability.definition}</p>
                <div class="card-prompts-section">
                    <div class="prompts-header">Prompt Examples</div>
                    ${capability.defaultPrompts.map(prompt =>
                        `<div class="prompt-example ${capability.level}">"${prompt}"</div>`
                    ).join('')}
                </div>
            </div>
        </div>
    `;
}

// Generate hierarchical display
function renderHierarchy() {
    const container = document.getElementById('taxonomy-hierarchy');
    if (!container) return;

    let html = '';

    LEVEL_ORDER.forEach(level => {
        const levelCapabilities = CAPABILITIES.filter(cap => cap.level === level);
        const levelName = levelCapabilities[0]?.levelName || level;

        html += `
            <div class="taxonomy-level" data-level="${level}">
                <div class="level-header">
                    <div class="level-indicator ${level}">${levelName}</div>
                    <div class="level-description">${LEVEL_DESCRIPTIONS[level]}</div>
                </div>
                <div class="level-cards">
                    ${levelCapabilities.map(cap => createCardHTML(cap)).join('')}
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

// Generate flat grid display
function renderGrid() {
    const container = document.getElementById('cards-grid');
    if (!container) return;

    let html = '';
    CAPABILITIES.forEach(cap => {
        html += createCardHTML(cap);
    });
    container.innerHTML = html;
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Render cards
    renderHierarchy();
    renderGrid();

    const filterButtons = document.querySelectorAll('.filter-btn');
    const hierarchyContainer = document.getElementById('taxonomy-hierarchy');
    const gridContainer = document.getElementById('cards-grid');
    const modal = document.getElementById('card-modal');
    const modalImage = document.getElementById('modal-image');
    const closeModalBtn = document.querySelector('.close-modal');

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            if (filter === 'all') {
                // Show hierarchy view
                hierarchyContainer.style.display = 'flex';
                gridContainer.style.display = 'none';

                // Show all taxonomy levels
                document.querySelectorAll('.taxonomy-level').forEach(level => {
                    level.style.display = 'flex';
                });
            } else {
                // Show filtered grid view
                hierarchyContainer.style.display = 'none';
                gridContainer.style.display = 'flex';

                // Filter cards in grid
                gridContainer.querySelectorAll('.card').forEach(card => {
                    if (card.dataset.level === filter) {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                });
            }
        });
    });

    // Modal functionality - close handlers
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModal();
        }
    });
});
