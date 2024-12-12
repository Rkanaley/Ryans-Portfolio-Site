import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function PacMan() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const container = containerRef.current;
      if (!container) {
        throw new Error('Container not found');
      }

      // Scene setup
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 15;

      // Create renderer
      const renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: true
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      container.appendChild(renderer.domElement);

      // Create a simple yellow sphere for testing
      const geometry = new THREE.SphereGeometry(5, 32, 32);
      const material = new THREE.MeshBasicMaterial({ 
        color: 0xffff00,
        wireframe: true
      });
      const sphere = new THREE.Mesh(geometry, material);
      scene.add(sphere);

      // Simple animation
      function animate() {
        requestAnimationFrame(animate);
        sphere.rotation.y += 0.01;
        renderer.render(scene, camera);
      }

      // Start animation
      animate();

      // Cleanup
      return () => {
        if (container && renderer.domElement) {
          container.removeChild(renderer.domElement);
        }
        geometry.dispose();
        material.dispose();
        renderer.dispose();
      };
    } catch (err) {
      console.error('Error in PacMan component:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  }, []);

  if (error) {
    return <div className="fixed inset-0 -z-10 flex items-center justify-center">Failed to load animation: {error}</div>;
  }

  return <div ref={containerRef} className="fixed inset-0 -z-10" style={{ background: 'transparent' }} />;
}
