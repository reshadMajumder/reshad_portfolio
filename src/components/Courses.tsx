import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { toast } from './ui/use-toast';

export const Courses = () => {
  const [email, setEmail] = useState('');
  
  const courses = [
    {
      title: "React.js Mastery",
      description: "Master React.js from basics to advanced concepts",
      price: ' free',
      duration: "8 weeks",
      active: false // Default value set to inactive
    },
    {
      title: "Django Web Development",
      description: "Build full-stack applications with Django",
      price: ' free',
      duration: "10 weeks",
      active: false // Default value set to inactive
    },
    {
      title: "REST API Development",
      description: "Create robust APIs with Django REST Framework",
      price: ' free',
      duration: "6 weeks",
      active: false // Default value set to inactive
    }
  ];

  const handleRegistration = (courseTitle: string) => {
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Registration Successful!",
      description: `You've registered for ${courseTitle}. Check your email for details.`
    });
    setEmail('');
  };

  return (
    <section className="py-20" id="courses">
      <div className="container mx-auto px-4 py-20">
        <h2 className="section-title">Available Courses</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <Card key={course.title} className="p-6">
              <h3 className="text-xl font-bold mb-2">{course.title}</h3>
              <p className="text-muted-foreground mb-4">{course.description}</p>
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span>Duration:</span>
                  <span>{course.duration}</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span>Price:</span>
                  <span>${course.price}</span>
                </div>
              </div>
              <Input
                type="email"
                placeholder="Enter your email"
                className="mb-4"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button 
                className="w-full"
                onClick={() => handleRegistration(course.title)}
                disabled={!course.active} // Disable button if course is inactive
              >
                {course.active ? "Register Now" : "Coming Soon"} {/* Change button text based on active status */}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};