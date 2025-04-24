import BusinessEnduranceComponent from "@/components/posts/BusinessEndurance";

export interface BlogPost {
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  slug: string;
  component?: React.ComponentType;
}

export const blogPosts: BlogPost[] = [
  {
    title: "Business Functions in Sprints — But the Winners Focus on Endurance",
    description: "Why speed can’t beat stamina in the long game of entrepreneurship.",
    date: "2025-04-23",
    readTime: "4 min read",
    tags: ["Entrepreneurship", "Mindset", "Strategy"],
    slug: "business-endurance",
    component: BusinessEnduranceComponent,
  },
  {
    title: "The Best Ideas Don’t Trend — They Hide",
    description: "Why the most valuable opportunities often go unnoticed — and how to spot them before everyone else.",
    date: "2025-04-24",
    readTime: "5 min read",
    tags: ["Positioning", "Strategy", "Product Development"],
    slug: "hidden-ideas",
  },
  {
    title: "How I Spot Market Whitespace (Before the Sharks Do)",
    description: "A breakdown of how I identify underutilized markets and ignored niches before they explode.",
    date: "2025-04-24",
    readTime: "6 min read",
    tags: ["Marketing", "Positioning", "Product Strategy"],
    slug: "spotting-whitespace",
  },
  {
    title: "Growth Isn’t a Funnel — It’s a Feedback Loop",
    description: "How growth actually works when you stop treating your customers like data points and start listening to them.",
    date: "2025-04-24",
    readTime: "4 min read",
    tags: ["Growth", "Customer Feedback", "Marketing"],
    slug: "growth-feedback-loop",
  },
  {
    title: "Automation That Doesn’t Suck: Tools I’d Actually Use Again",
    description: "The automation tools and workflows that saved me real time — and didn’t break or get in the way.",
    date: "2025-04-24",
    readTime: "4 min read",
    tags: ["Automation", "Efficiency", "Stack Tips"],
    slug: "automation-worth-using",
  },
  {
    title: "How to Out-Market Bigger Brands With Less Budget",
    description: "Outsmarting the big guys doesn’t take VC funding — it takes precision, psychology, and patience.",
    date: "2025-04-24",
    readTime: "5 min read",
    tags: ["Marketing Strategy", "Startup Tactics", "Lean Growth"],
    slug: "outmarket-big-brands",
  },
  {
    title: "From Field Ops to Founder: Business Lessons I Took From the Army",
    description: "Lessons in leadership, adaptability, and execution — forged in boots, now used in business.",
    date: "2025-04-24",
    readTime: "5 min read",
    tags: ["Military Mindset", "Leadership", "Startup Grit"],
    slug: "army-to-founder",
  },
  {
    title: "Why Your Tech Stack Is Slowing You Down",
    description: "You don’t need more tools — you need fewer that actually work. Here’s how to cut the fat.",
    date: "2025-04-24",
    readTime: "4 min read",
    tags: ["Productivity", "Tech Stack", "SaaS"],
    slug: "stack-slowdown",
  },
  {
    title: "SEO Is Dead (Except for When It’s Not)",
    description: "When SEO is a waste of time — and when it can still quietly dominate entire verticals.",
    date: "2025-04-24",
    readTime: "6 min read",
    tags: ["SEO", "Content Strategy", "Contrarian Marketing"],
    slug: "seo-is-dead",
  },
];

export type DemoType = "pong" | "globe" | "pacman" | "lights";

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  link: string;
  demoType?: DemoType;
}

export const projects: Project[] = [
  {
    title: "NADM",
    description: "Northern Arizona Digital Marketing - My marketing company providing data-driven digital strategies for local businesses",
    technologies: ["Digital Marketing", "SEO", "Local Business", "Analytics"],
    link: "https://nazdm.com/",
  },
  {
    title: "Therapedia",
    description: "AI-powered platform for mental health professionals to access and share therapeutic resources",
    technologies: ["AI", "Healthcare", "Database", "Productivity"],
    link: "https://therapedia.ai/",
  },
  {
    title: "Therapy Notes",
    description: "Time-saving application for therapists to efficiently manage patient records and session notes",
    technologies: ["React", "Database", "Healthcare", "Productivity"],
    link: "https://therapynotes.example.com",
  },
  {
    title: "Mammoth SOP Hub",
    description: "Standard Operating Procedures SaaS platform for streamlining business processes and training",
    technologies: ["SaaS", "Workflow", "Business", "Documentation"],
    link: "https://mammothsop.com/",
  },
  {
    title: "Quizley",
    description: "iOS mobile game with engaging gameplay and modern design principles",
    technologies: ["Swift", "iOS", "Game Development", "Mobile"],
    link: "https://quisley.example.com",
  },
];

export const socialLinks = {
  github: "https://github.com/rkanaley",
  linkedin: "https://www.linkedin.com/in/ryan-kanaley-mba/",
};
