# LLM Capability Cards Website

A GitHub Pages website for hosting the LLM Capability Cards and workshop materials.

## Quick Start

1. **Add your card images** to `images/cards/`:
   - Export each card from Figma as PNG
   - Name files in lowercase: `identify.png`, `interpret.png`, `exemplify.png`, etc.
   - Required files (17 cards):
     - `identify.png` (Remember)
     - `interpret.png`, `exemplify.png`, `classify.png`, `summarize.png`, `infer.png`, `compare.png`, `explain.png` (Understand)
     - `execute.png` (Apply)
     - `differentiate.png`, `organize.png`, `attribute.png` (Analyze)
     - `check.png`, `critique.png` (Evaluate)
     - `generate.png`, `plan.png`, `produce.png` (Create)

2. **Add workshop materials** to `downloads/`:
   - `workshop-kit.pdf` - Full workshop facilitation guide
   - `capability-cards.pdf` - Cards for digital viewing
   - `capability-cards-print.pdf` - Print-ready cards

3. **Preview locally**:
   ```bash
   cd /Users/whitneynelson/projects/llm-capability-cards
   python3 -m http.server 8000
   ```
   Then open http://localhost:8000

4. **Deploy to GitHub Pages**:
   ```bash
   # Initialize git repo
   git init
   git add .
   git commit -m "Initial commit"

   # Create GitHub repo and push
   gh repo create llm-capability-cards --public --source=. --push

   # Enable GitHub Pages (Settings > Pages > Source: main branch)
   ```

## File Structure

```
llm-capability-cards/
├── index.html          # Main page
├── styles.css          # Styling
├── script.js           # Filter and modal functionality
├── images/
│   └── cards/          # Card PNG images (export from Figma)
│       ├── identify.png
│       ├── interpret.png
│       └── ... (17 total)
├── downloads/          # Downloadable materials
│   ├── workshop-kit.pdf
│   ├── capability-cards.pdf
│   └── capability-cards-print.pdf
└── README.md
```

## Customization

### Update citation
Edit the citation in `index.html` in the `.citation-section`:
```html
<p class="citation">
    [Your authors]. [Your title]. In Proceedings of DIS '25...
</p>
```

### Update contact email
Edit the email link in `index.html`:
```html
<li><a href="mailto:your-email@university.edu">Contact via email</a></li>
```

### Add paper link
Update the "Read the Paper" link once published:
```html
<li><a href="https://doi.org/YOUR-DOI">Read the Paper</a></li>
```

## Features

- **Responsive card grid** - Works on desktop and mobile
- **Filter by Bloom's level** - Users can filter cards by cognitive level
- **Click to enlarge** - Cards open in a modal for detailed viewing
- **Graceful fallbacks** - Shows placeholder text if images aren't loaded yet

## Colors

Cards are color-coded by Bloom's taxonomy level:
- Remember: Red (#e74c3c)
- Understand: Orange (#f39c12)
- Apply: Green (#27ae60)
- Analyze: Blue (#3498db)
- Evaluate: Purple (#9b59b6)
- Create: Pink (#e91e63)
