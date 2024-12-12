import { useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import PongBackground from './PongBackground';
import Globe from './Globe';
import PacMan from './PacMan';
import NorthernLights from './NorthernLights';

interface ProjectDemoProps {
  demoType: 'pong' | 'globe' | 'pacman' | 'lights';
  children: React.ReactNode;
}

const demos = {
  pong: PongBackground,
  globe: Globe,
  pacman: PacMan,
  lights: NorthernLights,
};

export default function ProjectDemo({ demoType, children }: ProjectDemoProps) {
  const DemoComponent = demos[demoType];

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] h-[600px] p-0">
        <div className="relative w-full h-full overflow-hidden rounded-lg">
          <DemoComponent />
        </div>
      </DialogContent>
    </Dialog>
  );
}
