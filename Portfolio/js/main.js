/* ================================================================
   PORTFOLIO HODA KHARBOUCHE — main.js
================================================================ */

/* ── PROGRESS BAR ── */
const prog = document.getElementById('reading-progress');
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
  if (prog) prog.style.width = Math.min(pct, 100) + '%';
}, { passive: true });

/* ── NAVBAR ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ── ACTIVE NAV ── */
const sections = document.querySelectorAll('section[id]');
const links = document.querySelectorAll('.nav-link');
if (sections.length) {
  const secObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting)
        links.forEach(l => l.classList.toggle('active', l.dataset.section === e.target.id));
    });
  }, { rootMargin: '-42% 0px -55% 0px', threshold: 0 });
  sections.forEach(s => secObs.observe(s));
}

/* ── HAMBURGER ── */
const ham = document.getElementById('hamburger');
const navList = document.getElementById('nav-links');
if (ham && navList) {
  ham.addEventListener('click', () => {
    const open = navList.classList.toggle('open');
    ham.classList.toggle('open', open);
    ham.setAttribute('aria-expanded', String(open));
  });
  navList.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navList.classList.remove('open');
    ham.classList.remove('open');
    ham.setAttribute('aria-expanded', 'false');
  }));
}

/* ── TYPING EFFECT ── */
const phrases = [
  'Étudiante BUT Science des Données',
  'Alternante Enedis · Data & Énergie',
  'DataViz · Statistiques · Art visuel'
];
const tel = document.getElementById('typing-text');
if (tel) {
  // Insert cursor
  tel.insertAdjacentHTML('afterend', '<span class="cursor" aria-hidden="true">|</span>');
  let pi = 0, ci = 0, del = false;
  function type() {
    const cur = phrases[pi];
    tel.textContent = del ? cur.substring(0, ci - 1) : cur.substring(0, ci + 1);
    del ? ci-- : ci++;
    if (!del && ci === cur.length) setTimeout(() => { del = true; }, 2800);
    else if (del && ci === 0) { del = false; pi = (pi + 1) % phrases.length; }
    setTimeout(type, del ? 52 : 90);
  }
  type();
}

/* ── SCROLL REVEAL ── */
const revObs = new IntersectionObserver((entries, obs) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const delay = parseInt(e.target.dataset.delay || 0, 10);
    setTimeout(() => e.target.classList.add('visible'), delay);
    obs.unobserve(e.target);
  });
}, { threshold: 0.06, rootMargin: '0px 0px -20px 0px' });

function observeReveal() {
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => revObs.observe(el));
}
observeReveal();

/* ── PROJECTS — accordion timeline ── */
const projects = [
  // ══════════════════════════════════════════
  // 1ère Année (11 projets)
  // ══════════════════════════════════════════
  {
    y: 1,
    title: "Présentation en anglais d'un territoire économique et culturel",
    desc: "Ce projet en équipe avait pour but de présenter la situation socio-économique, culturelle et historique de la ville de Rome. La première partie, rédigée en anglais, couvre les aspects démographiques, météorologiques et macroéconomiques, tandis que la seconde, en français, traite des dynamiques culturelles. Ce travail m'a permis de développer des compétences clés en analyse de données socio-économiques, en synthèse d'informations et en communication interculturelle.",
    image_url: "images/project1.jpg"
  },
  {
    y: 1,
    title: "Gestion & Nettoyage de Fichiers (JSON vers CSV)",
    desc: "Manipulation et transformation d'un jeu de données complexes au format JSON fourni par la Caisse Nationale de l'Assurance Maladie (CNAM) vers un format CSV structuré (séparateur point-virgule). Ce projet, réalisé en Python, m'a permis d'automatiser des pipelines de nettoyage de données de grande envergure et de répondre rigoureusement aux exigences techniques et fonctionnelles d'un donneur d'ordre.",
    image_url: "images/project2.jpg"
  },
  {
    y: 1,
    title: "Régression sur des données réelles immobilières",
    desc: "Modélisation et prédiction des prix de l'immobilier parisien à partir de transactions réelles du premier semestre 2023. Divisé en fichiers d'entraînement ('train') et de test ('test'), l'objectif était de bâtir un modèle prédictif optimal sous R. Ce projet intègre une démarche scientifique rigoureuse, l'analyse exploratoire graphique, l'exportation des prédictions dans un fichier 'prediction.csv' et la rédaction d'un rapport méthodologique évaluatif.",
    image_url: "images/project3.jpg"
  },
  {
    y: 1,
    title: "Création d'un outil de reporting académique en VBA/Excel",
    desc: "Conception et développement en équipe d'un outil automatisé de gestion et de suivi des notes pour les étudiants de première année en BUT Science des Données. L'application calcule automatiquement la moyenne générale ainsi que les moyennes spécifiques aux trois compétences du diplôme pour déterminer les admissions en année supérieure. L'essentiel des automatisations et de la logique métier a été programmé en VBA sous Excel.",
    image_url: "images/project4.jpg"
  },
  {
    y: 1,
    title: "Concours Dataviz Météo France",
    desc: "Participation à un concours national de datavisualisation inter-BUT SD. Notre étude s'est portée sur l'impact du réchauffement climatique dans les régions montagneuses (Hautes-Alpes et Hautes-Pyrénées). Après nettoyage de l'historique de Météo France, nous avons conçu sous Power BI un tableau de bord interactif mettant en évidence l'augmentation des températures moyennes annuelles et les variations des précipitations saisonnières sur plusieurs décennies.",
    image_url: "images/project5.jpg"
  },
  {
    y: 1,
    title: "Mise en œuvre d'une enquête statistique",
    desc: "Conception et déploiement d'une enquête complète dédiée au logement étudiant et à leurs habitudes. Les phases de collecte et de saisie ont été centralisées sur le logiciel Sphinx. Nous avons ensuite mené des analyses statistiques approfondies, notamment sur les corrélations liées à l'utilisation du téléphone portable par les étudiants, avant de synthétiser les résultats dans un compte rendu clair et structurant.",
    image_url: "images/project6.jpg"
  },
  {
    y: 1,
    title: "Production et analyse de données socio-économiques",
    desc: "Étude approfondie et multidimensionnelle des facteurs structurels du chômage en Martinique. Ce projet a mis en lumière l'impact des barrières d'insertion chez les jeunes, du niveau d'éducation, de la précarité des TPE/PME locales ainsi que des problématiques majeures de mobilité et de transports. Le livrable propose des préconisations stratégiques axées sur la formation et les infrastructures.",
    image_url: "images/project7.jpg"
  },
  {
    y: 1,
    title: "Implémentation d'une base de données relationnelle",
    desc: "Mise en place d'une infrastructure de base de données relationnelle sous MySQL. Le projet a nécessité la modélisation des schémas et la rédaction de requêtes SQL complexes pour l'insertion et l'indexation. De plus, un script Python sur mesure a été développé pour lire, parser et intégrer automatiquement de volumineux fichiers CSV externes directement dans l'instance MySQL.",
    image_url: "images/project8.jpg"
  },
  {
    y: 1,
    title: "Projet Échantillonnage et Estimation",
    desc: "Production d'une modélisation statistique sous R visant à estimer la population globale de la région Haut-de-France à partir d'un échantillon restreint de 100 communes. Le projet a permis de comparer concrètement l'efficacité et la variance de deux approches méthodologiques majeures : l'échantillonnage aléatoire simple et l'échantillonnage aléatoire stratifié, basés sur les données officielles au 1er janvier 2024.",
    image_url: "images/project9.jpg"
  },
  {
    y: 1,
    title: "Analyse de données, reporting et datavisualisation",
    desc: "Création d'un outil complet d'analyse de l'accidentologie routière dans une municipalité française. En combinant des calculs statistiques sous R pour valider la représentativité de l'échantillon face à la population nationale et des scripts de manipulation sous Python, nous avons identifié les profils à risque et les facteurs contributifs majeurs, avant de déployer un dashboard d'aide à la décision sous Power BI.",
    image_url: "images/project10.jpg"
  },
  {
    y: 1,
    title: "Analyse financière et indicateurs de performance",
    desc: "Réalisation d'un diagnostic financier approfondi de l'entreprise Poujoulat dans le cadre d'un module d'économie. Le projet a consisté à analyser et structurer le tableau des Soldes Intermédiaires de Gestion (SIG), le bilan fonctionnel ainsi que le calcul de ratios de rentabilité, de liquidité et de structure financière afin de cartographier la performance et la solvabilité de l'organisation.",
    image_url: "images/project11.jpg"
  },

  // ══════════════════════════════════════════
  // 2ème Année (4 projets)
  // ══════════════════════════════════════════
  {
    y: 2,
    title: "Séries Chronologiques — Importations Sud-Africaines",
    desc: "Analyse conjoncturelle et modélisation de l'évolution des importations de l'Afrique du Sud (2008-2023) face aux chocs mondiaux (crise des subprimes, COVID-19) via des données OCDE. Utilisation de modèles quadratiques combinés à des indices de saisonnalité pour lisser les variations mensuelles et produire des prévisions macroéconomiques fiables sous Excel et R, validées par l'analyse de la variance.",
    image_url: "images/project12.jpg"
  },
  {
    y: 2,
    title: "Plans d'Expérience — Optimisation d'une recette",
    desc: "Optimisation scientifique d'une formule alimentaire (cookies) en appliquant la méthodologie des plans d'expérience en binôme. Analyse de quatre facteurs clés : température, temps de cuisson, type et pourcentage de chocolat. Implémentation de plans factoriels complets (2², 2⁴) et fractionnaires (2⁴⁻¹), modélisation des surfaces de réponse et ANOVA pour isoler les interactions optimales.",
    image_url: "images/project13.jpg"
  },
  {
    y: 2,
    title: "Conformité Réglementaire et Protection des Données (RGPD)",
    desc: "Audit de conformité juridique appliqué à la gestion des données personnelles contenues dans les contrats et formulaires d'une organisation. Centralisation sur la transparence des traitements, la définition des durées de conservation et la sécurisation des bases légales. Gestion avancée du recueil du consentement (libre, éclairé, rétractable) et implémentation du droit à l'effacement des personnes.",
    image_url: "images/project14.jpg"
  },
  {
    y: 2,
    title: "SIG — Étude géographique des restaurants McDonald's en France",
    desc: "Analyse spatiale autonome de l'accessibilité et de la répartition des franchises McDonald's sur le territoire français. À l'aide d'un Système d'Information Géographique (QGIS) et de scripts Python, j'ai croisé les données des communes, des départements et du réseau ferroviaire pour générer des cartes thématiques de densité par habitant, fournissant des indicateurs d'implantation stratégique.",
    image_url: "images/project15.jpg"
  },

  // ══════════════════════════════════════════
  // 3ème Année (5 projets avec intégrations Streamlit)
  // ══════════════════════════════════════════
  {
    y: 3,
    title: "Migration de données : SQL vers un modèle NoSQL (MongoDB)",
    desc: "Modernisation de l'infrastructure de données du réseau de transport parisien face aux flux IoT massifs (horizon 2055). Audit SQL complet d'un existant relationnel SQLite, restructuration complète vers un modèle de documents JSON dénormalisé et optimisé, et développement d'un pipeline ETL en Python pour assurer la transition fluide des indicateurs (retards, émissions CO₂).",
    image_url: "images/project16.jpg"
  },
  {
    y: 3,
    title: "Chatbot Portfolio basé sur l'architecture RAG",
    desc: "Développement d'un agent conversationnel intelligent conçu pour guider les recruteurs à travers mon parcours professionnel. Implémentation d'une architecture RAG (Retrieval-Augmented Generation) couplée à un prompt engineering rigoureux pour éliminer les hallucinations. Intégration du découpage documentaire, d'embeddings sémantiques et d'un stockage vectoriel.",
    image_url: "images/CHATBOT.png",
    streamlit_url: "https://github.com/HODA-KHAR/Chatbot-Portfolio-Hoda"
  },
  {
    y: 3,
    title: "Prévision de l'activité quotidienne d'IMA : Modélisation statistique",
    desc: "Anticipation des flux opérationnels d'Inter Mutuelles Assistance à partir d'un historique (2013-2024). Feature engineering avancé incluant la reconstruction statistique de l'anomalie de l'année 2020 (confinements) et l'intégration de variables exogènes. Confrontation de modèles Elastic Net et XGBoost (retenu pour sa précision face aux pics d'activité) avec restitution Power BI.",
    image_url: "images/project17.jpg"
  },
  {
    y: 3,
    title: "Classification d'images par Deep Learning",
    desc: "Benchmark de vision par ordinateur sur le dataset Wang (1 000 images thématiques). Développement d'une baseline classique (descripteurs de texture FCTH combinés à un réseau Perceptron Multicouche sous Keras) atteignant 80% de précision, surpassée par une architecture end-to-end de Réseau de Neurones Convolutionnel (CNN) optimisé avec AdamW et Dropout, atteignant 87% de précision.",
    image_url: "images/project18.jpg"
  },
  {
    y: 3,
    title: "Analyse socio-nutritionnelle & Activité physique",
    desc: "Déploiement d'une application décisionnelle interactive sous Qlik Sense valorisant un panel de 4 114 individus. Optimisation avancée du modèle de données étoilé pour éliminer les tables redondantes et les clés synthétiques (synthetic keys), et programmation d'indicateurs de segmentation dynamique calculant les écarts d'apports caloriques face aux métabolismes de base théoriques.",
    image_url: "images/project19.jpg"
  }
];

let currentYear = 1;

function renderTimeline(year) {
  const list = document.getElementById('proj-timeline');
  if (!list) return;
  list.innerHTML = '';

  const filtered = projects.filter(p => p.y === year);

  filtered.forEach((proj, i) => {
    const row = document.createElement('div');
    row.className = 'proj-row';
    row.setAttribute('role', 'listitem');

    const num = String(i + 1).padStart(2, '0');

    // Image : balise <img> si image_url défini, sinon placeholder
    const imgHTML = proj.image_url
      ? `<img
           class="proj-row-img"
           src="${proj.image_url}"
           alt="Aperçu — ${proj.title}"
           loading="lazy"
           onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"
         >
         <div class="proj-row-img-placeholder" style="display:none">Image<br>indisponible</div>`
      : `<div class="proj-row-img-placeholder">Aperçu<br>du projet</div>`;

    row.innerHTML = `
      <div class="proj-row-head" role="button" tabindex="0" aria-expanded="false">
        <span class="proj-row-idx">${num}</span>
        <span class="proj-row-title">${proj.title}</span>
        <span class="proj-row-arrow" aria-hidden="true">+</span>
      </div>
      <div class="proj-row-body" aria-hidden="true">
        <p class="proj-row-desc">${proj.desc}</p>
        <div class="proj-row-img-wrap">${imgHTML}</div>
      </div>
    `;

    // Toggle open/close
    const head = row.querySelector('.proj-row-head');
    head.addEventListener('click', () => toggleRow(row));
    head.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleRow(row); } });

    list.appendChild(row);

    // Stagger reveal
    setTimeout(() => row.classList.add('proj-row--in'), i * 40);
  });
}

function toggleRow(row) {
  const isOpen = row.classList.contains('open');
  // Close all others
  document.querySelectorAll('.proj-row.open').forEach(r => {
    if (r !== row) {
      r.classList.remove('open');
      r.querySelector('.proj-row-head').setAttribute('aria-expanded', 'false');
      r.querySelector('.proj-row-body').setAttribute('aria-hidden', 'true');
    }
  });
  row.classList.toggle('open', !isOpen);
  row.querySelector('.proj-row-head').setAttribute('aria-expanded', String(!isOpen));
  row.querySelector('.proj-row-body').setAttribute('aria-hidden', String(isOpen));
}

// Year selector buttons
const yrBtns = document.querySelectorAll('.yr-btn');
yrBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const y = parseInt(btn.dataset.year, 10);
    if (y === currentYear) return;
    currentYear = y;
    yrBtns.forEach(b => {
      b.classList.toggle('active', b === btn);
      b.setAttribute('aria-pressed', String(b === btn));
    });
    renderTimeline(y);
  });
});

// Initial render
renderTimeline(1);

/* ── RADAR CHART ── */
let chartDone = false;
function initChart() {
  if (chartDone || !window.Chart) return;
  const canvas = document.getElementById('skillsRadar');
  if (!canvas) return;
  chartDone = true;
  new Chart(canvas, {
    type: 'radar',
    data: {
      labels: ['Python', 'R', 'Power BI', 'SQL', 'Stats', 'SIG', 'VBA', 'RGPD'],
      datasets: [{
        data: [85, 80, 92, 75, 87, 68, 70, 72],
        backgroundColor: 'rgba(122,92,58,.12)',
        borderColor: 'rgba(122,92,58,.7)',
        pointBackgroundColor: '#7a5c3a',
        pointBorderColor: '#faf9f5',
        borderWidth: 1.5, pointRadius: 3
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: true,
      animation: { duration: 1200, easing: 'easeInOutQuart' },
      scales: {
        r: {
          min: 0, max: 100,
          ticks: { stepSize: 25, color: '#a09080', backdropColor: 'transparent', font: { size: 9, family: 'Karla' } },
          grid: { color: 'rgba(120,100,70,.1)' },
          angleLines: { color: 'rgba(120,100,70,.1)' },
          pointLabels: { color: '#5a4e42', font: { size: 10, family: 'Karla', weight: '500' } }
        }
      },
      plugins: { legend: { display: false }, tooltip: { callbacks: { label: c => ` ${c.raw}%` } } },
      elements: { line: { tension: 0.25 } }
    }
  });
}

/* ── SKILL BARS on scroll ── */
let barsGo = false;
const skillsEl = document.querySelector('.skills-block');
if (skillsEl) {
  const skObs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !barsGo) {
      barsGo = true;
      document.querySelectorAll('.bar-fill').forEach((b, i) => {
        setTimeout(() => b.classList.add('go'), i * 70);
      });
      if (window.Chart) initChart();
      else {
        const retry = setInterval(() => { if (window.Chart) { clearInterval(retry); initChart(); } }, 200);
      }
    }
  }, { threshold: 0.2 });
  skObs.observe(skillsEl);
}

/* ── SMOOTH SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
  });
});
