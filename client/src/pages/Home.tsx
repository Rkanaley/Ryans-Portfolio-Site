import { useState, useMemo } from 'react';
import ProjectFilters from "@/components/ProjectFilters";
import PongAnimation from "@/components/PongAnimation";
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
      <PongAnimation />
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-24">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-center mb-8">Projects</h1>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Explore my latest work and technical projects across web development and software engineering.
            </p>
          </motion.div>

          <ProjectFilters
            activeFilters={activeFilters}
            setActiveFilters={setActiveFilters}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
