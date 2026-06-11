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
  featured: boolean;
}

export interface Accomplishment {
  title: string;
  category: "Research" | "Award" | "Project" | "Leadership";
}

export interface Experience {
  title: string;
  organization: string;
  category: "Research" | "Project" | "Leadership" | "Communication";
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
}

export const profile: Profile = {
  name: "Mithun Arun",
  role:
    "AI/CS researcher, product builder, startup-oriented founder, and student leader",
  shortBio:
    "AI/CS researcher, software builder, and student leader focused on intelligent systems for healthcare, education, and decision-making.",
  bio: [
    "I am an AI/CS researcher, software builder, and student leader focused on applying intelligent systems to healthcare, education, and decision-making.",
    "My work spans AI healthcare research using EEG and ECG data, mobile application development, hackathon leadership, and product-focused technical projects.",
  ],
};

export const hero: HeroContent = {
  eyebrow: "AI/CS researcher · Product builder · Founder · Student leader",
  headline:
    "Building intelligent systems and turning technical research into useful tools.",
  description:
    "I build intelligent systems for healthcare, learning, and human decision-making through machine learning, software engineering, signal processing, and product design.",
  focusAreas: ["AI/ML", "Software Engineering", "Research", "Project"],
  primaryCta: {
    label: "View projects",
    href: "/projects",
  },
  secondaryCta: {
    label: "View research",
    href: "/research",
  },
};

export const navigation: NavigationItem[] = [
  { label: "Projects", href: "/projects" },
  { label: "Research", href: "/research" },
  { label: "Experience", href: "/experience" },
  { label: "Accomplishments", href: "/accomplishments" },
  { label: "Values", href: "/values" },
  { label: "Ask Mithun", href: "/ask" },
  { label: "Contact", href: "/contact" },
];

export const projects: Project[] = [
  {
    title: "Worldview",
    slug: "worldview",
    category: "Mobile product",
    description:
      "A mobile social product built with React Native, Expo, and Firebase.",
    role: "Founder and developer",
    stack: ["React Native", "Expo", "Firebase"],
    impact: "Built and published as an iOS mobile app.",
    featured: true,
  },
  {
    title: "NeuroHero Web App",
    slug: "neurohero-web-app",
    category: "AI healthcare",
    description:
      "A research-to-product interface for working with EEG and ECG model inputs.",
    role: "Researcher and developer",
    stack: ["Python", "Flask", "React"],
    impact: "Translated an AI healthcare research workflow into a usable interface.",
    featured: true,
  },
];

export const research: ResearchItem[] = [
  {
    title: "EEG and ECG prognosis research",
    slug: "neurohero",
    field: "AI healthcare",
    summary:
      "Research exploring signal processing, feature extraction, model evaluation, and the responsible translation of AI healthcare work into understandable tools.",
    significance:
      "Connects signal-processing research with tools that make complex model workflows easier to understand.",
    methods: [
      "EEG and ECG signal processing",
      "Feature extraction",
      "Model evaluation",
    ],
    publicationStatus: "Published and presented research",
    featured: true,
  },
  {
    title: "Sleep phenomics research",
    slug: "sleep-phenomics",
    field: "Sleep research",
    summary:
      "Published work connecting computational analysis with sleep-related research and scientific communication.",
    significance:
      "Demonstrates experience translating computational analysis into published scientific communication.",
    methods: ["Clinical data analysis", "Scientific communication"],
    publicationStatus: "Published research",
    featured: false,
  },
];

export const accomplishments: Accomplishment[] = [
  { title: "Published AI healthcare research", category: "Research" },
  { title: "Regeneron ISEF Finalist", category: "Award" },
  { title: "Rise Global Winner", category: "Award" },
  { title: "Congressional App Challenge Winner", category: "Award" },
  {
    title: "Hackathon and student organization leadership",
    category: "Leadership",
  },
  { title: "Debate and Model UN leadership", category: "Leadership" },
];

export const experiences: Experience[] = [
  {
    title: "AI healthcare researcher",
    organization: "Independent and mentored research",
    category: "Research",
    summary:
      "Developed and communicated research involving EEG, ECG, signal processing, and model evaluation.",
  },
  {
    title: "Founder and mobile app developer",
    organization: "Worldview",
    category: "Project",
    summary:
      "Built a mobile social product using React Native, Expo, and Firebase.",
  },
  {
    title: "Founder and president",
    organization: "Fremd Hacks",
    category: "Leadership",
    summary:
      "Led a student hackathon community focused on building technology for social impact.",
  },
  {
    title: "Student leader",
    organization: "Debate and Model UN",
    category: "Communication",
    summary:
      "Developed public speaking, structured reasoning, and team leadership skills.",
  },
];

export const coreValues: CoreValue[] = [
  {
    title: "Build with purpose",
    description:
      "Start with meaningful problems and turn ideas into useful, testable products.",
  },
  {
    title: "Work with rigor",
    description:
      "Treat evidence, uncertainty, and technical tradeoffs with care.",
  },
  {
    title: "Communicate clearly",
    description:
      "Make complex systems understandable to technical and nontechnical audiences.",
  },
];

export const contactLinks: ContactLink[] = [
  { label: "Email", verificationStatus: "needs-verification" },
  { label: "GitHub", verificationStatus: "needs-verification" },
  { label: "LinkedIn", verificationStatus: "needs-verification" },
  { label: "Resume", verificationStatus: "needs-verification" },
];
