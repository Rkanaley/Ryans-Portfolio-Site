import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function Globe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const globeRef = useRef<THREE.Mesh | null>(null);
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

    // Create globe
    const geometry = new THREE.SphereGeometry(5, 64, 64);
    const material = new THREE.MeshPhongMaterial({
      color: 0x3066BE,
      wireframe: true,
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide
    });
    globeRef.current = new THREE.Mesh(geometry, material);
    const globe = globeRef.current;
    scene.add(globe);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Animation
    function animate() {
      frameIdRef.current = requestAnimationFrame(animate);
      if (globe) {
        globe.rotation.y += 0.002;
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
      console.log('Cleaning up Globe component...');
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
      if (globeRef.current) {
        globeRef.current.geometry.dispose();
        (globeRef.current.material as THREE.Material).dispose();
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  } catch (err) {
    console.error('Error in Globe component:', err);
    setError(err instanceof Error ? err.message : 'Unknown error');
  }
  }, []);

  if (error) {
    console.error('Globe error:', error);
    return <div className="fixed inset-0 -z-10 flex items-center justify-center">Failed to load 3D globe</div>;
  }

  return <div ref={containerRef} className="fixed inset-0 -z-10 overflow-hidden" />;
}
