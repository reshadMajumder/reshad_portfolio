import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Button } from './ui/button';

export const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Create the torus knot
    const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
    const material = new THREE.MeshPhongMaterial({ 
      color: 0x9B6BF3,
      wireframe: true
    });
    const torusKnot = new THREE.Mesh(geometry, material);

    // Create particles for the big bang effect
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 8000;
    const posArray = new Float32Array(particleCount * 3);
    const scaleArray = new Float32Array(particleCount);
    
    for(let i = 0; i < particleCount * 3; i++) {
      // Create particles in a sphere
      const angle1 = Math.random() * Math.PI * 2;
      const angle2 = Math.random() * Math.PI * 2;
      const radius = Math.random() * 2;
      
      posArray[i] = Math.cos(angle1) * Math.sin(angle2) * radius;
      posArray[i + 1] = Math.sin(angle1) * Math.sin(angle2) * radius;
      posArray[i + 2] = Math.cos(angle2) * radius;
      
      scaleArray[i / 3] = Math.random();
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('scale', new THREE.BufferAttribute(scaleArray, 1));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.1,
      color: 0x9B6BF3,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 0, 1);
    scene.add(light);
    scene.add(torusKnot);
    scene.add(particlesMesh);

    camera.position.z = 30;

    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate torus knot
      torusKnot.rotation.x += 0.01;
      torusKnot.rotation.y += 0.01;

      // Animate particles
      time += 0.005;
      const positions = particlesGeometry.attributes.position.array as Float32Array;
      const scales = particlesGeometry.attributes.scale.array as Float32Array;
      
      for(let i = 0; i < particleCount * 3; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];
        const z = positions[i + 2];
        
        // Calculate distance from center
        const distance = Math.sqrt(x * x + y * y + z * z);
        
        // Expand particles outward
        positions[i] *= 1 + (Math.sin(time) * 0.01);
        positions[i + 1] *= 1 + (Math.sin(time) * 0.01);
        positions[i + 2] *= 1 + (Math.sin(time) * 0.01);
        
        // Pulse the particle sizes
        scales[i / 3] = Math.sin(distance * 2 + time) * 0.5 + 0.5;
      }
      
      particlesGeometry.attributes.position.needsUpdate = true;
      particlesGeometry.attributes.scale.needsUpdate = true;
      
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden" id='hero'>
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
          <Button size="lg" onClick={() => scrollToSection("projects")} >View Projects</Button>
          <Button size="lg" onClick={() => scrollToSection("contact")} variant="outline">Contact Me</Button>
        </div>
      </div>
    </div>
  );
};