/* ============================================================
   42NT Solutions — script.js
   Funcionalidades:
   - Navbar scroll + scroll progress bar
   - AOS animations init
   - Character counter (textarea)
   - Lead scoring automático
   - Detección de empresa desde email
   - Tracking de origen del lead (UTM)
   - Envío a Formspree (correo)
   - Envío a Google Apps Script (Google Sheets)
   - Confirmación sin recarga + Toast Bootstrap
   - Preparado para CRM / integración futura
============================================================ */

/* ── CONFIGURACIÓN ─────────────────────────────────────────
   Reemplaza estos valores con los tuyos reales:
   - FORMSPREE_ID: obtén el tuyo en https://formspree.io
   - GOOGLE_SCRIPT_URL: despliega tu Apps Script como webapp
     y pega aquí la URL
────────────────────────────────────────────────────────── */
const CONFIG = {
  FORMSPREE_URL:     'https://formspree.io/f/xdawnkgn',
  GOOGLE_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbw2ubrpLp9K7LIOFsttr_aMOtVleO1rP3UP7WA8N_4AuTS73Rnj2aVb37ekiOcrd8WG/exec',
  USE_GOOGLE_SHEETS: true,
};

/* ─────────────────────────────────────────────────────────
   SCROLL PROGRESS BAR
───────────────────────────────────────────────────────── */
(function initScrollBar() {
  const bar = document.createElement('div');
  bar.id = 'scrollBar';
  document.body.prepend(bar);

  window.addEventListener('scroll', () => {
    const scrollTop  = window.scrollY;
    const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
    const pct        = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width  = pct + '%';
  }, { passive: true });
})();

/* ─────────────────────────────────────────────────────────
   NAVBAR — scroll effect
───────────────────────────────────────────────────────── */
(function initNavbar() {
  const nav = document.getElementById('mainNav');
  if (!nav) return;

  function toggleScrolled() {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  }

  window.addEventListener('scroll', toggleScrolled, { passive: true });
  toggleScrolled();
})();

/* ─────────────────────────────────────────────────────────
   AOS — animaciones al hacer scroll
───────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  if (typeof AOS !== 'undefined') {
    AOS.init({ once: true, duration: 750, offset: 60 });
  }
});

/* ─────────────────────────────────────────────────────────
   CHARACTER COUNTER — textarea descripción
───────────────────────────────────────────────────────── */
(function initCharCounter() {
  const textarea = document.getElementById('descripcion');
  const counter  = document.getElementById('charCounter');
  if (!textarea || !counter) return;

  textarea.addEventListener('input', () => {
    const len = textarea.value.length;
    counter.textContent = `${len} / 500`;
    counter.style.color = len >= 450 ? '#ef4444' : '';
  });
})();

/* ─────────────────────────────────────────────────────────
   UTILIDADES
───────────────────────────────────────────────────────── */

/** Extrae el dominio del email → detecta empresa */
function getDomainFromEmail(email) {
  const freeProviders = [
    'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com',
    'live.com', 'icloud.com', 'me.com', 'protonmail.com',
    'outlook.cl', 'gmail.cl'
  ];
  const parts = email.split('@');
  if (parts.length < 2) return '';
  const domain = parts[1].toLowerCase().trim();
  return freeProviders.includes(domain) ? 'correo personal' : domain;
}

/** Calcula el lead score (0–100) según los campos del form */
function calcLeadScore(formData) {
  let score = 0;

  // Tamaño empresa
  const tamano = formData.get('tamano_empresa') || '';
  if (tamano === '200+')   score += 35;
  if (tamano === '51-200') score += 25;
  if (tamano === '11-50')  score += 12;
  if (tamano === '1-10')   score += 5;

  // Urgencia
  const urgency = formData.get('urgency') || '';
  if (urgency === 'esta-semana') score += 30;
  if (urgency === '2-4-semanas') score += 18;
  if (urgency === '1-3-meses')   score += 8;

  // Necesidad
  const necesidad = formData.get('necesidad') || '';
  if (necesidad !== '') score += 10;

  // WhatsApp provisto → más intención de contacto
  const wa = formData.get('whatsapp') || '';
  if (wa.replace(/\D/g, '').length >= 8) score += 10;

  // Descripción no vacía → mayor contexto → lead calificado
  const desc = formData.get('descripcion') || '';
  if (desc.trim().length > 40) score += 10;

  // Email corporativo (dominio propio)
  const email = formData.get('email') || '';
  const domain = getDomainFromEmail(email);
  if (domain && domain !== 'correo personal') score += 5;

  return Math.min(score, 100);
}

/** Clasifica el score como texto */
function scoreLabel(score) {
  if (score >= 70) return 'CALIENTE';
  if (score >= 40) return 'TIBIO';
  return 'FRÍO';
}

/** Lee el utm_source (u otro parámetro) de la URL */
function getLeadSource() {
  const p = new URLSearchParams(window.location.search);
  const source   = p.get('utm_source')   || 'direct';
  const medium   = p.get('utm_medium')   || '';
  const campaign = p.get('utm_campaign') || '';
  const ref      = document.referrer     || '';
  return { source, medium, campaign, referrer: ref };
}

/* ─────────────────────────────────────────────────────────
   FORMSPREE — envío de correo
───────────────────────────────────────────────────────── */
async function sendToFormspree(formData) {
  const res = await fetch(CONFIG.FORMSPREE_URL, {
    method: 'POST',
    body: formData,
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Formspree error ${res.status}`);
  }
  return res.json();
}

/* ─────────────────────────────────────────────────────────
   GOOGLE APPS SCRIPT — registro en Google Sheets
   El script de Google debe aceptar POST con JSON y guardar
   cada campo como columna. Instrucciones en README.
───────────────────────────────────────────────────────── */
async function sendToGoogleSheets(payload) {
  if (!CONFIG.USE_GOOGLE_SHEETS || !CONFIG.GOOGLE_SCRIPT_URL) return;

  // Apps Script recibe datos vía e.parameter → necesita form-urlencoded, NO JSON
  const params = new URLSearchParams(payload);

  await fetch(CONFIG.GOOGLE_SCRIPT_URL, {
    method: 'POST',
    body: params,
    // Sin mode:'no-cors' para poder detectar errores de red
  });
}

/* ─────────────────────────────────────────────────────────
   TOAST — mostrar notificación Bootstrap
───────────────────────────────────────────────────────── */
function showToast(msg, type = 'success') {
  const toastEl = document.getElementById('formToast');
  if (!toastEl) return;

  const body = toastEl.querySelector('.toast-body');
  if (body && msg) body.innerHTML = `<i class="bi bi-check-circle-fill me-2"></i>${msg}`;

  toastEl.className = `toast align-items-center text-bg-${type} border-0`;

  const toast = bootstrap.Toast.getOrCreateInstance(toastEl, { delay: 5000 });
  toast.show();
}

/* ─────────────────────────────────────────────────────────
   BOTÓN SUBMIT — estado loading / reset
───────────────────────────────────────────────────────── */
function setSubmitLoading(btn, loading) {
  if (!btn) return;
  if (loading) {
    btn.disabled = true;
    btn.dataset.originalHtml = btn.innerHTML;
    btn.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status"></span>Enviando...`;
  } else {
    btn.disabled = false;
    btn.innerHTML = btn.dataset.originalHtml || btn.innerHTML;
  }
}

/* ─────────────────────────────────────────────────────────
   FORM — validación visual inline
───────────────────────────────────────────────────────── */
function validateForm(form) {
  let valid = true;
  form.querySelectorAll('[required]').forEach(field => {
    if (!field.value.trim()) {
      field.classList.add('is-invalid');
      valid = false;
    } else {
      field.classList.remove('is-invalid');
    }
  });
  return valid;
}

/* ─────────────────────────────────────────────────────────
   FORM SUBMIT — lógica principal
───────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const form      = document.getElementById('quoteForm');
  const submitBtn = document.getElementById('submitBtn');
  if (!form) return;

  // Limpiar invalid en cambio de valor
  form.querySelectorAll('[required]').forEach(field => {
    field.addEventListener('input', () => field.classList.remove('is-invalid'));
    field.addEventListener('change', () => field.classList.remove('is-invalid'));
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateForm(form)) {
      const firstInvalid = form.querySelector('.is-invalid');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    setSubmitLoading(submitBtn, true);

    // ── Construir FormData enriquecido ─────────────────────
    const formData = new FormData(form);

    const email           = (formData.get('email') || '').trim();
    const empresaDetected = getDomainFromEmail(email);
    const score           = calcLeadScore(formData);
    const label           = scoreLabel(score);
    const tracking        = getLeadSource();
    const timestamp       = new Date().toLocaleString('es-CL', { timeZone: 'America/Santiago' });

    // Campos ocultos enriquecidos
    formData.set('lead_score',        `${score} — ${label}`);
    formData.set('empresa_detectada', empresaDetected);
    formData.set('utm_source',        tracking.source);
    formData.set('utm_medium',        tracking.medium);
    formData.set('utm_campaign',      tracking.campaign);
    formData.set('referrer',          tracking.referrer);
    formData.set('timestamp_cl',      timestamp);
    formData.set('_subject',          `Nuevo lead 42NT — Score ${score} (${label}) — ${formData.get('empresa') || 'sin empresa'}`);

    // ── Payload para Google Sheets (JSON plano) ────────────
    const sheetsPayload = {
      timestamp:         timestamp,
      nombre_cargo:      formData.get('nombre_cargo') || '',
      empresa:           formData.get('empresa') || '',
      empresa_detectada: empresaDetected,
      email:             email,
      whatsapp:          formData.get('whatsapp') || '',
      industria:         formData.get('industria') || '',
      tamano_empresa:    formData.get('tamano_empresa') || '',
      necesidad:         formData.get('necesidad') || '',
      fuente_datos:      formData.get('fuente_datos') || '',
      urgencia:          formData.get('urgency') || '',   // nombre unificado para Apps Script
      descripcion:       formData.get('descripcion') || '',
      lead_score:        score,
      lead_label:        label,
      utm_source:        tracking.source,
      utm_medium:        tracking.medium,
      utm_campaign:      tracking.campaign,
      referrer:          tracking.referrer,
      user_agent:        navigator.userAgent,             // detectar bots / dispositivo
    };

    // ── Envíos ─────────────────────────────────────────────
    try {
      // 1. Formspree (correo)
      await sendToFormspree(formData);

      // 2. Google Sheets (paralelo, no bloquea si falla)
      sendToGoogleSheets(sheetsPayload).catch(err =>
        console.warn('Google Sheets: no se pudo registrar.', err)
      );

      // ── Éxito ──────────────────────────────────────────
      form.reset();

      // Ocultar form y mostrar mensaje de confirmación
      form.style.display = 'none';

      const successEl = document.getElementById('formSuccess');
      if (successEl) {
        successEl.style.display = 'block';
        successEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      showToast('¡Cotización enviada! Te contactamos en un máximo de 24 horas hábiles.', 'success');

    } catch (err) {
      console.error('Error al enviar formulario:', err);

      // Fallback WhatsApp si Formspree falla
      const nombre   = (formData.get('nombre_cargo') || '').trim();
      const empresa  = (formData.get('empresa') || '').trim();
      const necesidad = (formData.get('necesidad') || '').trim();
      const waMsg    = encodeURIComponent(
        `Hola Fortunato, soy ${nombre} de ${empresa}. Quiero cotizar: ${necesidad}.`
      );

      showToast(
        `Ocurrió un problema al enviar el formulario. <a href="https://wa.me/56948827168?text=${waMsg}" target="_blank" class="text-white fw-bold">Escríbenos por WhatsApp</a> y te atenderemos de inmediato.`,
        'danger'
      );
    } finally {
      setSubmitLoading(submitBtn, false);
    }
  });
});

/* ─────────────────────────────────────────────────────────
   OPTIONAL FIELDS TOGGLE
───────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn     = document.getElementById('toggleOptional');
  const optionalBlock = document.getElementById('optionalFields');
  if (!toggleBtn || !optionalBlock) return;

  // Aseguramos estado inicial correcto
  optionalBlock.style.display = 'none';

  toggleBtn.addEventListener('click', () => {
    const isOpen = optionalBlock.style.display === 'block';

    if (isOpen) {
      optionalBlock.style.display = 'none';
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.querySelector('i').className = 'bi bi-plus-circle me-1';
    } else {
      // Bootstrap col-12 necesita display:block explícito
      optionalBlock.style.display = 'block';
      optionalBlock.style.padding = '0';  // evitar doble padding de col
      toggleBtn.setAttribute('aria-expanded', 'true');
      toggleBtn.querySelector('i').className = 'bi bi-dash-circle me-1';
    }
  });
});

/* ─────────────────────────────────────────────────────────
   SMOOTH SCROLL para links internos (#)
───────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const collapse = document.getElementById('navMenu');
      if (collapse && collapse.classList.contains('show') && typeof bootstrap !== 'undefined') {
        const bsCollapse = bootstrap.Collapse.getOrCreateInstance(collapse);
        bsCollapse.hide();
      }

      const navHeight = document.getElementById('mainNav')?.offsetHeight || 70;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 8;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
});
