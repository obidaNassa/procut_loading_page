const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'components');

const replacements = [
  { regex: /rgba\(18,\s*18,\s*38,\s*0\.7\)/g, replacement: 'rgba(var(--card-rgb), 0.7)' },
  { regex: /rgba\(18,\s*18,\s*38,\s*0\.65\)/g, replacement: 'rgba(var(--card-rgb), 0.65)' },
  { regex: /rgba\(18,\s*18,\s*38,\s*0\.6\)/g, replacement: 'rgba(var(--card-rgb), 0.6)' },
  { regex: /rgba\(14,\s*14,\s*28,\s*0\.4\)/g, replacement: 'rgba(var(--base-rgb), 0.4)' },
  { regex: /rgba\(24,\s*24,\s*48,\s*0\.85\)/g, replacement: 'rgba(var(--card-rgb), 0.85)' },
  { regex: /rgba\(28,\s*26,\s*64,\s*0\.9\)/g, replacement: 'rgba(var(--card-rgb), 0.9)' },
  { regex: /rgba\(28,\s*26,\s*64,\s*0\.85\)/g, replacement: 'rgba(var(--card-rgb), 0.85)' },
  { regex: /rgba\(18,\s*18,\s*38,\s*0\.95\)/g, replacement: 'rgba(var(--card-rgb), 0.95)' },
  { regex: /background:\s*#0f1024;/g, replacement: 'background: var(--bg-card);' },
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
