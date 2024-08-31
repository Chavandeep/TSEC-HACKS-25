import React from "react";
import { Link } from "react-scroll";

export default function Footer() {
  const getCurrentYear = () => new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo and Social Media */}
        <div>
          <Link
            to="home"
            smooth={true}
            offset={-80}
            className="flex items-center cursor-pointer mb-4"
          >
            <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
            <h1 className="text-xl font-bold ml-4">Fanatic</h1>
          </Link>
          <p className="text-gray-400 mb-4">
            Follow us on social media for the latest updates.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-blue-500">
              {/* Example icon, replace with actual icons */}
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-500">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-500">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-500">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h2 className="font-bold mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <Link
                  to="services"
                  smooth={true}
                  offset={-80}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="projects"
                  smooth={true}
                  offset={-80}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  to="blog"
                  smooth={true}
                  offset={-80}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="pricing"
                  smooth={true}
                  offset={-80}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-bold mb-4">Company</h2>
            <ul className="space-y-2">
              <li>
                <Link
                  to="about"
                  smooth={true}
                  offset={-80}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="team"
                  smooth={true}
                  offset={-80}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Our Team
                </Link>
              </li>
              <li>
                <Link
                  to="contact"
                  smooth={true}
                  offset={-80}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="careers"
                  smooth={true}
                  offset={-80}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h2 className="font-bold mb-4">Subscribe to Our Newsletter</h2>
          <form className="flex flex-col space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button
              type="submit"
              className="p-2 rounded bg-blue-600 hover:bg-blue-700 text-white transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center">
        <p className="text-gray-400 text-sm">
          © {getCurrentYear()} Fanatic. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
