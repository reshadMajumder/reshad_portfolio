import { Button } from "./ui/button";
import { ThemeToggle } from "./ThemeToggle";

export const Navbar = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent" onClick={() => scrollToSection("hero")}>
            Jahidul Hassan Reshad
          </div>
          <div className="hidden md:flex space-x-4">
            <Button variant="ghost" onClick={() => scrollToSection("about")}>
              About
            </Button>
            <Button variant="ghost" onClick={() => scrollToSection("projects")}>
              Projects
            </Button>
            <Button variant="ghost" onClick={() => scrollToSection("courses")}>
              Courses
            </Button>
            <Button variant="ghost" onClick={() => scrollToSection("contact")}>
              Contact
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button onClick={() => scrollToSection("contact")}>Contact Me</Button>
          </div>
        </div>
      </div>
    </nav>
  );
};