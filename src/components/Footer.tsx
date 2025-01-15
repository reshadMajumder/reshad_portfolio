import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { Button } from "./ui/button";

export const Footer = () => {
  return (
    <footer className="bg-muted py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Get in Touch</h3>
            <div className="flex space-x-4">
              <Button size="icon" variant="ghost">
                <Github className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost">
                <Mail className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Button variant="link" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
                  About
                </Button>
              </li>
              <li>
                <Button variant="link" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
                  Projects
                </Button>
              </li>
              <li>
                <Button variant="link" onClick={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })}>
                  Courses
                </Button>
              </li>
            </ul>
          </div>
          {/* <div>
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <p className="text-muted-foreground mb-4">Subscribe to get updates about new courses and projects.</p>
            <Button>Subscribe</Button>
          </div> */}
        </div>
        <div className="mt-8 pt-8 border-t border-border text-center text-muted-foreground">
          <p>© 2024 jahidul hassan reshad. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};