"use client";

import { useEffect, useRef, useState } from "react";

export default function MrMPortfolio() {
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const [heroShift, setHeroShift] = useState({ x: 0, y: 0 });
  const scrollTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Optimized mouse move handler with requestAnimationFrame throttling
  useEffect(() => {
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      
      animationFrameId = requestAnimationFrame(() => {
        mouseX.current = e.clientX;
        mouseY.current = e.clientY;

        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const distX = (e.clientX - centerX) * 0.01;
        const distY = (e.clientY - centerY) * 0.01;
        setHeroShift({ x: distX, y: distY });
      });
    };

    // Throttled scroll handler
    const handleScroll = () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        // Scroll event - used by CSS animations through IntersectionObserver
      }, 100);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal-on-scroll");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );

    revealElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      title: "StaticForge Framework",
      desc: "High-performance static site generator with <0.8s load times and zero JavaScript bloat.",
      tech: "Next.js, Tailwind, TypeScript",
      year: "2025",
      gradient: "from-indigo-500/20 to-indigo-600/10",
    },
    {
      title: "Pixel-Perfect Dashboard",
      desc: "Real-time analytics interface with WebSocket integration and D3.js visualizations.",
      tech: "React, D3.js, WebSockets, PostgreSQL",
      year: "2024",
      gradient: "from-cyan-500/20 to-cyan-600/10",
    },
    {
      title: "Dark Mode Design System",
      desc: "80+ component variants built for premium SaaS brands with full accessibility.",
      tech: "Tailwind, TypeScript, Storybook",
      year: "2024",
      gradient: "from-purple-500/20 to-purple-600/10",
      featured: true,
    },
    {
      title: "AI Content Studio",
      desc: "Collaborative platform for AI-assisted content generation with real-time updates.",
      tech: "React, GPT-4 API, Supabase, Stripe",
      year: "2024",
      gradient: "from-rose-500/20 to-rose-600/10",
      featured: true,
    },
  ];

  const stats = [
    { number: "50+", label: "Projects Delivered" },
    { number: "200%", label: "Avg. Performance Gain" },
    { number: "99.9%", label: "Client Satisfaction" },
  ];

  const process = [
    {
      num: "01",
      title: "Discovery & Strategy",
      desc: "Deep dive into your vision, constraints, and users. I ask tough questions to build a strong foundation.",
    },
    {
      num: "02",
      title: "Design & Architecture",
      desc: "Precision engineering meets beautiful design. Every decision serves the product and its users.",
    },
    {
      num: "03",
      title: "Development & Polish",
      desc: "Building with obsessive attention to detail. Code, design, and interactions align perfectly.",
    },
  ];

  return (
    <div className="bg-slate-950 text-slate-50 min-h-screen font-sans overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/50 backdrop-blur-xl border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="group cursor-pointer">
            <div className="text-lg font-bold tracking-[0.2em] group-hover:text-indigo-400 transition-colors duration-300">
              MR.M
            </div>
            <div className="h-0.5 w-0 group-hover:w-full bg-indigo-400 transition-all duration-300" />
          </div>

          <div className="hidden md:flex space-x-12 text-sm">
            {[
              { name: "Work", id: "work" },
              { name: "About", id: "about" },
              { name: "Process", id: "process" },
              { name: "Contact", id: "contact" },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="relative group text-slate-300 hover:text-indigo-300 transition-colors"
              >
                {item.name}
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-400 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          <div className="md:hidden text-xl cursor-pointer hover:text-indigo-400 transition">☰</div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen pt-24 flex items-center justify-center overflow-hidden bg-linear-to-b from-slate-950 via-slate-900 to-slate-950">
        {/* Animated background orbs */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div
            className="absolute top-32 left-10 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl transition-transform duration-700"
            style={{
              transform: `translate(${heroShift.x * 3}px, ${heroShift.y * 3}px)`,
            }}
          />
          <div
            className="absolute bottom-32 right-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl transition-transform duration-700"
            style={{
              transform: `translate(${heroShift.x * -2}px, ${heroShift.y * -2}px)`,
            }}
          />
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-purple-600/5 rounded-full blur-3xl" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center py-20">
          <div className="mb-8 inline-block animate-fadeIn" style={{animationDelay: '0.1s'}}>
            <span className="text-xs uppercase tracking-[0.3em] text-indigo-400/80 bg-indigo-950/40 px-4 py-2 rounded-full border border-indigo-500/20">
              Creative Developer
            </span>
          </div>

          <h1
            className="text-6xl md:text-7xl lg:text-8xl font-light tracking-tight mb-8 leading-[1.1] animate-fadeIn"
            style={{
              fontFamily: '"Prata", serif',
              transform: `translate(${heroShift.x}px, ${heroShift.y}px)`,
              transition: "transform 0.4s ease-out",
              animationDelay: '0.2s'
            }}
          >
            I craft <br />
            <span className="bg-clip-text text-transparent bg-linear-to-r from-indigo-300 via-cyan-300 to-indigo-400 font-semibold">
              digital precision
            </span>
          </h1>

          <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto mb-12 leading-relaxed animate-fadeIn" style={{animationDelay: '0.3s'}}>
            Building high-performance web experiences with meticulous attention to detail. Specializing in Next.js, React, and interactive design systems.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fadeIn" style={{animationDelay: '0.4s'}}>
            <a
              href="#work"
              className="group relative px-8 py-4 border border-indigo-500/60 text-indigo-300 font-medium tracking-wide hover:text-white transition overflow-hidden rounded-lg"
            >
              <span className="relative z-10">Explore Work</span>
              <div className="absolute inset-0 bg-indigo-600 -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            </a>

            <a
              href="#contact"
              className="px-8 py-4 text-slate-300 font-medium tracking-wide border-b-2 border-slate-700 hover:border-indigo-400 hover:text-indigo-300 transition-all"
            >
              Start a Project
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 animate-fadeIn" style={{animationDelay: '0.5s'}}>
          <div className="text-xs text-slate-500 mb-3">Scroll to explore</div>
          <svg className="w-5 h-5 mx-auto text-slate-600 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 px-6 bg-slate-950 border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="reveal-on-scroll opacity-0 translate-y-8 group text-center p-6 border border-slate-800 rounded-lg hover:border-indigo-500/30 transition-all duration-300"
              >
                <div className="text-4xl md:text-5xl font-light text-indigo-400 mb-2 group-hover:text-indigo-300 transition">
                  {stat.number}
                </div>
                <div className="text-sm uppercase tracking-widest text-slate-400 group-hover:text-slate-300 transition">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="relative py-32 px-6 bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 reveal-on-scroll opacity-0 translate-y-8">
            <h2
              className="text-5xl md:text-6xl font-light tracking-tight mb-6"
              style={{ fontFamily: '"Prata", serif' }}
            >
              Featured <span className="text-indigo-400">Work</span>
            </h2>
            <p className="text-slate-400 max-w-2xl">
              A selection of projects where design meets engineering. Each represents a unique challenge solved with precision and creative problem-solving.
            </p>
          </div>

          {/* Grid Layout - 2 Featured + 2 Secondary */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {projects.slice(0, 2).map((project, idx) => (
              <div
                key={idx}
                className="reveal-on-scroll opacity-0 translate-y-8 group relative overflow-hidden rounded-xl border border-slate-800 hover:border-indigo-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-900/20"
              >
                <div className={`absolute inset-0 bg-linear-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10`} />
                <div className="aspect-video bg-linear-to-br from-slate-800 to-slate-900 overflow-hidden relative">
                  <img
                    src={`https://placehold.co/1000x600/1e293b/64748b?text=${project.title}`}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-8 relative z-20 bg-linear-to-t from-slate-950 to-transparent">
                  {project.featured && (
                    <span className="inline-block mb-4 text-xs uppercase tracking-widest text-indigo-300 bg-indigo-950/40 px-3 py-1 rounded-full border border-indigo-500/30">
                      Featured
                    </span>
                  )}
                  <h3
                    className="text-2xl font-light mb-3 tracking-tight"
                    style={{ fontFamily: '"Prata", serif' }}
                  >
                    {project.title}
                  </h3>
                  <p className="text-slate-400 mb-6 leading-relaxed text-sm">{project.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.split(", ").map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs uppercase tracking-widest text-indigo-400 border border-indigo-500/30 px-2 py-1 rounded group-hover:border-indigo-400/60 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-6 border-t border-slate-800/50">
                    <span className="text-slate-500 text-sm">{project.year}</span>
                    <a href="#" className="text-indigo-400 text-sm font-medium group-hover:text-indigo-300 transition flex items-center gap-2">
                      View <span>→</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.slice(2, 4).map((project, idx) => (
              <div
                key={idx + 2}
                className="reveal-on-scroll opacity-0 translate-y-8 group relative overflow-hidden rounded-xl border border-slate-800 hover:border-indigo-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-900/20"
              >
                <div className={`absolute inset-0 bg-linear-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10`} />
                <div className="aspect-video bg-linear-to-br from-slate-800 to-slate-900 overflow-hidden relative">
                  <img
                    src={`https://placehold.co/1000x600/1e293b/64748b?text=${project.title}`}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-8 relative z-20 bg-linear-to-t from-slate-950 to-transparent">
                  {project.featured && (
                    <span className="inline-block mb-4 text-xs uppercase tracking-widest text-indigo-300 bg-indigo-950/40 px-3 py-1 rounded-full border border-indigo-500/30">
                      Featured
                    </span>
                  )}
                  <h3
                    className="text-2xl font-light mb-3 tracking-tight"
                    style={{ fontFamily: '"Prata", serif' }}
                  >
                    {project.title}
                  </h3>
                  <p className="text-slate-400 mb-6 leading-relaxed text-sm">{project.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.split(", ").map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs uppercase tracking-widest text-indigo-400 border border-indigo-500/30 px-2 py-1 rounded group-hover:border-indigo-400/60 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-6 border-t border-slate-800/50">
                    <span className="text-slate-500 text-sm">{project.year}</span>
                    <a href="#" className="text-indigo-400 text-sm font-medium group-hover:text-indigo-300 transition flex items-center gap-2">
                      View <span>→</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-32 px-6 bg-linear-to-b from-slate-950 to-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="reveal-on-scroll opacity-0 translate-y-8">
              <div className="aspect-square rounded-xl overflow-hidden border border-slate-800 group">
                <img
                  src="https://placehold.co/600x600/1e293b/64748b?text=Mr.M"
                  alt="Mr.M"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            <div className="reveal-on-scroll opacity-0 translate-y-8">
              <h2
                className="text-5xl md:text-6xl font-light mb-8 tracking-tight"
                style={{ fontFamily: '"Prata", serif' }}
              >
                About <span className="text-indigo-400">Mr.M</span>
              </h2>

              <blockquote className="text-xl font-light mb-8 leading-relaxed italic text-indigo-300 border-l-2 border-indigo-500/30 pl-6">
                "I don't build websites. I architect digital experiences that respect the user's time and intelligence."
              </blockquote>

              <p className="text-slate-300 mb-6 leading-relaxed">
                I'm a full-stack developer obsessed with precision, performance, and purposeful design. My work spans high-performance web applications, dark-mode design systems, and interactive experiences that push boundaries.
              </p>

              <p className="text-slate-400 mb-10 leading-relaxed">
                Every project I undertake reflects my core belief: simplicity is sophistication. I specialize in building scalable, maintainable systems that feel effortless to use while being engineered for resilience and speed.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <span className="text-indigo-400 font-medium min-w-fit">Tech Stack:</span>
                  <span className="text-slate-400">Next.js, React, TypeScript, Tailwind CSS, Node.js</span>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-indigo-400 font-medium min-w-fit">Specialty:</span>
                  <span className="text-slate-400">Design Systems, Performance Optimization, UX Engineering</span>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-indigo-400 font-medium min-w-fit">Mission:</span>
                  <span className="text-slate-400">Elevate digital products through thoughtful craftsmanship</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="relative py-32 px-6 bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 reveal-on-scroll opacity-0 translate-y-8">
            <h2
              className="text-5xl md:text-6xl font-light tracking-tight mb-6"
              style={{ fontFamily: '"Prata", serif' }}
            >
              My <span className="text-indigo-400">Process</span>
            </h2>
            <p className="text-slate-400 max-w-2xl">
              A structured approach to problem-solving that prioritizes clarity, creativity, and technical excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {process.map((step, idx) => (
              <div
                key={idx}
                className="reveal-on-scroll opacity-0 translate-y-8 group relative p-8 border border-slate-800 rounded-lg hover:border-indigo-500/40 transition-all duration-500 hover:bg-slate-900/50"
              >
                <div className="absolute inset-0 bg-linear-to-br from-indigo-900/0 to-indigo-900/0 group-hover:from-indigo-900/10 group-hover:to-slate-900/10 rounded-lg transition-all duration-500" />

                <div className="relative z-10">
                  <div className="text-6xl font-light text-slate-700 group-hover:text-indigo-400 transition-colors duration-300 mb-6">
                    {step.num}
                  </div>
                  <h3
                    className="text-2xl font-light mb-4 tracking-tight"
                    style={{ fontFamily: '"Prata", serif' }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-6 bg-linear-to-b from-slate-950 to-slate-900">
        <div className="max-w-4xl mx-auto text-center reveal-on-scroll opacity-0 translate-y-8">
          <h2
            className="text-5xl md:text-6xl font-light mb-8 tracking-tight"
            style={{ fontFamily: '"Prata", serif' }}
          >
            Ready to <span className="text-indigo-400">Create</span> Something Great?
          </h2>

          <p className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            I'm always open to discussing new projects, creative ideas, or opportunities. Let's build something extraordinary together.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="mailto:hello@mrm.dev"
              className="group relative px-8 py-4 border border-indigo-500/60 text-indigo-300 font-medium tracking-wide hover:text-white transition overflow-hidden rounded-lg"
            >
              <span className="relative z-10">Get In Touch</span>
              <div className="absolute inset-0 bg-indigo-600 -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            </a>

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 text-slate-300 font-medium tracking-wide border-b-2 border-slate-700 hover:border-indigo-400 hover:text-indigo-300 transition-all"
            >
              View GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-16 px-6 bg-slate-950 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="text-lg font-bold tracking-[0.2em] mb-4">MR.M</div>
              <p className="text-sm text-slate-400">Creative developer crafting high-performance digital experiences.</p>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-4 text-indigo-400">Navigation</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#work" className="hover:text-indigo-300 transition">Work</a></li>
                <li><a href="#about" className="hover:text-indigo-300 transition">About</a></li>
                <li><a href="#process" className="hover:text-indigo-300 transition">Process</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-4 text-indigo-400">Social</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-indigo-300 transition">Twitter</a></li>
                <li><a href="#" className="hover:text-indigo-300 transition">GitHub</a></li>
                <li><a href="#" className="hover:text-indigo-300 transition">LinkedIn</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-4 text-indigo-400">Contact</h4>
              <p className="text-sm text-slate-400">
                <a href="mailto:hello@mrm.dev" className="hover:text-indigo-300 transition">hello@mrm.dev</a>
              </p>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
            <p>© 2025 Mr.M. Crafted with precision and passion.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
