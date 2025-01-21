import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Button } from './ui/button';
import { motion, useAnimationControls } from 'framer-motion';
import { BASE_URL } from '../services/Api';
const TypewriterText = ({ text }: { text: string }) => {
  const controls = useAnimationControls();
  const [displayedText, setDisplayedText] = useState("");
  const [smokeParticles, setSmokeParticles] = useState<{ x: number, y: number, id: number }[]>([]);
  const particleRef = useRef(0);

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayedText(text.slice(0, currentIndex));
        if (currentIndex > 0) {
          // Add new smoke particle
          setSmokeParticles(prev => [...prev, {
            x: Math.random() * 20 - 10,
            y: Math.random() * 20 - 10,
            id: particleRef.current++
          }]);
          // Remove old particles
          setTimeout(() => {
            setSmokeParticles(prev => prev.slice(1));
          }, 1000);
        }
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 150);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <div className="relative inline-block">
      {smokeParticles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute inline-block w-2 h-2 bg-primary/20 rounded-full"
          initial={{ 
            opacity: 0.8,
            scale: 1,
            x: 0,
            y: 0
          }}
          animate={{ 
            opacity: 0,
            scale: 0,
            x: particle.x,
            y: particle.y,
          }}
          transition={{ 
            duration: 1,
            ease: "easeOut"
          }}
          style={{
            left: "50%",
            top: "50%",
          }}
        />
      ))}
      <span className="relative z-10">{displayedText}</span>
      <motion.span
        className="inline-block w-[2px] h-[1em] bg-primary ml-[2px] relative top-[2px]"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
      />
    </div>
  );
};

export const Hero = () => {
  const [heroData, setHeroData] = useState(null);
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchHeroData = async () => {
      const response = await fetch(`${BASE_URL}/api/hero/`);
      const data = await response.json();
      setHeroData(data);
    };

    fetchHeroData();
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Create the torus knot
    const geometry = new THREE.TorusKnotGeometry(10, 3, 100,16);
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
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center" id='hero'>
      <div ref={containerRef} className="fixed inset-0 -z-10" />
      <div className="relative z-10 text-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              ease: [0, 0.71, 0.2, 1.01]
            }}
          >
            <motion.div
              className="inline-block text-3xl md:text-4xl lg:text-5xl"
            >
              {heroData ? <TypewriterText text={heroData[0].Title} /> : <TypewriterText text="Loading..." />}
            </motion.div>
            <motion.span 
              className="text-primary block mt-2 text-2xl md:text-3xl lg:text-4xl"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 3.5 }}
            >
              {heroData ? heroData[0].Designation : "Loading..."}
            </motion.span>
          </motion.h1>
        </motion.div>
        
        <motion.p 
          className="text-xl mb-8 text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 4 }}
        >
          {heroData ? heroData[0].Description : "Loading..."}
        </motion.p>

        <motion.div 
          className="flex gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 4.3 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button size="lg" onClick={() => scrollToSection("projects")}>View Projects</Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button size="lg" onClick={() => scrollToSection("contact")} variant="outline">Contact Me</Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};