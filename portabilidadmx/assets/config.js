/* ============================================================
   CONFIGURACIÓN — Landing Portabilidad Movistar México
   Campaña Navidad Pospago 2026
   Edita SOLO este archivo. No subas IDs reales a repos públicos
   ni los compartas fuera del canal seguro.
   ============================================================ */

window.LP_CONFIG = {

  companyName: 'Agencia NILO',

  /* ── Canal del botón principal ─────────────────────────
     'vambe'    → abre el web chat de Vambe en la misma página
     'whatsapp' → abre WhatsApp (api.whatsapp.com) con el mensaje prellenado */
  canal: 'whatsapp',

  /* Número de WhatsApp en formato internacional sin + ni espacios.
     Solo se usa si canal = 'whatsapp'.                            */
  whatsapp: '528135472022',

  /* {plan} se reemplaza por el nombre del plan elegido. */
  primerMensaje: 'Hola, quiero cambiarme a Movistar con el {plan}',

  /* Plan que se muestra al entrar. Se puede forzar por URL:
     /portabilidadmx/?plan=pro16  (útil para cada anuncio).       */
  planInicial: 'pro20',

  vambe: {
    clientId:  'PEGA_AQUI_CLIENT_ID',
    channelId: 'PEGA_AQUI_CHANNEL_ID',
    userToken: '',
    overrides: {}
  },

  ads:  { conversionChat: '' },          // 'AW-123456789/AbC-D_efGh12345'
  /* ── Meta pixel ────────────────────────────────────────
     pixelId vacío = no se carga nada de Meta.
     Al hacer clic en el botón de WhatsApp se envían DOS eventos:
       · 'Contact' (estándar) → va en el onclick del botón en index.html; úsalo para optimizar
       · eventoWhatsapp (personalizado)      → para filtrar/reportar el clic
     Ambos llevan: content_name (plan), value (precio) y currency MXN. */
  /* El pixel se instala en el <head> de index.html (PageView). Este ID
     habilita los eventos del clic; debe coincidir con el del <head>.  */
  meta: { pixelId: '1161631842870076', eventoChat: 'Contact', eventoWhatsapp: 'ClickWhatsApp' },

  /* ── Planes de la campaña ───────────────────────────────
     Fuente: CAMPAÑA_NAVIDAD_POSPAGO.pptx + correo del cliente. Precios en MXN.
     nombre: se muestra TAL CUAL (algunos llevan punto final y otros no;
             respetarlo según indicó el cliente).
     'hasta' (inclusive): al vencer, el plan se oculta solo.
     tema: 'light' = fondo papel · 'dark' = fondo azul noche.
     gb: bloque grande de datos (null si la pieza no lo destaca).
         Si dice "ilimitados" se muestra con sello destacado.
     video: sello grande de YouTube (null = no aplica).
     legal: legal propio del plan; se muestra bajo el botón, siempre a la vista.
            Se le agrega "Consulta detalles en movistar.com.mx/tyc/planes".
     adornos: dibujos navideños de la pieza del plan, en este orden de
              posición: arriba-izq, arriba-der, abajo-izq, abajo-der.
              Disponibles: bota, regalo, esfera, campana, arbol, estrella,
              audifonos, copo, destello. */
  planes: [
    {
      id: 'pro11', nombre: 'Plan Pro 11', color: '#9a2f2c', tema: 'light',
      deseo: '¡El plan ideal es para ti!',
      antes: 209, precio: 105, meses: 1,
      gb: { valor: '22 GB', antes: '11 GB', meses: 3 },
      video: null,
      extras: ['WhatsApp, Facebook e Instagram ilimitados', 'Con eSIM'],
      adornos: ['copo', 'regalo', 'bota', 'destello'],
      desde: '2026-11-01', hasta: '2026-12-31',
      legal: 'Del 1 de noviembre al 31 de diciembre de 2026.'
    },
    {
      id: 'pro13', nombre: 'Plan Pro 13.', color: '#4f9f1a', tema: 'light',
      deseo: '¿Otra oportunidad? Deseo cumplido',
      antes: 239, precio: 120, meses: 1,
      gb: { valor: 'GB ilimitados', antes: '13 GB', meses: 12 },
      video: null,
      extras: ['YouTube y TikTok ilimitados x3 meses', 'WhatsApp, Facebook e Instagram ilimitados', 'Con eSIM'],
      adornos: ['destello', 'estrella', 'copo', 'arbol'],
      desde: '2026-11-01', hasta: '2026-12-31',
      legal: 'Del 1 de noviembre al 31 de diciembre de 2026.'
    },
    {
      id: 'pro16', nombre: 'Plan Pro 16', color: '#d93a7a', tema: 'light',
      deseo: 'Deseo más GB para navegar',
      antes: 269, precio: 135, meses: 1,
      gb: { valor: '32 GB', antes: '16 GB', meses: 3 },
      video: null,
      extras: ['YouTube y TikTok ilimitados x3 meses'],
      adornos: ['bota', 'esfera', 'audifonos', 'regalo'],
      desde: '2026-11-13', hasta: '2027-01-15',
      legal: 'Del 13 de noviembre de 2026 al 15 de enero de 2027.'
    },
    {
      id: 'pro20', nombre: 'Plan Pro 20', color: '#e5603f', tema: 'dark',
      deseo: '¿GB ilimitados y a mitad de precio? Deseo cumplido',
      antes: 309, precio: 155, meses: 2,
      gb: { valor: 'GB ilimitados', antes: '20 GB', meses: 2 },
      video: { titulo: 'YouTube Premium', detalle: '3 meses sin costo*' },
      extras: [],
      adornos: ['copo', 'regalo', 'bota', 'destello'],
      desde: '2026-11-13', hasta: '2026-12-24',
      legal: 'Del 13 de noviembre al 24 de diciembre de 2026. *Para nuevos suscriptores de YouTube Premium.'
    },
    {
      id: 'pro30', nombre: 'Plan Pro 30.', color: '#ee8c22', tema: 'dark',
      deseo: 'Deseo cumplido: GB ilimitados',
      antes: 369, precio: 185, meses: 2,
      gb: { valor: 'GB ilimitados', antes: '30 GB', meses: 3 },
      video: { titulo: 'YouTube Premium', detalle: '3 meses sin costo*' },
      extras: [],
      adornos: ['destello', 'campana', 'bota', 'regalo'],
      desde: '2026-11-13', hasta: '2026-12-24',
      legal: 'Del 13 de noviembre al 24 de diciembre de 2026. *Para nuevos suscriptores de YouTube Premium.'
    },
    {
      id: 'proilim', nombre: 'Plan Pro Ilimitado.', color: '#0d2a3f', tema: 'light',
      deseo: '¿Deseas GB ilimitados? Concedido',
      antes: 599, precio: 300, meses: 2,
      gb: { valor: 'GB ilimitados', antes: null, meses: null },
      video: { titulo: 'YouTube Premium', detalle: '3 meses sin costo*' },
      extras: ['Con eSIM'],
      adornos: ['esfera', 'estrella', 'bota', 'audifonos'],
      desde: '2026-11-13', hasta: '2027-01-15',
      legal: 'Del 13 de noviembre de 2026 al 15 de enero de 2027. *Para nuevos suscriptores de YouTube Premium.'
    }
  ]
};
