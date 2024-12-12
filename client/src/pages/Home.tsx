import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import PongAnimation from "@/components/PongAnimation";
import { ArrowRight } from "lucide-react";
import { SiGithub, SiLinkedin } from "react-icons/si";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <PongAnimation />
      <div className="relative z-10">
        <div className="container mx-auto px-4">
          <div className="min-h-screen flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl text-center"
            >
              <h1 className="text-5xl font-bold mb-6">
                Ryan Kanaley
              </h1>
              <h2 className="text-3xl text-muted-foreground mb-8">
                Developer & Digital Marketer
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Crafting seamless digital experiences through innovative development and strategic marketing. 
                Specializing in interactive web applications and data-driven marketing solutions.
              </p>
              
              <div className="flex justify-center gap-4 mb-8">
                <Button asChild variant="ghost" size="icon">
                  <a 
                    href="https://github.com/Rkanaley" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-primary"
                  >
                    <SiGithub className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                  </a>
                </Button>
                <Button asChild variant="ghost" size="icon">
                  <a 
                    href="https://www.linkedin.com/in/ryan-kanaley-mba/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-primary"
                  >
                    <SiLinkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                </Button>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg">
                  <Link href="/projects">
                    View Projects <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/contact">Get in Touch</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
