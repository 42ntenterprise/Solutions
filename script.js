/* ============================================================
   42NT Solutions — style.css
   Fuentes: Syne (display) + DM Sans (body)
   Paleta: azul marino profundo + cian eléctrico + blanco
============================================================ */

/* ── VARIABLES ────────────────────────────────────────────── */
:root {
  --navy:       #0a1628;
  --navy-mid:   #0f2040;
  --navy-light: #152a52;
  --cyan:       #00c8e0;
  --cyan-soft:  #00a8c0;
  --aqua:       #00e5b0;
  --white:      #ffffff;
  --off-white:  #f0f9ff;
  --bg-light:   #f0f9ff;
  --text-body:  #334155;
  --text-muted: #64748b;
  --border:     #e2e8f0;
  --radius:     14px;
  --radius-lg:  22px;
  --shadow-sm:  0 2px 12px rgba(10,22,40,.08);
  --shadow-md:  0 8px 32px rgba(10,22,40,.14);
  --shadow-lg:  0 20px 60px rgba(10,22,40,.22);
  --transition: .28s cubic-bezier(.4,0,.2,1);
  --font-head:  'Syne', sans-serif;
  --font-body:  'DM Sans', sans-serif;
}

/* ── RESET / BASE ─────────────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html { scroll-behavior: smooth; font-size: 16px; }

body {
  font-family: var(--font-body);
  color: var(--text-body);
  background: var(--white);
  line-height: 1.7;
  -webkit-font-smoothing: antialiased;
}

h1,h2,h3,h4,h5,h6 {
  font-family: var(--font-head);
  color: var(--navy);
  line-height: 1.2;
}

img { max-width: 100%; height: auto; display: block; }

a { text-decoration: none; }

/* ── NAVBAR ───────────────────────────────────────────────── */
#mainNav {
  background: transparent;
  padding: .9rem 0;
  transition: background var(--transition), box-shadow var(--transition), padding var(--transition);
}

#mainNav.scrolled {
  background: rgba(10,22,40,.97);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 2px 20px rgba(0,0,0,.25);
  padding: .6rem 0;
}

.brand-icon {
  width: 36px; height: 36px;
  background: linear-gradient(135deg, var(--cyan), var(--aqua));
  border-radius: 9px;
  display: flex; align-items: center; justify-content: center;
  font-size: 1rem; color: var(--navy);
  flex-shrink: 0;
}

.brand-text {
  font-family: var(--font-head);
  font-size: 1.2rem;
  font-weight: 800;
  color: var(--white);
  letter-spacing: -.01em;
}

.brand-accent { color: var(--cyan); }

.nav-link {
  color: rgba(255,255,255,.8) !important;
  font-weight: 500;
  font-size: .92rem;
  padding: .45rem .75rem !important;
  border-radius: 8px;
  transition: color var(--transition), background var(--transition);
}

.nav-link:hover { color: var(--white) !important; background: rgba(255,255,255,.1); }

.btn-cta-nav {
  background: linear-gradient(135deg, var(--cyan), var(--aqua));
  color: var(--navy) !important;
  font-family: var(--font-head);
  font-weight: 700;
  font-size: .88rem;
  padding: .5rem 1.1rem;
  border-radius: 8px;
  border: none;
  transition: transform var(--transition), box-shadow var(--transition), filter var(--transition);
}

.btn-cta-nav:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(0,200,224,.35);
  filter: brightness(1.08);
  color: var(--navy) !important;
}

/* ── HERO ─────────────────────────────────────────────────── */
.hero-section {
  position: relative;
  background: linear-gradient(160deg, var(--navy) 0%, var(--navy-mid) 55%, #0d3060 100%);
  overflow: hidden;
  min-height: 100vh;
}

.hero-section::before {
  content: '';
  position: absolute; inset: 0;
  background:
    radial-gradient(ellipse 60% 50% at 80% 20%, rgba(0,200,224,.12) 0%, transparent 70%),
    radial-gradient(ellipse 40% 40% at 10% 80%, rgba(0,229,176,.08) 0%, transparent 60%);
  pointer-events: none;
}

/* Grid lines decoration */
.hero-section::after {
  content: '';
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(0,200,224,.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,200,224,.04) 1px, transparent 1px);
  background-size: 60px 60px;
  pointer-events: none;
}

.hero-overlay { display: none; }

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: .4rem;
  background: rgba(0,200,224,.12);
  border: 1px solid rgba(0,200,224,.3);
  color: var(--cyan);
  font-size: .82rem;
  font-weight: 600;
  padding: .4rem 1rem;
  border-radius: 999px;
  letter-spacing: .02em;
  backdrop-filter: blur(4px);
}

.hero-h1 {
  font-family: var(--font-head);
  font-size: clamp(2rem, 4vw, 3.2rem);
  font-weight: 800;
  color: var(--white);
  line-height: 1.15;
  margin-bottom: 1.2rem;
  letter-spacing: -.02em;
}

.text-gradient {
  background: linear-gradient(100deg, var(--cyan), var(--aqua));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.05rem;
  color: rgba(255,255,255,.75);
  margin-bottom: 1.8rem;
  max-width: 560px;
}

/* Benefit cards */
.benefit-card {
  display: flex;
  align-items: flex-start;
  gap: .75rem;
  background: rgba(255,255,255,.06);
  border: 1px solid rgba(255,255,255,.1);
  border-radius: var(--radius);
  padding: .9rem 1rem;
  transition: background var(--transition), border-color var(--transition);
}

.benefit-card:hover {
  background: rgba(0,200,224,.1);
  border-color: rgba(0,200,224,.3);
}

.benefit-card i {
  font-size: 1.3rem;
  color: var(--cyan);
  flex-shrink: 0;
  margin-top: .1rem;
}

.benefit-card strong {
  display: block;
  color: var(--white);
  font-size: .88rem;
  font-weight: 600;
  margin-bottom: .15rem;
}

.benefit-card span {
  display: block;
  color: rgba(255,255,255,.55);
  font-size: .78rem;
  line-height: 1.4;
}

/* Hero buttons */
.btn-hero-primary {
  background: linear-gradient(135deg, var(--cyan), var(--aqua));
  color: var(--navy);
  font-family: var(--font-head);
  font-weight: 700;
  font-size: .95rem;
  padding: .85rem 1.8rem;
  border-radius: 10px;
  border: none;
  transition: transform var(--transition), box-shadow var(--transition), filter var(--transition);
  white-space: nowrap;
}

.btn-hero-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 28px rgba(0,200,224,.4);
  filter: brightness(1.06);
  color: var(--navy);
}

.btn-hero-secondary {
  background: transparent;
  color: var(--white);
  font-family: var(--font-head);
  font-weight: 600;
  font-size: .95rem;
  padding: .85rem 1.8rem;
  border-radius: 10px;
  border: 1.5px solid rgba(255,255,255,.3);
  transition: background var(--transition), border-color var(--transition), color var(--transition);
  white-space: nowrap;
}

.btn-hero-secondary:hover {
  background: rgba(255,255,255,.1);
  border-color: rgba(255,255,255,.6);
  color: var(--white);
}

/* Micro trust */
.micro-trust {
  display: flex;
  align-items: center;
  gap: .9rem;
  padding: .8rem 1rem;
  background: rgba(255,255,255,.05);
  border: 1px solid rgba(255,255,255,.1);
  border-radius: var(--radius);
  max-width: 420px;
}

.micro-avatar {
  width: 44px; height: 44px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--cyan);
  flex-shrink: 0;
}

.micro-text { display: flex; flex-direction: column; gap: .2rem; }

.micro-text > span:first-child {
  color: var(--white);
  font-size: .88rem;
  font-weight: 500;
}

.micro-items {
  color: rgba(255,255,255,.5);
  font-size: .75rem;
}

/* Hero image */
.hero-image-wrapper { position: relative; }

.hero-img {
  width: 100%;
  border-radius: var(--radius-lg);
  object-fit: cover;
  box-shadow: var(--shadow-lg);
}

.hero-float-card {
  position: absolute;
  bottom: -16px; left: -24px;
  display: flex; align-items: center; gap: .6rem;
  background: var(--white);
  border-radius: var(--radius);
  padding: .7rem 1rem;
  box-shadow: var(--shadow-md);
  min-width: 170px;
  animation: float 4s ease-in-out infinite;
}

.hero-float-card-2 {
  bottom: auto; top: -16px;
  left: auto; right: -20px;
  animation-delay: 2s;
}

.hero-float-card i { font-size: 1.4rem; }
.hero-float-card strong { display: block; color: var(--navy); font-weight: 700; font-size: .95rem; line-height: 1.2; }
.hero-float-card span  { display: block; color: var(--text-muted); font-size: .74rem; }

.text-cyan  { color: var(--cyan) !important; }
.text-aqua  { color: var(--aqua) !important; }

@keyframes float {
  0%,100% { transform: translateY(0); }
  50%      { transform: translateY(-8px); }
}

/* Hero wave */
.hero-wave { position: absolute; bottom: 0; left: 0; right: 0; line-height: 0; }
.hero-wave svg { width: 100%; height: 80px; }

/* ── SECTION COMMONS ──────────────────────────────────────── */
.section-badge {
  display: inline-block;
  background: linear-gradient(135deg, rgba(0,200,224,.12), rgba(0,229,176,.08));
  border: 1px solid rgba(0,200,224,.25);
  color: var(--cyan-soft);
  font-size: .75rem;
  font-weight: 700;
  letter-spacing: .08em;
  text-transform: uppercase;
  padding: .3rem .85rem;
  border-radius: 999px;
  margin-bottom: .75rem;
}

.section-title {
  font-family: var(--font-head);
  font-size: clamp(1.6rem, 3vw, 2.4rem);
  font-weight: 800;
  color: var(--navy);
  margin-bottom: .6rem;
  letter-spacing: -.02em;
}

.section-subtitle {
  font-size: 1.05rem;
  color: var(--text-muted);
  max-width: 540px;
  margin: 0 auto;
}

/* ── PAIN SECTION ─────────────────────────────────────────── */
.pain-section { background: var(--bg-light); }

.pain-card {
  display: flex;
  flex-direction: column;
  gap: .6rem;
  background: var(--white);
  border: 1.5px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 1.8rem 1.5rem;
  color: var(--text-body);
  transition: border-color var(--transition), box-shadow var(--transition), transform var(--transition);
  height: 100%;
}

.pain-card:hover {
  border-color: var(--cyan);
  box-shadow: 0 8px 30px rgba(0,200,224,.15);
  transform: translateY(-4px);
  color: var(--text-body);
}

.pain-icon {
  width: 52px; height: 52px;
  background: linear-gradient(135deg, rgba(0,200,224,.12), rgba(0,229,176,.08));
  border-radius: 14px;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.5rem;
  color: var(--cyan-soft);
  margin-bottom: .4rem;
}

.pain-card h5 {
  font-family: var(--font-head);
  font-size: 1rem;
  font-weight: 700;
  color: var(--navy);
  line-height: 1.35;
}

.pain-card p {
  font-size: .9rem;
  color: var(--text-muted);
  margin: 0;
  flex: 1;
}

.pain-cta {
  font-size: .84rem;
  font-weight: 600;
  color: var(--cyan-soft);
  margin-top: auto;
  transition: gap var(--transition);
}

/* ── SERVICES ─────────────────────────────────────────────── */
.services-section { background: var(--white); }

.service-img {
  width: 100%;
  border-radius: var(--radius-lg);
  object-fit: cover;
  max-height: 340px;
  box-shadow: var(--shadow-md);
}

.service-number {
  font-family: var(--font-head);
  font-size: 3.5rem;
  font-weight: 800;
  color: rgba(0,200,224,.15);
  line-height: 1;
  margin-bottom: .3rem;
  letter-spacing: -.04em;
}

.service-title {
  font-family: var(--font-head);
  font-size: 1.55rem;
  font-weight: 800;
  color: var(--navy);
  margin-bottom: .3rem;
}

.service-subtitle-tag {
  display: inline-block;
  background: linear-gradient(135deg, rgba(0,200,224,.1), rgba(0,229,176,.08));
  color: var(--cyan-soft);
  font-size: .8rem;
  font-weight: 700;
  letter-spacing: .06em;
  text-transform: uppercase;
  padding: .25rem .75rem;
  border-radius: 999px;
  margin-bottom: 1rem;
}

.service-desc {
  color: var(--text-muted);
  font-size: .97rem;
  margin-bottom: 1rem;
}

.deliverables {
  background: var(--bg-light);
  border-radius: var(--radius);
  padding: 1.1rem 1.3rem;
  margin-bottom: .5rem;
}

.deliverables h6 {
  font-family: var(--font-head);
  font-size: .82rem;
  font-weight: 700;
  letter-spacing: .06em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: .6rem;
}

.deliverables ul {
  list-style: none;
  padding: 0; margin: 0;
  display: flex; flex-direction: column; gap: .35rem;
}

.deliverables li {
  font-size: .9rem;
  color: var(--text-body);
  display: flex; align-items: center;
}

.deliverables li i { color: var(--cyan-soft); font-size: .9rem; flex-shrink: 0; }

.btn-service {
  background: var(--navy);
  color: var(--white);
  font-family: var(--font-head);
  font-weight: 700;
  font-size: .9rem;
  padding: .7rem 1.5rem;
  border-radius: 9px;
  border: 1.5px solid var(--navy);
  transition: background var(--transition), color var(--transition), box-shadow var(--transition), transform var(--transition);
}

.btn-service:hover {
  background: transparent;
  color: var(--navy);
  box-shadow: 0 4px 16px rgba(10,22,40,.12);
  transform: translateY(-1px);
}

.border-bottom-subtle { border-bottom: 1px solid var(--border) !important; }

/* ── DIFFERENTIATORS ──────────────────────────────────────── */
.diff-section { background: var(--navy); }
.diff-section .section-badge { background: rgba(0,200,224,.12); border-color: rgba(0,200,224,.3); color: var(--cyan); }
.diff-section .section-title { color: var(--white); }
.diff-section .section-subtitle { color: rgba(255,255,255,.6); }

.diff-card {
  background: rgba(255,255,255,.04);
  border: 1px solid rgba(255,255,255,.1);
  border-radius: var(--radius-lg);
  padding: 1.8rem 1.6rem;
  height: 100%;
  transition: background var(--transition), border-color var(--transition), transform var(--transition);
}

.diff-card:hover {
  background: rgba(0,200,224,.08);
  border-color: rgba(0,200,224,.3);
  transform: translateY(-4px);
}

.diff-icon {
  width: 50px; height: 50px;
  background: linear-gradient(135deg, rgba(0,200,224,.2), rgba(0,229,176,.1));
  border-radius: 13px;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.4rem;
  color: var(--cyan);
  margin-bottom: 1rem;
}

.diff-card h5 {
  font-family: var(--font-head);
  font-size: 1rem;
  font-weight: 700;
  color: var(--white);
  margin-bottom: .5rem;
}

.diff-card p {
  color: rgba(255,255,255,.55);
  font-size: .9rem;
  margin: 0;
}

/* ── EVIDENCE / CASES ─────────────────────────────────────── */
.evidence-section { background: var(--bg-light); }

.case-card {
  background: var(--white);
  border: 1.5px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 1.8rem 1.5rem;
  height: 100%;
  display: flex; flex-direction: column; gap: .8rem;
  transition: box-shadow var(--transition), transform var(--transition), border-color var(--transition);
}

.case-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-4px);
  border-color: var(--cyan);
}

.case-card-featured {
  border-color: var(--cyan);
  background: linear-gradient(160deg, #f0fdff, var(--white));
  box-shadow: 0 4px 20px rgba(0,200,224,.12);
}

.case-icon {
  width: 48px; height: 48px;
  background: linear-gradient(135deg, var(--cyan), var(--aqua));
  border-radius: 13px;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.3rem;
  color: var(--navy);
}

.case-card h5 {
  font-family: var(--font-head);
  font-size: 1rem;
  font-weight: 700;
  color: var(--navy);
  margin: 0;
}

.case-metrics {
  display: flex;
  flex-direction: column;
  gap: .4rem;
  background: var(--bg-light);
  border-radius: var(--radius);
  padding: .9rem 1rem;
}

.metric-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: .5rem;
}

.metric-label {
  font-size: .75rem;
  font-weight: 700;
  letter-spacing: .05em;
  text-transform: uppercase;
  color: var(--text-muted);
  flex-shrink: 0;
}

.metric-value {
  font-family: var(--font-head);
  font-weight: 700;
  font-size: .9rem;
  padding: .2rem .6rem;
  border-radius: 6px;
}

.metric-value.before { background: #fee2e2; color: #dc2626; }
.metric-value.after  { background: #d1fae5; color: #059669; }

.metric-arrow {
  text-align: center;
  color: var(--cyan-soft);
  font-size: 1.1rem;
  opacity: .7;
}

.case-impact {
  font-size: .88rem;
  color: var(--text-muted);
  margin: 0;
  flex: 1;
}

.case-link {
  font-size: .84rem;
  font-weight: 600;
  color: var(--cyan-soft);
  margin-top: auto;
  transition: gap var(--transition);
  display: flex; align-items: center; gap: .3rem;
}

.case-link:hover { color: var(--navy); }

/* ── PROCESS ──────────────────────────────────────────────── */
.process-section { background: var(--white); }

.process-step {
  display: flex;
  gap: 1.2rem;
  padding-bottom: 2rem;
  position: relative;
}

.process-step:not(.last)::after {
  content: '';
  position: absolute;
  left: 22px; top: 52px;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, var(--cyan), transparent);
}

.step-number {
  width: 46px; height: 46px;
  background: linear-gradient(135deg, var(--cyan), var(--aqua));
  border-radius: 13px;
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-head);
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--navy);
  flex-shrink: 0;
  box-shadow: 0 4px 14px rgba(0,200,224,.3);
  position: relative; z-index: 1;
}

.step-content { padding-top: .3rem; }

.step-content h5 {
  font-family: var(--font-head);
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--navy);
  margin-bottom: .3rem;
}

.step-time {
  font-family: var(--font-body);
  font-weight: 500;
  font-size: .88rem;
  color: var(--cyan-soft);
}

.step-content p {
  color: var(--text-muted);
  font-size: .92rem;
  margin: 0;
}

.process-img {
  max-width: 600px;
  margin: 0 auto;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}

/* ── PRICING ──────────────────────────────────────────────── */
.pricing-section {
  background: linear-gradient(160deg, var(--navy) 0%, var(--navy-mid) 100%);
}

.pricing-section .section-badge { background: rgba(0,200,224,.12); border-color: rgba(0,200,224,.3); color: var(--cyan); }
.pricing-section .section-title { color: var(--white); }
.pricing-section .section-subtitle { color: rgba(255,255,255,.6); }

.price-card {
  background: rgba(255,255,255,.05);
  border: 1.5px solid rgba(255,255,255,.12);
  border-radius: var(--radius-lg);
  padding: 2rem 1.7rem;
  height: 100%;
  display: flex; flex-direction: column;
  position: relative;
  transition: background var(--transition), border-color var(--transition), transform var(--transition), box-shadow var(--transition);
}

.price-card:hover {
  background: rgba(255,255,255,.09);
  border-color: rgba(0,200,224,.4);
  transform: translateY(-4px);
  box-shadow: 0 16px 40px rgba(0,0,0,.3);
}

.price-card-featured {
  background: rgba(0,200,224,.1);
  border-color: var(--cyan);
  transform: scale(1.02);
  box-shadow: 0 20px 50px rgba(0,200,224,.25);
}

.price-card-featured:hover { transform: scale(1.02) translateY(-4px); }

.price-badge-top {
  position: absolute;
  top: -12px; left: 50%; transform: translateX(-50%);
  background: linear-gradient(135deg, var(--cyan), var(--aqua));
  color: var(--navy);
  font-family: var(--font-head);
  font-size: .72rem;
  font-weight: 800;
  letter-spacing: .06em;
  text-transform: uppercase;
  padding: .25rem .9rem;
  border-radius: 999px;
  white-space: nowrap;
}

.price-header { margin-bottom: 1.2rem; }

.price-letter {
  display: inline-flex;
  align-items: center; justify-content: center;
  width: 36px; height: 36px;
  background: rgba(0,200,224,.15);
  border-radius: 9px;
  font-family: var(--font-head);
  font-size: .95rem;
  font-weight: 800;
  color: var(--cyan);
  margin-bottom: .5rem;
}

.price-header h5 {
  font-family: var(--font-head);
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--white);
  margin-bottom: .4rem;
}

.price-amount {
  font-size: .9rem;
  color: rgba(255,255,255,.6);
}

.price-amount strong {
  font-family: var(--font-head);
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--cyan);
  display: block;
  margin-top: .1rem;
}

.price-features {
  list-style: none;
  padding: 0; margin: 0 0 1rem;
  display: flex; flex-direction: column; gap: .5rem;
  flex: 1;
}

.price-features li {
  display: flex; align-items: center; gap: .5rem;
  font-size: .88rem;
  color: rgba(255,255,255,.7);
}

.price-features i { color: var(--cyan); flex-shrink: 0; }

.price-ideal {
  font-size: .78rem;
  color: rgba(255,255,255,.4);
  margin-bottom: 1rem;
}

.btn-price {
  background: rgba(255,255,255,.08);
  color: var(--white);
  font-family: var(--font-head);
  font-weight: 700;
  font-size: .88rem;
  padding: .65rem 1.2rem;
  border-radius: 9px;
  border: 1.5px solid rgba(255,255,255,.2);
  width: 100%;
  transition: background var(--transition), border-color var(--transition), color var(--transition);
}

.btn-price:hover {
  background: rgba(255,255,255,.15);
  border-color: rgba(255,255,255,.4);
  color: var(--white);
}

.btn-price-featured {
  background: linear-gradient(135deg, var(--cyan), var(--aqua));
  color: var(--navy);
  font-family: var(--font-head);
  font-weight: 700;
  font-size: .88rem;
  padding: .65rem 1.2rem;
  border-radius: 9px;
  border: none;
  width: 100%;
  transition: filter var(--transition), box-shadow var(--transition), transform var(--transition);
}

.btn-price-featured:hover {
  filter: brightness(1.08);
  box-shadow: 0 6px 20px rgba(0,200,224,.4);
  color: var(--navy);
  transform: translateY(-1px);
}

.pricing-note {
  margin-top: 2rem;
  background: rgba(255,255,255,.05);
  border: 1px solid rgba(255,255,255,.1);
  border-radius: var(--radius);
  padding: 1rem 1.4rem;
  font-size: .88rem;
  color: rgba(255,255,255,.55);
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: .4rem;
}

.pricing-note i { color: var(--cyan); }
.pricing-note strong { color: var(--white); }

/* ── FORM SECTION ─────────────────────────────────────────── */
.form-section { background: var(--bg-light); }

.form-card {
  background: var(--white);
  border-radius: var(--radius-lg);
  padding: 2.5rem 2rem;
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--border);
}

.form-control, .form-select {
  border: 1.5px solid var(--border);
  border-radius: 9px;
  padding: .65rem .9rem;
  font-family: var(--font-body);
  font-size: .92rem;
  color: var(--text-body);
  transition: border-color var(--transition), box-shadow var(--transition);
  background-color: var(--white);
}

.form-control:focus, .form-select:focus {
  border-color: var(--cyan-soft);
  box-shadow: 0 0 0 3px rgba(0,200,224,.15);
  outline: none;
}

.form-control.is-invalid, .form-select.is-invalid {
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239,68,68,.12);
}

.form-label {
  font-size: .85rem;
  font-weight: 600;
  color: var(--navy);
  margin-bottom: .35rem;
}

.urgency-group {
  display: flex;
  flex-wrap: wrap;
  gap: .6rem;
}

.urgency-option {
  cursor: pointer;
}

.urgency-option input { display: none; }

.urgency-option span {
  display: inline-block;
  padding: .45rem 1rem;
  border: 1.5px solid var(--border);
  border-radius: 8px;
  font-size: .88rem;
  font-weight: 500;
  color: var(--text-muted);
  transition: all var(--transition);
  user-select: none;
}

.urgency-option input:checked + span {
  background: var(--navy);
  border-color: var(--navy);
  color: var(--white);
}

.urgency-option:hover span {
  border-color: var(--cyan-soft);
  color: var(--cyan-soft);
}

.btn-form-submit {
  background: linear-gradient(135deg, var(--navy), var(--navy-light));
  color: var(--white);
  font-family: var(--font-head);
  font-weight: 700;
  font-size: 1rem;
  padding: .9rem 2rem;
  border-radius: 10px;
  border: none;
  transition: transform var(--transition), box-shadow var(--transition), filter var(--transition);
  position: relative;
  overflow: hidden;
}

.btn-form-submit::before {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(135deg, var(--cyan), var(--aqua));
  opacity: 0;
  transition: opacity var(--transition);
}

.btn-form-submit:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 28px rgba(10,22,40,.3);
  color: var(--navy);
}

.btn-form-submit:hover::before { opacity: 1; }

.btn-form-submit span, .btn-form-submit i { position: relative; z-index: 1; }

.btn-form-submit:hover i { color: var(--navy); }

.form-trust {
  font-size: .83rem;
  color: var(--text-muted);
  text-align: center;
  padding: .7rem;
  background: var(--bg-light);
  border-radius: 9px;
}

/* ── FAQ ──────────────────────────────────────────────────── */
.faq-section { background: var(--white); }

.faq-accordion .accordion-item {
  border: 1.5px solid var(--border);
  border-radius: var(--radius) !important;
  margin-bottom: .6rem;
  overflow: hidden;
}

.faq-accordion .accordion-button {
  font-family: var(--font-head);
  font-size: .98rem;
  font-weight: 700;
  color: var(--navy);
  background: var(--white);
  padding: 1.1rem 1.4rem;
  border-radius: var(--radius) !important;
}

.faq-accordion .accordion-button:not(.collapsed) {
  color: var(--cyan-soft);
  background: var(--bg-light);
  box-shadow: none;
}

.faq-accordion .accordion-button::after {
  filter: hue-rotate(180deg) saturate(2);
}

.faq-accordion .accordion-body {
  padding: 0 1.4rem 1.2rem;
  font-size: .93rem;
  color: var(--text-muted);
  background: var(--bg-light);
}

/* ── CTA FINAL ────────────────────────────────────────────── */
.cta-final-section {
  background: linear-gradient(160deg, var(--navy-mid) 0%, var(--navy) 100%);
}

.cta-final-card {
  background: rgba(0,200,224,.07);
  border: 1.5px solid rgba(0,200,224,.2);
  border-radius: var(--radius-lg);
  padding: 3rem 2rem;
}

.cta-final-card h2 {
  font-family: var(--font-head);
  font-size: clamp(1.4rem, 2.5vw, 2rem);
  font-weight: 800;
  color: var(--white);
  line-height: 1.3;
}

.cta-final-card p {
  color: rgba(255,255,255,.55);
  margin-top: .5rem;
  font-size: .95rem;
}

.btn-cta-final-primary {
  background: linear-gradient(135deg, var(--cyan), var(--aqua));
  color: var(--navy);
  font-family: var(--font-head);
  font-weight: 700;
  font-size: .95rem;
  padding: .85rem 1.8rem;
  border-radius: 10px;
  border: none;
  transition: transform var(--transition), box-shadow var(--transition), filter var(--transition);
}

.btn-cta-final-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 28px rgba(0,200,224,.4);
  filter: brightness(1.06);
  color: var(--navy);
}

.btn-cta-final-secondary {
  background: transparent;
  color: var(--white);
  font-family: var(--font-head);
  font-weight: 600;
  font-size: .95rem;
  padding: .85rem 1.8rem;
  border-radius: 10px;
  border: 1.5px solid rgba(255,255,255,.3);
  transition: background var(--transition), border-color var(--transition);
}

.btn-cta-final-secondary:hover {
  background: rgba(255,255,255,.1);
  border-color: rgba(255,255,255,.6);
  color: var(--white);
}

/* ── FOOTER ───────────────────────────────────────────────── */
.footer {
  background: var(--navy);
  color: rgba(255,255,255,.6);
}

.footer-brand {
  font-family: var(--font-head);
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--white);
}

.footer-tagline {
  font-size: .82rem;
  color: rgba(255,255,255,.4);
  margin: 0;
}

.footer-links {
  display: flex;
  gap: 1.2rem;
  justify-content: center;
  flex-wrap: wrap;
}

.footer-links a {
  font-size: .88rem;
  color: rgba(255,255,255,.5);
  transition: color var(--transition);
}

.footer-links a:hover { color: var(--cyan); }

.footer-contact {
  font-size: .85rem;
  color: rgba(255,255,255,.55);
  margin: 0 0 .3rem;
}

.footer-wa {
  display: inline-flex;
  align-items: center;
  gap: .3rem;
  font-size: .88rem;
  font-weight: 600;
  color: var(--aqua);
  transition: color var(--transition);
}

.footer-wa:hover { color: var(--cyan); }

.footer-hr { border-color: rgba(255,255,255,.08); margin: 1.2rem 0 .8rem; }

.footer-copy { font-size: .8rem; color: rgba(255,255,255,.3); margin: 0; }

/* ── STICKY WHATSAPP ──────────────────────────────────────── */
.sticky-wa {
  position: fixed;
  bottom: 1.5rem; right: 1.5rem;
  width: 54px; height: 54px;
  background: #25d366;
  color: var(--white);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.5rem;
  box-shadow: 0 6px 20px rgba(37,211,102,.45);
  z-index: 1000;
  transition: transform var(--transition), box-shadow var(--transition);
}

.sticky-wa:hover {
  transform: scale(1.1);
  box-shadow: 0 10px 28px rgba(37,211,102,.55);
  color: var(--white);
}

/* ── TOAST ────────────────────────────────────────────────── */
.toast { border-radius: var(--radius) !important; }

/* ── SCROLL PROGRESS BAR ──────────────────────────────────── */
#scrollBar {
  position: fixed;
  top: 0; left: 0;
  height: 3px;
  width: 0%;
  background: linear-gradient(90deg, var(--cyan), var(--aqua));
  z-index: 9999;
  transition: width .1s linear;
}

/* ── MICRO LINKEDIN ───────────────────────────────────────── */
.micro-avatar-link { display: block; flex-shrink: 0; }

.micro-linkedin {
  color: var(--white) !important;
  text-decoration: none;
  transition: color var(--transition);
}
.micro-linkedin:hover { color: var(--cyan) !important; }
.micro-linkedin i { font-size: .8rem; color: #0a66c2; }

/* ── CASE INDUSTRY BADGE ──────────────────────────────────── */
.case-industry {
  display: inline-block;
  font-size: .72rem;
  font-weight: 700;
  letter-spacing: .07em;
  text-transform: uppercase;
  color: var(--cyan-soft);
  background: rgba(0,200,224,.08);
  border: 1px solid rgba(0,200,224,.2);
  padding: .15rem .6rem;
  border-radius: 999px;
  margin-bottom: .4rem;
}

/* ── STACK / LOGOS SECTION ────────────────────────────────── */
.stack-section { background: var(--white); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }

.stack-label {
  font-size: .75rem;
  font-weight: 700;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin: 0;
}

.stack-logos {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem 3rem;
}

.stack-logo-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: .4rem;
  opacity: .65;
  transition: opacity var(--transition), transform var(--transition);
}

.stack-logo-item:hover { opacity: 1; transform: translateY(-3px); }

.stack-logo-item img {
  width: 42px; height: 42px;
  object-fit: contain;
}

.stack-logo-item span {
  font-size: .72rem;
  font-weight: 600;
  color: var(--text-muted);
  letter-spacing: .03em;
}

/* ── UTILITY ──────────────────────────────────────────────── */
.z-1 { z-index: 1; }

/* ── RESPONSIVE ───────────────────────────────────────────── */
@media (max-width: 991px) {
  .hero-h1 { font-size: 2.2rem; }
  .price-card-featured { transform: none; }
  .price-card-featured:hover { transform: translateY(-4px); }
}

@media (max-width: 767px) {
  .hero-h1 { font-size: 1.9rem; }
  .section-title { font-size: 1.6rem; }
  .form-card { padding: 1.8rem 1.2rem; }
  .cta-final-card { padding: 2rem 1.2rem; }
  .benefit-card { padding: .7rem .8rem; }
}

@media (max-width: 480px) {
  .hero-h1 { font-size: 1.65rem; }
  .btn-hero-primary, .btn-hero-secondary { width: 100%; text-align: center; justify-content: center; }
  .micro-trust { flex-direction: column; text-align: center; }
}
