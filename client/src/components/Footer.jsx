//Author - Pratham Khare
import React from "react";
import { Link } from "react-router-dom";
import { Linkedin, Mail, Heart } from "lucide-react";
// import ecoVisionLogo from '../assets/ecoVisionLogo.png';

const Footer = () => {
  const teamMembers = [
    {
      name: "Pratham Khare",
      role: "Frontend",
      linkedin: "https://linkedin.com/in/pratham",
    },
    {
      name: "Manish Aggarwal",
      role: "Frontend",
      linkedin: "https://linkedin.com/in/manish",
    },
    {
      name: "Shashank",
      role: "Backend",
      linkedin: "https://linkedin.com/in/shashank",
    },
    {
      name: "Shivansh Gupta",
      role: "Ai Developer",
      linkedin: "https://linkedin.com/in/shivansh",
    },
    {
      name: "Ansh Mishra",
      role: "Ui Designer",
      linkedin: "https://linkedin.com/in/ansh",
    },
  ];

  return (
    <footer className="bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src="/ecoVisionLogo.png"
                alt="EcoVision Logo"
                className="h-10 w-auto"
              />
              <span className="text-xl font-bold">EcoVision</span>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed">
              Empowering individuals and communities to make sustainable choices
              through AI-powered recycling solutions and environmental
              awareness.
            </p>
            <div className="flex items-center space-x-2 text-sm text-primary-foreground/70">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-400 fill-current" />
              <span>for our planet</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  About Our Team
                </Link>
              </li>
              <li>
                <a
                  href="#categories"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Popular Recycling Categories
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  User Reviews
                </a>
              </li>
              <li>
                <a
                  href="#feedback"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Give Feedback
                </a>
              </li>
            </ul>
          </div>

          {/* Team Members */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Meet Our Team</h3>
            <ul className="space-y-3">
              {teamMembers.map((member, index) => (
                <li key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-primary-foreground">
                      {member.name}
                    </p>
                    <p className="text-sm text-primary-foreground/70">
                      {member.role}
                    </p>
                  </div>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-primary-foreground/10 rounded-full transition-colors"
                  >
                    {/* <Linkedin className="h-4 w-4" /> */}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-primary-foreground/70 text-sm">
              © {new Date().getFullYear()} EcoVision. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <a
                href="mailto:contact@ecovision.com"
                className="flex items-center space-x-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span className="text-sm">contact@ecovision.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
