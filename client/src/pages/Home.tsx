import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import NorthernLights from "@/components/NorthernLights";
import ProjectCard from "@/components/ProjectCard";
import Navbar from "@/components/Navbar";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { projects, socialLinks } from "@/lib/constants";
import { motion } from "framer-motion";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section with Pac-Man Animation */}
      <section className="relative h-screen flex items-center justify-center">
        <NorthernLights />
        <div className="absolute z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl font-bold mb-4"
          >
            Ryan Kanaley
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground mb-8"
          >
            Full Stack Developer & Data Engineer
          </motion.p>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex gap-4 justify-center"
          >
            <Button asChild variant="outline">
              <a href={socialLinks.github} target="_blank" rel="noopener noreferrer">
                <SiGithub className="mr-2" /> GitHub
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                <SiLinkedin className="mr-2" /> LinkedIn
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </section>

      {/* Resume Section */}
      <section className="py-20 px-4 md:px-8 bg-muted/50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Resume</h2>
          <Card className="p-8">
            <p className="mb-8 text-muted-foreground">
              Download my resume to learn more about my experience and skills.
            </p>
            <Button asChild>
              <a href="/resume.pdf" download>
                Download Resume
              </a>
            </Button>
          </Card>
        </div>
      </section>
    </div>
  );
}
