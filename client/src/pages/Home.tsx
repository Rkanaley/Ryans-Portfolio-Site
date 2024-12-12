import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import PongBackground from "@/components/PongBackground";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <PongBackground />
      <div className="relative z-10">
        <div className="container mx-auto px-4">
          <div className="min-h-screen flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl"
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
              
              <div className="flex flex-wrap gap-4">
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
