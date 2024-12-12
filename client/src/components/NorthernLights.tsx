import { useRef, useEffect } from "react";
import * as THREE from "three";

const NorthernLights = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Create a PlaneGeometry
    const geometry = new THREE.PlaneGeometry(10, 5, 50, 50);

    // Shader Material for Aurora Effect
    const material = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec2 vUv;
        uniform float time;
        void main() {
          vUv = uv;
          vec3 pos = position;
          pos.z += sin(pos.x * 2.0 + time) * 0.2;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform float time;
        void main() {
          float green = abs(sin(time + vUv.x * 10.0));
          float blue = abs(cos(time + vUv.y * 10.0));
          gl_FragColor = vec4(0.0, green, blue, 0.5);
        }
      `,
      uniforms: {
        time: { value: 0 },
      },
      transparent: true,
    });

    const aurora = new THREE.Mesh(geometry, material);
    scene.add(aurora);

    // Handle window resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Animate the effect
    const animate = () => {
      material.uniforms.time.value += 0.05;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 -z-10" />;
};

export default NorthernLights;
