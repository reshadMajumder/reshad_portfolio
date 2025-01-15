import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Button } from './ui/button';

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
    const material = new THREE.MeshPhongMaterial({ 
      color: 0x9B6BF3,
      wireframe: true
    });
    const torusKnot = new THREE.Mesh(geometry, material);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 0, 1);
    scene.add(light);
    scene.add(torusKnot);

    camera.position.z = 30;

    const animate = () => {
      requestAnimationFrame(animate);
      torusKnot.rotation.x += 0.01;
      torusKnot.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div ref={containerRef} className="absolute inset-0 z-0" />
      <div className="relative z-10 text-center p-8">
        <h1 className="text-6xl font-bold mb-6 animate-fade-in">
          Jahidul Hassan Reshad
          <span className="text-primary block mt-2">Software Engineer</span>
        </h1>
        <p className="text-xl mb-8 text-muted-foreground max-w-2xl mx-auto">
          Specialized in React.js, Django, Python, and REST Framework. Building the future through code and education.
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg">View Projects</Button>
          <Button size="lg" variant="outline">Contact Me</Button>
        </div>
      </div>
    </div>
  );
};