import React, { useState } from 'react';
import { Linkedin, Github, Twitter, Send } from 'lucide-react';

interface ContactFormProps {
  onSubmit: (data: { name: string; email: string; message: string }) => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-12">
      {/* Contact Form */}
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-blue-400/50 focus:ring-1 focus:ring-blue-400/50 text-white placeholder-gray-400 transition-colors"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-blue-400/50 focus:ring-1 focus:ring-blue-400/50 text-white placeholder-gray-400 transition-colors"
                placeholder="sayyedmooaz@gmail.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-blue-400/50 focus:ring-1 focus:ring-blue-400/50 text-white placeholder-gray-400 transition-colors resize-none"
                placeholder="Your message..."
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg shadow-blue-500/20"
          >
            <Send className="w-5 h-5" />
            <span>Send Message</span>
          </button>
        </form>
      </div>

      {/* Social Links */}
      <div className="flex justify-center gap-6">
        <a
          href="https://linkedin.com/in/mooazsayyed "
          target="_blank"
          rel="noopener noreferrer"
          className="group relative p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
        >
          <Linkedin className="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors" />
          <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
        </a>

        <a
          href="https://github.com/mooazsayyed"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
        >
          <Github className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors" />
          <div className="absolute inset-0 rounded-full bg-gray-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
        </a>

        <a
          href="https://x.com/MooazSayyed "
          target="_blank"
          rel="noopener noreferrer"
          className="group relative p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
        >
          <Twitter className="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors" />
          <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
        </a>
      </div>

      {/* Calendly Scheduler - Temporarily disabled
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
            Schedule a Meeting
          </h3>
          <p className="text-gray-300 mt-2">
            Book a time slot for a detailed discussion about your project.
          </p>
        </div>
        <div className="rounded-2xl overflow-hidden bg-white/5 backdrop-blur-md border border-white/10">
          <iframe
            src="https://calendly.com/yourusername"
            className="w-full h-[600px] border-0"
            title="Calendly Scheduler"
          />
        </div>
      </div>
      */}
    </div>
  );
}; 