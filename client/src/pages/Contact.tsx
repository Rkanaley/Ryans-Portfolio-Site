import PongAnimation from "@/components/PongAnimation";
import ContactForm from "@/components/ContactForm";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <div className="min-h-screen bg-background">
      <PongAnimation />
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-24">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold mb-8">Get in Touch</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Have a question or want to work together? Feel free to reach out using the form below.
            </p>
          </motion.div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
