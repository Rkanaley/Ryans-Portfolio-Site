import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import ProjectDemo from "./ProjectDemo";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  link: string;
  demoType?: 'pong' | 'globe' | 'pacman' | 'lights';
}

export default function ProjectCard({ title, description, technologies, link, demoType }: ProjectCardProps) {
  const card = (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
        <CardDescription className="text-muted-foreground">{description}</CardDescription>
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
      <CardFooter className="flex gap-2">
        {demoType ? (
          <Button variant="default" className="flex-1">
            Try Demo
          </Button>
        ) : null}
        <Button asChild variant="outline" className={demoType ? "flex-1" : "w-full"}>
          <a href={link} target="_blank" rel="noopener noreferrer">
            View Project
          </a>
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      {demoType ? (
        <ProjectDemo demoType={demoType}>{card}</ProjectDemo>
      ) : (
        card
      )}
    </motion.div>
  );
}
