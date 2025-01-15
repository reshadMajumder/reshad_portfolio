import { Card } from './ui/card';
import { Badge } from './ui/badge';

export const Projects = () => {
  const projects = [
    {
      title: "E-Learning Platform",
      description: "A full-stack platform built with Django and React",
      image: "/placeholder.svg",
      tags: ["React", "Django", "PostgreSQL"],
      link: "#"
    },
    {
      title: "Task Management API",
      description: "REST API built with Django REST Framework",
      image: "/placeholder.svg",
      tags: ["Django", "REST", "API"],
      link: "#"
    },
    {
      title: "Portfolio Generator",
      description: "Dynamic portfolio creator using React",
      image: "/placeholder.svg",
      tags: ["React", "Firebase"],
      link: "#"
    }
  ];

  return (
    <section className="py-20 " id="projects">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Featured Projects</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card key={project.title} className="overflow-hidden hover:scale-105 transition-transform duration-300">
              <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
                <a href={project.link} className="text-primary hover:underline">View Project →</a>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};