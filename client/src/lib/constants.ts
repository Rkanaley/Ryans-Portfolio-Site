export type DemoType = 'pong' | 'globe' | 'pacman' | 'lights';

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
    description: "Network analysis and digital marketing tool for businesses seeking data-driven growth strategies",
    technologies: ["React", "Node.js", "Data Analysis", "Marketing"],
    link: "https://nadm.example.com",
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
    link: "https://mammothsop.example.com",
  },
  {
    title: "Quisley",
    description: "iOS mobile game with engaging gameplay and modern design principles",
    technologies: ["Swift", "iOS", "Game Development", "Mobile"],
    link: "https://quisley.example.com",
  }
];

export const blogPosts = [
  {
    title: "Building an Interactive Portfolio with React",
    description: "Learn how to create an engaging portfolio website using React, Framer Motion, and Three.js for stunning visual effects.",
    date: "2024-12-01",
    readTime: "5 min read",
    tags: ["React", "Portfolio", "Web Development"],
  },
  {
    title: "Mastering TypeScript in 2024",
    description: "A comprehensive guide to TypeScript best practices and advanced features for modern web development.",
    date: "2024-11-25",
    readTime: "8 min read",
    tags: ["TypeScript", "JavaScript", "Programming"],
  },
  {
    title: "The Future of Web Animation",
    description: "Exploring the latest trends and technologies in web animation, from Canvas to WebGL.",
    date: "2024-11-15",
    readTime: "6 min read",
    tags: ["Animation", "WebGL", "Frontend"],
  },
];

export const socialLinks = {
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername",
  twitter: "https://twitter.com/yourusername",
};
