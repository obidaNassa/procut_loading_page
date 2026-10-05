const fs = require('fs');

const css = `
[data-theme="light-indigo"] {
  --brand-1: #4F46E5;
  --brand-2: #2563EB;
  --brand-1-rgb: 79,70,229;
  --brand-2-rgb: 37,99,235;
  --base-rgb: 248,250,252;
  --card-rgb: 255,255,255;
  --overlay-rgb: 15,23,42;
  --text-heading: #1E293B;
  --on-brand: #ffffff;
  --primary-300: #4F46E5;
  --primary-400: #6366f1;
  --primary-500: #4F46E5;
  --accent-400: #2563EB;
  --accent-500: #2563EB;
  --accent-600: #1D4ED8;
  --bg-base: #F8FAFC;
  --bg-surface: #ffffff;
  --bg-card: #ffffff;
  --bg-card-2: #ffffff;
  --bg-glass: rgba(255, 255, 255, 0.95);
  --bg-glass-2: rgba(255, 255, 255, 0.98);
  --text-primary: #475569;
  --text-secondary: #64748B;
  --text-muted: #94A3B8;
  --border-subtle: #E2E8F0;
  --border-medium: #CBD5E1;
  --border-accent: rgba(79, 70, 229, 0.35);
  --gradient-primary: linear-gradient(135deg, #4F46E5 0%, #2563EB 100%);
  --gradient-hero: radial-gradient(ellipse at 50% 0%, rgba(79,70,229,0.10) 0%, rgba(248,250,252,0) 70%);
  --gradient-card: linear-gradient(135deg, rgba(79,70,229,0.04) 0%, rgba(37,99,235,0.02) 100%);
  --shadow-sm: 0 1px 3px rgba(15,23,42,0.06), 0 0 0 1px rgba(15,23,42,0.04);
  --shadow-md: 0 4px 16px rgba(15,23,42,0.08), 0 0 0 1px rgba(15,23,42,0.05);
  --shadow-lg: 0 10px 40px rgba(15,23,42,0.10), 0 0 0 1px rgba(15,23,42,0.05);
  --shadow-glow: 0 0 40px rgba(79,70,229,0.12), 0 0 80px rgba(79,70,229,0.06);
}

[data-theme="light-emerald"] {
  --brand-1: #047857;
  --brand-2: #0F766E;
  --brand-1-rgb: 4,120,87;
  --brand-2-rgb: 15,118,110;
  --base-rgb: 250,250,249;
  --card-rgb: 255,255,255;
  --overlay-rgb: 28,25,23;
  --text-heading: #1C1917;
  --on-brand: #ffffff;
  --primary-300: #047857;
  --primary-400: #059669;
  --primary-500: #047857;
  --accent-400: #0F766E;
  --accent-500: #0F766E;
  --accent-600: #0F766E;
  --bg-base: #FAFAF9;
  --bg-surface: #ffffff;
  --bg-card: #ffffff;
  --bg-card-2: #ffffff;
  --bg-glass: rgba(255, 255, 255, 0.95);
  --bg-glass-2: rgba(255, 255, 255, 0.98);
  --text-primary: #57534E;
  --text-secondary: #78716C;
  --text-muted: #A8A29E;
  --border-subtle: #FDE68A;
  --border-medium: #FCD34D;
  --border-accent: rgba(4, 120, 87, 0.35);
  --gradient-primary: linear-gradient(135deg, #047857 0%, #0F766E 100%);
  --gradient-hero: radial-gradient(ellipse at 50% 0%, rgba(4,120,87,0.10) 0%, rgba(250,250,249,0) 70%);
  --gradient-card: linear-gradient(135deg, rgba(4,120,87,0.04) 0%, rgba(15,118,110,0.02) 100%);
  --shadow-sm: 0 1px 3px rgba(28,25,23,0.06), 0 0 0 1px rgba(28,25,23,0.04);
  --shadow-md: 0 4px 16px rgba(28,25,23,0.08), 0 0 0 1px rgba(28,25,23,0.05);
  --shadow-lg: 0 10px 40px rgba(28,25,23,0.10), 0 0 0 1px rgba(28,25,23,0.05);
  --shadow-glow: 0 0 40px rgba(4,120,87,0.12), 0 0 80px rgba(4,120,87,0.06);
}

[data-theme="light-mint"] {
  --brand-1: #14B8A6;
  --brand-2: #0284C7;
  --brand-1-rgb: 20,184,166;
  --brand-2-rgb: 2,132,199;
  --base-rgb: 240,249,255;
  --card-rgb: 255,255,255;
  --overlay-rgb: 15,23,42;
  --text-heading: #0F172A;
  --on-brand: #ffffff;
  --primary-300: #14B8A6;
  --primary-400: #2DD4BF;
  --primary-500: #14B8A6;
  --accent-400: #0284C7;
  --accent-500: #0284C7;
  --accent-600: #0369A1;
  --bg-base: #F0F9FF;
  --bg-surface: #ffffff;
  --bg-card: #ffffff;
  --bg-card-2: #ffffff;
  --bg-glass: rgba(255, 255, 255, 0.95);
  --bg-glass-2: rgba(255, 255, 255, 0.98);
  --text-primary: #334155;
  --text-secondary: #64748B;
  --text-muted: #94A3B8;
  --border-subtle: #BAE6FD;
  --border-medium: #7DD3FC;
  --border-accent: rgba(20, 184, 166, 0.35);
  --gradient-primary: linear-gradient(135deg, #14B8A6 0%, #0284C7 100%);
  --gradient-hero: radial-gradient(ellipse at 50% 0%, rgba(20,184,166,0.10) 0%, rgba(240,249,255,0) 70%);
  --gradient-card: linear-gradient(135deg, rgba(20,184,166,0.04) 0%, rgba(2,132,199,0.02) 100%);
  --shadow-sm: 0 1px 3px rgba(15,23,42,0.06), 0 0 0 1px rgba(15,23,42,0.04);
  --shadow-md: 0 4px 16px rgba(15,23,42,0.08), 0 0 0 1px rgba(15,23,42,0.05);
  --shadow-lg: 0 10px 40px rgba(15,23,42,0.10), 0 0 0 1px rgba(15,23,42,0.05);
  --shadow-glow: 0 0 40px rgba(20,184,166,0.12), 0 0 80px rgba(20,184,166,0.06);
}
\n`;

fs.appendFileSync('src/index.css', css);
console.log('Appended themes successfully');
