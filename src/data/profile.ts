export interface Profile {
  name: string;
  role: string;
  shortBio: string;
  bio: string[];
}

export interface HeroContent {
  eyebrow: string;
  headline: string;
  description: string;
  focusAreas: string[];
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
}

export interface Project {
  title: string;
  slug: string;
  category: string;
  description: string;
  role: string;
  stack: string[];
  impact?: string;
  links?: Array<{
    label: string;
    href: string;
  }>;
  featured: boolean;
}

export interface ResearchItem {
  title: string;
  slug: string;
  field: string;
  summary: string;
  significance: string;
  methods: string[];
  publicationStatus: string;
  links?: Array<{
    label: string;
    href: string;
  }>;
  featured: boolean;
}

export interface Accomplishment {
  title: string;
  category: "Research" | "Award" | "Project";
}

export interface Experience {
  title: string;
  organization: string;
  category: "Research" | "Project";
  summary: string;
}

export interface CoreValue {
  title: string;
  description: string;
}

export interface ContactLink {
  label: string;
  href?: string;
  verificationStatus: "verified" | "needs-verification";
}

export interface NavigationItem {
  label: string;
  href: string;
  external?: boolean;
}

export const profile: Profile = {
  name: "Mithun Arun",
  role:
    "",
  shortBio:
    "AI, Systems, and Biomedical researcher and software engineer focused on engineering impactful solutions for hard problems.",
  bio: [
    "I build disruptive innovations across AI, Healthcare, Distributed Systems, and whatever else interests me.",
  ],
};

export const hero: HeroContent = {
  eyebrow: "",
  headline:
    "Disrupting industries with interesting tech.",
  description:
    "I build interesting tools to solve hard problems.",
  focusAreas: ["AI/ML", "Software Engineering", "Research", "Distributed Systems"],
  primaryCta: {
    label: "View portfolio",
    href: "/portfolio",
  },
  secondaryCta: {
    label: "View research",
    href: "/portfolio#research",
  },
};

export const navigation: NavigationItem[] = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "Accomplishments", href: "/accomplishments" },
  { label: "Values", href: "/values" },
  { label: "Ask AI", href: "/ask" },
  { label: "Contact", href: "/contact" },
  { label: "GitHub", href: "https://github.com/MithunA12", external: true },
];

export const projects: Project[] = [
  {
    title: "Worldview",
    slug: "worldview",
    category: "Mobile App",
    description:
      "A social media app built with React Native, Expo, and Firebase.",
    role: "App Developer",
    stack: ["React Native", "Expo", "Firebase", "EAS", "Java"],
    impact: "Built and published as an iOS mobile app.",
    featured: true,
  },
  {
    title: "NeuroHero Web App",
    slug: "neurohero-web-app",
    category: "AI Healthcare Research",
    description:
      "A research-to-product interface for working with EEG and ECG model inputs to prognosticate post-anoxic comas.",
    role: "Researcher and developer",
    stack: ["Python", "TensorFlow", "Flask", "React", "Firebase"],
    impact: "Increasing access to tools that aid physicians with coma prognostication post-cardiac arrest.",
    links: [
      {
        label: "IEEE Xplore Paper",
        href: "https://ieeexplore.ieee.org/document/10937579/",
      },
    ],
    featured: true,
  },
  {
    title: "Sleep Phenomics Automation",
    slug: "sleep-phenomics-automation",
    category: "AI Healthcare Research",
    description:
      "Software that automates sleep-signal visualization, annotation, and feature computation so sleep phenomics can be used without a computational background.",
    role: "Researcher and developer",
    stack: ["React", "Signal Processing", "Machine Learning"],
    impact:
      "Made state-of-the-art sleep phenomics accessible to clinicians and researchers without a computational background.",
    links: [
      {
        label: "Sleep Medicine Abstract",
        href: "https://www.sciencedirect.com/science/article/pii/S1389945725022920",
      },
      {
        label: "SLEEP Journal Abstract",
        href: "https://academic.oup.com/sleep/article/48/Supplement_1/A203/8134881",
      },
    ],
    featured: true,
  },
];

export const research: ResearchItem[] = [
  {
    title: "Post-Anoxic Coma Prognosis Research",
    slug: "Neurohero",
    field: "AI healthcare",
    summary:
      "Research harnessing signal processing, feature extraction, DL model training, and a novel approach to model building that elevates explainability.",
    significance:
      "Enables neurologists and cardiologists to make more informed decisions regarding coma progonostication with ease, speed, and accuracy.",
    methods: [
      "EEG and ECG Signal Processing",
      "Feature Extraction",
      "Neural Network Training",
      "Model Evaluation",
      "Flask",
      "React",
    ],
    publicationStatus: "Published and Presented Research",
    links: [
      {
        label: "IEEE Xplore Paper",
        href: "https://ieeexplore.ieee.org/document/10937579/",
      },
    ],
    featured: true,
  },
  {
    title: "Sleep Phenomics Automation",
    slug: "sleep-phenomics",
    field: "Sleep research",
    summary:
      "Published work automating sleep signal visualization, annotation, and feature computation, increasing computational accessibility for clinicians and researchers.",
    significance:
      "Clinicians and researchers without computational backgrounds can access state-of-the-art sleep phenomics, improving sleep medicine, accelerating discovery, and training the next generation of providers.",
    methods: ["ML", "Signal Processing", "Scientific Communication", "React"],
    publicationStatus: "Published and Presented Research",
    links: [
      {
        label: "Sleep Medicine Abstract",
        href: "https://www.sciencedirect.com/science/article/pii/S1389945725022920",
      },
      {
        label: "SLEEP Journal Abstract",
        href: "https://academic.oup.com/sleep/article/48/Supplement_1/A203/8134881",
      },
    ],
    featured: false,
  },
];

export const accomplishments: Accomplishment[] = [
  { title: "3x Published AI Healthcare Researcher", category: "Research" },
  { title: "Regeneron ISEF Finalist", category: "Award" },
  { title: "Rise Global Fellow", category: "Award" },
  { title: "Congressional App Challenge Winner", category: "Award" },
];

export const experiences: Experience[] = [
  {
    title: "AI, Systems, and Healthcare Researcher",
    organization: "Independent and Mentored Research",
    category: "Research",
    summary:
      "Built signal processing and machine learning pipelines that extract clinically meaningful phenotypes from EEG and ECG, rigorously evaluated them, and delivered the work to clinicians through publications, conference talks, and open tooling.",
  },
  {
    title: "Mobile App Developer",
    organization: "Worldview",
    category: "Project",
    summary:
      "Built a social media app for political discourse using React Native, Expo, and Firebase.",
  },
];

export const coreValues: CoreValue[] = [
  {
    title: "Build with purpose",
    description:
      "I start with meaningful problems and incrementally solve them.",
  },
  {
    title: "Breathe the work",
    description:
      "I work on what I love.",
  },
  {
    title: "Stay Curious",
    description:
      "I ask a lot of questions.",
  },
];

// Note: email is intentionally NOT listed here. It is never sent to the client
// (which would let bots harvest it). Messages route through the /contact form to
// a server-only CONTACT_EMAIL env var instead. Only public profile links belong here.
export const contactLinks: ContactLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/MithunA12",
    verificationStatus: "verified",
  },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/mithun-arun-14384622a/", verificationStatus: "verified" },
];
