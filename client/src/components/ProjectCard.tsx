import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  link: string;
}

export default function ProjectCard({ title, description, technologies, link }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Card className="h-full flex flex-col">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
              >
                {tech}
              </span>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild variant="outline" className="w-full">
            <a href={link} target="_blank" rel="noopener noreferrer">
              View Project
            </a>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
