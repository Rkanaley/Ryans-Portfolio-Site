import { useState } from "react";
import { motion } from "framer-motion";
import { projects, Project, DemoType } from "@/lib/constants";
import ProjectCard from "@/components/ProjectCard";
import ProjectFilters from "@/components/ProjectFilters";

export default function Projects() {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  // Filter projects based on selected technologies
  const filteredProjects = activeFilters.length > 0 
    ? projects.filter(project => 
        project.technologies.some(tech => activeFilters.includes(tech))
      )
    : projects;

  return (
    <div className="min-h-screen bg-background pt-16 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-center mb-8">My Projects</h1>
          <p className="text-xl text-muted-foreground text-center mb-12">
            A collection of tools and applications I've built that provide real value
          </p>
        </motion.div>

        <ProjectFilters 
          activeFilters={activeFilters}
          setActiveFilters={setActiveFilters}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard 
              key={index}
              title={project.title}
              description={project.description}
              technologies={project.technologies}
              link={project.link}
              demoType={project.demoType}
            />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-2xl font-medium mb-4">No projects match the selected filters</h3>
            <p className="text-muted-foreground mb-6">Try selecting different technologies or clear the filters</p>
            <button 
              onClick={() => setActiveFilters([])}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}