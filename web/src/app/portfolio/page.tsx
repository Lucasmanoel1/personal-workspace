"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import Head from "next/head";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { fadeUp, fadeUpDelay } from "@/lib/motion";

export default function PortfolioPage() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // --- theme (persistente) ---
  useEffect(() => {
    const savedTheme = (localStorage.getItem("theme") as "light" | "dark") || "dark";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  // --- typing, scroll reveal e smooth scroll (baseado no seu código antigo) ---
  useEffect(() => {
    // Typing effect data
    const typingData = [
      { line: '<span class="keyword">const</span> developer = {', delay: 200 },
      { line: '  nome: <span class="string">"Lucas Manoel"</span>,', delay: 120 },
      { line: '  idade: <span class="number">20</span>,', delay: 120 },
      { line: '  curso: <span class="string">"Eng. Software"</span>,', delay: 120 },
      { line: '  foco: <span class="string">"Backend "</span>,', delay: 120 },
      { line: '  objetivo: <span class="string">"Primeiro Estágio"</span>', delay: 120 },
      { line: '};', delay: 200 },
      { line: '', delay: 200 },
    ];

    const typingElement = document.getElementById("typing-effect");
    if (typingElement) {
      let currentLine = 0;
      let isTypingStarted = false;

      const typeLine = () => {
        if (currentLine >= typingData.length) return;
        const lineDiv = document.createElement("div");
        lineDiv.className = "leading-6";
        typingElement.appendChild(lineDiv);

        const { line, delay } = typingData[currentLine];
        let charIndex = 0;

        const typeChar = () => {
          if (charIndex < line.length) {
            lineDiv.innerHTML = line.substring(0, charIndex + 1);
            charIndex++;
            setTimeout(typeChar, 14 + Math.random() * 22);
          } else {
            currentLine++;
            setTimeout(typeLine, delay);
          }
        };

        typeChar();
      };

      const heroObserver = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !isTypingStarted) {
            isTypingStarted = true;
            setTimeout(typeLine, 400);
            heroObserver.disconnect();
          }
        },
        { threshold: 0.12 }
      );

      const heroElement = document.querySelector(".hero");
      if (heroElement) heroObserver.observe(heroElement);
    }

    // Scroll reveal for elements that already have 'scroll-animate' class
    const scrollObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0", "translate-y-5");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll(".scroll-animate").forEach((el) => {
      // ensure initial state
      el.classList.add("opacity-0", "translate-y-5");
      scrollObserver.observe(el);
    });

    // Smooth scroll for in-page anchors
    const smoothScrollHandler = (e: Event) => {
      const anchor = e.currentTarget as HTMLAnchorElement;
      const href = anchor.getAttribute("href") ?? "";
      if (!href.startsWith("#")) return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      setIsMenuOpen(false);
    };

    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach((a) => a.addEventListener("click", smoothScrollHandler));

    // cleanup
    return () => {
      anchors.forEach((a) => a.removeEventListener("click", smoothScrollHandler));
      scrollObserver.disconnect();
    };
  }, []);

  const central = "mx-auto w-full max-w-6xl px-4 md:px-8";

  return (
    <>
      <Head>
        <title>Lucas Manoel - Desenvolvedor Backend</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/js/all.min.js" strategy="lazyOnload" />

      {/* HEADER (inline na página conforme pediu) */}
      <header className="fixed w-full top-0 left-0 right-0 z-50 transition-shadow duration-300">
        <div className="absolute inset-0 bg-[#FEFEFE]/90 dark:bg-[#1c1814]/85 backdrop-blur-md" />
        <div className="relative h-20">
          <div className={`${central} flex justify-between items-center h-full`}>
            <div className="text-2xl font-bold text-[#8B4513] dark:text-[#D2B48C]">Lucas Manoel</div>

            <nav className="hidden md:flex gap-8 items-center">
              <a href="#home" className="nav-link">Início</a>
              <a href="#stack" className="nav-link">Stack</a>
              <a href="#projetos" className="nav-link">Projetos</a>
              <a href="#artigos" className="nav-link">Artigos</a>

              <button onClick={toggleTheme} className="text-[#6B4423] dark:text-[#A89F91] hover:text-[#D2B48C] transition-all duration-300 hover:scale-125 active:scale-95 text-xl" aria-label="Toggle theme">
                <i className={`fas ${theme === "dark" ? "fa-sun" : "fa-moon"}`}></i>
              </button>

              <button
                onClick={() => signIn("auth0")}
                className="flex items-center gap-2 bg-[#8B4513] dark:bg-[#D2B48C] text-white dark:text-[#2C1810] rounded-lg px-5 py-2.5 font-semibold hover:bg-[#A0522D] dark:hover:bg-[#E0C4A1] transition-all duration-300 hover:-translate-y-1 active:scale-95 shadow-md"
              >
                <i className="fas fa-sign-in-alt" /> Acessar
              </button>
            </nav>

            <button className="md:hidden p-2 text-2xl text-[#6B4423] dark:text-[#A89F91]" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Menu">
              <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"}`}></i>
            </button>
          </div>
        </div>

        {/* mobile menu */}
        <div className={`md:hidden absolute w-full bg-[#FEFEFE] dark:bg-[#1c1814]/95 transition-all duration-300 ease-in-out shadow-lg ${isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}`}>
          <div className="flex flex-col items-center gap-6 py-6">
            <a href="#home" className="nav-link">Início</a>
            <a href="#stack" className="nav-link">Stack</a>
            <a href="#projetos" className="nav-link">Projetos</a>
            <a href="#artigos" className="nav-link">Artigos</a>
            <button onClick={toggleTheme} className="text-[#6B4423] dark:text-[#A89F91] hover:text-[#D2B48C] transition-all duration-300 hover:scale-125 active:scale-95 text-xl" aria-label="Toggle theme">
              <i className={`fas ${theme === "dark" ? "fa-sun" : "fa-moon"}`}></i>
            </button>
            <a href="/sign-in" className="flex items-center gap-2 bg-[#8B4513] dark:bg-[#D2B48C] text-white dark:text-[#2C1810] rounded-lg px-5 py-2.5 font-semibold hover:bg-[#A0522D] dark:hover:bg-[#E0C4A1] transition-all duration-300 hover:-translate-y-1 active:scale-95 shadow-md">
              <i className="fas fa-sign-in-alt" /> Acessar
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section id="home" className="hero min-h-screen flex items-center bg-gradient-to-br from-[#FAF7F0] to-[#FEFEFE] dark:from-[#2C241E] dark:to-[#1c1814] relative overflow-hidden pt-32 pb-16">
          <div className={`${central} grid grid-cols-1 md:grid-cols-2 gap-y-16 gap-x-8 items-center`}>
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} className="hero-text order-1 md:order-1 space-y-5 text-center md:text-left">
              <h1 className="text-5xl md:text-6xl font-extrabold text-[#2C1810] dark:text-[#FAF7F0] leading-tight">Software Engineer</h1>
              <p className="text-lg text-[#6B4423] dark:text-[#A89F91] max-w-xl mx-auto md:mx-0">
                Estudante de Engenharia de Software (5º período) com três anos de experiência em desenvolvimento back-end e modelagem de bancos de dados relacionais, aplicando fundamentos de arquitetura de software e sistemas escaláveis. Busco meu primeiro estágio para aplicar boas práticas de arquitetura, versionamento de código e integração contínua.
              </p>

              <div className="flex justify-center md:justify-start gap-4 pt-4">
                <a href="https://github.com/Lucasmanoel1" target="_blank" rel="noreferrer" className="social-link"><i className="fab fa-github"></i></a>
                <a href="https://www.linkedin.com/in/lucas-manoel-developer/" target="_blank" rel="noreferrer" className="social-link"><i className="fab fa-linkedin"></i></a>
                <a href="https://x.com/LucasMa30817760" target="_blank" rel="noreferrer" className="social-link"><i className="fab fa-x-twitter"></i></a>
                <a href="https://www.instagram.com/zzlucca_/" target="_blank" rel="noreferrer" className="social-link"><i className="fab fa-instagram"></i></a>
              </div>
            </motion.div>

            <motion.div variants={fadeUpDelay(0.1)} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} className="hero-visual order-2 md:order-2 flex justify-center md:justify-end">
              <div className="code-window bg-[#2D2D2D] p-4 sm:p-6 rounded-xl shadow-2xl w-full max-w-sm sm:max-w-md">
                <div className="flex gap-2 mb-4"><span className="w-3.5 h-3.5 rounded-full bg-red-500"></span><span className="w-3.5 h-3.5 rounded-full bg-yellow-400"></span><span className="w-3.5 h-3.5 rounded-full bg-green-500"></span></div>
                <pre className="code-content text-sm sm:text-base font-mono text-[#A8B2D1]"><div id="typing-effect" /></pre>
              </div>
            </motion.div>
          </div>
        </section>

        {/* STACK */}
        <section id="stack" className="py-24 bg-[#FAF7F0] dark:bg-[#2C241E]">
          <div className={`${central}`}>
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
              <h2 className="section-title">Tecnologias & Habilidades</h2>
              <div className="title-underline" />
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <motion.div variants={fadeUpDelay(0)} initial="hidden" whileInView="visible" viewport={{ once: true }} className="stack-card">
                <h3 className="category-title"><i className="fas fa-server"></i> Backend</h3>
                <div className="flex flex-wrap gap-3"><span className="tech-tag">Node.js</span><span className="tech-tag">Java</span><span className="tech-tag">PHP</span><span className="tech-tag">SQL</span><span className="tech-tag">PostgreSQL</span><span className="tech-tag">Prisma</span></div>
              </motion.div>

              <motion.div variants={fadeUpDelay(0.15)} initial="hidden" whileInView="visible" viewport={{ once: true }} className="stack-card">
                <h3 className="category-title"><i className="fas fa-code"></i> Frontend</h3>
                <div className="flex flex-wrap gap-3"><span className="tech-tag">HTML</span><span className="tech-tag">CSS</span><span className="tech-tag">JavaScript</span><span className="tech-tag">React</span><span className="tech-tag">Next.js</span><span className="tech-tag">Tailwind CSS</span></div>
              </motion.div>

              <motion.div variants={fadeUpDelay(0.3)} initial="hidden" whileInView="visible" viewport={{ once: true }} className="stack-card">
                <h3 className="category-title"><i className="fas fa-tools"></i> DevOps & Ferramentas</h3>
                <div className="flex flex-wrap gap-3"><span className="tech-tag">Docker</span><span className="tech-tag">Git</span><span className="tech-tag">BetterAuth</span></div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* PROJETOS */}
        <section id="projetos" className="py-24 bg-[#FEFEFE] dark:bg-[#1c1814]">
          <div className={`${central}`}>
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
              <h2 className="section-title">Projeto em Destaque</h2>
              <div className="title-underline" />
            </motion.div>

            <motion.div variants={fadeUpDelay(0.15)} initial="hidden" whileInView="visible" viewport={{ once: true }} className="project-card">
              <h3 className="text-3xl font-bold mb-2 text-[#2C1810] dark:text-[#FAF7F0]">Personal Workspace</h3>
              <p className="text-lg text-[#6B4423] dark:text-[#A89F91] mb-6">Um workspace completo e personalizado que centraliza ferramentas essenciais do dia a dia, funcionando como um painel de controle pessoal com armazenamento em nuvem, entretenimento e mais.</p>
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-3 mb-8">
                <div className="feature-item"><i className="fas fa-cloud"></i><span>Drive pessoal (Cloud Storage)</span></div>
                <div className="feature-item"><i className="fas fa-sticky-note"></i><span>Sistema de notas (Notion privado)</span></div>
                <div className="feature-item"><i className="fas fa-film"></i><span>Streaming pessoal (Netflix privado)</span></div>
                <div className="feature-item"><i className="fas fa-newspaper"></i><span>Agregador de notícias</span></div>
                <div className="feature-item"><i className="fas fa-cloud-sun"></i><span>Informações meteorológicas</span></div>
                <div className="feature-item"><i className="fas fa-coins"></i><span>Cotações de moedas e crypto</span></div>
              </div>
              <h4 className="text-xl font-semibold mb-4 text-[#2C1810] dark:text-[#FAF7F0]">Stack Utilizada:</h4>
              <div className="flex flex-wrap gap-3 mb-8">
                <span className="tech-item">Next.js</span><span className="tech-item">Node.js</span><span className="tech-item">PostgreSQL</span><span className="tech-item">Prisma</span><span className="tech-item">BetterAuth</span><span className="tech-item">Docker</span>
              </div>
              <div className="flex gap-4 flex-wrap">
                <a href="/sign-in" className="project-link-primary"><i className="fas fa-external-link-alt"></i> Ver Projeto</a>
                <a href="https://github.com/Lucasmanoel1/Portfolio" target="_blank" rel="noreferrer" className="project-link-secondary"><i className="fab fa-github"></i> Código no GitHub</a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ARTIGOS */}
        <section id="artigos" className="py-24 bg-[#FAF7F0] dark:bg-[#2C241E]">
          <div className={`${central}`}>
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
              <h2 className="section-title">Artigos & Aprendizados</h2>
              <div className="title-underline" />
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <motion.article variants={fadeUpDelay(0)} initial="hidden" whileInView="visible" viewport={{ once: true }} className="article-card">
                <h3>Primeira Experiência com Next.js</h3>
                <p>Minha jornada migrando de backend puro para fullstack com Next.js. Desafios, descobertas e lições.</p>
                <div className="mt-2"><span><i className="fas fa-calendar"></i> Em breve</span></div>
              </motion.article>

              <motion.article variants={fadeUpDelay(0.15)} initial="hidden" whileInView="visible" viewport={{ once: true }} className="article-card">
                <h3>BetterAuth vs Auth.js</h3>
                <p>Por que escolhi BetterAuth. Uma análise comparativa baseada na experiência real de desenvolvimento.</p>
                <div className="mt-2"><span><i className="fas fa-calendar"></i> Em breve</span></div>
              </motion.article>

              <motion.article variants={fadeUpDelay(0.3)} initial="hidden" whileInView="visible" viewport={{ once: true }} className="article-card">
                <h3>Deploy de Aplicações Next.js em VPS</h3>
                <p>Guia prático para configurar um ambiente de produção usando VPS e EasyPanel para deploy.</p>
                <div className="mt-2"><span><i className="fas fa-calendar"></i> Em breve</span></div>
              </motion.article>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#2C1810] dark:bg-[#110E0B] text-[#A89F91] py-12">
        <div className={`${central} h-full flex flex-col justify-between text-center`}>
          <div className="flex justify-center gap-6 mb-8">
            <a href="https://github.com/Lucasmanoel1" target="_blank" rel="noreferrer" className="footer-social-link"><i className="fab fa-github"></i></a>
            <a href="https://www.linkedin.com/in/lucas-manoel-developer/" target="_blank" rel="noreferrer" className="footer-social-link"><i className="fab fa-linkedin"></i></a>
            <a href="https://x.com/LucasMa30817760" target="_blank" rel="noreferrer" className="footer-social-link"><i className="fab fa-x-twitter"></i></a>
            <a href="https://www.instagram.com/zzlucca_/" target="_blank" rel="noreferrer" className="footer-social-link"><i className="fab fa-instagram"></i></a>
          </div>
          <p className="mt-auto">&copy; 2025 Lucas Manoel. Todos os direitos reservados.</p>
        </div>
      </footer>
    </>
  );
}
