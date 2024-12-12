import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function PacMan() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const pacmanRef = useRef<THREE.Group | null>(null);
  const moneyStacksRef = useRef<THREE.Group | null>(null);
  const frameIdRef = useRef<number>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      if (!containerRef.current) {
        throw new Error('Container not found');
      }

      // Scene setup
      sceneRef.current = new THREE.Scene();
      const scene = sceneRef.current;

      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 15;

      rendererRef.current = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true,
        powerPreference: "high-performance",
        canvas: document.createElement('canvas')
      });
      const renderer = rendererRef.current;
      
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      containerRef.current.appendChild(renderer.domElement);

      // Create Pac-Man
      pacmanRef.current = new THREE.Group();
      const pacmanGeometry = new THREE.SphereGeometry(2, 32, 32, 0.2, 5.7);
      const pacmanMaterial = new THREE.MeshPhongMaterial({
        color: 0xffff00,
        side: THREE.DoubleSide
      });
      const pacman = new THREE.Mesh(pacmanGeometry, pacmanMaterial);
      pacmanRef.current.add(pacman);
      scene.add(pacmanRef.current);

      // Create money stacks
      moneyStacksRef.current = new THREE.Group();
      const stackGeometry = new THREE.BoxGeometry(0.5, 0.8, 0.2);
      const stackMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
      
      // Create multiple money stacks in a circle
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 5;
        const stack = new THREE.Mesh(stackGeometry, stackMaterial);
        stack.position.x = Math.cos(angle) * radius;
        stack.position.z = Math.sin(angle) * radius;
        moneyStacksRef.current.add(stack);
      }
      scene.add(moneyStacksRef.current);

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);
      
      const pointLight = new THREE.PointLight(0xffffff, 1);
      pointLight.position.set(10, 10, 10);
      scene.add(pointLight);

      // Animation
      let time = 0;
      function animate() {
        frameIdRef.current = requestAnimationFrame(animate);
        time += 0.02;

        if (pacmanRef.current) {
          // Rotate Pac-Man around the center
          pacmanRef.current.position.x = Math.cos(time) * 5;
          pacmanRef.current.position.z = Math.sin(time) * 5;
          
          // Make Pac-Man face the direction of movement
          pacmanRef.current.rotation.y = time + Math.PI / 2;

          // Animate Pac-Man's mouth
          const mouthOpen = Math.abs(Math.sin(time * 4)) * 0.3 + 0.2;
          (pacmanRef.current.children[0].geometry as THREE.SphereGeometry).dispose();
          pacmanRef.current.children[0].geometry = new THREE.SphereGeometry(2, 32, 32, mouthOpen, 5.7);
        }

        if (moneyStacksRef.current) {
          moneyStacksRef.current.rotation.y += 0.002;
        }

        renderer.render(scene, camera);
      }

      animate();

      // Handle resize
      const handleResize = () => {
        if (!renderer || !camera) return;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener('resize', handleResize);

      // Cleanup
      return () => {
        console.log('Cleaning up PacMan component...');
        window.removeEventListener('resize', handleResize);
        if (frameIdRef.current) {
          cancelAnimationFrame(frameIdRef.current);
        }
        if (rendererRef.current && containerRef.current) {
          try {
            containerRef.current.removeChild(rendererRef.current.domElement);
          } catch (e) {
            console.error('Error removing canvas:', e);
          }
        }
        if (pacmanRef.current) {
          pacmanRef.current.traverse((object) => {
            if (object instanceof THREE.Mesh) {
              object.geometry.dispose();
              (object.material as THREE.Material).dispose();
            }
          });
        }
        if (moneyStacksRef.current) {
          moneyStacksRef.current.traverse((object) => {
            if (object instanceof THREE.Mesh) {
              object.geometry.dispose();
              (object.material as THREE.Material).dispose();
            }
          });
        }
        if (rendererRef.current) {
          rendererRef.current.dispose();
        }
      };
    } catch (err) {
      console.error('Error in PacMan component:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  }, []);

  if (error) {
    console.error('PacMan error:', error);
    return <div className="fixed inset-0 -z-10 flex items-center justify-center">Failed to load Pac-Man animation</div>;
  }

  return <div ref={containerRef} className="fixed inset-0 -z-10 overflow-hidden" />;
}
