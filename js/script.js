
// Which page is open? Set in each HTML file: <body data-page="home">
const PAGE = document.body.dataset.page;

// Values from the address bar, e.g. lesson.html?part=p2 or quiz.html?kind=p2c
const PARAMS = new URLSearchParams(location.search);
const PART = ['p1', 'p2', 'p3', 'p3r'].includes(PARAMS.get('part')) ? PARAMS.get('part') : 'p1';
const KIND = ['p2c', 'p3t'].includes(PARAMS.get('kind')) ? PARAMS.get('kind') : 'quiz';

// Pages that need you to be logged in
const NEEDS_LOGIN = ['course', 'dashboard', 'profile', 'edit-profile', 'lesson', 'quiz'];

// Sign up link in the Log in popup. false = shown but not clickable, true = clickable.
const ALLOW_SIGNUP = false;

// Modules: only Brand Management is open for now
const MODULES = [
  { id: 'brand-management', title: 'Brand Management', available: true },
  { id: 'graphic-design', title: 'Graphic Design', available: false },
  { id: 'content-clarity', title: 'Content Clarity', available: false },
];
const TOTAL_LESSONS = 17; // all lessons in all modules
const COURSE_LESSONS = 6; // lessons in Brand Management

// The order of the steps in Lesson 1
//   p1 = Part 1, p2 = Part 2 video, p2c = Quick Check,
//   p3 = Part 3 video, p3t = Try It, p3r = Part 3 reading, quiz = Final Quiz
const STEPS = ['p1', 'p2', 'p2c', 'p3', 'p3t', 'p3r', 'quiz'];

// Profile used when you log in for the first time (demo account)
const DEFAULT_USER = {
  name: 'Edeliza Apsay',
  email: 'edeliza.apsay@example.com',
  phone: '0912 345 6789',
  address: 'Cagayan de Oro City, Misamis Oriental',
  business: "Edeliza's Kitchen",
  type: 'Food & Beverage',
  classification: 'Micro',
};
const PROFILE_FIELDS = ['name', 'email', 'phone', 'address', 'business', 'type', 'classification'];

/* =========================================================
   2. QUIZ QUESTIONS
   To edit a question, change the text below.
   answer = the number of the correct choice (0 = A, 1 = B, 2 = C, 3 = D)
   ========================================================= */

/* Words used on the quiz pages */
const UI = {
  en: {
    lesson: 'Lesson 1: Understanding Your Brand',
    qcLabel: 'Quick Check · Part 2',
    tryLabel: 'Try It · Part 3',
    qOf: (a, b) => `Question ${a} of ${b}`,
    chooseBest: 'Choose the best answer.',
    selectBBB: 'Select Brand, Branding, or Brand Identity.',
    submit: 'Submit Answer',
    correct: 'Correct Answer',
    notQuite: 'Not quite',
    caLabel: 'Correct answer:',
    backP2: '← Back to Part 2',
    backP3: '← Back to Part 3',
    toPart3: 'Continue to Part 3 →',
    nextQ: 'Next Question →',
    toReading: 'Continue to Reading →',
  },
  bi: {
    lesson: 'Leksyon 1: Pagsabot sa Imong Brand',
    qcLabel: 'Pagsusi · Bahin 2',
    tryLabel: 'Sulayi Kini · Bahin 3',
    qOf: (a, b) => `Pangutana ${a} sa ${b}`,
    chooseBest: 'Pilia ang pinakamaayong tubag.',
    selectBBB: 'Pilia ang Brand, Branding, o Brand Identity.',
    submit: 'Isumite ang Tubag',
    correct: 'Husto nga Tubag',
    notQuite: 'Dili pa hingpit nga husto',
    caLabel: 'Husto nga tubag:',
    backP2: '← Balik sa Bahin 2',
    backP3: '← Balik sa Bahin 3',
    toPart3: 'Padayon sa Bahin 3 →',
    nextQ: 'Sunod nga Pangutana →',
    toReading: 'Padayon sa Pagbasa →',
  },
};

/* Quick Check — after the Part 2 video (1 question) */
const QUICK_CHECK = {
  en: [
    {
      question: 'Which statement best describes a brand?',
      choices: [
        "A company's logo",
        "A company's products",
        'The perceptions and associations people have about a business',
        "A company's advertisements",
      ],
      answer: 2, // C
      right: 'Correct! A brand is about the perceptions and associations people develop around a business.',
      wrong:
        'Not quite. A logo or product can be part of the brand experience, but a brand is broader. It includes what people perceive and associate with the business.',
    },
  ],
  bi: [
    {
      question: 'Hain nga pahayag ang pinakamaayong naghulagway sa konsepto na "brand"?',
      choices: [
        'Ang logo sa usa ka kompanya',
        'Ang produkto sa usa ka kompanya',
        'Ang mga panlantaw ug mga asosasyon nga anaa sa mga tawo bahin sa usa ka negosyo',
        'Ang mga paanunsiyo sa usa ka kompanya',
      ],
      answer: 2, // C
      right:
        'Husto! Ang usa ka brand naglangkob sa mga panlantaw ug mga asosasyon nga namugna sa mga tawo bahin sa usa ka negosyo.',
      wrong:
        'Dili pa hingpit nga husto. Ang logo o produkto mahimong kabahin sa kasinatian sa brand, apan ang brand mas lapad pa kay niana. Naglakip kini sa kung unsa ang panlantaw ug asosasyon sa mga tawo bahin sa negosyo.',
    },
  ],
};

/* Try It — Part 3 (6 statements). Answer: 0 = Brand, 1 = Branding, 2 = Brand Identity */
const BBB = ['Brand', 'Branding', 'Brand Identity'];
const TRY_IT = {
  en: [
    {
      statement: 'Customers describe your business as trustworthy.',
      answer: 0,
      explain: 'Trustworthiness is an association customers have with the business.',
    },
    {
      statement: 'You change your packaging to create a more premium experience.',
      answer: 1,
      explain: 'You are intentionally changing an aspect of the experience to influence perception.',
    },
    {
      statement: 'Your business uses the same logo, colors, and typography across materials.',
      answer: 2,
      explain: 'These are elements used to visually express the brand.',
    },
    {
      statement: 'Customers associate your business with fast service.',
      answer: 0,
      explain: 'This describes how customers perceive your business.',
    },
    {
      statement: 'You create a communication strategy to make your business feel more approachable.',
      answer: 1,
      explain: 'You are intentionally shaping how the business is perceived.',
    },
    {
      statement: 'Your business uses a specific color palette and visual style.',
      answer: 2,
      explain: 'These elements visually express the brand.',
    },
  ],
  bi: [
    {
      statement: 'Gihulagway sa mga kustomer ang imong negosyo nga kasaligan.',
      answer: 0,
      explain: 'Ang pagkakasaligan usa ka butang nga gilangkit sa mga kustomer sa negosyo.',
    },
    {
      statement: 'Giusab nimo ang imong packaging aron makahatag og mas taas nga kalidad nga kasinatian.',
      answer: 1,
      explain: 'Tinuyo nimong giusab ang usa ka bahin sa kasinatian aron maimpluwensyahan ang panglantaw.',
    },
    {
      statement:
        'Gigamit sa imong negosyo ang parehas nga logo, mga kolor, ug estilo sa font sa tanang mga materyales.',
      answer: 2,
      explain: 'Kini nga mga elemento kay gigamit aron ipakita ang brand pinaagi sa biswal nga paagi.',
    },
    {
      statement: 'Giisip sa mga kustomer ang imong negosyo nga adunay paspas nga serbisyo.',
      answer: 0,
      explain: 'Kini naghulagway kon giunsa paglantaw sa mga kustomer ang imong negosyo.',
    },
    {
      statement:
        'Naghimo ka og estratehiya sa komunikasyon aron mas dali moduol ang mga tawo sa imong negosyo.',
      answer: 1,
      explain: 'Tinuyo nimong gihulma ang paagi sa paglantaw sa negosyo.',
    },
    {
      statement: 'Gigamit sa imong negosyo ang espisipiko nga kombinasyon sa mga kolor ug biswal nga estilo.',
      answer: 2,
      explain: 'Kini nga mga elemento nagpakita sa brand pinaagi sa biswal nga paagi.',
    },
  ],
};

/* Final Quiz — English only, 10 questions, pass = 8 */
const PASS_SCORE = 8;
const FINAL_QUIZ = [
  {
    question: 'Which statement best describes a brand?',
    choices: [
      "A company's logo",
      "A company's products",
      'The perceptions and associations people have about a business',
      "A company's advertisements",
    ],
    answer: 2, // C
    explain: 'A brand is about the perceptions and associations people develop around a business.',
  },
  {
    question: 'Branding refers to:',
    choices: [
      'Designing a logo',
      'The intentional activities used to shape brand perceptions',
      'Choosing a business name',
      'Creating a Facebook page',
    ],
    answer: 1, // B
    explain:
      'Branding involves intentional actions used to shape how people experience and perceive a business.',
  },
  {
    question: 'Which is an example of brand identity?',
    choices: [
      'Customers think your business is trustworthy.',
      'Customers recommend your business.',
      'Your business uses a consistent logo and color palette.',
      'Customers feel satisfied after purchasing.',
    ],
    answer: 2, // C
    explain: 'A logo and color palette are elements used to express your brand.',
  },
  {
    question:
      'True or False: A business can have a brand even if it has never intentionally developed a branding strategy.',
    choices: ['True', 'False'],
    answer: 0, // A
    explain: 'Customers form perceptions whether or not the business has a formal branding strategy.',
  },
  {
    question: 'Which statement is most accurate?',
    choices: [
      'A logo and a brand are exactly the same.',
      'A brand only exists online.',
      'A logo is one element of brand identity.',
      'Branding is only necessary for large corporations.',
    ],
    answer: 2, // C
    explain: 'Your logo is important, but it is only one part of your brand identity.',
  },
  {
    question: 'Which is an example of a brand touchpoint?',
    choices: [
      'How quickly a business responds to customers',
      "The owner's favorite hobby",
      'The weather',
      "The owner's favorite color",
    ],
    answer: 0, // A
    explain: 'Customer response time is part of the customer experience and can influence brand perception.',
  },
  {
    question: 'True or False: Customer service can influence how customers perceive a brand.',
    choices: ['True', 'False'],
    answer: 0, // A
    explain: 'Customer service is one of the ways customers experience your brand.',
  },
  {
    question: 'Which question is most useful when examining your current brand?',
    choices: [
      'What logo do I personally like?',
      'What do customers currently associate with my business?',
      'What color is currently trending?',
      'What brand is most expensive?',
    ],
    answer: 1, // B
    explain: 'Understanding current customer perception is an important starting point for branding.',
  },
  {
    question: 'A brand gap refers to:',
    choices: [
      'The physical distance between two businesses',
      'The difference between current and desired brand perception',
      'The difference between two logos',
      'The difference between product prices',
    ],
    answer: 1, // B
    explain: 'Your brand gap is the difference between where your brand is now and where you want it to be.',
  },
  {
    question: 'Which statement best summarizes this lesson?',
    choices: [
      'Branding is mainly about creating attractive visuals.',
      'Branding begins and ends with a logo.',
      'Branding involves intentionally shaping how people experience and perceive a business.',
      'Branding is only necessary when a business becomes large.',
    ],
    answer: 2, // C
    explain:
      'Branding is much broader than visual design. It involves the experiences and perceptions associated with your business.',
  },
];

// Turn Try It statements into quiz questions (choices: Brand / Branding / Brand Identity)
function tryItQuestions(list, rightStart, wrongStart) {
  return list.map(item => ({
    question: item.statement,
    choices: BBB,
    answer: item.answer,
    noLetter: true,
    right: `${rightStart} ${item.explain}`,
    wrong: `${wrongStart} ${BBB[item.answer]}. ${item.explain}`,
  }));
}
TRY_IT.en = tryItQuestions(TRY_IT.en, 'Correct.', 'Not quite. The correct answer is');
TRY_IT.bi = tryItQuestions(TRY_IT.bi, 'Sakto.', 'Dili pa hingpit nga husto. Ang husto nga tubag mao ang');

// Final Quiz shows the same explanation whether right or wrong
FINAL_QUIZ.forEach(q => {
  q.right = q.explain;
  q.wrong = q.explain;
});

/* =========================================================
   3. SAVED PROGRESS
   Everything is saved in the browser (localStorage).
   To start over: clear the site data in your browser.
   ========================================================= */

const STORE_KEY = 'brandhers-v2';

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORE_KEY));
    if (saved) return saved;
  } catch (e) {
    // nothing saved yet, or the browser blocks storage
  }
  return { user: null, lang: null, done: {}, quiz: null, events: [], days: [], unread: 0 };
}

let state = loadState();

function save() {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(state));
  } catch (e) {
    // storage blocked — progress just won't be remembered
  }
}

// Mark a lesson step as finished (see STEPS in section 1)
function markDone(step) {
  if (state.done[step]) return;
  state.done[step] = true;
  save();
}

// The next step you haven't finished yet
function nextStep() {
  return STEPS.find(s => !state.done[s]) || 'p1';
}

// The page address of a step
function stepHref(step) {
  if (step === 'p2c' || step === 'p3t') return `quiz.html?kind=${step}`;
  if (step === 'quiz') return 'quiz.html?kind=final';
  return `lesson.html?part=${step}`;
}

// Lesson progress: Parts 1, 2, 3 = 20% each. Passing the final quiz = 100%
function lessonPct() {
  const d = state.done;
  if (d.quiz) return 100;
  let pct = 0;
  if (d.p1) pct += 20;
  if (d.p2 && d.p2c) pct += 20;
  if (d.p3 && d.p3t && d.p3r) pct += 20;
  return pct;
}
function lessonDone() {
  return !!state.done.quiz;
}
function lessonsCompleted() {
  return lessonDone() ? 1 : 0;
}

// Chosen lesson language: 'en' (English) or 'bi' (Bisaya)
function L() {
  return state.lang || 'en';
}

/* ----- Activity (shown in the bell and on the dashboard) ----- */
function addEvent(type, extra) {
  const onlyOnce = type === 'started_module' || type === 'started_lesson';
  if (onlyOnce && state.events.some(e => e.type === type)) return;
  state.events.unshift({ type, ts: Date.now(), ...extra });
  state.events = state.events.slice(0, 20);
  state.unread = (state.unread || 0) + 1;
  save();
}

function eventText(e, style) {
  const pct = e.pct != null ? ` (${e.pct}%)` : '';
  const texts =
    style === 'notif'
      ? {
          started_module: 'You started Brand Management',
          started_lesson: 'You started Understanding Your Brand',
          passed_quiz: `You passed the quiz: Understanding Your Brand${pct}`,
          quiz_attempt: `You took the quiz: Understanding Your Brand${pct}`,
        }
      : {
          started_module: 'Started: Brand Management',
          started_lesson: 'Started: Understanding Your Brand',
          passed_quiz: `Completed Quiz: Understanding Your Brand${pct}`,
          quiz_attempt: `Quiz attempt: Understanding Your Brand${pct}`,
        };
  return texts[e.type];
}

/* ----- Learning streak (days you opened the site) ----- */
function dayKey(date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}
function trackDay() {
  const today = dayKey(new Date());
  if (state.days.includes(today)) return;
  state.days.push(today);
  state.days = state.days.slice(-60);
  save();
}
function streak() {
  let count = 0;
  const d = new Date();
  while (state.days.includes(dayKey(d))) {
    count++;
    d.setDate(d.getDate() - 1);
  }
  return count;
}

/* =========================================================
   4. HELPERS
   ========================================================= */

const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);

// Go to another page
function go(href) {
  location.href = href;
}

// Make text safe to put inside HTML
function esc(text) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  return String(text ?? '').replace(/[&<>"']/g, c => map[c]);
}

// An icon from assets/icons/
function ic(name, size) {
  return `<img class="ic" src="assets/icons/${name}.svg" width="${size}" height="${size}" alt="">`;
}

// "Just now", "5 minutes ago", "2 days ago"
function ago(ts) {
  const sec = (Date.now() - ts) / 1000;
  const plural = (n, word) => `${n} ${word}${n > 1 ? 's' : ''} ago`;
  if (sec < 60) return 'Just now';
  if (sec < 3600) return plural(Math.floor(sec / 60), 'minute');
  if (sec < 86400) return plural(Math.floor(sec / 3600), 'hour');
  return plural(Math.floor(sec / 86400), 'day');
}

// Small black message at the bottom of the screen
function toast(message) {
  const box = document.createElement('div');
  box.className = 'toast';
  box.textContent = message;
  document.body.appendChild(box);
  setTimeout(() => box.remove(), 2600);
}

// Show a red error under a form field when the check fails
function checkField(form, name, isOk) {
  if (!form[name]) return true;
  form[name].closest('.field').classList.toggle('err', !isOk);
  return isOk;
}
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// One row in the activity / notification list
function activityRow(text, ts) {
  return `
    <div class="act-row">
      <span class="act-ic">${ic('check-activity', 18)}</span>
      <div><b>${esc(text)}</b><small>${ago(ts)}</small></div>
    </div>`;
}
function emptyRow(text) {
  return `<div class="act-row"><div><small style="font-size:13px">${text}</small></div></div>`;
}

/* =========================================================
   5. POPUPS
   ========================================================= */

/* ----- 5a. Notifications (the bell) ----- */
function toggleNotifications(host) {
  const open = host.querySelector('.notif');
  if (open) {
    open.remove();
    return;
  }
  state.unread = 0;
  save();
  host.querySelector('.dot')?.remove();

  const rows = state.events.slice(0, 4);
  const box = document.createElement('div');
  box.className = 'notif';
  box.innerHTML = `
    <h3>Notifications</h3>
    ${rows.length ? rows.map(e => activityRow(eventText(e, 'notif'), e.ts)).join('') : emptyRow('No notifications yet.')}
    <div class="div"></div>
    <a href="dashboard.html" class="go">Go to Dashboard →</a>`;
  box.onclick = e => e.stopPropagation();
  host.appendChild(box);
  // close when clicking anywhere else
  setTimeout(() => document.addEventListener('click', () => box.remove(), { once: true }));
}

/* ----- 5b. Open / close a popup ----- */
function openModal(html, setup) {
  const root = $('#modal-root');
  root.innerHTML = `<div class="modal-bg">${html}</div>`;
  const bg = root.firstElementChild;
  bg.addEventListener('click', e => {
    if (e.target === bg || e.target.closest('[data-close]')) closeModal();
  });
  if (setup) setup(bg);
}
function closeModal() {
  $('#modal-root').innerHTML = '';
}
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

/* ----- 5c. Log in / Sign up (demo only — no real accounts) ----- */
let afterLogin = null; // what to do after logging in

function loginModal(then, mode = 'login') {
  if (then) afterLogin = then;
  const signup = mode === 'signup';
  const nameField = `
    <div class="field">
      <label>Full name</label>
      <div class="input"><input name="name" placeholder="Juan Dela Cruz"></div>
      <span class="em">Please enter your name.</span>
    </div>`;

  openModal(
    `
    <div class="login-modal" role="dialog" aria-modal="true" aria-label="${signup ? 'Sign up' : 'Log in'}">
      <button class="close-btn" data-close aria-label="Close">${ic('close', 16)}</button>
      <h2>${signup ? 'Sign up' : 'Log in'}</h2>
      <p class="lead">${
        signup
          ? 'Create an account to start your learning journey with BrandHers.'
          : 'Log in to continue your learning journey with BrandHers.'
      }</p>
      <form id="loginForm" novalidate>
        ${signup ? nameField : ''}
        <div class="field">
          <label>Email address</label>
          <div class="input"><input name="email" type="email" placeholder="youre@example.com" autocomplete="email"></div>
          <span class="em">Please enter a valid email address.</span>
        </div>
        <div class="field">
          <label>Password</label>
          <div class="input">
            <input name="password" type="password" placeholder="Enter your password" autocomplete="current-password" style="padding-right:40px">
            <button type="button" class="eye" id="eyeBtn" aria-label="Show password">${ic('eye', 18)}</button>
          </div>
          <span class="em">Password must be at least 6 characters.</span>
        </div>
        <button class="btn btn-primary" type="submit">${signup ? 'Sign Up' : 'Log In'}</button>
      </form>
      <div class="or-row">or</div>
      <div class="social">
        <button data-social><img class="social-logo" src="assets/icons/google.png" width="20" height="20" alt="">Continue with Google</button>
        <button data-social><img class="social-logo" src="assets/icons/facebook.png" width="20" height="20" alt="">Continue with Facebook</button>
        <button data-social><img class="social-logo" src="assets/icons/apple.png" width="20" height="20" alt="">Continue with Apple</button>
      </div>
      <p class="signup-row">
        ${signup ? 'Already have an account?' : "Don't have an account?"}
        ${
          ALLOW_SIGNUP
            ? `<a href="#" id="swapAuth">${signup ? 'Log in' : 'Sign up'}</a>`
            : `<span class="signup-off" aria-disabled="true">Sign up</span>` /* shown, but not clickable */
        }
      </p>
      <p class="terms">By continuing, you agree to BrandHers' Terms of Use and Privacy Notice.</p>
    </div>`,
    root => {
      // switch between Log in and Sign up
      const swap = root.querySelector('#swapAuth');
      if (swap) {
        swap.onclick = e => {
          e.preventDefault();
          loginModal(null, signup ? 'login' : 'signup');
        };
      }
      // show / hide password
      root.querySelector('#eyeBtn').onclick = () => {
        const pw = root.querySelector('[name=password]');
        pw.type = pw.type === 'password' ? 'text' : 'password';
      };
      // Google / Facebook / Apple buttons log in right away (demo)
      root.querySelectorAll('[data-social]').forEach(b => (b.onclick = () => doLogin({})));
      // hide a logo if its file is not in assets/icons/ yet
      root.querySelectorAll('.social-logo').forEach(img => {
        if (img.complete && !img.naturalWidth) img.remove();
        else img.onerror = () => img.remove();
      });
      // email + password form
      root.querySelector('#loginForm').onsubmit = e => {
        e.preventDefault();
        const f = e.target;
        const okName = checkField(f, 'name', f.name ? f.name.value.trim().length > 1 : true);
        const okEmail = checkField(f, 'email', EMAIL_RE.test(f.email.value.trim()));
        const okPass = checkField(f, 'password', f.password.value.length >= 6);
        if (okName && okEmail && okPass) {
          doLogin({ name: f.name ? f.name.value.trim() : null, email: f.email.value.trim() });
        }
      };
    },
  );
}

function doLogin(extra) {
  state.user = { ...DEFAULT_USER, ...state.savedProfile };
  if (extra.name) state.user.name = extra.name;
  if (extra.email) state.user.email = extra.email;
  save();
  closeModal();
  const then = afterLogin;
  afterLogin = null;
  if (then) then();
  else location.reload();
}

function signOut() {
  state.savedProfile = state.user; // remember profile edits for next log in
  state.user = null;
  save();
  go('index.html');
}

// Run fn now if logged in, otherwise ask to log in first
function requireLogin(fn) {
  if (state.user) fn();
  else loginModal(fn);
}

/* ----- 5d. Choose language ----- */
function languageModal(then) {
  openModal(
    `
    <div class="lang-modal" role="dialog" aria-modal="true" aria-label="Choose your language">
      <button class="close-btn" data-close aria-label="Close">${ic('close', 16)}</button>
      <div>
        <h2>Choose your language</h2>
        <p class="s1">Pilia ang imong pinulongan</p>
      </div>
      <p class="s2">Select the language you want to use for this module. You can learn in English or Bisaya.</p>
      <div class="lang-opts">
        <button class="lang-opt" data-lang="en"><b>English</b><span>Learn in English</span></button>
        <button class="lang-opt" data-lang="bi"><b>Bisaya</b><span>Pagkat-on sa Bisaya</span></button>
      </div>
    </div>`,
    root => {
      root.querySelectorAll('[data-lang]').forEach(b => {
        b.onclick = () => {
          state.lang = b.dataset.lang;
          save();
          closeModal();
          if (then) then();
        };
      });
    },
  );
}

/* ----- 5e. Coming soon (modules that aren't ready) ----- */
function comingSoon() {
  openModal(`
    <div class="soon-modal" role="dialog" aria-modal="true" aria-label="Coming soon">
      <p class="k">COMING SOON</p>
      <h2>This module is not available yet</h2>
      <p>Lessons for this module are still being prepared. You can start with Brand Management for now.</p>
      <div class="acts">
        <a href="course.html" class="a1">Go to Brand Management →</a>
        <button class="a2" data-close>Close</button>
      </div>
    </div>`,
    root => {
      // Brand Management needs an account: log in first if needed
      root.querySelector('.a1').onclick = e => {
        e.preventDefault();
        closeModal();
        requireLogin(() => go('course.html'));
      };
    }
  );
}

/* ----- 5f. Buttons that open lessons ----- */

// "Start Module": log in → choose language → Lesson 1 Part 1
function startModule() {
  requireLogin(() =>
    languageModal(() => {
      addEvent('started_module');
      go('lesson.html?part=p1');
    }),
  );
}

// "Continue Lesson": go to the next unfinished step
function continueLesson() {
  requireLogin(() => {
    const goNext = () => go(stepHref(lessonDone() ? 'p1' : nextStep()));
    if (state.lang) {
      goNext();
    } else {
      languageModal(() => {
        addEvent('started_module');
        goNext();
      });
    }
  });
}

// Module cards: open Brand Management, or show "Coming soon"
function bindModules(root) {
  root.querySelectorAll('[data-mod]').forEach(card => {
    card.onclick = () => {
      const mod = MODULES.find(m => m.id === card.dataset.mod);
      // Brand Management needs an account: log in first, then open it
      if (mod.available) requireLogin(() => go('course.html'));
      else comingSoon();
    };
    // the cards are not real <button>s, so Enter and Space open them too
    card.onkeydown = e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    };
  });
}

/* =========================================================
   6. SHARED PARTS — sidebar, topbar, values that change
   How it works in the HTML:
     <span data-bind="firstName">          → gets the text of values.firstName
     <i data-bind-width="lessonPct">       → gets width: lessonPct %
     <span data-status="lesson1">          → "Not started" / "In progress" / "Completed"
     <div data-when="user">                → shown only when logged in
        (also: guest, unread, notDone)
   ========================================================= */

function pageValues() {
  const u = state.user || DEFAULT_USER;
  const done = lessonsCompleted();
  const lp = lessonPct();
  const days = streak();
  const coursePct = Math.round((done / COURSE_LESSONS) * 100);
  const overall = Math.round((done / TOTAL_LESSONS) * 100);
  const name = (u.name || '').trim();

  return {
    // profile
    userName: u.name,
    firstName: name.split(/\s+/)[0],
    initial: (name || '?').charAt(0).toUpperCase(),
    email: u.email,
    phone: u.phone,
    address: u.address,
    business: u.business,
    type: u.type,
    classification: u.classification,
    // progress
    lessonPct: lp,
    lessonPctText: lp + '%',
    lessonsDone: done,
    lessonsDoneOf: `${done}/${TOTAL_LESSONS}`,
    coursePct,
    coursePctText: coursePct + '%',
    overall,
    overallText: overall + '%',
    upNext: lessonDone() ? 'Lesson 1 complete' : 'Up next: Understanding Your Brand',
    // streak
    streak: days,
    streakText: `${days} day${days === 1 ? '' : 's'} in a row — keep it up!`,
  };
}

// Returns [label, css class]
function statusOf(key) {
  const tracked = key === 'brand-management' || key === 'lesson1';
  if (!state.user || !tracked) return ['Not started', ''];
  if (key === 'lesson1' && lessonDone()) return ['Completed', 'done'];
  if (lessonDone() || lessonPct() > 0) return ['In progress', 'prog'];
  return ['Not started', ''];
}

function applyValues() {
  const v = pageValues();
  $$('[data-bind]').forEach(el => {
    const value = v[el.dataset.bind];
    if (value != null) el.textContent = value;
  });
  $$('[data-bind-width]').forEach(el => {
    el.style.width = (v[el.dataset.bindWidth] || 0) + '%';
  });
  $$('[data-status]').forEach(el => {
    const [label, cls] = statusOf(el.dataset.status);
    el.textContent = label;
    el.className = 'status ' + cls;
  });
  const show = {
    user: !!state.user,
    guest: !state.user,
    unread: !!state.user && state.unread > 0,
    notDone: !lessonDone(),
  };
  $$('[data-when]').forEach(el => {
    el.hidden = !show[el.dataset.when];
  });
}

// Buttons in the sidebar and topbar (same on every page)
function initShell() {
  applyValues();

  // small logo in the topbar (shown only on phones, see .top-logo in styles.css)
  $('#menuBtn').insertAdjacentHTML(
    'afterend',
    '<a href="index.html" class="top-logo" aria-label="BrandHERS home"><img src="assets/logo.png" alt="BrandHERS"></a>'
  );

  // phone menu
  $('#menuBtn').onclick = () => {
    $('#sidebar').classList.add('open');
    $('#scrim').classList.add('show');
  };
  $('#scrim').onclick = () => {
    $('#sidebar').classList.remove('open');
    $('#scrim').classList.remove('show');
  };

  // search → Courses page
  const search = $('#topSearch');
  search.onkeydown = e => {
    if (e.key === 'Enter') go('courses.html?q=' + encodeURIComponent(search.value));
    if (e.key === 'Escape') $('#topbar').classList.remove('searching');
  };

  // phones: a search icon that opens the search bar over the topbar
  $('.top-actions').insertAdjacentHTML(
    'afterbegin',
    `<button class="icon-btn search-btn" aria-label="Search">${ic('search', 19)}</button>`
  );
  $('.search-btn').onclick = () => {
    const open = $('#topbar').classList.toggle('searching');
    if (open) search.focus();
  };
  // close it again when you tap somewhere else
  search.addEventListener('blur', () => $('#topbar').classList.remove('searching'));

  // bell
  const bell = $('#bellBtn');
  bell.onclick = e => {
    e.stopPropagation();
    toggleNotifications(bell.parentElement);
  };

  $$('[data-signout]').forEach(b => (b.onclick = signOut));
  $$('[data-login]').forEach(b => (b.onclick = () => loginModal()));
}

/* =========================================================
   7. PAGES
   ========================================================= */

/* ----- 7a. Home (index.html) ----- */
function initHome() {
  bindModules($('#view'));
  $('[data-start-free]').onclick = () => requireLogin(() => go('course.html'));

  // Hero slider: next photo every 5 seconds, or click a dot
  const photos = $$('.hero-bg img');
  const dots = $$('[data-dot]');
  let current = 0;
  const show = n => {
    current = n;
    photos.forEach((img, k) => img.classList.toggle('on', k === n));
    dots.forEach((dot, k) => dot.classList.toggle('on', k === n));
  };
  dots.forEach(dot => (dot.onclick = () => show(+dot.dataset.dot)));
  setInterval(() => show((current + 1) % photos.length), 5000);
}

/* ----- 7b. Courses (courses.html) — search, filter, sort ----- */
function initCourses() {
  const grid = $('#grid');
  const cards = [...grid.querySelectorAll('.course-card')];
  const noResults = $('#noResults');
  const search = $('#modSearch');
  const sort = $('#modSort');
  const sortLabel = $('#sortLabel');
  let tag = 'All';

  const title = card => card.querySelector('.ttl').textContent;
  const weeks = card => parseInt(card.querySelector('.cc-footer .meta span:last-child').textContent);

  function update() {
    const q = search.value.trim().toLowerCase();
    const shown = cards.filter(
      c => (tag === 'All' || c.dataset.tag === tag) && (!q || c.textContent.toLowerCase().includes(q)),
    );
    if (sort.value === 'az') shown.sort((a, b) => title(a).localeCompare(title(b)));
    else if (sort.value === 'short') shown.sort((a, b) => weeks(a) - weeks(b));
    else shown.sort((a, b) => a.dataset.order - b.dataset.order);

    cards.forEach(c => (c.hidden = !shown.includes(c)));
    shown.forEach(c => grid.insertBefore(c, noResults)); // put them in the new order
    noResults.hidden = shown.length > 0;
    sortLabel.textContent = sort.options[sort.selectedIndex].text;
  }

  // filter chips (All, Branding, Design, Content)
  $$('.chip[data-tag]').forEach(chip => {
    chip.onclick = () => {
      tag = chip.dataset.tag;
      $$('.chip').forEach(x => x.classList.toggle('on', x === chip));
      update();
    };
  });
  search.value = PARAMS.get('q') || ''; // from the topbar search
  search.oninput = update;
  sort.onchange = update;
  bindModules(grid);
  update();
}

/* ----- 7c. Brand Management (course.html) ----- */
function initCourse() {
  $('[data-start]').onclick = startModule;
  // only Lesson 1 is ready
  $$('[data-lesson]').forEach(b => {
    b.onclick = () => (b.dataset.lesson === '1' ? startModule() : comingSoon());
  });
}

/* ----- 7d. My Dashboard (dashboard.html) ----- */
function initDashboard() {
  const v = pageValues();

  // progress ring
  $('[data-render=ring]').innerHTML =
    `${ringSvg(v.overall)}<div class="v"><b>${v.overall}%</b><span>overall</span></div>`;

  // this week (Mon–Sun) with a check on days you studied
  const now = new Date();
  const todayIndex = (now.getDay() + 6) % 7; // Monday = 0
  const monday = new Date(now);
  monday.setDate(now.getDate() - todayIndex);
  $('[data-render=week]').innerHTML = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    .map((label, k) => {
      const day = new Date(monday);
      day.setDate(monday.getDate() + k);
      const studied = state.days.includes(dayKey(day));
      return `<div class="day ${studied ? 'on' : ''} ${k === todayIndex ? 'today' : ''}">
        <i>${studied ? ic('check-streak', 18) : ''}</i>${label}</div>`;
    })
    .join('');

  // recent activity
  $('[data-render=activity]').innerHTML = state.events.length
    ? state.events
        .slice(0, 4)
        .map(e => activityRow(eventText(e), e.ts))
        .join('')
    : emptyRow('No activity yet — start Lesson 1 to begin.');

  $$('[data-continue]').forEach(b => (b.onclick = continueLesson));
  $$('[data-soon]').forEach(b => (b.onclick = comingSoon));
}

// Circle progress ring (white on pink)
function ringSvg(pct) {
  const r = 58;
  const length = 2 * Math.PI * r;
  return `
    <svg width="132" height="132" viewBox="0 0 132 132" aria-hidden="true">
      <circle cx="66" cy="66" r="${r}" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="12"/>
      <circle cx="66" cy="66" r="${r}" fill="none" stroke="#fff" stroke-width="12" stroke-linecap="round"
        stroke-dasharray="${length}" stroke-dashoffset="${length * (1 - pct / 100)}"
        transform="rotate(-90 66 66)" style="transition:stroke-dashoffset .6s"/>
    </svg>`;
}

/* ----- 7e. About (about.html) ----- */
function initAbout() {
  // if the logo video file is missing, keep the pink box
  $$('.image-card video').forEach(v => v.addEventListener('error', () => v.remove()));
}

/* ----- 7f. Contact (contact.html) ----- */
function initContact() {
  const f = $('#contactForm');
  if (state.user) {
    f.name.value = state.user.name || '';
    f.email.value = state.user.email || '';
  }
  f.onsubmit = e => {
    e.preventDefault();
    const checks = [
      checkField(f, 'name', f.name.value.trim().length > 1),
      checkField(f, 'email', EMAIL_RE.test(f.email.value.trim())),
      checkField(f, 'type', !!f.type.value),
      checkField(f, 'message', f.message.value.trim().length > 3),
    ];
    if (checks.every(Boolean)) {
      f.message.value = '';
      f.type.value = '';
      toast('Message sent! We will get back to you soon.');
    }
  };
}

/* ----- 7g. My Profile + Edit Profile (profile.html, edit-profile.html) ----- */
function initProfile() {
  $$('[data-continue]').forEach(b => (b.onclick = continueLesson));
}

function initEditProfile() {
  const f = $('#profileForm');
  PROFILE_FIELDS.forEach(key => {
    if (f[key]) f[key].value = state.user[key] || '';
  });
  f.onsubmit = e => {
    e.preventDefault();
    const required = ['name', 'email', 'phone', 'address', 'business'];
    const checks = required.map(key => checkField(f, key, f[key].value.trim().length > 0));
    if (!checks.every(Boolean)) return;
    PROFILE_FIELDS.forEach(key => (state.user[key] = f[key].value.trim()));
    save();
    go('profile.html');
  };
}

/* ----- 7h. Lesson 1 (lesson.html) -----
   lesson.html has all 4 parts in English and Bisaya, all hidden.
   Here we show the part from the address (?part=p1 | p2 | p3 | p3r)
   in the language you chose. */
function initLesson() {
  const lang = L();
  const main = $(`.lesson-main[data-part="${PART}"][data-lang="${lang}"]`);
  const side = $(`.lesson-side[data-lang="${lang}"]`);
  main.hidden = false;
  side.hidden = false;
  $$(`.lesson-crumbs .cur[data-lang="${lang}"]`).forEach(el => (el.hidden = false));

  // highlight where you are in the outline
  const partNumber = { p1: '1', p2: '2', p3: '3', p3r: '3' }[PART];
  side.querySelectorAll(`[data-part-n="${partNumber}"] .pnum`).forEach(el => el.classList.add('on'));
  side.querySelectorAll(`.oitem[data-step="${PART}"]`).forEach(el => el.classList.add('on'));

  setupVideoPlayers(main);

  // "Next" buttons
  main.querySelectorAll('[data-next]').forEach(b => {
    b.onclick = () => {
      markDone(PART);
      if (PART === 'p1') addEvent('started_lesson');
      go(stepHref(b.dataset.next));
    };
  });
}

// Video player: play/pause, back 10s, forward 10s, seek bar, mute
function setupVideoPlayers(root) {
  root.querySelectorAll('[data-player]').forEach(player => {
    const video = player.querySelector('video');
    const notFound = player.querySelector('.ph');
    const playBtn = player.querySelector('[data-v=play]');
    const muteBtn = player.querySelector('[data-v=mute]');
    const seek = player.querySelector('[data-v=seek]');
    const time = player.querySelector('[data-v=time]');
    const togglePlay = () => (video.paused ? video.play().catch(() => {}) : video.pause());

    // "Video file not found" note: show only if the video really can't load
    const checkFile = () => {
      notFound.hidden = video.readyState >= 1 || (video.error == null && video.networkState !== 3);
    };
    video.addEventListener('error', () => setTimeout(checkFile, 300));
    ['loadedmetadata', 'loadeddata', 'canplay', 'playing'].forEach(ev =>
      video.addEventListener(ev, () => (notFound.hidden = true)),
    );
    setTimeout(checkFile, 1500);

    // buttons
    playBtn.onclick = togglePlay;
    video.onclick = togglePlay;
    video.addEventListener('play', () => playBtn.classList.add('playing'));
    video.addEventListener('pause', () => playBtn.classList.remove('playing'));
    player.querySelector('[data-v=back]').onclick = () => {
      video.currentTime = Math.max(0, video.currentTime - 10);
    };
    player.querySelector('[data-v=fwd]').onclick = () => {
      video.currentTime = Math.min(video.duration || 0, video.currentTime + 10);
    };
    muteBtn.onclick = () => {
      video.muted = !video.muted;
      muteBtn.classList.toggle('muted', video.muted);
    };

    // fullscreen button (⛶) — added after the sound button
    muteBtn.insertAdjacentHTML(
      'afterend',
      `<button class="c-sound c-full" aria-label="Fullscreen">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg></button>`
    );
    player.querySelector('.c-full').onclick = () => {
      if (document.fullscreenElement) document.exitFullscreen();
      else if (player.requestFullscreen) player.requestFullscreen();
      else if (video.webkitEnterFullscreen) video.webkitEnterFullscreen(); // iPhone
    };

    // seek bar (0–1000) and time "0:42 / 2:30"
    const fmt = t => {
      t = Math.floor(t || 0);
      return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')}`;
    };
    let dragging = false;
    const paint = () => {
      const duration = video.duration || 0;
      if (!dragging) seek.value = duration ? (video.currentTime / duration) * 1000 : 0;
      seek.style.setProperty('--pct', seek.value / 10 + '%');
      time.textContent = `${fmt(video.currentTime)} / ${fmt(duration)}`;
    };
    ['timeupdate', 'loadedmetadata', 'durationchange'].forEach(ev => video.addEventListener(ev, paint));
    seek.addEventListener('input', () => {
      dragging = true;
      if (video.duration) video.currentTime = (seek.value / 1000) * video.duration;
      seek.style.setProperty('--pct', seek.value / 10 + '%');
      time.textContent = `${fmt(video.currentTime)} / ${fmt(video.duration)}`;
    });
    seek.addEventListener('change', () => {
      dragging = false;
      paint();
    });
  });
}

/* ----- 7i. Quick Check, Try It, Final Quiz (quiz.html) -----
   The question changes after every answer, so this page is drawn here.
   KIND: 'p2c' = Quick Check, 'p3t' = Try It, 'quiz' = Final Quiz */

// Where you are in the quiz
let quiz = { index: 0, picked: null, checked: false, answers: [], finished: false, score: 0 };

function questionsFor(kind) {
  if (kind === 'p2c') return QUICK_CHECK[L()];
  if (kind === 'p3t') return TRY_IT[L()];
  return FINAL_QUIZ;
}

function crumbs(items, cls = '') {
  const parts = items.map(([label, href], i) =>
    i === items.length - 1
      ? `<span class="cur">${label}</span>`
      : `<a href="${href}">${label}</a>${ic('chevron-right', 13)}`,
  );
  return `<nav class="crumbs ${cls}">${parts.join('')}</nav>`;
}

function quizHtml(kind) {
  const isFinal = kind === 'quiz';
  const t = UI[isFinal ? 'en' : L()];
  const list = questionsFor(kind);
  const path = [
    ['Home', 'index.html'],
    ['Courses', 'courses.html'],
    ['Brand Management', 'course.html'],
  ];
  const crumb = isFinal ? crumbs([...path, ['Quiz']]) : crumbs([...path, [UI[L()].lesson]], 'lesson-crumbs');

  if (isFinal && quiz.finished) return crumb + resultHtml(list);

  const q = list[quiz.index];
  const isLast = quiz.index === list.length - 1;
  const label = isFinal ? 'Quiz · Brand Management' : kind === 'p2c' ? t.qcLabel : t.tryLabel;
  const instruction = kind === 'p2c' ? t.chooseBest : kind === 'p3t' ? t.selectBBB : '';
  const progress = ((quiz.index + 1) / list.length) * 100;

  let body;
  if (!quiz.checked) {
    // choices + Submit
    const back = isFinal
      ? ['lesson.html?part=p3r', '← Back to Lesson']
      : kind === 'p2c'
        ? ['lesson.html?part=p2', t.backP2]
        : ['lesson.html?part=p3', t.backP3];
    const choices = q.choices
      .map(
        (choice, k) => `
        <button class="opt ${quiz.picked === k ? 'sel' : ''}" data-opt="${k}" aria-pressed="${quiz.picked === k}">
          <span class="radio"><img src="assets/icons/${k === 1 ? 'radio-alt' : 'radio'}.svg" alt=""></span>${choice}
        </button>`,
      )
      .join('');
    body = `
      <div class="options">${choices}</div>
      <div class="qnav">
        <a href="${back[0]}" class="btn btn-ghost">${back[1]}</a>
        <button class="btn btn-primary" data-submit ${quiz.picked === null ? 'disabled' : ''}>${t.submit}</button>
      </div>`;
  } else {
    // feedback + Continue
    const right = quiz.picked === q.answer;
    const answerText = q.noLetter ? q.choices[q.answer] : `${'ABCD'[q.answer]}. ${q.choices[q.answer]}`;
    let next;
    if (isFinal) next = isLast ? 'See Results →' : 'Continue →';
    else if (kind === 'p2c') next = t.toPart3;
    else next = isLast ? t.toReading : t.nextQ;
    body = `
      <div class="feedback ${right ? 'ok' : 'no'}">
        <div class="fb-head"><span class="fb-ic">${right ? '✓' : '✕'}</span><b>${right ? t.correct : t.notQuite}</b></div>
        ${right ? '' : `<p class="fb-label">${t.caLabel}</p>`}
        <p class="fb-ans">${answerText}</p>
        <p class="fb-exp">${right ? q.right : q.wrong}</p>
      </div>
      <div class="qnav end"><button class="btn btn-primary" data-advance>${next}</button></div>`;
  }

  return `${crumb}
    <div class="quiz-card">
      <div class="qtop"><h1 class="k">${label}</h1><span class="n">${t.qOf(quiz.index + 1, list.length)}</span></div>
      <div class="qtrack"><i style="width:${progress}%"></i></div>
      ${instruction && !quiz.checked ? `<p class="qinstr">${instruction}</p>` : ''}
      <h2 class="qq">${q.question}</h2>
      ${body}
    </div>`;
}

function resultHtml(list) {
  const passed = quiz.score >= PASS_SCORE;
  const pct = Math.round((quiz.score / list.length) * 100);
  const praise = passed
    ? "Great work! You've shown a solid understanding of what branding really means and how it shapes the way customers see your business. "
    : '';
  return `
    <div class="result-card">
      <div class="success-circle">${ic('check-result', 42)}</div>
      <h1>Quiz Complete!</h1>
      <p class="score">You scored ${quiz.score} out of ${list.length} (${pct}%) — Passing score: ${PASS_SCORE}/${list.length}</p>
      <p class="msg">${praise}If you scored below 8/10, review Part 1 and try the quiz again before moving on.</p>
      <div class="result-btns">
        <button class="btn btn-ghost" data-retry>← Try Again</button>
        <a href="dashboard.html" class="btn btn-primary">Continue →</a>
      </div>
    </div>`;
}

function resetQuiz() {
  quiz = { index: 0, picked: null, checked: false, answers: [], finished: false, score: 0 };
}

// Draw the quiz and connect its buttons (runs again after every click)
function drawQuiz() {
  const view = $('#view');
  const list = questionsFor(KIND);
  view.innerHTML = quizHtml(KIND);

  // pick a choice
  view.querySelectorAll('[data-opt]').forEach(b => {
    b.onclick = () => {
      quiz.picked = +b.dataset.opt;
      drawQuiz();
    };
  });

  // Submit Answer
  const submit = view.querySelector('[data-submit]');
  if (submit) {
    submit.onclick = () => {
      if (quiz.picked === null) return;
      quiz.checked = true;
      quiz.answers[quiz.index] = quiz.picked;
      drawQuiz();
    };
  }

  // Continue / Next Question / See Results
  const advance = view.querySelector('[data-advance]');
  if (advance) {
    advance.onclick = () => {
      if (quiz.index < list.length - 1) {
        quiz.index++;
        quiz.picked = null;
        quiz.checked = false;
        drawQuiz();
        window.scrollTo(0, 0);
      } else if (KIND === 'quiz') {
        finishFinalQuiz(list);
      } else {
        markDone(KIND);
        go(KIND === 'p2c' ? 'lesson.html?part=p3' : 'lesson.html?part=p3r');
      }
    };
  }

  // Try Again
  const retry = view.querySelector('[data-retry]');
  if (retry) {
    retry.onclick = () => {
      resetQuiz();
      drawQuiz();
    };
  }
}

function finishFinalQuiz(list) {
  quiz.finished = true;
  quiz.score = list.filter((q, k) => quiz.answers[k] === q.answer).length;
  const pct = Math.round((quiz.score / list.length) * 100);
  state.quiz = {
    score: quiz.score,
    total: list.length,
    ts: Date.now(),
    best: Math.max(quiz.score, state.quiz?.best || 0),
  };
  if (quiz.score >= PASS_SCORE) {
    markDone('quiz');
    addEvent('passed_quiz', { pct });
  } else {
    addEvent('quiz_attempt', { pct });
  }
  save();
  drawQuiz();
  window.scrollTo(0, 0);
}

function initQuiz() {
  drawQuiz();
}

/* =========================================================
   8. START — runs when the page opens
   ========================================================= */

const PAGE_SETUP = {
  'home': initHome,
  'courses': initCourses,
  'course': initCourse,
  'dashboard': initDashboard,
  'about': initAbout,
  'contact': initContact,
  'profile': initProfile,
  'edit-profile': initEditProfile,
  'lesson': initLesson,
  'quiz': initQuiz,
};

(function start() {
  trackDay();

  // Not logged in? Go to Home and open the Log in popup
  if (NEEDS_LOGIN.includes(PAGE) && !state.user) {
    const here = location.pathname.split('/').pop() + location.search;
    location.replace('index.html?login=1&next=' + encodeURIComponent(here));
    return;
  }

  // First lesson or quiz: ask which language
  if ((PAGE === 'lesson' || PAGE === 'quiz') && !state.lang) {
    state.lang = 'en';
    setTimeout(() => languageModal(() => location.reload()));
  }

  initShell();
  (PAGE_SETUP[PAGE] || initHome)();

  // Home opened with ?login=1 → show Log in, then go to the page you wanted
  if (PAGE === 'home' && PARAMS.get('login')) {
    const next = PARAMS.get('next') || '';
    const safeNext = /^[a-z-]+\.html(\?[\w=&-]*)?$/.test(next) ? next : 'index.html';
    loginModal(() => go(safeNext));
  }
})();
