import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Courses } from "@/components/Courses";
import { ContactMe } from "@/components/ContactMe";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { useEffect } from "react";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";

const Index = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            element.classList.add("animate-fade-in");
            element.style.opacity = "1";
            element.style.transform = "translateY(0)";
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px",
      }
    );

    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      const element = section as HTMLElement;
      element.style.opacity = "0";
      element.style.transform = "translateY(50px)";
      element.style.transition = "all 0.8s ease-out";
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <Navbar />
      <div className="relative pt-16">
        <Hero />
        <About />
        
        <Projects />
        <Courses />
        <h2 className="section-title">Testimonials</h2>
        <div className="mt-3 mb-7">
          <TestimonialCarousel />
        </div>
        <ContactMe />
      </div>
      <Footer />
    </div>
  );
};

export default Index;