import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import PongAnimation from "@/components/PongAnimation";
import { ArrowRight, ExternalLink } from "lucide-react";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { useEffect, useState } from "react";
import { projects } from "@/lib/constants";
import AnimatedBackground from "@/components/AnimatedBackground";

export default function Home() {
  const [showHighlight, setShowHighlight] = useState(false);

  // Create a typing animation effect for the title
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHighlight(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-y-auto">
      <AnimatedBackground />
      <div className="relative z-10">
        <div className="container mx-auto px-4">
          <div className="min-h-screen flex flex-col items-center justify-center py-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl text-center"
            >
              {/* Name with animated underline */}
              <motion.h1 
                className="text-6xl font-bold mb-6 relative inline-block"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <span className="relative">
                  Ryan Kanaley
                  <motion.span 
                    className="absolute -bottom-2 left-0 right-0 h-[3px] bg-gradient-to-r from-primary/30 via-primary to-primary/30" 
                    initial={{ width: "0%" }}
                    animate={{ width: showHighlight ? "100%" : "0%" }}
                    transition={{ duration: 1.5, delay: 1 }}
                  />
                </span>
              </motion.h1>
              
              {/* Professional title with gradient */}
              <motion.h2 
                className="text-3xl font-medium mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                Marketing & Systems Architect
              </motion.h2>
              
              {/* Bio with improved styling */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="relative px-6 py-5 mb-10 rounded-lg backdrop-blur-sm bg-black/20 border border-primary/10 shadow-[0_0_15px_rgba(72,61,255,0.15)]"
              >
                <p className="text-xl text-muted-foreground leading-relaxed">
                  <span className="font-semibold text-primary">I Build Tools That Save Time, Scale Impact, and Actually Provide ROI.</span>
                  <br />
                  From therapist tools to stock screeners and mobile games, I build practical solutions that solve real problems—check out my portfolio below.
                </p>
                
                {/* Decorative corner elements */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary/50 rounded-tl" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary/50 rounded-tr" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-primary/50 rounded-bl" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary/50 rounded-br" />
              </motion.div>
              
              {/* Social icons with improved hover effects */}
              <motion.div 
                className="flex justify-center gap-6 mb-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.7 }}
              >
                <Button asChild variant="ghost" size="icon" className="relative group">
                  <a 
                    href="https://github.com/Rkanaley" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 rounded-full transition-all duration-300 hover:bg-primary/20"
                  >
                    <SiGithub className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                    <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition-opacity">GitHub</span>
                  </a>
                </Button>
                
                <Button asChild variant="ghost" size="icon" className="relative group">
                  <a 
                    href="https://www.linkedin.com/in/ryan-kanaley-mba/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 rounded-full transition-all duration-300 hover:bg-primary/20"
                  >
                    <SiLinkedin className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                    <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition-opacity">LinkedIn</span>
                  </a>
                </Button>
              </motion.div>

              {/* Enhanced CTA buttons */}
              <motion.div 
                className="flex flex-wrap justify-center gap-6 mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.9 }}
              >
                <Button 
                  size="lg"
                  asChild
                  className="px-8 py-6 text-lg relative overflow-hidden group"
                >
                  <Link href="/projects">
                    <span className="relative z-10 flex items-center">
                      View Projects
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-primary to-primary/70 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  </Link>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg" 
                  asChild
                  className="px-8 py-6 text-lg border-primary/40 hover:border-primary hover:bg-primary/10"
                >
                  <Link href="/contact">Get in Touch</Link>
                </Button>
              </motion.div>
              
              {/* Quick project highlights */}
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.2 }}
              >
                {projects.slice(0, 3).map((project, index) => (
                  <motion.a
                    key={index}
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg bg-black/20 border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_15px_rgba(72,61,255,0.15)] hover:-translate-y-1 text-center group"
                    whileHover={{ scale: 1.03 }}
                  >
                    <h3 className="font-medium text-base mb-1 text-primary/90 group-hover:text-primary">{project.title}</h3>
                    <div className="flex flex-wrap justify-center gap-1 mt-2">
                      {project.technologies.slice(0, 2).map((tech, i) => (
                        <span key={i} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary/80">{tech}</span>
                      ))}
                    </div>
                    <ExternalLink className="w-4 h-4 mx-auto mt-2 text-primary/50 group-hover:text-primary" />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
