import type { Locale } from "./config";

/** Interface strings used by components. Case-study copy lives in src/lib/translations. */
export type Dictionary = {
  meta: { title: string; description: string };
  nav: { work: string; about: string };
  header: { getInTouch: string; language: string; home: string };
  hero: {
    tagline: string;
    intro: string;
    available: string;
    downloadCv: string;
  };
  about: {
    title: string;
    portraitAlt: string;
    lead: string;
    body: string;
    stats: [string, string, string];
    services: [string, string, string, string, string];
  };
  projects: { title: string };
  footer: { letsWork: string; getInTouch: string; opensEmail: string };
  contact: {
    heading: string;
    email: string;
    copyEmail: string;
    copyAria: string; // {email}
    copied: string;
    menuTitle: string;
    failed: string;
    newTab: string; // {label}
  };
  work: {
    allWork: string;
    category: string;
    year: string;
    results: string;
    summaryAria: string;
    comingSoon: string;
    selected: string;
    illustrativeQuotes: string;
  };
  glossary: { title: string };
  users: { activeUsers: string; ariaUsers: string }; // {n}
  edge: { tabsAria: string; states: Record<"locked" | "rejected" | "document" | "paid", { tab: string; note: string }> };
  nps: {
    chartTitle: string;
    chartSub: string;
    chartAria: string;
    months: [string, string, string, string, string, string];
    launch: string;
    tableTitle: string;
    metric: string;
    before: string;
    after: string;
    change: string;
    rows: { metric: string; before: string; after: string; delta: string }[];
    decisionLabel: string;
    reason: string;
    reasonText: string;
    illustrative: string;
  };
  impact: {
    title: string;
    sub: string;
    launchBadge: string;
    peak: string;
    sinceJuly: string; // {n}
    split: string;
    appVsOffline: string;
    chartTitle: string;
    tabTrend: string;
    tabShare: string;
    lineAria: string;
    months: [string, string, string];
    launchLabel: string;
    donutAria: string;
    inApp: string;
    appDigital: string;
    offline: string;
  };
  status: { notes: [string, string, string, string, string, string] };
  cashmate: { aria: string; kicker: string; heading: string; body: string; replay: string };
  designSystem: {
    primitives: string;
    hover: string;
    tokens: string;
    themeAria: string;
    light: string;
    dark: string;
    previewAria: string; // {mode}
  };
  foundations: {
    color: string;
    typography: string;
    roles: [string, string, string, string, string, string];
    specs: [string, string, string, string, string, string, string];
    sample: string;
  };
  nextSteps: { inApp: string; stillOffline: string; opportunity: string; planned: string };
  payout: {
    month: string;
    pause: string;
    autoPlay: string;
    rangeAria: string;
    morphed: string;
    idle: string;
  };
  decision: { chosen: string };
  beforeAfter: { before: string; after: string };
  flow: { replay: string; openFull: string };
  cards: { aria: string };
};

const en: Dictionary = {
  meta: {
    title: "Elman Ismayilov — Product Designer",
    description: "Portfolio of a product designer crafting clear, useful digital products.",
  },
  nav: { work: "Work", about: "About" },
  header: { getInTouch: "Get in touch", language: "Language", home: "Home" },
  hero: {
    tagline: "Product designer for insurance & fintech.",
    intro:
      "Turning complex products into simple experiences. Currently at Pasha Life, open to remote and international roles.",
    available: "Available for work",
    downloadCv: "Download CV",
  },
  about: {
    title: "About",
    portraitAlt: "Elman Ismayilov, Product Designer",
    lead: "Product designer at Pasha Life, the only designer on my product teams, owning design from research and flows to UI and design systems for an insurance app used by 35K+ people.",
    body: "I turn complex processes into simple, measurable experiences: our NPS redesign lifted key metrics by 25%. Before moving into product in 2024, I spent 6 years in graphic design, so I care about both usability and craft. Open to remote and international roles.",
    stats: ["Users of the app", "Boost in NPS metrics", "Years in design (2+ in product)"],
    services: ["Product Strategy", "UX Research", "Interaction Design", "Design Systems", "Prototyping"],
  },
  projects: { title: "Selected Work" },
  footer: {
    letsWork: "03 — Let's work together",
    getInTouch: "Get in touch",
    opensEmail: " — opens your email app",
  },
  contact: {
    heading: "Let's talk about product design in fintech and insurtech.",
    email: "Email",
    copyEmail: "Copy email",
    copyAria: "Copy email address {email}",
    copied: "Email copied",
    menuTitle: "How would you like to get in touch?",
    failed: "Copy failed — select the email and copy it",
    newTab: "{label} (opens in a new tab)",
  },
  work: {
    allWork: "All work",
    category: "Category",
    year: "Year",
    results: "Results",
    summaryAria: "Project summary",
    comingSoon: "Case study coming soon.",
    selected: "✓ Selected",
    illustrativeQuotes: "Illustrative quotes — names are fictional.",
  },
  glossary: { title: "Interface text · Azerbaijani → English" },
  users: { activeUsers: "active users", ariaUsers: "{n} active users" },
  edge: {
    tabsAria: "Request states",
    states: {
      locked: {
        tab: "Contract not completed yet",
        note: "The user opens the claim before the term ends. The button is disabled and the screen says when it unlocks — no dead end, no silent failure.",
      },
      rejected: {
        tab: "Request rejected",
        note: "A rejection always shows the reason and a one-tap way to apply again with corrected data.",
      },
      document: {
        tab: "Document requested again",
        note: "An unclear document pauses the request instead of cancelling it. The user is told exactly what to fix, and the timeline keeps its place.",
      },
      paid: {
        tab: "Payout made",
        note: "The last step closes the loop: a clear confirmation with the amount, and the signed application stays downloadable.",
      },
    },
  },
  nps: {
    chartTitle: "NPS by month",
    chartSub: "Jul – Dec 2025 · survey redesign launched in October",
    chartAria: "Line chart of monthly NPS: 41, 40, 41 before the October launch, then 44, 48 and 51 after it",
    months: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    launch: "Launch · Oct 2025",
    tableTitle: "Before / after",
    metric: "Metric",
    before: "Before",
    after: "After",
    change: "Change",
    rows: [
      { metric: "NPS", before: "41", after: "51", delta: "+10 pts · ≈ +25%" },
      { metric: "Response rate", before: "22%", after: "12%", delta: "fewer, but honest answers" },
      { metric: "Low scores with a reason", before: "—", after: "38%", delta: "new field" },
      { metric: "Low scores later called a mistake", before: "Common", after: "Rare", delta: "per CX calls" },
    ],
    decisionLabel: "A decision made from the new “why” field",
    reason: "“I don't fully know the product yet”",
    reasonText:
      "It topped the reasons behind low scores, so the team moved the video tutorial onto the dashboard for new customers instead of hiding it in the menu.",
    illustrative: "Illustrative data — shape of the result, not final figures.",
  },
  impact: {
    title: "Digital Claim Adoption",
    sub: "Channel migration, % of monthly payout requests (Q3 2025)",
    launchBadge: "Launch: July 2025",
    peak: "Peak adoption rate",
    sinceJuly: "↗ +{n}% since July",
    split: "Current share split",
    appVsOffline: "App vs Offline",
    chartTitle: "Share of Monthly Requests in the App",
    tabTrend: "Growth Trend",
    tabShare: "Channel Share",
    lineAria: "Line chart: share of requests in the app grew from 12% in July to 22% in August and 30% in September",
    months: ["July", "August", "September"],
    launchLabel: "Launch · Jul 2025",
    donutAria: "Donut chart: 30% of requests in the app, 70% offline",
    inApp: "in the app",
    appDigital: "App (digital)",
    offline: "Offline (call center)",
  },
  status: {
    notes: [
      "Request submitted",
      "Request accepted",
      "Missing document — the user is notified instantly",
      "Document sent, the alert is resolved",
      "Payment is being prepared",
      "Payment made",
    ],
  },
  cashmate: {
    aria: "Scripted demo: the user types 100 on the keypad and saves the expense. On the home screen the balance drops from 650 to 550 and the expense total grows from 350 to 450.",
    kicker: "The core loop",
    heading: "Type it like a calculator, see it everywhere.",
    body: "Adding an expense takes one screen and a keypad. The moment it is saved, the balance, the expense total and the account all move together.",
    replay: "Replay",
  },
  designSystem: {
    primitives: "01 · Primitives — 80 colors, 8 palettes × 10 steps",
    hover: "Hover a swatch",
    tokens: "02 · Tokens — 24 semantic colors, each with Light and Dark values",
    themeAria: "Theme",
    light: "light",
    dark: "dark",
    previewAria: "Preview of the app in {mode} theme",
  },
  foundations: {
    color: "01 · Color",
    typography: "02 · Typography",
    roles: [
      "Background, text on light",
      "Primary actions",
      "Secondary actions",
      "Accent, positive",
      "Accent, soft",
      "Fields, keys, text on dark",
    ],
    specs: ["32 pt bold", "28 pt bold", "25 pt bold", "18 pt bold", "16 pt bold", "12 pt regular", "10 pt regular"],
    sample: "Master your finances",
  },
  nextSteps: {
    inApp: "in the app",
    stillOffline: "still offline",
    opportunity: "The opportunity",
    planned: "Planned",
  },
  payout: {
    month: "Month",
    pause: "Pause",
    autoPlay: "Auto-play",
    rangeAria: "Contract timeline in months",
    morphed: "Last month — the bar becomes the CTA",
    idle: "Contract in progress — bar fills up",
  },
  decision: { chosen: "✓ Chosen" },
  beforeAfter: { before: "Before", after: "After" },
  flow: { replay: "Replay ↻", openFull: "Open full size ↗" },
  cards: { aria: "Eight contract cards presented one by one, each in its own color, then arranged in a grid" },
};

const ru: Dictionary = {
  meta: {
    title: "Elman Ismayilov — продуктовый дизайнер",
    description: "Портфолио продуктового дизайнера, создающего понятные и полезные цифровые продукты.",
  },
  nav: { work: "Работы", about: "Обо мне" },
  header: { getInTouch: "Связаться", language: "Язык", home: "Главная" },
  hero: {
    tagline: "Продуктовый дизайнер в сфере страхования и финтеха.",
    intro:
      "Превращаю сложные продукты в простой и понятный опыт. Сейчас работаю в Pasha Life, рассматриваю удалённые и международные предложения.",
    available: "Рассматриваю предложения",
    downloadCv: "Скачать резюме",
  },
  about: {
    title: "Обо мне",
    portraitAlt: "Elman Ismayilov, продуктовый дизайнер",
    lead: "Продуктовый дизайнер в Pasha Life; в моих продуктовых командах других дизайнеров нет, поэтому отвечаю за весь дизайн: от исследований и пользовательских сценариев до интерфейсов и дизайн-систем для страхового приложения, которым пользуются более 35 тысяч человек.",
    body: "Превращаю сложные процессы в простой и измеримый опыт: после редизайна NPS-опроса ключевые метрики выросли на 25%. До перехода в продуктовый дизайн в 2024 году у меня было 6 лет опыта в графическом дизайне, поэтому для меня важны и удобство, и мастерство исполнения. Рассматриваю удалённые и международные предложения.",
    stats: ["Пользователей приложения", "Рост метрик NPS", "Лет в дизайне (2+ в продукте)"],
    services: [
      "Продуктовая стратегия",
      "UX-исследования",
      "Дизайн взаимодействия",
      "Дизайн-системы",
      "Прототипирование",
    ],
  },
  projects: { title: "Избранные работы" },
  footer: {
    letsWork: "03 — Давайте работать вместе",
    getInTouch: "Связаться",
    opensEmail: " — откроется почтовое приложение",
  },
  contact: {
    heading: "Давайте поговорим о продуктовом дизайне в финтехе и иншуртехе.",
    email: "Эл. почта",
    copyEmail: "Скопировать адрес",
    copyAria: "Скопировать адрес электронной почты {email}",
    copied: "Адрес скопирован",
    menuTitle: "Как вам удобнее связаться?",
    failed: "Не удалось скопировать — выделите адрес и скопируйте его вручную",
    newTab: "{label} (откроется в новой вкладке)",
  },
  work: {
    allWork: "Все работы",
    category: "Категория",
    year: "Год",
    results: "Результаты",
    summaryAria: "Краткое описание проекта",
    comingSoon: "Кейс скоро появится.",
    selected: "✓ Выбрано",
    illustrativeQuotes: "Иллюстративные цитаты — имена вымышлены.",
  },
  glossary: { title: "Тексты интерфейса · азербайджанский → русский" },
  users: { activeUsers: "активных пользователей", ariaUsers: "{n} активных пользователей" },
  edge: {
    tabsAria: "Состояния заявки",
    states: {
      locked: {
        tab: "Срок договора ещё не истёк",
        note: "Пользователь открывает заявку до окончания срока. Кнопка неактивна, а на экране указано, когда она станет доступна: ни тупика, ни молчаливой ошибки.",
      },
      rejected: {
        tab: "Заявка отклонена",
        note: "При отказе всегда показывается причина и возможность одним нажатием подать заявку заново с исправленными данными.",
      },
      document: {
        tab: "Документ запрошен повторно",
        note: "Нечёткий документ приостанавливает заявку, а не отменяет её. Пользователю точно сказано, что нужно исправить, а шкала статусов сохраняет своё место.",
      },
      paid: {
        tab: "Выплата произведена",
        note: "Последний шаг замыкает цепочку: понятное подтверждение с суммой, а подписанное заявление остаётся доступным для скачивания.",
      },
    },
  },
  nps: {
    chartTitle: "NPS по месяцам",
    chartSub: "Июль – декабрь 2025 · редизайн опроса запущен в октябре",
    chartAria:
      "Линейный график NPS по месяцам: 41, 40 и 41 до запуска в октябре, затем 44, 48 и 51 после него",
    months: ["Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
    launch: "Запуск · окт 2025",
    tableTitle: "До / после",
    metric: "Метрика",
    before: "До",
    after: "После",
    change: "Изменение",
    rows: [
      { metric: "NPS", before: "41", after: "51", delta: "+10 п. · ≈ +25%" },
      { metric: "Доля ответов", before: "22%", after: "12%", delta: "ответов меньше, но они честные" },
      { metric: "Низкие оценки с указанной причиной", before: "—", after: "38%", delta: "новое поле" },
      {
        metric: "Низкие оценки, которые потом назвали ошибкой",
        before: "Часто",
        after: "Редко",
        delta: "по звонкам CX-команды",
      },
    ],
    decisionLabel: "Решение, принятое благодаря новому полю «почему»",
    reason: "«Я пока не до конца знаю продукт»",
    reasonText:
      "Эта причина возглавила список причин низких оценок, поэтому команда вынесла видеоинструкцию на главную панель для новых клиентов, вместо того чтобы прятать её в меню.",
    illustrative: "Иллюстративные данные — характер результата, а не итоговые цифры.",
  },
  impact: {
    title: "Внедрение цифровых заявок",
    sub: "Переход между каналами, % ежемесячных заявок на выплату (3-й кв. 2025)",
    launchBadge: "Запуск: июль 2025",
    peak: "Пиковая доля внедрения",
    sinceJuly: "↗ +{n}% с июля",
    split: "Текущее распределение",
    appVsOffline: "Приложение и офлайн",
    chartTitle: "Доля ежемесячных заявок в приложении",
    tabTrend: "Динамика роста",
    tabShare: "Доли каналов",
    lineAria:
      "Линейный график: доля заявок в приложении выросла с 12% в июле до 22% в августе и 30% в сентябре",
    months: ["Июль", "Август", "Сентябрь"],
    launchLabel: "Запуск · июль 2025",
    donutAria: "Кольцевая диаграмма: 30% заявок в приложении, 70% офлайн",
    inApp: "в приложении",
    appDigital: "Приложение (цифровой канал)",
    offline: "Офлайн (колл-центр)",
  },
  status: {
    notes: [
      "Заявка отправлена",
      "Заявка принята",
      "Не хватает документа — пользователь уведомляется мгновенно",
      "Документ отправлен, уведомление снято",
      "Платёж готовится",
      "Платёж произведён",
    ],
  },
  cashmate: {
    aria: "Сценарная демонстрация: пользователь набирает 100 на клавиатуре и сохраняет расход. На главном экране баланс уменьшается с 650 до 550, а сумма расходов растёт с 350 до 450.",
    kicker: "Основной сценарий",
    heading: "Вводите как на калькуляторе — и видите результат везде.",
    body: "Чтобы добавить расход, нужен один экран и клавиатура. Как только расход сохранён, баланс, сумма расходов и счёт меняются одновременно.",
    replay: "Повторить",
  },
  designSystem: {
    primitives: "01 · Примитивы — 80 цветов, 8 палитр × 10 ступеней",
    hover: "Наведите на образец цвета",
    tokens: "02 · Токены — 24 семантических цвета, у каждого есть значения для светлой и тёмной тем",
    themeAria: "Тема",
    light: "светлая",
    dark: "тёмная",
    previewAria: "Предпросмотр приложения: {mode} тема",
  },
  foundations: {
    color: "01 · Цвет",
    typography: "02 · Типографика",
    roles: [
      "Фон, текст на светлом",
      "Основные действия",
      "Второстепенные действия",
      "Акцент, положительное значение",
      "Акцент, мягкий",
      "Поля, клавиши, текст на тёмном",
    ],
    specs: [
      "32 пт, жирный",
      "28 пт, жирный",
      "25 пт, жирный",
      "18 пт, жирный",
      "16 пт, жирный",
      "12 пт, обычный",
      "10 пт, обычный",
    ],
    sample: "Master your finances",
  },
  nextSteps: {
    inApp: "в приложении",
    stillOffline: "всё ещё офлайн",
    opportunity: "Возможность для роста",
    planned: "В планах",
  },
  payout: {
    month: "Месяц",
    pause: "Пауза",
    autoPlay: "Автовоспроизведение",
    rangeAria: "Срок договора в месяцах",
    morphed: "Последний месяц — индикатор превращается в кнопку",
    idle: "Договор действует — индикатор заполняется",
  },
  decision: { chosen: "✓ Выбрано" },
  beforeAfter: { before: "До", after: "После" },
  flow: { replay: "Повторить ↻", openFull: "Открыть в полном размере ↗" },
  cards: {
    aria: "Восемь карточек договоров показываются по очереди, каждая в своём цвете, а затем выстраиваются в сетку",
  },
};

const az: Dictionary = {
  meta: {
    title: "Elman Ismayilov — Məhsul dizayneri",
    description: "Aydın və faydalı rəqəmsal məhsullar yaradan məhsul dizayneri portfoliosu.",
  },
  nav: { work: "İşlər", about: "Haqqımda" },
  header: { getInTouch: "Əlaqə saxla", language: "Dil", home: "Ana səhifə" },
  hero: {
    tagline: "Sığorta və fintex sahəsində məhsul dizayneri.",
    intro:
      "Mürəkkəb məhsulları sadə təcrübəyə çevirirəm. Hazırda Pasha Life-da çalışıram, uzaqdan və beynəlxalq vəzifələrə açığam.",
    available: "İşə açığam",
    downloadCv: "CV-ni yüklə",
  },
  about: {
    title: "Haqqımda",
    portraitAlt: "Elman Ismayilov, məhsul dizayneri",
    lead: "Pasha Life-da məhsul dizayneriyəm, məhsul komandalarımda yeganə dizaynerəm: 35 mindən çox insanın istifadə etdiyi sığorta tətbiqi üçün tədqiqatdan və istifadəçi ssenarilərindən tutmuş interfeysə və dizayn sistemlərinə qədər bütün dizayna cavabdehəm.",
    body: "Mürəkkəb prosesləri sadə və ölçülə bilən təcrübəyə çevirirəm: NPS sorğusunun yenidən dizaynı əsas göstəriciləri 25% artırdı. 2024-cü ildə məhsul dizaynına keçməzdən əvvəl 6 il qrafik dizaynda işləmişəm, ona görə həm istifadə rahatlığı, həm də peşəkar icra mənim üçün vacibdir. Uzaqdan və beynəlxalq vəzifələrə açığam.",
    stats: ["Tətbiq istifadəçiləri", "NPS göstəricilərində artım", "Dizaynda il (məhsulda 2+)"],
    services: [
      "Məhsul strategiyası",
      "UX tədqiqatı",
      "Qarşılıqlı əlaqə dizaynı",
      "Dizayn sistemləri",
      "Prototipləmə",
    ],
  },
  projects: { title: "Seçilmiş işlər" },
  footer: {
    letsWork: "03 — Gəlin birlikdə işləyək",
    getInTouch: "Əlaqə saxla",
    opensEmail: " — e-poçt tətbiqi açılacaq",
  },
  contact: {
    heading: "Gəlin fintex və insurtex sahəsində məhsul dizaynı haqqında danışaq.",
    email: "E-poçt",
    copyEmail: "E-poçtu kopyala",
    copyAria: "{email} e-poçt ünvanını kopyala",
    copied: "E-poçt kopyalandı",
    menuTitle: "Necə əlaqə saxlamaq istərdiniz?",
    failed: "Kopyalamaq alınmadı — e-poçt ünvanını seçib özünüz kopyalayın",
    newTab: "{label} (yeni tabda açılacaq)",
  },
  work: {
    allWork: "Bütün işlər",
    category: "Kateqoriya",
    year: "İl",
    results: "Nəticələr",
    summaryAria: "Layihənin qısa icmalı",
    comingSoon: "Keys tezliklə əlavə olunacaq.",
    selected: "✓ Seçilib",
    illustrativeQuotes: "Nümunəvi sitatlar — adlar uydurmadır.",
  },
  glossary: { title: "" },
  users: { activeUsers: "aktiv istifadəçi", ariaUsers: "{n} aktiv istifadəçi" },
  edge: {
    tabsAria: "Müraciətin vəziyyətləri",
    states: {
      locked: {
        tab: "Müqavilənin müddəti hələ bitməyib",
        note: "İstifadəçi müddət bitməmiş müraciəti açır. Düymə qeyri-aktivdir, ekranda isə onun nə vaxt açılacağı yazılıb: nə çıxılmaz vəziyyət, nə də səssiz xəta var.",
      },
      rejected: {
        tab: "Müraciət rədd edilib",
        note: "Rədd zamanı həmişə səbəb göstərilir və düzəldilmiş məlumatlarla bir toxunuşla yenidən müraciət etmək imkanı verilir.",
      },
      document: {
        tab: "Sənəd yenidən tələb olunub",
        note: "Aydın olmayan sənəd müraciəti ləğv etmir, müvəqqəti dayandırır. İstifadəçiyə nəyi düzəltməli olduğu dəqiq deyilir, status xətti isə öz yerini saxlayır.",
      },
      paid: {
        tab: "Ödəniş həyata keçirilib",
        note: "Son addım prosesi tamamlayır: məbləği göstərən aydın təsdiq və yüklənə bilən imzalanmış ərizə.",
      },
    },
  },
  nps: {
    chartTitle: "Aylar üzrə NPS",
    chartSub: "İyul – dekabr 2025 · sorğunun yenilənmiş dizaynı oktyabrda istifadəyə verilib",
    chartAria:
      "Aylıq NPS xətti qrafiki: oktyabrdakı buraxılışdan əvvəl 41, 40 və 41, ondan sonra isə 44, 48 və 51",
    months: ["İyl", "Avq", "Sen", "Okt", "Noy", "Dek"],
    launch: "Buraxılış · okt 2025",
    tableTitle: "Əvvəl / sonra",
    metric: "Göstərici",
    before: "Əvvəl",
    after: "Sonra",
    change: "Dəyişiklik",
    rows: [
      { metric: "NPS", before: "41", after: "51", delta: "+10 bal · ≈ +25%" },
      { metric: "Cavab payı", before: "22%", after: "12%", delta: "cavablar azdır, amma səmimidir" },
      { metric: "Səbəbi göstərilən aşağı qiymətlər", before: "—", after: "38%", delta: "yeni sahə" },
      {
        metric: "Sonradan səhv adlandırılan aşağı qiymətlər",
        before: "Tez-tez",
        after: "Nadir",
        delta: "CX zənglərinə görə",
      },
    ],
    decisionLabel: "Yeni “niyə” sahəsi əsasında qəbul edilmiş qərar",
    reason: "“Məhsulu hələ ki, tam tanımıram”",
    reasonText:
      "Bu səbəb aşağı qiymətlərin səbəbləri arasında birinci yerdə idi, ona görə də komanda video təlimatı menyuda gizlətmək əvəzinə yeni müştərilər üçün ana panelə çıxardı.",
    illustrative: "Nümunəvi məlumatlar — nəticənin xarakterini göstərir, yekun rəqəmlər deyil.",
  },
  impact: {
    title: "Rəqəmsal müraciətlərin mənimsənilməsi",
    sub: "Kanallar üzrə keçid, aylıq ödəniş müraciətlərinin %-i (2025, III rüb)",
    launchBadge: "Buraxılış: iyul 2025",
    peak: "Maksimum mənimsənmə səviyyəsi",
    sinceJuly: "↗ iyuldan bəri +{n}%",
    split: "Hazırkı bölgü",
    appVsOffline: "Tətbiq və oflayn",
    chartTitle: "Aylıq müraciətlərin tətbiqdəki payı",
    tabTrend: "Artım trendi",
    tabShare: "Kanal payı",
    lineAria:
      "Xətti qrafik: müraciətlərin tətbiqdəki payı iyulda 12%-dən avqustda 22%-ə, sentyabrda isə 30%-ə yüksəlib",
    months: ["İyul", "Avqust", "Sentyabr"],
    launchLabel: "Buraxılış · iyul 2025",
    donutAria: "Dairəvi diaqram: müraciətlərin 30%-i tətbiqdə, 70%-i oflayn",
    inApp: "tətbiqdə",
    appDigital: "Tətbiq (rəqəmsal)",
    offline: "Oflayn (çağrı mərkəzi)",
  },
  status: {
    notes: [
      "Müraciət göndərildi",
      "Müraciət qəbul edildi",
      "Çatışmayan sənəd var — istifadəçiyə dərhal bildiriş gedir",
      "Sənəd göndərildi, xəbərdarlıq aradan qalxdı",
      "Ödəniş hazırlanır",
      "Ödəniş həyata keçirildi",
    ],
  },
  cashmate: {
    aria: "Ssenari üzrə nümayiş: istifadəçi düymələrdə 100 yığır və xərci yadda saxlayır. Ana ekranda balans 650-dən 550-yə düşür, xərclərin cəmi isə 350-dən 450-yə yüksəlir.",
    kicker: "Əsas ssenari",
    heading: "Kalkulyatorda olduğu kimi yığın, hər yerdə görün.",
    body: "Xərc əlavə etmək üçün bir ekran və düymələr kifayətdir. Xərc yadda saxlanılan kimi balans, xərclərin cəmi və hesab birlikdə dəyişir.",
    replay: "Təkrar göstər",
  },
  designSystem: {
    primitives: "01 · Primitivlər — 80 rəng, 8 palitra × 10 pillə",
    hover: "Rəng nümunəsinin üzərinə gətirin",
    tokens: "02 · Tokenlər — 24 semantik rəng, hər birinin Light və Dark dəyəri var",
    themeAria: "Tema",
    light: "açıq",
    dark: "tünd",
    previewAria: "Tətbiqin ön baxışı: {mode} tema",
  },
  foundations: {
    color: "01 · Rəng",
    typography: "02 · Tipoqrafiya",
    roles: [
      "Fon, açıq fonda mətn",
      "Əsas əməliyyatlar",
      "İkinci dərəcəli əməliyyatlar",
      "Vurğu, müsbət",
      "Vurğu, yumşaq",
      "Sahələr, düymələr, tünd fonda mətn",
    ],
    specs: [
      "32 pt, qalın",
      "28 pt, qalın",
      "25 pt, qalın",
      "18 pt, qalın",
      "16 pt, qalın",
      "12 pt, adi",
      "10 pt, adi",
    ],
    sample: "Master your finances",
  },
  nextSteps: {
    inApp: "tətbiqdə",
    stillOffline: "hələ də oflayn",
    opportunity: "İmkan",
    planned: "Planlaşdırılıb",
  },
  payout: {
    month: "Ay",
    pause: "Dayandır",
    autoPlay: "Avtomatik oynat",
    rangeAria: "Müqavilənin müddəti, aylarla",
    morphed: "Son ay — indikator düyməyə çevrilir",
    idle: "Müqavilə qüvvədədir — indikator dolur",
  },
  decision: { chosen: "✓ Seçilib" },
  beforeAfter: { before: "Əvvəl", after: "Sonra" },
  flow: { replay: "Təkrar göstər ↻", openFull: "Tam ölçüdə aç ↗" },
  cards: {
    aria: "Səkkiz müqavilə kartı bir-bir, hər biri öz rəngində göstərilir, sonra isə şəbəkə şəklində düzülür",
  },
};

const dictionaries: Record<Locale, Dictionary> = { en, ru, az };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
