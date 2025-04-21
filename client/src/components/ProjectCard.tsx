import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import ProjectDemo from "./ProjectDemo";
import { DemoType } from "@/lib/constants";
import { useState } from "react";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  link: string;
  demoType?: DemoType;
}

export default function ProjectCard({ title, description, technologies, link, demoType }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const card = (
    <Card 
      className={`h-full flex flex-col transition-all duration-300 ${
        isHovered 
          ? "shadow-[0_0_30px_rgba(120,90,255,0.3)] scale-[1.02] border-primary/30" 
          : "hover:shadow-lg"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <motion.div
            animate={{ y: isHovered ? -2 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <CardTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              {title}
            </CardTitle>
          </motion.div>
          <motion.div 
            className="w-2 h-2 rounded-full bg-primary"
            animate={{ 
              scale: isHovered ? [1, 1.5, 1] : 1,
              opacity: isHovered ? 1 : 0.7
            }}
            transition={{ 
              duration: 1.5, 
              repeat: isHovered ? Infinity : 0,
              repeatType: "reverse"
            }}
          />
        </div>
        <CardDescription className="text-muted-foreground mt-2">{description}</CardDescription>
      </CardHeader>
      
      <CardContent className="flex-grow pb-2">
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <motion.span
              key={index}
              className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary border border-transparent"
              whileHover={{ 
                scale: 1.05,
                borderColor: "rgba(120, 90, 255, 0.3)" 
              }}
              animate={{
                y: isHovered ? (index % 2 === 0 ? -2 : 2) : 0
              }}
              transition={{ duration: 0.3 }}
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="flex gap-2 pt-2">
        {demoType ? (
          <Button 
            variant="default" 
            className="flex-1 relative overflow-hidden group"
          >
            <span className="relative z-10">Try Demo</span>
            <span className="absolute inset-0 bg-gradient-to-r from-primary to-primary/70 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Button>
        ) : null}
        <Button 
          asChild 
          variant="outline" 
          className={`${demoType ? "flex-1" : "w-full"} relative overflow-hidden group`}
        >
          <a href={link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
            <span className="relative z-10">View Project</span>
            <motion.span 
              className="absolute bottom-0 left-0 h-[2px] bg-primary"
              initial={{ width: "0%" }}
              animate={{ width: isHovered ? "100%" : "0%" }}
              transition={{ duration: 0.3 }}
            />
          </a>
        </Button>
      </CardFooter>
      
      {/* Decorative corner elements */}
      <div className={`absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 transition-all duration-300 ${isHovered ? "border-primary w-4 h-4" : "border-primary/30"}`} />
      <div className={`absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 transition-all duration-300 ${isHovered ? "border-primary w-4 h-4" : "border-primary/30"}`} />
      <div className={`absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 transition-all duration-300 ${isHovered ? "border-primary w-4 h-4" : "border-primary/30"}`} />
      <div className={`absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 transition-all duration-300 ${isHovered ? "border-primary w-4 h-4" : "border-primary/30"}`} />
    </Card>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="relative"
    >
      {demoType ? (
        <ProjectDemo 
          demoType={demoType}
          title={`${title} Demo`}
          description={`Interactive demo of ${description}`}
        >
          {card}
        </ProjectDemo>
      ) : (
        card
      )}
    </motion.div>
  );
}
