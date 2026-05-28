/* ═══════════════════════════════════════
   SoHuman WEB2 — main.js
   ═══════════════════════════════════════ */

// ── Lenis smooth scroll ────────────────
const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add(time => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

// ── Navbar ─────────────────────────────
const navbar  = document.getElementById('navbar');
const toggle  = document.getElementById('navToggle');
const mobile  = document.getElementById('navMobile');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('is-scrolled', window.scrollY > 24);
}, { passive: true });

toggle.addEventListener('click', () => {
  const isOpen = mobile.classList.toggle('is-open');
  toggle.setAttribute('aria-expanded', String(isOpen));
});

// ── Smooth scroll (anclas) ─────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;
    lenis.scrollTo(target, { offset: -72, duration: 1.2 });
    mobile.classList.remove('is-open');
  });
});

// ── GSAP ───────────────────────────────
gsap.registerPlugin(ScrollTrigger);

// Hero entrada
gsap.fromTo('.hero-overline',
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: .8, ease: 'power2.out', delay: .2 }
);
const heroH1 = document.querySelector('.hero-text h1');
if (heroH1) {
  gsap.fromTo(heroH1,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out', delay: .35 }
  );
}
gsap.fromTo('.hero-sub',
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: .8, ease: 'power2.out', delay: .7 }
);
gsap.fromTo('.hero-actions',
    { y: 16, opacity: 0 },
    { y: 0, opacity: 1, duration: .7, ease: 'power2.out', delay: .9 }
);

// Foto hero parallax
gsap.to('.hero-photo img', {
  yPercent: 15,
  ease: 'none',
  scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
});

// Franja cita
gsap.fromTo('.franja-cita p',
    { y: 20, opacity: 0 },
    {
      y: 0, opacity: 1, duration: .9, ease: 'power2.out',
      scrollTrigger: { trigger: '.franja-cita', start: 'top 90%' }
    }
);

// Reveals genéricos
document.querySelectorAll('.reveal').forEach(el => {
  const siblings = Array.from(el.parentElement.querySelectorAll('.reveal'));
  const idx = siblings.indexOf(el);
  gsap.fromTo(el,
      { y: 24, opacity: 0 },
      {
        y: 0, opacity: 1, duration: .75, ease: 'power2.out', delay: idx * 0.08,
        scrollTrigger: { trigger: el, start: 'top 97%' }
      }
  );
});

// Overlines
gsap.utils.toArray('.overline').forEach(el => {
  gsap.fromTo(el,
      { x: -16, opacity: 0 },
      { x: 0, opacity: 1, duration: .6, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 97%' } }
  );
});

// Active nav
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-left a, .nav-right a');
new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => {
      link.style.color = link.getAttribute('href') === `#${entry.target.id}`
          ? 'var(--cream)' : '';
    });
  });
}, { threshold: 0.45 }).observe !== undefined &&
sections.forEach(s => {
  new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${entry.target.id}`
            ? 'var(--cream)' : '';
      });
    });
  }, { threshold: 0.45 }).observe(s);
});

// ── i18n ───────────────────────────────
const i18n = {
  es: {
    // Nav
    'nav-metodo':     'Método',
    'nav-mentoria':   'Mentoría',
    'nav-recursos':   'Recursos',
    'nav-sobre':      'Sobre mí',
    'nav-agendar':    'Agendar',
    'nav-cta':        'Quiero ordenar mi vida',

    // Hero
    'hero-overline':  'Mentoría privada',
    'hero-h1':        'Tu expansión necesita una<br><em>nueva forma</em><br>de sostenerte.',
    'hero-sub':       'Acompaño a mujeres en crecimiento a ordenar su identidad, su energía y sus decisiones para vivir con más claridad, coherencia y dirección interna.',
    'hero-btn1':      'Aplica a mentoría',
    'hero-btn2':      'Conoce más →',

    // Conexión
    'conexion-overline': 'Esto es para ti si sabes que no puedes seguir igual...',
    'conexion-1':     'Te estás sosteniendo para todos… pero tú no te sientes bien contigo. Aunque por fuera todo parezca en orden, por dentro sabes que algo no está<em> alineado</em>.',
    'conexion-2':     'Sabes que <em>quieres más</em> de tu vida… pero no sabes cómo construirlo ni sostenerlo. Empiezas, paras, dudas… y vuelves al mismo lugar.',
    'conexion-3':     'Estás cansada de hacerlo <em> sola</em> y de no ver cambios reales. Necesitas <em> claridad</em>, dirección… y alguien que realmente te acompañe a sostenerlo.',

    // Qué hago
    'quehago-overline': '¿Lo que hago?',
    'quehago-h2':     'Te ayudo a cambiar <em>cómo piensas, cómo te ves y cómo actúas...</em> para que tu vida deje de sentirse desconectada y empiece a sentirse tuya.',
    'quehago-p':      'Para que tu vida refleje lo que realmente quieres… y lo puedas sostener.',

    // Método
    'metodo-overline': 'Mi método',
    'metodo-h2':      'Cuatro capas de<em> transformación</em>',
    'metodo-sub':     'No es motivación. Es la estructura interna que sostiene un cambio real.',
    'metodo-sub2':    'No estás perdida. Estás sosteniendo una versión de ti que ya no te representa.',
    'metodo-1-h3':    'Identidad',
    'metodo-1-label': '— QUIÉN ERES',
    'metodo-1-p':     'Revisamos la historia que hoy te define y la <em>reescribimos</em> desde una versión más <em>alineada </em>contigo.',
    'metodo-2-h3':    'Mente',
    'metodo-2-label': '— CÓMO PIENSAS',
    'metodo-2-p':     'Identificamos los <em>patrones </em>que te frenan para que dejes de repetir lo mismo y empieces a <em>avanzar</em> con <em>claridad</em>.',
    'metodo-3-h3':    'Hábitos',
    'metodo-3-label': '— CÓMO ACTÚAS',
    'metodo-3-p':     'Construimos <em>hábitos reales y sostenibles</em> que te acerquen a la vida que dices que quieres.',
    'metodo-4-h3':    'Coherencia',
    'metodo-4-label': '— CÓMO VIVES',
    'metodo-4-p':     'Integramos todo en tu vida real para que el <em>cambio</em> no sea momentáneo.',
    'metodo-test':    '"No necesitaba más información… necesitaba entender qué me estaba pasando. En pocas semanas dejé de sentirme perdida y empecé a tomar decisiones con claridad."',
    'metodo-subBold': 'Si te viste en esto… necesitas empezar a trabajar en ti de verdad.',

    // Servicios
    'servicios-overline': 'Lo que ofrezco',
    'servicios-h2':   'Servicios',
    'servicio-1-h3':   'Mentoría privada',
    'servicio-1-sub':  'Para transformar tu identidad y sostener tu cambio',
    'servicio-1-li1':  'Ya sabes que necesitas un cambio real',
    'servicio-1-li2':  'Estás lista para dejar de vivir en automático',
    'servicio-1-li3':  'Quieres resultados sostenidos',
    'servicio-1-btn':  '→ Aplicar a mentoría',
    'servicio-2-h3':   'Sesión de claridad',
    'servicio-2-sub':  'Para entender qué te está pasando y qué hacer ahora',
    'servicio-2-li1':  'No sabes por dónde empezar',
    'servicio-2-li2':  'Sientes que algo no está alineado',
    'servicio-2-li3':  'Necesitas dirección clara ya',
    'servicio-2-btn':  '→ Agendar sesión',

    // Sobre mí
    'sobre-overline': 'Sobre mí',
    'sobre-h2':       'Soy Elena.',
    'sobre-p1':       'Soy licenciada en Administración de Empresas y durante más de 10 años desarrollé mi carrera en el mundo corporativo, ocupando roles ejecutivos y de gestión.',
    'sobre-p2':       'Tenía un trabajo estable, crecimiento… y estaba enfocada en avanzar, paso a paso, hacia la vida que sabía que quería.',
    'sobre-p3':       'Pero había algo dentro de mí que no encajaba. Veía a otras personas viviendo diferente… más libre, más alineada, más abundante. Y no podía dejar de preguntarme: ¿cómo hacen eso posible?',
    'sobre-p4':       'No era que mi vida estuviera mal. Era que sabía que podía ser más. Ahí empezó todo.',
    'sobre-p5':       'Empecé a cambiar mis hábitos, a cuestionar mi forma de pensar… y a buscar guía que me ayudara a entender cómo construir esa vida que sentía posible.',
    'sobre-p6':       'Ya estaba viviendo fuera de mi país, con una vida que había construido paso a paso. Y aun así… decidí no conformarme. Porque entendí que no importa cómo hayas llegado hasta aquí — si sientes que tu vida puede ser más, ese llamado no se ignora.',
    'sobre-p7':       'Ahí empezó mi verdadero proceso. Adaptarme a una nueva vida, mientras me reconstruía por dentro. Sanar. Romper patrones. Reprogramar mi mente. Y sostenerme… incluso cuando no era fácil.',
    'sobre-p8':       'Porque implicó soltar la versión de mí que ya no podía sostener la vida que quería.',
    'sobre-p9':       'Y en medio de ese proceso… entendí algo más: tenía una capacidad natural para guiar, sostener y acompañar a otros. Empecé ayudando a personas cercanas, desde lo que yo misma estaba viviendo y transformando.',
    'sobre-p10':      'Podía integrar mi experiencia profesional, mi camino de transformación interna y convertirlo en algo más grande. Y con el tiempo… me convertí en la mujer que podía sostener la vida que antes solo imaginaba.',
    'sobre-p11':      'Me formé en neurociencia y en procesos de transformación interna. No solo desde la experiencia, sino desde el conocimiento. Y eso me permitió construir lo que hoy es mi vida: una relación consciente, una familia, sueños cumplidos… y otros que sigo creando.',
    'sobre-p12':      'Hoy acompaño a mujeres que están justo ahí: en ese punto donde sienten que su vida puede ser más… pero necesitan convertirse en la mujer que pueda sostenerlo. Porque no se trata solo de cambiar tu vida. Se trata de convertirte en quien realmente eres.',
    'sobre-btn':      'Aplicar a mentoría privada',

    // Agendar
    'agendar-overline': 'Agenda tu consultoría',
    'agendar-h2':       'Elijamos tu momento',
    'agendar-desc':     'Seleccioná el horario que mejor te quede para tu primera sesión de claridad.',
    'cal-session':      'Sesión de Claridad',
    'cal-duration':     '60 minutos',
    'cal-format':       'Videollamada',
    'cal-timezone':     '🌎 América/Miami',
    'cal-month':        'Mayo 2026',
    'cal-mon': 'Lu', 'cal-tue': 'Ma', 'cal-wed': 'Mi',
    'cal-thu': 'Ju', 'cal-fri': 'Vi', 'cal-sat': 'Sá', 'cal-sun': 'Do',
    'cal-date-label':   'Martes, 12 de mayo',
    'cal-cta':          'Agendar sesión →',
    'cal-wa':           '¿Preguntas? Escríbeme por WhatsApp',

    // Recursos
    'recursos-overline':  'Un recurso para empezar a tu ritmo.',
    'recursos-h2':        'Empieza aquí tu proceso',
    'ebook-1-label':      'Workbook',
    'ebook-1-cover-src':  'images/workbook-soltar.webp',
    'ebook-1-h3':         'Soltar para Expandirte',
    'ebook-1-p':          'Un workbook de <strong><em>6 días</em></strong> para soltar patrones, creencias y heridas que siguen ocupando espacio dentro de ti, y abrirte a más paz, enfoque y expansión.',
    'ebook-1-btn':        'Conoce más',
    'ebook-1-feat1':      'Contenido profundo y transformador',
    'ebook-1-feat2':      'Ejercicios prácticos para tu proceso',
    'ebook-1-feat3':      'Formato digital para siempre',
    'ebook-1-feat4':      'Descarga inmediata después de comprar',
    'ebook-2-label':      'Proceso de 21 días',
    'ebook-2-cover-label':'PROGRAMA · 21 DÍAS',
    'ebook-2-cover-h4':   'De automático<br>a presente',
    'ebook-2-h3':         'De automático a presente',
    'ebook-2-p':          'Un proceso guiado para salir del piloto automático y empezar a vivir con intención.',
    'ebook-2-btn':        'Comenzar mi proceso',
    'ebook-2-feat1':     'Proceso guiado paso a paso',
    'ebook-2-feat2':     '21 días de práctica real',
    'ebook-2-feat3':     'Formato digital para siempre',
    'ebook-2-feat4':     'Acceso inmediato',

    // CTA final
    'final-line-top': 'Puedes seguir igual…',
    'final-line-mid': 'o empezar a convertirte',
    'final-line-bot': '<em>en quien realmente eres.</em>',
    'final-btn':      'Aplicar a mentoría privada',
    'final-note':     'Aplicación breve. Te respondo personalmente',

    // Footer
    'footer-copy':  '© 2026 SoHuman · elenasohuman.com',

    // Modal
    'modal-email-label': 'Correo electrónico',
    'modal-badge':         '⚡ ACCESO INMEDIATO',
    'modal-pay-btn':       'OBTENER ACCESO INMEDIATO',
    'modal-secure':        'Pago seguro · Powered by Stripe',
    'modal-email-heading': 'Ingresa tu correo para continuar',
    'modal-email-sub':     'Te enviaremos el acceso a tu compra y actualizaciones importantes.',
    'modal-privacy':       'No compartimos tu información. Sin spam.',
    'modal-onetime':       'Pago único · Acceso inmediato · Sin suscripción',
    'modal-more-btn':      'Más formas de pago →',
    'trust-1-title':       'Acceso inmediato',
    'trust-1-sub':         'Empieza hoy mismo',
    'trust-2-title':       'Pago seguro',
    'trust-2-sub':         'Con Stripe',
    'modal-cal-h3':      '¡Pago procesado!',
    'modal-cal-p':       'Ahora elige tu fecha y hora con Elena directamente en Cal.com.',
    'modal-cal-btn':     'Elegir fecha en Cal.com →',
    'modal-soon-h3':     'Próximamente',
    'modal-soon-p':      'Los recursos digitales de SoHuman estarán disponibles muy pronto.',
    'modal-soon-btn':    'Avisarme por WhatsApp',
    'modal-continue-btn':  'Continuar →',
    'modal-change-email':  'Cambiar',
    'modal-quick-pay':     'Pago rápido',
    'modal-or-card':       'O paga con tarjeta',
    'modal-error-email':   'Por favor ingresa un correo válido.',
    'modal-error-general': 'Ocurrió un error. Por favor intenta de nuevo.',
    'modal-success-h3':    '¡Pago exitoso!',
    'modal-success-p':     'Gracias por tu compra. Hemos enviado el enlace de descarga a tu correo.',
    'modal-success-sent':  'Enviado',
    'modal-success-tip-t': '¿No ves el correo?',
    'modal-success-tip-p': 'Revisa spam o promociones. Si necesitas ayuda, <a href="mailto:hola@elenasohuman.com" class="suc-link">escríbenos</a>.',
    'modal-success-btn':   'CERRAR',

    // Apply form
    'apply-overline': '— Aplicación a mentoría',
    'apply-title':    'Cuéntame quién eres.',
    'apply-sub':      'Recibirás respuesta en 24h.',
    'apply-name':     'Nombre',
    'apply-email':    'Correo',
    'apply-phone':    'Teléfono',
    'apply-msg':      '¿Qué necesitas sostener ahora mismo?',
    'apply-send':     'Enviar aplicación',
    'apply-fine':     'Tus datos se usan solo para responderte. No spam.',
    'apply-ok-t':     'Recibido.',
    'apply-ok-s':     'Te escribiré desde <a href="mailto:hola@elenasohuman.com">hola@elenasohuman.com</a> en las próximas 24h.',
    'apply-ok-wa-text': '¿Prefieres que te contacte por WhatsApp?',
    'apply-ok-wa-btn': 'Notifícame por WhatsApp',
    'apply-ok-b':     'Cerrar',
    'apply-name-placeholder': 'Tu nombre completo',
    'apply-email-placeholder': 'tu@correo.com',
    'apply-phone-placeholder': 'Tu número de teléfono',
    'apply-msg-placeholder': 'Cuéntame en pocas líneas dónde estás y qué buscas...',
    'wa-general':  'Hola Elena 🤍\n\nTengo una consulta general.',
    'wa-recursos': 'Hola Elena 🤍\n\nMe interesa uno de tus recursos digitales.',
    'wa-apply':    'Hola Elena 🤍\nMi nombre es {name}\n{msg}\n{email}',
  },

  en: {
    // Nav
    'nav-metodo':     'Method',
    'nav-mentoria':   'Mentoring',
    'nav-recursos':   'Resources',
    'nav-sobre':      'About me',
    'nav-agendar':    'Book',
    'nav-cta':        'I want to sort my life',

    // Hero
    'hero-overline':  'Private mentoring',
    'hero-h1':        'Your expansion needs<br><em>a new way</em><br>to sustain itself.',
    'hero-sub':       'I support growing women in organizing their identity, energy, and decisions to live with greater clarity, coherence, and inner direction.',
    'hero-btn1':      'Apply to mentorship',
    'hero-btn2':      'Learn more →',

    // Conexión
    'conexion-overline': 'This is for you if you know you can\'t keep going like this...',
    'conexion-1':     'You\'re holding it together for everyone… but you don\'t feel well within. Even if everything looks in order from the outside, you know something isn\'t <em>aligned</em>.',
    'conexion-2':     'You know <em>you want more</em> from your life… but you don\'t know how to build it or sustain it. You start, stop, doubt… and end up back in the same place.',
    'conexion-3':     'You\'re <em>tired of doing it alone</em> and not seeing real changes. You need <em>clarity</em>, direction… and someone who truly supports you in holding it.',

    // Qué hago
    'quehago-overline': 'What I do?',
    'quehago-h2':     'I help you change <em>how you think, how you see yourself, and how you show up...</em> so your life stops feeling disconnected and starts feeling like yours.',
    'quehago-p':      'So your life reflects what you truly want… and you can sustain it.',

    // Método
    'metodo-overline': 'My method',
    'metodo-h2':      'Four layers <em>of transformation</em>',
    'metodo-sub':     'It\'s not motivation. It\'s the internal structure that holds real change.',
    'metodo-sub2':    'You\'re not lost. You\'re holding a version of yourself that no longer represents you.',
    'metodo-1-h3':    'Identity',
    'metodo-1-label': '— WHO YOU ARE',
    'metodo-1-p':     'We review the story that defines you today and <em>rewrite</em> it from a version more <em>aligned</em> with you.',
    'metodo-2-h3':    'Mind',
    'metodo-2-label': '— HOW YOU THINK',
    'metodo-2-p':     'We identify the <em>patterns</em> that hold you back so you stop repeating the same and start <em>moving forward</em> with <em>clarity</em>.',
    'metodo-3-h3':    'Habits',
    'metodo-3-label': '— HOW YOU ACT',
    'metodo-3-p':     'We build <em>real and sustainable habits</em> that bring you closer to the life you say you want.',
    'metodo-4-h3':    'Coherence',
    'metodo-4-label': '— HOW YOU LIVE',
    'metodo-4-p':     'We integrate everything into your real life so that <em>change</em> isn\'t momentary.',
    'metodo-test':    '"I didn\'t need more information… I needed to understand what was happening to me. Within a few weeks I stopped feeling lost and started making decisions with clarity."',
    'metodo-subBold': 'If you saw yourself in this… you need to start truly working on yourself.',

    // Servicios
    'servicios-overline': 'What I offer',
    'servicios-h2':   'Services',
    'servicio-1-h3':   'Private mentoring',
    'servicio-1-sub':  'To transform your identity and sustain your change',
    'servicio-1-li1':  'You already know you need a real change',
    'servicio-1-li2':  'You\'re ready to stop living on autopilot',
    'servicio-1-li3':  'You want lasting results',
    'servicio-1-btn':  '→ Apply to mentoring',
    'servicio-2-h3':   'Clarity session',
    'servicio-2-sub':  'To understand what\'s happening and what to do now',
    'servicio-2-li1':  'You don\'t know where to start',
    'servicio-2-li2':  'You feel something is out of alignment',
    'servicio-2-li3':  'You need clear direction now',
    'servicio-2-btn':  '→ Book a session',

    // Sobre mí
    'sobre-overline': 'About me',
    'sobre-h2':       'I\'m Elena.',
    'sobre-p1':       'I have a degree in Business Administration and spent over 10 years building my career in the corporate world, holding executive and management roles.',
    'sobre-p2':       'I had a stable job, growth… and I was focused on moving forward, step by step, toward the life I knew I wanted.',
    'sobre-p3':       'But there was something inside me that didn\'t fit. I saw other people living differently… freer, more aligned, more abundant. And I couldn\'t stop asking myself: how do they make that possible?',
    'sobre-p4':       'It wasn\'t that my life was bad. It was that I knew it could be more. That\'s where it all began.',
    'sobre-p5':       'I started changing my habits, questioning my way of thinking… and seeking guidance to understand how to build the life I felt was possible.',
    'sobre-p6':       'I was already living outside my home country, with a life I had built step by step. And still… I decided not to settle. Because I understood that no matter how you got here — if you feel your life can be more, that calling doesn\'t get ignored.',
    'sobre-p7':       'That\'s where my real process began. Adapting to a new life, while rebuilding from within. Healing. Breaking patterns. Reprogramming my mind. And holding myself together… even when it wasn\'t easy.',
    'sobre-p8':       'Because it meant letting go of the version of me that could no longer hold the life I wanted.',
    'sobre-p9':       'And in the middle of that process… I understood something else: I had a natural ability to guide, hold, and support others. I started helping people close to me, from what I myself was living and transforming.',
    'sobre-p10':      'I could integrate my professional experience, my inner transformation journey, and turn it into something bigger. And over time… I became the woman who could hold the life she once only imagined.',
    'sobre-p11':      'I trained in neuroscience and inner transformation processes. Not just from experience, but from knowledge. And that allowed me to build what my life is today: a conscious relationship, a family, dreams fulfilled… and others I\'m still creating.',
    'sobre-p12':      'Today I support women who are right there: at that point where they feel their life can be more… but they need to become the woman who can hold it. Because it\'s not just about changing your life. It\'s about becoming who you truly are.',
    'sobre-btn':      'Apply to private mentoring',

    // Agendar
    'agendar-overline': 'Schedule your consultation',
    'agendar-h2':       'Let\'s find your moment',
    'agendar-desc':     'Select the time that works best for you for your first clarity session.',
    'cal-session':      'Clarity Session',
    'cal-duration':     '60 minutes',
    'cal-format':       'Video call',
    'cal-timezone':     '🌎 America/Miami',
    'cal-month':        'May 2026',
    'cal-mon': 'Mo', 'cal-tue': 'Tu', 'cal-wed': 'We',
    'cal-thu': 'Th', 'cal-fri': 'Fr', 'cal-sat': 'Sa', 'cal-sun': 'Su',
    'cal-date-label':   'Tuesday, May 12',
    'cal-cta':          'Schedule session →',
    'cal-wa':           'Questions? Message me on WhatsApp',

    // Recursos
    'recursos-overline':  'A resource to start at your own pace.',
    'recursos-h2':        'Start your process here',
    'ebook-1-label':      'Workbook',
    'ebook-1-cover-src':  'images/ebookeng.webp',
    'ebook-1-h3':         'Release to Expand',
    'ebook-1-p':          'A&nbsp;<strong><em>6-day</em></strong>&nbsp; workbook to release patterns, beliefs, and wounds that still occupy space within you, and open yourself to more peace, focus, and expansion.',
    'ebook-1-btn':        'Learn more',
    'ebook-1-feat1':      'Deep, transformative content',
    'ebook-1-feat2':      'Practical exercises for your process',
    'ebook-1-feat3':      'Digital format, yours forever',
    'ebook-1-feat4':      'Immediate download after purchase',
    'ebook-2-label':      '21-day process',
    'ebook-2-cover-label':'PROGRAM · 21 DAYS',
    'ebook-2-cover-h4':   'From Autopilot<br>to Present',
    'ebook-2-h3':         'From Autopilot to Present',
    'ebook-2-p':          'A guided process to break out of autopilot and start living with intention.',
    'ebook-2-btn':        'Begin my process',
    'ebook-2-feat1':     'Step-by-step guided process',
    'ebook-2-feat2':     '21 days of real practice',
    'ebook-2-feat3':     'Digital format, yours forever',
    'ebook-2-feat4':     'Immediate access',

     // CTA final
    'final-line-top': 'You can stay the same…',
    'final-line-mid': 'or start becoming',
    'final-line-bot': '<em>who you truly are.</em>',
    'final-btn':      'Apply to private mentoring',
    'final-note':     'Brief application. I\'ll respond personally.',

    // Footer
    'footer-copy':  '© 2026 SoHuman · elenasohuman.com',

    // Modal
    'modal-email-label': 'Email address',
    'modal-badge':         '⚡ INSTANT ACCESS',
    'modal-pay-btn':       'GET INSTANT ACCESS',
    'modal-secure':        'Secure payment · Powered by Stripe',
    'modal-email-heading': 'Enter your email to continue',
    'modal-email-sub':     'We\'ll send your purchase access and important updates.',
    'modal-privacy':       'We never share your info. No spam.',
    'modal-onetime':       'One-time payment · Instant access · No subscription',
    'modal-more-btn':      'More payment options →',
    'trust-1-title':       'Instant access',
    'trust-1-sub':         'Start today',
    'trust-2-title':       'Secure payment',
    'trust-2-sub':         'Powered by Stripe',
    'modal-cal-h3':      'Payment processed!',
    'modal-cal-p':       'Now choose your date and time with Elena directly on Cal.com.',
    'modal-cal-btn':     'Choose date on Cal.com →',
    'modal-soon-h3':     'Coming soon',
    'modal-soon-p':      'SoHuman\'s digital resources will be available very soon.',
    'modal-soon-btn':    'Notify me on WhatsApp',
    'modal-continue-btn':  'Continue →',
    'modal-change-email':  'Change',
    'modal-quick-pay':     'Quick payment',
    'modal-or-card':       'Or pay with card',
    'modal-error-email':   'Please enter a valid email address.',
    'modal-error-general': 'Something went wrong. Please try again.',
    'modal-success-h3':    'Payment successful!',
    'modal-success-p':     'Thank you for your purchase. We\'ve sent your download link to your email.',
    'modal-success-sent':  'Sent',
    'modal-success-tip-t': 'Can\'t find the email?',
    'modal-success-tip-p': 'Check your spam or promotions folder. Need help? <a href="mailto:hello@elenasohuman.com" class="suc-link">Write to us</a>.',
    'modal-success-btn':   'CLOSE',

    // Apply form
    'apply-overline': '— Mentoring application',
    'apply-title':    'Tell me who you are.',
    'apply-sub':      'You\'ll receive a response within 24h.',
    'apply-name':     'Name',
    'apply-email':    'Email',
    'apply-phone':    'Phone number',
    'apply-msg':      'What do you need to hold right now?',
    'apply-send':     'Send application',
    'apply-fine':     'Your data is only used to respond to you. No spam.',
    'apply-ok-t':     'Received.',
    'apply-ok-s':     'I\'ll write to you from <a href="mailto:hola@elenasohuman.com">hola@elenasohuman.com</a> within the next 24h.',
    'apply-ok-wa-text': 'Prefer to be contacted on WhatsApp?',
    'apply-ok-wa-btn': 'Notify me on WhatsApp',
    'apply-ok-b':     'Close',
    'apply-name-placeholder': 'Your full name',
    'apply-email-placeholder': 'your@email.com',
    'apply-phone-placeholder': 'Your phone number',
    'apply-msg-placeholder': 'Tell me in a few lines where you are and what you seek...',
    'wa-general':  'Hi Elena 🤍\n\nI have a general inquiry.',
    'wa-recursos': 'Hi Elena 🤍\n\nI\'m interested in one of your digital resources.',
    'wa-apply':    'Hi Elena 🤍\nMy name is {name}\n{msg}\n{email}',
  }
};

let currentLang = 'es';

function applyLang(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (i18n[lang][key] !== undefined) el.innerHTML = i18n[lang][key];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (i18n[lang][key] !== undefined) el.placeholder = i18n[lang][key];
  });
  document.querySelectorAll('[data-i18n-src]').forEach(el => {
    const key = el.getAttribute('data-i18n-src');
    if (i18n[lang][key] !== undefined) el.src = i18n[lang][key];
  });
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('is-active', btn.dataset.lang === lang);
  });
  const WA_BASE = 'https://api.whatsapp.com/send?phone=17867372251&text=';
  document.querySelectorAll('[data-wa-msg]').forEach(el => {
    const key = el.getAttribute('data-wa-msg');
    if (i18n[lang][key] !== undefined) {
      el.href = WA_BASE + encodeURIComponent(i18n[lang][key]);
    }
  });
}

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => applyLang(btn.dataset.lang));
});

// Apply language: prefer ?lang= URL param, fallback to 'es'
const _urlParams = new URLSearchParams(window.location.search);
const _urlLang   = _urlParams.get('lang');
if (_urlLang === 'en' || _urlLang === 'es') {
  // Strip only the lang param, keep any other params (e.g. ?modal=apply)
  _urlParams.delete('lang');
  const _remaining = _urlParams.toString();
  history.replaceState(null, '', window.location.pathname + (_remaining ? '?' + _remaining : '') + window.location.hash);
}
applyLang(_urlLang === 'en' ? 'en' : 'es');

// ── Stripe checkout ────────────────────
const STRIPE_PK  = 'pk_test_51TbTxiKoRL1wkNvR9igq8QpjAUlkmPl26wXsijHqxSKR19x8Vto14KwfQ7iocdzyxaZbUIrV3FX7aEEE3r15Rx4k009kXo3PA3';
const WORKER_URL = 'https://api.elenasohuman.com/create-payment-intent';

const PRODUCTS = {
  ebook1: {
    name:    { es: 'Soltar para Expandirte', en: 'Let Go to Grow' },
    desc:    { es: 'Un programa digital para soltar lo que ya no te sirve y vivir con más claridad, libertad y propósito.', en: 'A digital program to release what no longer serves you and live with more clarity, freedom and purpose.' },
    price:   '$37 USD',
    priceId: 'price_1TbTzVKoRL1wkNvRKcSHwEbL',
    image:   { es: 'images/soltarmodal.webp', en: 'images/ebookmodaleng.webp' },
  },
  ebook2: {
    name:    { es: 'De automático a presente', en: 'From Autopilot to Present' },
    desc:    { es: 'Programa digital de 21 días para salir del piloto automático y reconectar contigo.', en: '21-day digital program to break autopilot patterns and reconnect with yourself.' },
    price:   '$127 USD',
    priceId: 'price_1TbU37KoRL1wkNvR7Vupwpi0',
    image:   { es: 'images/soltarmodal.webp', en: 'images/ebookmodaleng.webp' },
  },
};

let stripe          = null;
let stripeElements  = null;
let stripePaymentEl = null;
let currentPriceId  = null;
let currentEmail    = '';

function ensureStripe() {
  if (stripe) return Promise.resolve(stripe);
  if (typeof Stripe !== 'undefined') {
    stripe = Stripe(STRIPE_PK);
    return Promise.resolve(stripe);
  }
  return new Promise((resolve, reject) => {
    const existing = document.querySelector('script[src*="js.stripe.com"]');
    if (existing) {
      existing.addEventListener('load', () => { stripe = Stripe(STRIPE_PK); resolve(stripe); });
      existing.addEventListener('error', () => reject(new Error('No se pudo cargar Stripe.')));
      return;
    }
    const s = document.createElement('script');
    s.src = 'https://js.stripe.com/v3/';
    s.onload = () => { stripe = Stripe(STRIPE_PK); resolve(stripe); };
    s.onerror = () => reject(new Error('No se pudo cargar Stripe.'));
    document.head.appendChild(s);
  });
}

function getStripe() {
  if (!stripe) {
    if (typeof Stripe === 'undefined') throw new Error('Stripe no cargó. Recarga la página.');
    stripe = Stripe(STRIPE_PK);
  }
  return stripe;
}

const STRIPE_APPEARANCE = {
  theme: 'flat',
  variables: {
    colorPrimary:       '#AF4828',
    colorBackground:    '#ffffff',
    colorText:          '#272727',
    colorTextSecondary: '#777777',
    colorDanger:        '#AF4828',
    colorIconCardError: '#AF4828',
    fontFamily:         '"Montserrat", sans-serif',
    fontSizeBase:       '14px',
    spacingUnit:        '5px',
    borderRadius:       '8px',
  },
  rules: {
    '.Input': {
      border: '1.5px solid #e5ddd6',
      backgroundColor: '#faf8f6',
      boxShadow: 'none',
      padding: '10px 12px',
    },
    '.Input:focus': {
      border: '1.5px solid #c4975a',
      boxShadow: 'none',
      outline: 'none',
    },
    '.Input--invalid': {
      border: '1.5px solid #AF4828',
    },
    '.Label': {
      fontSize: '10px',
      fontWeight: '600',
      color: '#999',
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      marginBottom: '5px',
    },
    '.Tab': {
      border: '1.5px solid #e5ddd6',
      backgroundColor: '#faf8f6',
      boxShadow: 'none',
      padding: '10px 16px',
    },
    '.Tab:hover':          { backgroundColor: '#F4EAE4', border: '1.5px solid #d4c4bc' },
    '.Tab--selected':      { border: '1.5px solid #AF4828', backgroundColor: '#fff', boxShadow: 'none' },
    '.TabLabel':           { color: '#555', fontSize: '13px' },
    '.TabLabel--selected': { color: '#AF4828', fontWeight: '600' },
    '.TabIcon--selected':  { fill: '#AF4828' },
    '.Block':              { backgroundColor: '#faf8f6', border: '1.5px solid #e5ddd6', borderRadius: '8px' },
  },
};

let stripeExpressEl = null;

function handlePaymentSuccess() {
  const sucEmail = document.getElementById('suc-email-display');
  if (sucEmail) sucEmail.textContent = currentEmail;
  document.getElementById('modal-step-form').style.display    = 'none';
  document.getElementById('modal-step-success').style.display = 'block';
  checkoutModal.querySelector('.modal-box').scrollTop = 0;
  destroyPaymentEl();
}

function destroyPaymentEl() {
  if (stripeExpressEl)  { stripeExpressEl.destroy();  stripeExpressEl  = null; }
  if (stripePaymentEl)  { stripePaymentEl.destroy();  stripePaymentEl  = null; }
  stripeElements = null;
}

async function mountPaymentElement(clientSecret) {
  destroyPaymentEl();
  const s = await ensureStripe();
  stripeElements = s.elements({ appearance: STRIPE_APPEARANCE, clientSecret, locale: currentLang });

  // ── Express Checkout Element (Google Pay / Apple Pay) ──
  stripeExpressEl = stripeElements.create('expressCheckout', {
    buttonType:      { googlePay: 'pay', applePay: 'buy' },
    buttonHeight:    48,
    layout:          { maxColumns: 1, maxRows: 1 },
    paymentMethods:  { link: 'never', amazonPay: 'never' },
  });

  const expressSection = document.getElementById('co-express-section');
  const errEl          = document.getElementById('stripe-card-errors');

  stripeExpressEl.on('ready', ({ availablePaymentMethods }) => {
    const hasWallets = availablePaymentMethods &&
      Object.values(availablePaymentMethods).some(Boolean);
    if (expressSection) expressSection.style.display = hasWallets ? 'block' : 'none';
  });

  stripeExpressEl.on('confirm', async () => {
    try {
      const { error, paymentIntent } = await s.confirmPayment({
        elements: stripeElements,
        confirmParams: {
          return_url: 'https://elenasohuman.com?pago=exitoso',
          payment_method_data: { billing_details: { email: currentEmail } },
        },
        redirect: 'if_required',
      });
      if (error) throw new Error(error.message);
      if (paymentIntent?.status === 'succeeded') handlePaymentSuccess();
    } catch (err) {
      if (errEl) errEl.textContent = err.message || i18n[currentLang]['modal-error-general'];
    }
  });

  stripeExpressEl.mount('#express-checkout-element');

  // ── Payment Element (solo tarjeta, sin wallets) ──
  stripePaymentEl = stripeElements.create('payment', {
    layout: { type: 'tabs', defaultCollapsed: false },
    fields: { billingDetails: { email: 'never' } },
    defaultValues: { billingDetails: { email: currentEmail } },
    wallets: { applePay: 'never', googlePay: 'never', link: 'never' },
  });

  const payBtn = document.getElementById('stripe-pay-btn');
  payBtn.disabled = true;
  stripePaymentEl.on('ready', () => { payBtn.disabled = false; });
  stripePaymentEl.mount('#payment-element');
}

const checkoutModal = document.getElementById('checkout-modal');

function openCheckout(productKey) {
  const product = PRODUCTS[productKey];
  if (!product) return;
  currentPriceId = product.priceId;
  currentEmail   = '';

  document.getElementById('modal-title').textContent = product.name[currentLang] || product.name.es;
  const descEl = document.getElementById('modal-desc');
  if (descEl) descEl.textContent = (product.desc?.[currentLang] || product.desc?.es || '');
  document.getElementById('modal-price').textContent  = product.price;
  document.getElementById('modal-price').style.display = 'block';
  const badgeEl = document.querySelector('#modal-step-form .co-badge');
  if (badgeEl) badgeEl.textContent = i18n[currentLang]['modal-badge'] || '⚡ ACCESO INMEDIATO';
  const imgEl = document.getElementById('modal-product-img');
  if (imgEl) {
    const imgSrc = product.image?.[currentLang] || product.image?.es || '';
    imgEl.src = imgSrc;
    imgEl.style.display = imgSrc ? 'block' : 'none';
  }
  document.getElementById('checkout-email').value     = '';
  document.getElementById('stripe-card-errors').textContent = '';

  // Reset to email step
  document.getElementById('sf-step-email').style.display   = 'block';
  document.getElementById('sf-step-payment').style.display = 'none';
  resetContinueBtn();

  document.getElementById('modal-step-form').style.display    = 'block';
  document.getElementById('modal-step-soon').style.display    = 'none';
  document.getElementById('modal-step-cal').style.display     = 'none';
  document.getElementById('modal-step-success').style.display = 'none';
  checkoutModal.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  checkoutModal.querySelector('.modal-box').scrollTop = 0;
}

function openSessionCalendar() {
  document.getElementById('modal-step-form').style.display = 'none';
  document.getElementById('modal-step-cal').style.display  = 'block';
  checkoutModal.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  checkoutModal.querySelector('.modal-box').scrollTop = 0;
}

function closeCheckout() {
  checkoutModal.classList.remove('is-open');
  document.body.style.overflow = '';
  destroyPaymentEl();
}

function resetContinueBtn() {
  const btn = document.getElementById('sf-continue-btn');
  btn.disabled = false;
  btn.innerHTML = `<span>${i18n[currentLang]['modal-continue-btn'] || 'Continuar →'}</span>`;
}

function resetPayBtn() {
  const btn = document.getElementById('stripe-pay-btn');
  btn.disabled = false;
  btn.innerHTML = `
    <svg viewBox="0 0 20 20" fill="none" width="16" height="16"><rect x="2" y="5" width="16" height="12" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M2 9h16" stroke="currentColor" stroke-width="1.5"/></svg>
    <span>${i18n[currentLang]['modal-pay-btn'] || 'OBTENER ACCESO INMEDIATO'}</span>`;
}

// Step 1 — validar email y crear PaymentIntent
document.getElementById('sf-continue-btn').addEventListener('click', async () => {
  const email = document.getElementById('checkout-email').value.trim();
  const errEl = document.getElementById('stripe-card-errors');

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errEl.textContent = i18n[currentLang]['modal-error-email'] || 'Por favor ingresa un correo válido.';
    return;
  }

  currentEmail = email;
  errEl.textContent = '';
  const btn = document.getElementById('sf-continue-btn');
  btn.disabled = true;
  btn.innerHTML = '<span class="sf-spinner"></span>';

  try {
    const res  = await fetch(WORKER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId: currentPriceId, customerEmail: email, lang: currentLang }),
    });
    const text = await res.text();
    let data   = {};
    try { data = JSON.parse(text); } catch { /* */ }

    if (!data.clientSecret) throw new Error(data.error || `HTTP ${res.status}`);

    await mountPaymentElement(data.clientSecret);

    document.getElementById('sf-email-display').textContent = email;
    document.getElementById('sf-step-email').style.display   = 'none';
    document.getElementById('sf-step-payment').style.display = 'block';
    resetPayBtn();
    checkoutModal.querySelector('.modal-box').scrollTop = 0;

  } catch (err) {
    console.error('[checkout]', err);
    errEl.textContent = i18n[currentLang]['modal-error-general'] || 'Ocurrió un error. Por favor intenta de nuevo.';
    resetContinueBtn();
  }
});

// Cambiar email — vuelve al paso 1
document.getElementById('sf-change-email').addEventListener('click', () => {
  destroyPaymentEl();
  document.getElementById('stripe-card-errors').textContent = '';
  document.getElementById('sf-step-payment').style.display = 'none';
  document.getElementById('sf-step-email').style.display   = 'block';
  resetContinueBtn();
});

// Step 2 — confirmar pago
document.getElementById('stripe-pay-btn').addEventListener('click', async () => {
  const errEl = document.getElementById('stripe-card-errors');
  const btn   = document.getElementById('stripe-pay-btn');
  btn.disabled = true;
  btn.innerHTML = '<span class="sf-spinner"></span>';
  errEl.textContent = '';

  try {
    const s = await ensureStripe();
    const { error, paymentIntent } = await s.confirmPayment({
      elements: stripeElements,
      confirmParams: {
        return_url: 'https://elenasohuman.com?pago=exitoso',
        payment_method_data: { billing_details: { email: currentEmail } },
      },
      redirect: 'if_required',
    });

    if (error) throw new Error(error.message);

    if (paymentIntent && paymentIntent.status === 'succeeded') {
      handlePaymentSuccess();
    }
  } catch (err) {
    console.error('[checkout]', err);
    errEl.textContent = err.message || i18n[currentLang]['modal-error-general'] || 'Ocurrió un error. Por favor intenta de nuevo.';
    resetPayBtn();
  }
});

document.querySelectorAll('.ebook-buy-btn').forEach(btn => {
  btn.addEventListener('click', () => openCheckout(btn.dataset.productKey));
});

document.getElementById('stripe-more-btn')?.addEventListener('click', async () => {
  const btn    = document.getElementById('stripe-more-btn');
  const errEl  = document.getElementById('stripe-card-errors');
  btn.disabled = true;
  btn.textContent = '…';
  errEl.textContent = '';
  try {
    const res  = await fetch('https://api.elenasohuman.com/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId: currentPriceId, customerEmail: currentEmail, lang: currentLang }),
    });
    const text = await res.text();
    let data = {};
    try { data = JSON.parse(text); } catch { /* */ }
    if (!data.url) throw new Error(data.error || `HTTP ${res.status}`);
    window.location.href = data.url;
  } catch (err) {
    errEl.textContent = i18n[currentLang]['modal-error-general'] || 'Ocurrió un error. Por favor intenta de nuevo.';
    btn.disabled = false;
    btn.textContent = i18n[currentLang]['modal-more-btn'] || 'Más formas de pago →';
  }
});

checkoutModal.addEventListener('click', e => { if (e.target === checkoutModal) closeCheckout(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeCheckout(); });

// ── Redireccion post-checkout Stripe ───
if (new URLSearchParams(window.location.search).get('pago') === 'exitoso') {
  const params  = new URLSearchParams(window.location.search);
  const email   = params.get('email');
  // Limpiar la URL sin recargar la página
  history.replaceState(null, '', window.location.pathname);
  // Mostrar email si viene en la URL
  const sucEmailRow     = document.querySelector('.suc-email-row');
  const sucEmailDisplay = document.getElementById('suc-email-display');
  if (email && sucEmailDisplay) {
    sucEmailDisplay.textContent = email;
  } else if (sucEmailRow) {
    sucEmailRow.style.display = 'none';
  }
  // Mostrar modal en paso de éxito
  document.getElementById('modal-step-form').style.display    = 'none';
  document.getElementById('modal-step-success').style.display = 'block';
  checkoutModal.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

// ── Apply modal ────────────────────────
const applyModal = document.getElementById('apply-modal');
const applyForm = document.getElementById('applyForm');
const applySuccess = document.getElementById('applySuccess');

let lastSubmitData = null;
let phoneInput = null;

function initPhoneInput() {
  const el = document.getElementById('applyPhone');
  if (!el || phoneInput) return;

  // Destruir instancia previa si existe
  if (phoneInput) {
    phoneInput.destroy();
    phoneInput = null;
  }

  phoneInput = window.intlTelInput(el, {
    initialCountry: 'us',
    separateDialCode: true,
    formatAsYouType: true,
    formatOnDisplay: true,
    strictMode: true,
    onlyCountries: ['ve','us','es','mx','co','ar','cl','pe','ec','pa','it','fr','de','gb','br','cr','do','gt','hn','ni','pr','py','sv','uy','pt','ie','at','be','ch','se','no','dk','fi','nl','pl','ro','cz','hu','bg','hr','sk','si','rs','ua','il','ae','in','cn','jp','kr','au','nz','ca','za'],
    dropdownContainer: applyModal,
    loadUtils: () =>
        import("https://cdn.jsdelivr.net/npm/intl-tel-input@27.1.3/dist/js/utils.js"),
  });

}

function openApply() {
  initPhoneInput();
  applyModal.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  applyModal.querySelector('.modal-box').scrollTop = 0;
  applyForm.style.display = '';
  applySuccess.style.display = 'none';
  lastSubmitData = null;
}

function closeApply() {
  applyModal.classList.remove('is-open');
  document.body.style.overflow = '';
  setTimeout(() => {
    applyForm.reset();
    if (phoneInput) phoneInput.destroy();
    phoneInput = null;
    applyForm.style.display = '';
    applySuccess.style.display = 'none';
    lastSubmitData = null;
  }, 300);
}

document.querySelectorAll('.apply-trigger').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    openApply();
  });
});

document.getElementById('applyClose').addEventListener('click', closeApply);
document.getElementById('applySuccessClose').addEventListener('click', closeApply);

applyModal.addEventListener('click', e => { if (e.target === applyModal) closeApply(); });

document.getElementById('applyWaBtn').addEventListener('click', () => {
  if (!lastSubmitData) return;
  const { name, email, msg } = lastSubmitData;
  const template = i18n[currentLang]['wa-apply'] || i18n['es']['wa-apply'];
  const waText = encodeURIComponent(
    template.replace('{name}', name).replace('{msg}', msg).replace('{email}', email)
  );
  window.open(`https://api.whatsapp.com/send?phone=17867372251&text=${waText}`, '_blank');
});

applyForm.addEventListener('submit', e => {
  e.preventDefault();
  const name = applyForm.name.value.trim();
  const email = applyForm.email.value.trim();
  let fullPhone = '';

  // Obtener el número del input directamente (intl-tel-input separa el dial code visualmente)
  const inputValue = applyForm.phone.value.trim();

  if (phoneInput) {
    try {
      const countryData = phoneInput.getSelectedCountryData();
      const dialCode = countryData.dialCode;

      if (inputValue) {
        fullPhone = dialCode ? `+${dialCode} ${inputValue}` : inputValue;
      }
    } catch (err) {
      fullPhone = inputValue;
    }
  } else {
    fullPhone = inputValue;
  }

  const msg = applyForm.msg.value.trim();

  lastSubmitData = { name, email, phone: fullPhone, msg };

  // 1. Enviar email via tu Cloudflare Worker
  const WORKER_URL = 'https://falling-grass-8414.hello-sohuman.workers.dev';

  fetch(WORKER_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nombre: name,
      correo: email,
      telefono: fullPhone,
      mensaje: msg,
    }),
  }).catch(() => {
    // Si falla el worker, el botón de WhatsApp sigue funcionando
  });

  // 2. Mostrar éxito (sin abrir WhatsApp automáticamente)
  applyForm.style.display = 'none';
  applySuccess.style.display = 'block';
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && applyModal.classList.contains('is-open')) closeApply();
});

// Abrir desde links page (?modal=apply)
if (new URLSearchParams(window.location.search).get('modal') === 'apply') {
  history.replaceState(null, '', window.location.pathname);
  setTimeout(() => openApply(), 400);
}

// ── Servicio info modal (reusable) ────
const servicioInfoModal = document.getElementById('servicio-info-modal');

const servicioContent = {
  mentoria: {
    overline: { es: 'Mentoría privada', en: 'Private mentoring' },
    tagline: { es: 'Proceso profundo de reestructuración de identidad.', en: 'Deep identity restructuring process.' },
    intro: { es: 'Un proceso de 8 semanas para transformar cómo piensas, decides y vives.', en: 'An 8-week process to transform how you think, decide, and live.' },
    body: { es: 'Trabajamos contigo de forma 1:1 en las áreas clave de tu vida: identidad, emociones, relaciones, propósito, hábitos y dirección, para que lo que quieres por dentro se sostenga en tu vida real.', en: 'We work with you 1:1 in the key areas of your life: identity, emotions, relationships, purpose, habits, and direction, so that what you want on the inside is sustained in your real life.' },
    transitions: { es: 'Incluyendo momentos de transición como maternidad, cambios personales o expansión de vida.', en: 'Including transition moments such as motherhood, personal changes, or life expansion.' },
    section1Title: { es: 'Estructura del proceso:', en: 'Process structure:' },
    section1: {
      es: ['8 sesiones semanales 1:1 (90 minutos cada una)', 'Acompañamiento cercano durante todo el proceso', 'Seguimiento semanal para sostener tu avance', 'Definición de metas claras y camino accionable'],
      en: ['8 weekly 1:1 sessions (90 minutes each)', 'Close support throughout the entire process', 'Weekly follow-up to sustain your progress', 'Clear goal definition and actionable path'],
    },
    section2Title: { es: 'Durante estas semanas:', en: 'During these weeks:' },
    section2: {
      es: ['Ordenamos lo que estás viviendo', 'Identificamos patrones y bloqueos', 'Tomamos decisiones más alineadas', 'Construimos hábitos que puedas sostener'],
      en: ['We sort out what you are going through', 'We identify patterns and blocks', 'We make more aligned decisions', 'We build habits you can sustain'],
    },
    closing: { es: 'No es información, es transformación.', en: "It's not information, it's transformation." },
    for: { es: 'Para mujeres que están listas para hacerse cargo de su cambio <br> y dejar de vivir en automático.', en: 'For women who are ready to take charge of their change and stop living on autopilot.' },
    cta: { es: 'Aplicar a mentoría →', en: 'Apply to mentoring →' },
    ctaAction: 'apply',
  },
  ebook1: {
    overline: { es: 'Workbook', en: 'Workbook' },
    tagline:  { es: 'No todo lo que cargas te pertenece.', en: 'Not everything you carry belongs to you.' },
    intro:    { es: 'Si sientes que hay una parte de ti que ya no encaja con la vida que quieres construir, este workbook es para ti.', en: 'If you feel that part of you no longer fits the life you want to build, this workbook is for you.' },
    body:     { es: 'Soltar también es crecer. Una guía digital de trabajo interno para ayudarte a identificar lo que hoy limita tu expansión y empezar a soltarlo con más conciencia, claridad e intención.', en: 'Letting go is also growing. A digital inner work guide to help you identify what limits your expansion today and start releasing it with more awareness, clarity, and intention.' },
    transitions: { es: '', en: '' },
    section1Title: { es: 'Este workbook es para ti si…', en: 'This workbook is for you if…' },
    section1: {
      es: [
        'Sientes que estás lista para una nueva etapa, pero algo dentro de ti todavía te frena.',
        'Reconoces patrones emocionales o mentales que se repiten y ya no quieres seguir cargando.',
        'Te cuesta avanzar con claridad porque sigues sosteniendo heridas, culpas o historias del pasado.',
        'Sabes que ya no eres la misma, pero todavía no has soltado del todo tu vieja identidad.',
        'Quieres cerrar ciclos internos de una forma más consciente, madura y real.',
        'Deseas sentirte más ligera, más clara y más disponible para expandirte.',
      ],
      en: [
        'You feel ready for a new stage, but something inside you still holds you back.',
        'You recognize emotional or mental patterns that repeat and you no longer want to carry them.',
        'You struggle to move forward with clarity because you\'re still holding onto wounds, guilt, or past stories.',
        'You know you\'re no longer the same, but you haven\'t fully let go of your old identity.',
        'You want to close internal cycles in a more conscious, mature, and real way.',
        'You want to feel lighter, clearer, and more available to expand.',
      ],
    },
    section2Title: { es: 'Incluye:', en: 'Includes:' },
    section2: {
      es: [
        'Ejercicios guiados de reflexión y trabajo interno',
        'Identificación de patrones, creencias y bloqueos',
        'Espacios para reconocer heridas que aún ocupan espacio en ti',
        'Preguntas de conciencia para ayudarte a soltar',
        'Herramientas para cerrar ciclos internos',
        'Prácticas de integración para pensar, sentir y vivir distinto',
        'Un recurso al que puedes volver cada vez que necesites recalibrarte',
      ],
      en: [
        'Guided reflection and inner work exercises',
        'Identification of patterns, beliefs, and blocks',
        'Spaces to recognize wounds that still occupy space within you',
        'Awareness questions to help you let go',
        'Tools to close internal cycles',
        'Integration practices to think, feel, and live differently',
        'A resource you can return to whenever you need to recalibrate',
      ],
    },
    closing: { es: 'Hay etapas que no se abren haciendo más. Se abren cuando por fin sueltas lo que ya no te corresponde cargar.', en: 'Some stages don\'t open by doing more. They open when you finally release what is no longer yours to carry.' },
    for:     { es: 'Soltar para Expandirte está creado para ayudarte a cerrar ciclos internos, crear más espacio dentro de ti y abrirte a una nueva forma de pensar, sentir y vivir.<br><br>Si sabes que ya no quieres seguir cargando lo que limita tu expansión, este es tu momento para empezar distinto.', en: 'Release to Expand is created to help you close internal cycles, create more space within you, and open yourself to a new way of thinking, feeling, and living.<br><br>If you know you no longer want to carry what limits your expansion, this is your moment to start differently.' },
    cta:     { es: 'Quiero empezar este proceso →', en: 'I want to start this process →' },
    ctaAction: 'ebook1',
    cover: { es: 'images/soltarmodal.webp', en: 'images/ebookmodaleng.webp' },
  },
  claridad: {
    overline: { es: 'Sesión de claridad', en: 'Clarity session' },
    tagline: { es: 'Para ordenar tu vida y tomar dirección con claridad.', en: 'To organize your life and move forward with clarity.' },
    intro: { es: 'Un espacio 1:1 enfocado en ayudarte a salir del ruido y entender con claridad qué está pasando en tu vida y hacia dónde necesitas moverte.', en: 'A 1:1 space focused on helping you step out of the noise and clearly understand what is happening in your life and where you need to move.' },
    body: { es: 'No es una llamada introductoria, es un espacio de trabajo real contigo.', en: "It's not an introductory call, it's a real working space with you." },
    transitions: { es: 'Especialmente si sientes que te has desconectado de ti en medio de los cambios que estás viviendo.', en: 'Especially if you feel you have disconnected from yourself amid the changes you are living.' },
    section1Title: { es: 'En esta sesión:', en: 'In this session:' },
    section1: {
      es: ['Ordenamos lo que estás viviendo', 'Identificamos bloqueos y patrones', 'Definimos qué quieres realmente', 'Trazamos un camino claro para avanzar'],
      en: ['We sort out what you are going through', 'We identify blocks and patterns', 'We define what you truly want', 'We map a clear path forward'],
    },
    section2Title: { es: 'Incluye:', en: 'Includes:' },
    section2: {
      es: ['Sesión 1:1 (90 minutos)', 'Aterrizaje de metas y dirección', 'Recomendación clara de siguientes pasos'],
      en: ['1:1 session (90 minutes)', 'Landing of goals and direction', 'Clear recommendation for next steps'],
    },
    closing: { es: 'Sales con claridad, enfoque y decisiones más alineadas.', en: 'You leave with clarity, focus, and more aligned decisions.' },
    for: { es: 'Ideal si estás en un punto de cambio y necesitas entender qué hacer ahora.', en: 'Ideal if you are at a turning point and need to understand what to do now.' },
    cta: { es: 'Agendar sesión →', en: 'Book a session →' },
    ctaAction: 'agendar',
  },
};

let currentServicio = null;

function renderServicioInfo(key) {
  const data = servicioContent[key];
  const lang = currentLang;

  const coverEl = document.getElementById('servicioInfoCover');
  const coverImg = document.getElementById('servicioInfoCoverImg');
  if (data.cover) {
    coverImg.src = typeof data.cover === 'object' ? data.cover[lang] : data.cover;
    coverEl.style.display = 'block';
  } else {
    coverEl.style.display = 'none';
  }

  document.getElementById('servicioInfoOverline').textContent = data.overline[lang];
  document.getElementById('servicioInfoTagline').textContent = data.tagline[lang];
  document.getElementById('servicioInfoIntro').textContent = data.intro[lang];
  document.getElementById('servicioInfoBody').textContent = data.body[lang];

  const transEl = document.getElementById('servicioInfoTransitions');
  if (data.transitions[lang]) {
    transEl.textContent = data.transitions[lang];
    transEl.style.display = '';
  } else {
    transEl.style.display = 'none';
  }

  document.getElementById('servicioInfoSection1Title').textContent = data.section1Title[lang];
  const list1 = document.getElementById('servicioInfoList1');
  list1.innerHTML = '';
  data.section1[lang].forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    list1.appendChild(li);
  });

  document.getElementById('servicioInfoSection2Title').textContent = data.section2Title[lang];
  const list2 = document.getElementById('servicioInfoList2');
  list2.innerHTML = '';
  data.section2[lang].forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    list2.appendChild(li);
  });

  document.getElementById('servicioInfoClosing').textContent = data.closing[lang];
  document.getElementById('servicioInfoFor').innerHTML = data.for[lang];
  document.getElementById('servicioInfoCta').textContent = data.cta[lang];

  currentServicio = key;
}

function openServicioInfo(key) {
  renderServicioInfo(key);
  servicioInfoModal.classList.add('is-open');
  const scrollY = window.scrollY;
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollY}px`;
  document.body.style.width = '100%';
  document.body.dataset.scrollY = scrollY;
  lenis.stop();
  servicioInfoModal.querySelector('.modal-box').scrollTop = 0;
}

function closeServicioInfo() {
  servicioInfoModal.classList.remove('is-open');
  const scrollY = parseInt(document.body.dataset.scrollY || '0', 10);
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
  window.scrollTo(0, scrollY);
  lenis.start();
  currentServicio = null;
}

document.querySelectorAll('.servicio-info-trigger').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    openServicioInfo(btn.dataset.servicio);
  });
});

document.getElementById('servicioInfoClose').addEventListener('click', closeServicioInfo);

servicioInfoModal.addEventListener('click', e => { if (e.target === servicioInfoModal) closeServicioInfo(); });

document.getElementById('servicioInfoCta').addEventListener('click', () => {
  const action = currentServicio;
  closeServicioInfo();
  if (action === 'mentoria') {
    setTimeout(() => openApply(), 300);
  } else if (action === 'claridad') {
    setTimeout(() => lenis.scrollTo('#agendar', { offset: -72, duration: 1.2 }), 300);
  } else if (action === 'ebook1') {
    setTimeout(() => openCheckout('ebook1'), 300);
  }
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && servicioInfoModal.classList.contains('is-open')) closeServicioInfo();
});
