import { useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import PongBackground from './PongBackground';
import Globe from './Globe';
import PacMan from './PacMan';
import NorthernLights from './NorthernLights';
import { DemoType } from '@/lib/constants';

interface ProjectDemoProps {
  demoType: DemoType;
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const demos = {
  pong: PongBackground,
  globe: Globe,
  pacman: PacMan,
  lights: NorthernLights,
};

export default function ProjectDemo({ demoType, children, title = "Interactive Demo", description = "Try out this interactive demo" }: ProjectDemoProps) {
  const DemoComponent = demos[demoType];

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] h-[600px] p-0">
        <DialogTitle className="sr-only">{title}</DialogTitle>
        <DialogDescription className="sr-only">{description}</DialogDescription>
        <div className="relative w-full h-full overflow-hidden rounded-lg">
          <DemoComponent />
        </div>
      </DialogContent>
    </Dialog>
  );
}
