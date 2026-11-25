/* ============================================================
   Landing Movistar MX — Campaña Navidad Pospago
   Una pantalla · selector de plan · click-to-chat
   Depende de config.js (window.LP_CONFIG)
   ============================================================ */
(function () {
  'use strict';

  var CFG   = window.LP_CONFIG || {};
  var VB    = CFG.vambe || {};
  var META  = CFG.meta || {};
  var CANAL = CFG.canal === 'whatsapp' ? 'whatsapp' : 'vambe';
  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var ES_LOCAL = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);

  /* ─────────────── 1. Planes vigentes ─────────────── */
  var HOY = (function () {
    try { return new Date().toLocaleDateString('en-CA', { timeZone: 'America/Mexico_City' }); }
    catch (e) { return new Date().toISOString().slice(0, 10); }
  })();
  var PLANES = (CFG.planes || []).filter(function (p) {
    return (!p.desde || p.desde <= HOY) && (!p.hasta || p.hasta >= HOY);
  });
  if (!PLANES.length) PLANES = CFG.planes || [];   // nunca dejar la página vacía

  var porId = {};
  PLANES.forEach(function (p) { porId[p.id] = p; });

  var qsPlan = new URLSearchParams(location.search).get('plan');
  var plan = porId[qsPlan] || porId[CFG.planInicial] || PLANES[0];

  /* ─────────────── 2. Config básica en el HTML ─────────────── */
  $$('[data-cfg]').forEach(function (el) {
    var v = CFG[el.getAttribute('data-cfg')];
    if (v) el.textContent = v;
  });

  /* ─────────────── 3. Render ─────────────── */
  var F = {};
  $$('[data-f]').forEach(function (el) { F[el.getAttribute('data-f')] = el; });
  var themeMeta = $('meta[name="theme-color"]');

  /* Nombre sin el punto final: para el mensaje de WhatsApp y la medición
     (en pantalla se muestra tal cual viene en config.js). */
  function nombreTxt(p) { return String(p.nombre).replace(/\.\s*$/, ''); }

  /* ── Adornos navideños (dibujos a mano de las piezas de la campaña) ──
     Trazo con el color del plan (currentColor) y relleno suave. */
  var ADORNOS = {
    bota: '<path d="M20 6h22v9H20z"/><path d="M22 15v19c0 5-9 8-11 14-2 7 5 12 13 10l15-4c7-2 6-10 4-14V15"/><path d="M14 50c4-3 9-3 13 0M23 24h17M23 32h17" fill="none"/>',
    regalo: '<rect x="9" y="27" width="46" height="31" rx="2"/><rect x="5" y="18" width="54" height="10" rx="2"/><path d="M32 18v40M9 42h46" fill="none"/><path d="M32 18c-7-12-19-9-12 0M32 18c7-12 19-9 12 0" fill="none"/>',
    esfera: '<path d="M32 1v6" fill="none"/><rect x="26" y="7" width="12" height="7" rx="2"/><circle cx="32" cy="38" r="22"/><path d="M11 32c5-5 9 5 14 0s9 5 14 0 9 5 14 0M11 44c5-5 9 5 14 0s9 5 14 0 9 5 14 0" fill="none"/>',
    campana: '<circle cx="32" cy="6" r="3" fill="none"/><path d="M32 9c-12 0-16 13-16 25 0 8-6 12-8 16h48c-2-4-8-8-8-16 0-12-4-25-16-25z"/><circle cx="32" cy="55" r="5"/><path d="M18 36c5 3 10-3 14 0s9 3 14 0" fill="none"/>',
    arbol: '<path d="M32 3 18 21h8L12 39h10L6 57h52L42 39h10L38 21h8z"/><path d="M28 57h8v6h-8z"/><circle cx="26" cy="32" r="2"/><circle cx="38" cy="45" r="2"/><circle cx="24" cy="50" r="2"/><circle cx="36" cy="27" r="2"/>',
    estrella: '<path d="M32 4l7 17h18l-14 11 5 18-16-10-16 10 5-18L7 21h18z"/><circle cx="32" cy="28" r="6" fill="none"/><path d="M14 50l-6 10M50 50l6 10M32 42v18" fill="none"/>',
    audifonos: '<path d="M10 40C10 12 54 12 54 40" fill="none"/><rect x="5" y="36" width="12" height="20" rx="5"/><rect x="47" y="36" width="12" height="20" rx="5"/><rect x="23" y="26" width="18" height="32" rx="3"/><path d="M29 36l8 5-8 5z"/>',
    copo: '<path d="M32 4v56M8 18l48 28M8 46l48-28" fill="none"/><path d="M26 9l6 6 6-6M26 55l6-6 6 6M10 26l8 2-2 8M54 38l-8-2 2-8M10 38l8-2-2-8M54 26l-8 2 2 8" fill="none"/>',
    destello: '<path d="M32 4c3 17 9 23 26 28-17 5-23 11-26 28-3-17-9-23-26-28 17-5 23-11 26-28z"/>'
  };
  var SLOTS = ['tl', 'tr', 'bl', 'br'];
  var adornosBox = $('#adornos');
  function pintarAdornos(p) {
    if (!adornosBox) return;
    adornosBox.innerHTML = (p.adornos || []).slice(0, 4).map(function (k, i) {
      if (!ADORNOS[k]) return '';
      return '<svg class="adorno adorno--' + SLOTS[i] + ' adorno--' + k + '" viewBox="0 0 64 64" fill="currentColor" ' +
             'fill-opacity=".16" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
             ADORNOS[k] + '</svg>';
    }).join('');
  }

  function mesesTxt(n) { return 'x' + n + (n === 1 ? ' mes' : ' meses'); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]; }); }

  function render(p) {
    document.body.setAttribute('data-tema', p.tema === 'dark' ? 'dark' : 'light');
    document.documentElement.style.setProperty('--plan', p.color);
    if (themeMeta) themeMeta.setAttribute('content', p.tema === 'dark' ? '#0f2a3d' : '#ece6dd');

    F.deseo.textContent  = p.deseo;
    F.nombre.textContent = p.nombre;
    F.antes.textContent  = '$' + p.antes + '/mes';
    F.precio.textContent = p.precio;
    F.meses.textContent  = mesesTxt(p.meses);
    F.legal.textContent  = p.legal;

    F.gb.classList.toggle('is-ilim', !!(p.gb && /ilimitad/i.test(p.gb.valor)));
    if (p.gb) {
      F.gb.hidden = false;
      F.gbAntes.hidden = !p.gb.antes;
      F.gbAntes.textContent = p.gb.antes || '';
      var ilim = /ilimitad/i.test(p.gb.valor);
      F.gbValor.innerHTML = ilim ? '<span>GB</span><em>ilimitados</em>' : esc(p.gb.valor);
      F.gbMeses.hidden = !p.gb.meses;
      F.gbMeses.textContent = p.gb.meses ? mesesTxt(p.gb.meses) : '';
    } else {
      F.gb.hidden = true;
    }

    if (p.video) {
      F.video.hidden = false;
      F.videoTitulo.textContent  = p.video.titulo || 'YouTube Premium';
      F.videoDetalle.textContent = p.video.detalle || '';
    } else {
      F.video.hidden = true;
    }

    pintarAdornos(p);

    F.extras.innerHTML = (p.extras || []).map(function (x) {
      return '<li' + (/esim/i.test(x) ? ' class="is-esim"' : '') + '>' + esc(x) + '</li>';
    }).join('');

    $$('.pk').forEach(function (b) {
      b.setAttribute('aria-selected', b.getAttribute('data-id') === p.id ? 'true' : 'false');
    });
  }

  function tagDe(p) {
    if (p.gb && p.gb.valor && p.video) return p.gb.valor + ' + ' + (p.video.titulo || 'YouTube');
    if (p.gb && p.gb.valor) return p.gb.valor;
    return (p.extras && p.extras[0]) || '';
  }

  var picker = $('#picker');
  picker.innerHTML = PLANES.map(function (p) {
    return '<button type="button" class="pk" role="tab" data-id="' + esc(p.id) + '" style="--c:' + esc(p.color) + '">' +
             '<span><span class="pk__name"><span class="pk__dot"></span>' + esc(p.nombre.replace('Plan ', '')) + '</span>' +
             '<span class="pk__tag">' + esc(tagDe(p)) + '</span></span>' +
             '<span class="pk__price">$' + p.precio + '<small>/mes</small></span>' +
           '</button>';
  }).join('');

  picker.addEventListener('click', function (e) {
    var b = e.target.closest('.pk');
    if (!b || !porId[b.getAttribute('data-id')]) return;
    plan = porId[b.getAttribute('data-id')];
    render(plan);
    track('plan_select', { plan: nombreTxt(plan) });
    if (b.scrollIntoView) b.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  });

  render(plan);
  var sel = $('.pk[aria-selected="true"]');
  if (sel && picker.scrollWidth > picker.clientWidth) {
    picker.scrollLeft = sel.offsetLeft - (picker.clientWidth - sel.offsetWidth) / 2;
  }

  /* ─────────────── 4. Atribución + tracking ─────────────── */
  var ATTR = (function () {
    var qs = new URLSearchParams(location.search);
    var keys = ['gclid', 'gbraid', 'wbraid', 'fbclid',
                'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
    var out = {};
    keys.forEach(function (k) {
      var v = qs.get(k);
      if (v) { out[k] = v; try { sessionStorage.setItem('lpmx_' + k, v); } catch (e) {} }
      else { try { var s = sessionStorage.getItem('lpmx_' + k); if (s) out[k] = s; } catch (e) {} }
    });
    out.pagina = location.origin + location.pathname;
    out.referrer = document.referrer || '';
    out.pais = 'MX';
    out.campana = 'navidad-pospago-2026';
    return out;
  })();

  function track(eventName, params) {
    var data = Object.assign({}, ATTR, params || {});
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(Object.assign({ event: eventName }, data));
    if (typeof gtag === 'function') gtag('event', eventName, data);
  }
  function conversion(label, params) {
    var id = (CFG.ads || {})[label];
    if (id && typeof gtag === 'function') gtag('event', 'conversion', Object.assign({ send_to: id }, params || {}));
  }

  /* Si el pixel ya viene instalado en el <head> (caso actual), no se vuelve
     a iniciar: así no se duplica el PageView. Esto queda solo como respaldo. */
  if (META.pixelId && typeof window.fbq !== 'function') {
    (function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n; n.loaded = true; n.version = '2.0'; n.queue = [];
      t = b.createElement(e); t.async = true; t.src = v;
      s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', String(META.pixelId));
    fbq('track', 'PageView');
  }
  function metaEvent(nombre, params) {
    if (!META.pixelId || typeof window.fbq !== 'function') return;
    var id = nombre + '.' + Date.now() + '.' + Math.random().toString(36).slice(2, 10);
    try { fbq('track', nombre, params || {}, { eventID: id }); } catch (e) {}
  }
  function metaCustom(nombre, params) {
    if (!META.pixelId || typeof window.fbq !== 'function') return;
    var id = nombre + '.' + Date.now() + '.' + Math.random().toString(36).slice(2, 10);
    try { fbq('trackCustom', nombre, params || {}, { eventID: id }); } catch (e) {}
  }

  /* ─────────────── 5. Chat ─────────────── */
  function mensaje() {
    return String(CFG.primerMensaje || '').replace('{plan}', nombreTxt(plan) + ' ($' + plan.precio + '/mes)').trim();
  }

  var VB_SIN_CONFIG = !VB.clientId || !VB.channelId ||
                      /^PEGA_AQUI/.test(VB.clientId) || /^PEGA_AQUI/.test(VB.channelId);

  if (CANAL === 'vambe' && !VB_SIN_CONFIG) {
    window.embeddedWebchatConfig = Object.assign({
      clientId: VB.clientId, channelId: VB.channelId
    }, VB.userToken ? { userToken: VB.userToken } : {}, VB.overrides || {});
    var sc = document.createElement('script');
    sc.src = 'https://vambeai.com/webchat.js';
    sc.async = true;
    sc.onerror = function () { console.error('[LP-MX] No se pudo cargar el web chat de Vambe.'); };
    document.head.appendChild(sc);
    window.addEventListener('webchatReady', function () { document.body.classList.add('chat-listo'); });
  } else if (CANAL === 'vambe') {
    console.warn('[LP-MX] Falta clientId / channelId de Vambe en assets/config.js: el chat no cargará.');
  }

  var saludoEnviado = false;
  function saludar(intentos) {
    if (saludoEnviado) return;
    var txt = mensaje();
    if (!txt) return;
    if (typeof window.sendMessage !== 'function') {
      if (intentos > 0) setTimeout(function () { saludar(intentos - 1); }, 300);
      return;
    }
    saludoEnviado = true;
    try {
      var r = window.sendMessage(txt);
      if (r && typeof r.catch === 'function') r.catch(function () { saludoEnviado = false; });
    } catch (e) { saludoEnviado = false; }
  }

  function abrirVambe(intentos) {
    if (typeof window.toggleChat !== 'function') {
      if (intentos > 0) setTimeout(function () { abrirVambe(intentos - 1); }, 250);
      else console.error('[LP-MX] El web chat de Vambe no se montó: revisa IDs o "Restringir por origen".');
      return;
    }
    try { window.toggleChat(true); }
    catch (e) { window.dispatchEvent(new CustomEvent('toggleChat', { detail: { setState: true } })); }
    if (typeof window.updateMetadata === 'function') {
      try { window.updateMetadata(Object.assign({ plan: nombreTxt(plan), precio: '$' + plan.precio + ' MXN' }, ATTR)); } catch (e) {}
    }
    setTimeout(function () { saludar(20); }, 450);
  }

  function abrirChat(origen) {
    track('chat_open', { plan: nombreTxt(plan), cta_id: origen || '', canal: CANAL });
    conversion('conversionChat', { value: 1, currency: 'MXN' });
    /* Meta: el evento estándar 'Contact' de WhatsApp va en el onclick del botón
       (index.html), para que se vea en el HTML. Aquí solo se envía el evento propio
       con el plan y precio, y Contact únicamente si el canal es Vambe. */
    var metaParams = {
      content_name: nombreTxt(plan),
      content_ids: [plan.id],
      content_category: 'pospago-navidad',
      value: plan.precio,
      currency: 'MXN',
      canal: CANAL,
      cta: origen || ''
    };
    if (CANAL !== 'whatsapp') metaEvent(META.eventoChat || 'Contact', metaParams);
    else metaCustom(META.eventoWhatsapp || 'ClickWhatsApp', metaParams);

    if (CANAL === 'whatsapp') {
      // El <a> ya navega a WhatsApp con el mensaje (ver actualizarWa); aquí solo medimos.
      return;
    }
    if (VB_SIN_CONFIG) {
      if (ES_LOCAL) alert('Falta pegar clientId y channelId de Vambe en assets/config.js.');
      return;
    }
    abrirVambe(40);
  }

  /* WhatsApp: el href lleva el plan elegido en el mensaje prellenado */
  var WA_NUM = String(CFG.whatsapp || '').replace(/\D/g, '');
  function actualizarWa() {
    if (CANAL !== 'whatsapp' || !WA_NUM) return;
    var url = 'https://api.whatsapp.com/send?phone=' + WA_NUM + '&text=' + encodeURIComponent(mensaje());
    $$('a[data-open-chat]').forEach(function (a) { a.href = url; });
  }
  actualizarWa();
  picker.addEventListener('click', actualizarWa);

  $$('[data-open-chat]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      if (CANAL !== 'whatsapp' && btn.tagName === 'A') e.preventDefault();  // Vambe abre en la página
      abrirChat(btn.getAttribute('data-cta'));
    });
  });

  var engaged = false;
  ['click', 'keydown', 'touchstart'].forEach(function (ev) {
    document.addEventListener(ev, function () {
      if (engaged) return; engaged = true; track('user_engaged');
    }, { once: true, passive: true });
  });
})();
