import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="northern-lights">
        <div className="aurora"></div>
        <div className="aurora"></div>
        <div className="aurora"></div>
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_50%,rgba(48,102,190,0.1),transparent)]" />
    </div>
  );
}