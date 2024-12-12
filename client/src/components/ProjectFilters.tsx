import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { projects } from "@/lib/constants";

// Get unique technologies from all projects
const allTechnologies = Array.from(
  new Set(
    projects.flatMap(project => project.technologies)
  )
).sort();

interface ProjectFiltersProps {
  activeFilters: string[];
  setActiveFilters: (filters: string[]) => void;
}

export default function ProjectFilters({ activeFilters, setActiveFilters }: ProjectFiltersProps) {
  const toggleFilter = (tech: string) => {
    if (activeFilters.includes(tech)) {
      setActiveFilters(activeFilters.filter(t => t !== tech));
    } else {
      setActiveFilters([...activeFilters, tech]);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-wrap gap-2 justify-center mb-8"
    >
      {allTechnologies.map((tech) => (
        <Button
          key={tech}
          variant={activeFilters.includes(tech) ? "default" : "outline"}
          onClick={() => toggleFilter(tech)}
          className="text-sm"
        >
          {tech}
        </Button>
      ))}
    </motion.div>
  );
}
