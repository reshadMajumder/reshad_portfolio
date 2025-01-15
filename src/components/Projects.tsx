import { Card } from './ui/card';
import { Badge } from './ui/badge';

export const Projects = () => {
  const projects = [
    {
      title: "smart looks BD",
      description: "A full-stack e-commerce built with Django ",
      image: "/placeholder.svg",
      tags: ["html", "Django", "PostgreSQL"],
      link: "#"
    },
    {
      title: "hospital website",
      description: "REST API built with Django REST Framework",
      image: "/portfolio/hospital.png",
      tags: ["Django", "REST", "API"],
      link: "https://hospital-mu-livid.vercel.app"
    },
    {
      title: "Portfolio ",
      description: "Dynamic portfolio  using React and django",
      image: "/portfolio/portfolio.png",
      tags: ["React", "Django"],
      link: "https://jahidulhassanreshad.co"
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