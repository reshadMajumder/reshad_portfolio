import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Send, Mail, User, MessageSquare } from "lucide-react";

export const ContactMe = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "Thank you for reaching out. I'll get back to you soon.",
    });
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-16 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="section-title mb-12">Get In Touch</h2>
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="space-y-6 animate-slide-in">
              <div className="glass-card p-8 transform hover:scale-105 transition-transform duration-300">
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Let's Connect
                </h3>
                <p className="text-muted-foreground mb-6">
                  Feel free to reach out for collaborations or just a friendly chat.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="text-primary animate-bounce" />
                    <span>contact@jahidulhassanreshad.co</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MessageSquare className="text-primary animate-pulse" />
                    <span>Let's discuss your project</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="glass-card p-8 animate-scale">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative group">
                  <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  <Input
                    id="name"
                    placeholder="Your Name"
                    className="pl-10 transition-all duration-300 border-muted-foreground/20 focus:border-primary"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="relative group">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Your Email"
                    className="pl-10 transition-all duration-300 border-muted-foreground/20 focus:border-primary"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <Textarea
                    id="message"
                    placeholder="Your Message"
                    className="min-h-[150px] transition-all duration-300 border-muted-foreground/20 focus:border-primary resize-none"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full group hover:scale-105 transition-all duration-300"
                >
                  Send Message
                  <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
    </section>
  );
};