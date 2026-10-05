const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'components');

const replacements = [
  // Text colors (ignoring #ffffff since it's usually on brand/dark buttons)
  { regex: /color:\s*#f8fafc;/gi, replacement: 'color: var(--text-primary);' },
  { regex: /color:\s*#f1f5f9;/gi, replacement: 'color: var(--text-primary);' },
  { regex: /color:\s*#e2e8f0;/gi, replacement: 'color: var(--text-secondary);' },
  { regex: /color:\s*#cbd5e1;/gi, replacement: 'color: var(--text-secondary);' },
  { regex: /color:\s*#94a3b8;/gi, replacement: 'color: var(--text-muted);' },
  { regex: /color:\s*#64748b;/gi, replacement: 'color: var(--text-muted);' },
  { regex: /color:\s*#a0a0c0;/gi, replacement: 'color: var(--text-secondary);' },
  { regex: /color:\s*#6060a0;/gi, replacement: 'color: var(--text-muted);' },
  
  // Specific colored text that might be too light in light mode
  { regex: /color:\s*#a5b4fc;/gi, replacement: 'color: var(--primary-600);' },
  { regex: /color:\s*#38bdf8;/gi, replacement: 'color: var(--accent-600);' },

  // Backgrounds that were missed or are hex
  { regex: /background:\s*#141428;/gi, replacement: 'background: var(--bg-card);' },
  { regex: /background:\s*#1a1a35;/gi, replacement: 'background: var(--bg-card-2);' },
  { regex: /background:\s*#0f0f1a;/gi, replacement: 'background: var(--bg-surface);' },
  { regex: /background:\s*#09090f;/gi, replacement: 'background: var(--bg-base);' },
  { regex: /background:\s*rgba\(14,\s*14,\s*28,\s*0\.4\);/gi, replacement: 'background: rgba(var(--base-rgb), 0.4);' },

  // Borders
  { regex: /border:\s*1px\s*solid\s*rgba\(255,\s*255,\s*255,\s*0\.0[0-9]\);/gi, replacement: 'border: 1px solid var(--border-subtle);' },
  { regex: /border:\s*1px\s*solid\s*rgba\(255,\s*255,\s*255,\s*0\.1[0-9]\);/gi, replacement: 'border: 1px solid var(--border-medium);' },
];

fs.readdirSync(dir).forEach(file => {
  if (file.endsWith('.module.css')) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    replacements.forEach(({ regex, replacement }) => {
      content = content.replace(regex, replacement);
    });

    if (content !== original) {
      fs.writeFileSync(filePath, content);
      console.log(`Updated ${file}`);
    }
  }
});
