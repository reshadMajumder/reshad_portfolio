import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { useEffect, useState } from 'react';
import { BASE_URL } from '../services/Api';

export const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/projects/`);
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section className="py-20 " id="projects">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Featured Projects</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden hover:scale-105 transition-transform duration-300">
              <img src={`${BASE_URL}${project.image}`} alt={project.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.stack.map((stack) => (
                    <Badge key={stack.id} variant="secondary">{stack.name}</Badge>
                  ))}
                </div>
                <a href={project.viewProject} className="text-primary hover:underline">View Project →</a>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};