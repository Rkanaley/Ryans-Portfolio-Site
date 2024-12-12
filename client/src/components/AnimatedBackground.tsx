import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-primary/10"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_50%,rgba(48,102,190,0.1),transparent)]" />
      <div className="grid grid-cols-3 gap-4 absolute inset-0 opacity-30">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="bg-primary/10 rounded-full w-full h-full"
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{ 
              scale: [0.8, 1, 0.8],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </div>
  );
}
