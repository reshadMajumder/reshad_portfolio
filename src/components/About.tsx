import { Card } from './ui/card';
import { ImageCarousel3D } from './ImageCarousel3D';
import { useEffect, useState } from 'react';
import { BASE_URL } from '../services/Api';

export const About = () => {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      const response = await fetch(`${BASE_URL}/api/about/`);
      const data = await response.json();
      setAboutData(data);
    };

    fetchAboutData();
  }, []);

  if (!aboutData) {
    return <div>Loading...</div>;
  }

  const { skills, showCase, title, description } = aboutData;

  return (
    <section className="py-20" id="about">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Portfolio</h2>
        <div className="mt-5 mb-10">
          <ImageCarousel3D />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="glass-card p-8">
            <h3 className="text-2xl font-bold mb-4">{title}</h3>
            <p className="text-muted-foreground mb-6">
              {description}
            </p>

            <div className="grid grid-cols-2 gap-4">
              {skills.map((skill) => (
                <div key={skill.id}>
                  <div className="flex justify-between mb-1">
                    <span>{skill.name}</span>
                    <span>{skill.rate}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${skill.rate}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            {showCase.map((item) => (
              <Card key={item.id} className="p-6">
                <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                <p className="text-muted-foreground">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};