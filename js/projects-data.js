// Structured dataset of React projects created by Charan Epuri
const projectsData = [
  {
    id: "converter-hub",
    title: "Converter Hub",
    badge: "Utility Suite",
    category: "tools",
    categoryLabel: "Utilities & Tools",
    icon: "fa-solid fa-arrows-rotate",
    gradient: "from-blue-500 to-cyan-400",
    glowColor: "rgba(56, 189, 248, 0.35)",
    shortDesc: "A multi-purpose unit and currency conversion utility built for speed, accuracy, and daily workflows.",
    longDesc: "Converter Hub is an all-in-one conversion powerhouse that simplifies complex mathematical and unit calculations into an intuitive, responsive interface. Designed with smooth real-time calculations, it handles everyday conversions across measurements, finance, and digital scales.",
    techStack: ["React", "JavaScript", "CSS3", "Netlify", "Responsive UI"],
    features: [
      "Real-time dynamic unit conversions without page reloads",
      "Multiple category support: Length, Weight, Temperature, Data, Currency",
      "High accuracy precision rounding and instant reverse swap",
      "Mobile-first responsive layout with fast client-side performance"
    ],
    liveUrl: "https://converter-hub.netlify.app/",
    githubUrl: "https://github.com/charanepuri/converter-hub-react",
    links: [
      { label: "Live Demo", url: "https://converter-hub.netlify.app/", icon: "fa-solid fa-arrow-up-right-from-square", type: "primary" },
      { label: "GitHub Code", url: "https://github.com/charanepuri/converter-hub-react", icon: "fa-brands fa-github", type: "secondary" }
    ]
  },
  {
    id: "ms-dhoni-dashboard",
    title: "MS Dhoni Dashboard",
    badge: "Sports Analytics",
    category: "analytics",
    categoryLabel: "Data & Analytics",
    icon: "fa-solid fa-trophy",
    gradient: "from-amber-400 to-yellow-600",
    glowColor: "rgba(245, 158, 11, 0.35)",
    shortDesc: "Interactive cricket retrospective & visual analytics dashboard celebrating Captain Cool's legendary legacy.",
    longDesc: "A dedicated analytics and storytelling dashboard chronicling Mahendra Singh Dhoni's iconic cricketing journey. Features career milestones, ICC trophies showcase, captaincy win ratios, match statistics, and memorable moments illustrated through interactive data cards.",
    techStack: ["React", "Data Visualization", "Vercel", "Tailwind CSS", "Modern UI"],
    features: [
      "Milestones tracking: ICC T20 World Cup, 2011 Cricket World Cup, Champions Trophy",
      "Interactive career statistics across ODIs, Tests, and IPL franchise records",
      "Match impact breakdown with visual KPI cards and career timelines",
      "Vibrant Chennai Super Kings & Team India thematic styling"
    ],
    liveUrl: "https://ms-dhoni-dashboard-react.vercel.app/",
    githubUrl: "https://github.com/charanepuri/ms-dhoni-dashboard-react",
    links: [
      { label: "Live Demo", url: "https://ms-dhoni-dashboard-react.vercel.app/", icon: "fa-solid fa-arrow-up-right-from-square", type: "primary" },
      { label: "GitHub Code", url: "https://github.com/charanepuri/ms-dhoni-dashboard-react", icon: "fa-brands fa-github", type: "secondary" },
      { label: "LinkedIn Showcase", url: "https://lnkd.in/p/dg2sk_9n", icon: "fa-brands fa-linkedin-in", type: "tertiary" }
    ]
  },
  {
    id: "bible-reference-app",
    title: "Bible Reference App",
    badge: "Knowledge & Study",
    category: "reference",
    categoryLabel: "Reference & Study",
    icon: "fa-solid fa-book-bible",
    gradient: "from-purple-500 to-indigo-600",
    glowColor: "rgba(147, 51, 234, 0.35)",
    shortDesc: "A digital scripture study companion for rapid verse lookup, chapter browsing, and topical cross-referencing.",
    longDesc: "Designed for effortless scripture exploration, this reference portal allows believers, researchers, and students to search books, chapters, and key references with instant filter search, clean reading typography, and saved bookmarks.",
    techStack: ["React", "JavaScript", "Context API", "Vercel", "Tailwind CSS"],
    features: [
      "Rapid verse search and keyword index navigation",
      "Clean, distraction-free reading typography with customizable viewing",
      "Testament and book categorization (Old & New Testament)",
      "Accompanied with video walkthrough demo and LinkedIn showcase"
    ],
    liveUrl: "https://bible-reference-app-react.vercel.app/",
    githubUrl: "https://github.com/charanepuri/bible-reference-app-react",
    links: [
      { label: "Live Demo", url: "https://bible-reference-app-react.vercel.app/", icon: "fa-solid fa-arrow-up-right-from-square", type: "primary" },
      { label: "GitHub Code", url: "https://github.com/charanepuri/bible-reference-app-react", icon: "fa-brands fa-github", type: "secondary" },
      { label: "Demo Video", url: "https://drive.google.com/file/d/1Lw-DD3W7XtXGFZqR7usDesQs4tZNw6dM/view", icon: "fa-brands fa-google-drive", type: "tertiary" },
      { label: "LinkedIn Post", url: "https://lnkd.in/p/dRKQmR84", icon: "fa-brands fa-linkedin-in", type: "tertiary" }
    ]
  },
  {
    id: "cloud-explorer",
    title: "Cloud Explorer",
    badge: "Cloud & DevOps",
    category: "analytics",
    categoryLabel: "Data & Analytics",
    icon: "fa-solid fa-cloud",
    gradient: "from-sky-400 to-blue-600",
    glowColor: "rgba(14, 165, 233, 0.35)",
    shortDesc: "Modern cloud architecture explorer and resource dashboard with full architectural documentation.",
    longDesc: "Cloud Explorer models cloud infrastructure monitoring, service catalog visualization, and deployment topology navigation. Built with modular React components, it lets engineers examine compute instances, storage buckets, network nodes, and health diagnostics.",
    techStack: ["React", "Cloud Architecture", "DevOps UI", "Vercel", "Tailwind CSS"],
    features: [
      "Visual infrastructure mapping for compute, storage, and networking layers",
      "Comprehensive downloadable project architecture documentation (PDF included)",
      "Simulated resource allocation, health checks, and service metrics",
      "Modular dashboard widgets tailored for enterprise cloud ops"
    ],
    liveUrl: "https://cloud-explorer-react.vercel.app/",
    githubUrl: "https://github.com/charanepuri/cloud-explorer-react",
    links: [
      { label: "Live Demo", url: "https://cloud-explorer-react.vercel.app/", icon: "fa-solid fa-arrow-up-right-from-square", type: "primary" },
      { label: "GitHub Code", url: "https://github.com/charanepuri/cloud-explorer-react", icon: "fa-brands fa-github", type: "secondary" },
      { label: "Architecture PDF", url: "https://cloud-explorer-react.vercel.app/Cloud_Explorer_Project_Documentation.pdf", icon: "fa-solid fa-file-pdf", type: "tertiary" },
      { label: "LinkedIn Post", url: "https://lnkd.in/p/dNg2tc8y", icon: "fa-brands fa-linkedin-in", type: "tertiary" }
    ]
  },
  {
    id: "ultimate-biryani-handbook",
    title: "Ultimate Biryani Handbook",
    badge: "Culinary & Lifestyle",
    category: "lifestyle",
    categoryLabel: "Lifestyle & Guides",
    icon: "fa-solid fa-utensils",
    gradient: "from-rose-500 to-orange-500",
    glowColor: "rgba(244, 63, 94, 0.35)",
    shortDesc: "A rich culinary guide exploring regional biryani traditions, spice secrets, and authentic recipe techniques.",
    longDesc: "A flavor-packed interactive culinary repository covering authentic Hyderabadi, Lucknowi, Kolkata, and Malabar biryani crafts. Includes step-by-step masterclasses, dum cooking tips, spice balance ratios, and a downloadable handbook guide.",
    techStack: ["React", "Modern CSS", "Culinary UI", "Vercel", "Responsive Web"],
    features: [
      "Regional biryani heritage profiles & historical culinary context",
      "Step-by-step ingredient preparation and aromatic spice pairing guide",
      "Official companion guide book available as instant downloadable PDF",
      "Engaging recipe cards with serving guides and dietary variations"
    ],
    liveUrl: "https://ultimate-biryani-handbook.vercel.app/",
    githubUrl: "https://github.com/charanepuri/ultimate-biryani-handbook",
    links: [
      { label: "Live Demo", url: "https://ultimate-biryani-handbook.vercel.app/", icon: "fa-solid fa-arrow-up-right-from-square", type: "primary" },
      { label: "GitHub Code", url: "https://github.com/charanepuri/ultimate-biryani-handbook", icon: "fa-brands fa-github", type: "secondary" },
      { label: "Handbook PDF", url: "https://ultimate-biryani-handbook.vercel.app/The%20Ultimate%20Biryani%20Handbook.pdf", icon: "fa-solid fa-book-open", type: "tertiary" }
    ]
  },
  {
    id: "smart-error-assistant",
    title: "Smart Error Assistant",
    badge: "Developer Tool",
    category: "tools",
    categoryLabel: "Utilities & Tools",
    icon: "fa-solid fa-bug-slash",
    gradient: "from-emerald-400 to-teal-600",
    glowColor: "rgba(16, 185, 129, 0.35)",
    shortDesc: "Intelligent developer troubleshooting utility to diagnose errors, stack traces, and suggest fixes.",
    longDesc: "Smart Error Assistant accelerates software debugging by parsing error messages, providing root-cause explanations, and recommending exact code corrections. Designed to boost developer productivity with clean solutions for syntax, promise, and runtime bugs.",
    techStack: ["React", "Developer Experience", "Vercel", "Tailwind CSS", "JavaScript"],
    features: [
      "Rapid error message lookup and diagnostic recommendations",
      "Syntax vs runtime vs asynchronous exception breakdowns",
      "Copyable code snippets with corrective best practices",
      "Clean developer-friendly UI with code highlighting aesthetics"
    ],
    liveUrl: "https://smart-error-assistant-react.vercel.app/",
    githubUrl: "https://github.com/charanepuri/smart-error-assistant-react",
    links: [
      { label: "Live Demo", url: "https://smart-error-assistant-react.vercel.app/", icon: "fa-solid fa-arrow-up-right-from-square", type: "primary" },
      { label: "GitHub Code", url: "https://github.com/charanepuri/smart-error-assistant-react", icon: "fa-brands fa-github", type: "secondary" }
    ]
  }
];
