import { Card } from './ui/card';
import { ImageCarousel3D } from './ImageCarousel3D';
import { TestimonialCarousel } from './TestimonialCarousel';

export const About = () => {
  const skills = [
    { name: 'React.js', level: 90 },
    { name: 'Django', level: 85 },
    { name: 'Python', level: 88 },
    { name: 'REST Framework', level: 82 },
  ];
  return (
    <section className="py-20" id="about">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Portfolio</h2>
        <div className="mt-5 mb-10">
          <ImageCarousel3D />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="glass-card p-8">
            <h3 className="text-2xl font-bold mb-4">Who I Am</h3>
            <p className="text-muted-foreground mb-6">
              A passionate software engineer with expertise in modern web technologies.
              I specialize in building scalable applications and sharing knowledge through
              comprehensive courses.
            </p>

            
            <div className="grid grid-cols-2 gap-4">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-1">
                    <span>{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <Card className="p-6">
              <h4 className="text-xl font-bold mb-2">Experience</h4>
              <p className="text-muted-foreground">1+ years of professional development</p>
            </Card>
            <Card className="p-6">
              <h4 className="text-xl font-bold mb-2">Projects</h4>
              <p className="text-muted-foreground">20+ completed projects</p>
            </Card>
            <Card className="p-6">
              <h4 className="text-xl font-bold mb-2">Achivements</h4>
              <p className="text-muted-foreground">6+ Achivements</p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};