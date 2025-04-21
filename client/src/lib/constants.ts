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
    title: "Interactive Portfolio",
    description: "A modern portfolio website featuring Pong game animation and 3D graphics",
    technologies: ["React", "Three.js", "TailwindCSS", "Framer Motion"],
    link: "https://portfolio.example.com",
    demoType: "pong",
  },
  {
    title: "3D Globe Visualization",
    description: "Interactive 3D globe visualization with dynamic animations",
    technologies: ["React", "Three.js", "WebGL", "Framer Motion"],
    link: "https://globe.example.com",
    demoType: "globe",
  },
  {
    title: "PacMan Game",
    description: "Classic PacMan game recreated with modern web technologies",
    technologies: ["React", "Canvas API", "JavaScript", "HTML5"],
    link: "https://pacman.example.com",
    demoType: "pacman",
  },
  {
    title: "Northern Lights Effect",
    description: "WebGL-powered aurora borealis animation effect",
    technologies: ["React", "WebGL", "GLSL", "Three.js"],
    link: "https://lights.example.com",
    demoType: "lights",
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
