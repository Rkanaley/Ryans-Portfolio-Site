import { useState, useMemo } from 'react';
import ProjectFilters from "@/components/ProjectFilters";
import PongBackground from "@/components/PongBackground";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/constants";
import { motion } from "framer-motion";

export default function Home() {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const filteredProjects = useMemo(() => {
    if (activeFilters.length === 0) return projects;
    return projects.filter(project =>
      activeFilters.some(filter => project.technologies.includes(filter))
    );
  }, [activeFilters]);

  return (
    <div className="min-h-screen bg-background">
      <PongBackground />
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-24">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold mb-8">Interactive Projects</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore my collection of interactive web projects featuring games, animations, and creative experiments.
            </p>
          </motion.div>

          <ProjectFilters
            activeFilters={activeFilters}
            setActiveFilters={setActiveFilters}
          />

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
