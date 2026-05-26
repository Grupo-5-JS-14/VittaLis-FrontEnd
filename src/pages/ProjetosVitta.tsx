import React, { useEffect, useRef, useState } from "react";

// ============================================================================
// VITTA PORTFOLIO — Versão Consolidada Estrita (.tsx)
// Design, Layout, Hooks, Início, Navbar, Hero, Stats e Canvas Footer: 'gemini-code'
// Seções de Projetos e Texto Exato do Marquee/Letreiro: 'ProjetosVitta'
// Atualização Vittalis: Sem valores comerciais, sem bloco de aprendizados e com paleta de cores.
// ============================================================================

const DESIGN_SYSTEM_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght=400;500;600;700&display=swap');
  @import url('https://api.fontshare.com/v2/css?f[]=clash-display@500;600;700;900&display=swap');

  *, *::before, *::after { 
    box-sizing: border-box; 
    margin: 0; 
    padding: 0; 
  }
  
  html { 
    scroll-behavior: smooth; 
  }
  
  body {
    background-color: #07080A;
    color: #ffffff;
    font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
    overflow-x: hidden;
    overscroll-behavior: none;
    -webkit-font-smoothing: antialiased;
    cursor: none;
  }

  a, button, [data-magnetic] { 
    cursor: none; \n  }

  ::-webkit-scrollbar { 
    width: 3px; 
  }
  ::-webkit-scrollbar-track { \n    background: #07080A; 
  }
  ::-webkit-scrollbar-thumb { 
    background: rgba(255, 85, 32, 0.25); 
    border-radius: 2px; 
  }

  /* Typography System */
  .f-display { font-family: 'Clash Display', sans-serif; font-weight: 700; }
  .f-ui      { font-family: 'Plus Jakarta Sans', sans-serif; }

  .t-hero  { font-size: clamp(4rem, 11vw, 9.5rem); font-weight: 900; line-height: 0.85; letter-spacing: -0.03em; }
  .t-h1    { font-size: clamp(2.8rem, 6vw, 5.5rem); font-weight: 900; line-height: 0.9; letter-spacing: -0.02em; }
  .t-h2    { font-size: clamp(1.8rem, 3.5vw, 2.8rem); font-weight: 700; line-height: 1.1; letter-spacing: -0.01em; }
  .t-label { font-size: 10px; font-weight: 700; letter-spacing: 0.25em; text-transform: uppercase; }
  .t-body  { font-size: 15px; line-height: 1.8; color: rgba(255, 255, 255, 0.45); }

  .noise-overlay::before {
    content: '';
    position: absolute; inset: 0; pointer-events: none; z-index: 1;
    opacity: 0.025;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.80' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  }

  .nav-link {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.4);
    position: relative;
    transition: color 0.3s ease;
  }
  .nav-link::after {
    content: '';
    position: absolute; bottom: -4px; left: 0; right: 0;
    height: 1px; background: currentColor;
    transform: scaleX(0); transform-origin: left;
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .nav-link:hover { color: #ffffff; }
  .nav-link:hover::after { transform: scaleX(1); }

  .btn {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 12px 28px;
    font-size: 11px; font-weight: 700;
    letter-spacing: 0.12em; text-transform: uppercase;
    border-radius: 4px; border: none;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    text-decoration: none;
  }
  .btn-ghost {
    background: transparent; color: #ffffff;
    border: 1px solid rgba(255,255,255,0.15);
    backdrop-filter: blur(12px);
  }
  .btn-ghost:hover { background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.3); }

  @keyframes floatAnimation {
    0%, 100% { transform: translateX(-50%) translateY(0px); }
    50% { transform: translateX(-50%) translateY(-8px); }
  }
  .scroll-indicator { animation: floatAnimation 2.5s ease-in-out infinite; }

  /* Animação do Marquee requisitado */
  @keyframes marqueeScroller {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }
  .marquee-content {
    display: inline-flex;
    white-space: nowrap;
    animation: marqueeScroller 25s linear infinite;
  }

  /* Classes de estilo dos projetos */
  .ch { transition: transform .4s cubic-bezier(.34,1.56,.64,1); }
  .ch:hover { transform: translateY(-5px) scale(1.012); }
  @keyframes gp { 0%,100% { opacity: .03; } 50% { opacity: .07; } }
  .grid-bg { background-image: linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px); background-size: 50px 50px; animation: gp 6s ease-in-out infinite; }
`;

// --- INTERACTIVE DOTS INTERFACE ---
interface DotItem {
  ox: number;
  oy: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  a: number;
  col: string;
}

// --- REVEAL COMPONENT ---
interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  from?: "bottom" | "left" | "right";
}
function Reveal({ children, delay = 0, from = "bottom" }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true);
          obs.disconnect();
        }
      },
      { threshold: 0.05 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const origins = {
    bottom: "translateY(40px)",
    left: "translateX(-30px)",
    right: "translateX(30px)",
  };

  return (
    <div
      ref={ref}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "none" : origins[from],
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

// --- SYSTEM DESIGN CONSTANTS ---
const C = {
  run: "#FF5F1F",
  fit: "#f27825",
  lis: "#FF7A38",
  green: "#074334",
  slate: "#12312F",
  cream: "#FFFDF9",
};

export default function VittaPortfolio() {
  const [scrollY, setScrollY] = useState<number>(0);
  const cursorDot = useRef<HTMLDivElement | null>(null);
  const cursorRing = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const footerRef = useRef<HTMLDivElement | null>(null);

  // --- INTERACTIVE SCROLL TRACKER ---
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- CUSTOM INTERACTIVE CURSOR ENGINE ---
  useEffect(() => {
    const dot = cursorDot.current;
    const ring = cursorRing.current;
    if (!dot || !ring) return;

    const moveCursor = (e: globalThis.MouseEvent) => {
      dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  // --- CANVAS ENGINE (REACTIVE DOTS FOOTER) ---
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = footerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let dots: DotItem[] = [];
    let w = 0,
      h = 0;
    const spacing = 28;
    let mX = -9999,
      mY = -9999;

    const colors = [
      "#FF5520",
      "#E07820",
      "#FF9550",
      "#2A7A58",
      "rgba(255,255,255,0.2)",
    ];

    const init = () => {
      w = canvas.width = container.offsetWidth;
      h = canvas.height = container.offsetHeight;
      const cols = Math.ceil(w / spacing) + 1;
      const rows = Math.ceil(h / spacing) + 1;
      dots = [];

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const xPos = c * spacing;
          const yPos = r * spacing;
          dots.push({
            ox: xPos,
            oy: yPos,
            x: xPos,
            y: yPos,
            vx: 0,
            vy: 0,
            a: 0.1 + Math.random() * 0.15,
            col: colors[Math.floor(Math.random() * colors.length)],
          });
        }
      }
    };

    init();
    window.addEventListener("resize", init);

    const onMove = (e: globalThis.MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mX = e.clientX - rect.left;
      mY = e.clientY - rect.top;
    };
    const onLeave = () => {
      mX = -9999;
      mY = -9999;
    };

    container.addEventListener("mousemove", onMove, { passive: true });
    container.addEventListener("mouseleave", onLeave);

    const loop = () => {
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        const dx = d.x - mX;
        const dy = d.y - mY;
        const dist = Math.hypot(dx, dy);

        if (dist < 120 && dist > 0) {
          const force = (1 - dist / 120) * 6;
          d.vx += (dx / dist) * force;
          d.vy += (dy / dist) * force;
        }

        d.vx += (d.ox - d.x) * 0.05;
        d.vy += (d.oy - d.y) * 0.05;
        d.vx *= 0.75;
        d.vy *= 0.75;
        d.x += d.vx;
        d.y += d.vy;

        const disp = Math.min(Math.hypot(d.x - d.ox, d.y - d.oy), 25);
        ctx.save();
        ctx.globalAlpha = d.a + (disp / 25) * 0.5;
        ctx.fillStyle = disp > 6 ? "#FF5520" : d.col;
        ctx.beginPath();
        ctx.arc(d.x, d.y, 1.5 + disp * 0.05, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      animationId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", init);
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      id="inicio"
      style={{
        backgroundColor: "#07080A",
        color: "#fff",
        position: "relative",
      }}
    >
      <style>{DESIGN_SYSTEM_CSS}</style>

      {/* Custom Cursor Premium */}
      <div
        ref={cursorDot}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "6px",
          height: "6px",
          backgroundColor: "#fff",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          mixBlendMode: "difference",
        }}
      />
      <div
        ref={cursorRing}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "38px",
          height: "38px",
          border: "1px solid rgba(255, 255, 255, 0.35)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9998,
          transition: "transform 0.12s cubic-bezier(0.25, 1, 0.5, 1)",
        }}
      />

      {/* NAVBAR */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: "20px 48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: scrollY > 50 ? "rgba(7, 8, 10, 0.8)" : "transparent",
          backdropFilter: scrollY > 50 ? "blur(20px)" : "none",
          borderBottom:
            scrollY > 50 ? "1px solid rgba(255, 255, 255, 0.06)" : "none",
          transition: "all 0.4s ease",
        }}
      >
        {/* Logotipo direcionando para o topo (#inicio) */}
        <a
          href="#inicio"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <span
            className="f-display"
            style={{
              fontSize: "20px",
              letterSpacing: "-0.02em",
              fontStyle: "italic",
            }}
          >
            <span style={{ color: "#FF5520", fontStyle: "normal" }}>V</span>ITTA
          </span>
          <div
            style={{
              width: "1px",
              height: "14px",
              background: "rgba(255,255,255,0.15)",
            }}
          />
          <span
            className="t-label"
            style={{ color: "rgba(255,255,255,0.3)", fontSize: "9px" }}
          >
            GRUPO 05
          </span>
        </a>
        <div style={{ display: "flex", gap: 40 }}>
          <a href="#vittarun" className="nav-link">
            VittaRun
          </a>
          <a href="#vittafit" className="nav-link">
            VittaFit
          </a>
          <a href="#vittalis" className="nav-link">
            Vittalis
          </a>
        </div>
        <a
          href="https://linktr.ee/grupo_05turmajavascript_14"
          target="_blank"
          rel="noreferrer"
          className="btn btn-ghost"
          style={{ padding: "8px 20px", fontSize: "10px" }}
        >
          Linktree ↗
        </a>
      </nav>

      {/* HERO SECTION */}
      <header
        className="noise-overlay"
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          padding: "0 24px",
          background: "#07080A",
        }}
      >
        <h1
          className="f-display t-hero"
          style={{ textAlign: "center", textTransform: "uppercase" }}
        >
          GRUPO{" "}
          <span
            style={{
              WebkitTextStroke: "1.5px rgba(255,255,255,0.7)",
              color: "transparent",
              fontStyle: "italic",
            }}
          >
            VITTA
          </span>
        </h1>
        <p
          className="t-body"
          style={{
            textAlign: "center",
            maxWidth: "480px",
            marginTop: "24px",
            fontSize: "14px",
          }}
        >
          Três produtos fictícios. Sete desenvolvedores. Um portfólio em
          conjunto unificado para demonstrar competências de design de produto,
          engenharia frontend e UX.
        </p>

        <div
          className="scroll-indicator"
          style={{
            position: "absolute",
            bottom: "40px",
            left: "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span
            className="t-label"
            style={{ color: "rgba(255,255,255,0.15)", fontSize: "8px" }}
          >
            Scroll
          </span>
          <div
            style={{
              width: "1px",
              height: "40px",
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0.2), transparent)",
            }}
          />
        </div>
      </header>

      {/* LETREIRO DINÂMICO */}
      <div
        style={{
          background: "#000",
          borderTop: "4px solid #000",
          borderBottom: "4px solid #000",
          padding: "14px 0",
          overflow: "hidden",
          display: "flex",
        }}
      >
        <div
          className="marquee-content f-ui t-label"
          style={{ color: "#FFFDF9", gap: "20px" }}
        >
          {[...Array(6)].map((_, idx) => (
            <span key={idx} style={{ paddingRight: "20px" }}>
              <span>
                VittaRun ◆ VittaFit ◆ Vittalis ◆ Nodejs ◆ React ◆ Portfólio ◆
                Grupo Vitta ◆&nbsp;
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* ── SEÇÃO DE PROJETOS COMPLETA E PADRONIZADA ── */}

      {/* PROJETO 01 — VITTARUN */}
      <section
        id="vittarun"
        style={{ background: C.cream, color: "#000", padding: "96px 40px" }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
              gap: 56,
              alignItems: "start",
            }}
          >
            <div>
              <Reveal>
                <span
                  className="t-label"
                  style={{ color: C.run, display: "block", marginBottom: 12 }}
                >
                  Projeto 01 — Food Delivery · Fictício
                </span>
              </Reveal>
              <Reveal delay={0.08}>
                <h2
                  className="f-display t-h1"
                  style={{ marginBottom: 22, color: "#000" }}
                >
                  VITTA
                  <br />
                  RUN
                </h2>
              </Reveal>
              <Reveal delay={0.15}>
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    flexWrap: "wrap",
                    marginBottom: 26,
                  }}
                >
                  {[
                    ["Food Delivery", "#000", "#FFFDF9"],
                    ["Neo-Brutalist", "#fff", C.run],
                    ["Fitness Food", "#fff", "#006644"],
                  ].map(([l, tc, bg]) => (
                    <span
                      key={l}
                      style={{
                        padding: "4px 13px",
                        border: "2.5px solid #000",
                        borderRadius: 100,
                        fontSize: 10,
                        fontWeight: 900,
                        letterSpacing: ".15em",
                        textTransform: "uppercase",
                        background: bg,
                        color: tc,
                        boxShadow: "2px 2px 0 #000",
                      }}
                    >
                      {l}
                    </span>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <p
                  style={{
                    fontSize: 15,
                    lineHeight: 1.75,
                    color: "#475569",
                    marginBottom: 30,
                    maxWidth: 520,
                  }}
                >
                  Conceito fictício de delivery focado em alimentação saudável.
                  Projeto acadêmico desenvolvido para praticar design de
                  produto, UX e desenvolvimento frontend.
                </p>
              </Reveal>

              {/* Paleta de Cores VittaRun */}
              <Reveal delay={0.26}>
                <p
                  className="t-label"
                  style={{ color: "#94a3b8", marginBottom: 12 }}
                >
                  Paleta de Cores
                </p>
                <div style={{ display: "flex", gap: 10, marginBottom: 32 }}>
                  {["#FF5F1F", "#006644", "#FFC700", "#FFFDF9", "#000000"].map(
                    (c) => (
                      <div
                        key={c}
                        title={c}
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: 10,
                          background: c,
                          border: "2px solid #000",
                          boxShadow: "3px 3px 0 #000",
                        }}
                      />
                    ),
                  )}
                </div>
              </Reveal>

              <Reveal delay={0.33}>
                <a
                  href="https://vittarun-app.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                  className="btn"
                  style={{
                    boxShadow: `5px 5px 0 ${C.run}`,
                    background: "#000",
                    color: "#FFFDF9",
                    borderRadius: "100px",
                    border: "2px solid #000",
                  }}
                >
                  Ver protótipo →
                </a>
              </Reveal>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 18,
                paddingTop: 24,
              }}
            >
              {[
                {
                  t: "🎯 Público-alvo",
                  c: "Personas criadas para o projeto: pessoas que valorizam alimentação saudável e buscam praticidade no cotidiano urbano.",
                },
                {
                  t: "🚀 Visão do produto",
                  c: "Ecossistema completo de delivery com acompanhamento de macros nutritivos e conexão transparente com restaurantes locais.",
                },
                {
                  t: "✨ Escolhas de design",
                  c: "Neo-brutalis com bordas expressivas e blocos tipográficos intensos. Foco em uma interface altamente memorável.",
                },
              ].map((b, i) => (
                <Reveal key={i} delay={i * 0.1} from="right">
                  <div
                    className="ch"
                    style={{
                      border: "3px solid #000",
                      borderRadius: 18,
                      padding: "20px 22px",
                      background: "#fff",
                      boxShadow: "7px 7px 0 #000",
                    }}
                  >
                    <h4
                      className="f-display"
                      style={{
                        fontSize: 11,
                        letterSpacing: ".18em",
                        textTransform: "uppercase",
                        marginBottom: 8,
                        color: "#000",
                      }}
                    >
                      {b.t}
                    </h4>
                    <p
                      style={{
                        fontSize: 13.5,
                        lineHeight: 1.7,
                        color: "#475569",
                      }}
                    >
                      {b.c}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROJETO 02 — VITTAFIT */}
      <section
        id="vittafit"
        style={{
          background: C.green,
          color: "#fff",
          position: "relative",
          overflow: "hidden",
          padding: "96px 40px",
          borderTop: "4px solid #000",
        }}
      >
        <div
          className="grid-bg"
          style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            fontWeight: 900,
            fontSize: "clamp(7rem,20vw,15rem)",
            color: "rgba(255,255,255,.025)",
            userSelect: "none",
            pointerEvents: "none",
            letterSpacing: "-.06em",
            lineHeight: 1,
          }}
        >
          FIT
        </div>
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            position: "relative",
            zIndex: 10,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
              gap: 56,
              alignItems: "start",
            }}
          >
            <div>
              <Reveal>
                <span
                  className="t-label"
                  style={{ color: C.fit, display: "block", marginBottom: 12 }}
                >
                  Projeto 02 — App Fitness · Fictício
                </span>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="f-display t-h1" style={{ marginBottom: 22 }}>
                  VITTA
                  <br />
                  <span style={{ color: C.fit }}>FIT</span>
                </h2>
              </Reveal>
              <Reveal delay={0.15}>
                <p
                  style={{
                    fontSize: 15,
                    lineHeight: 1.75,
                    color: "rgba(255,255,255,.5)",
                    marginBottom: 30,
                    maxWidth: 520,
                  }}
                >
                  App conceitual de fitness estruturado para praticar interfaces
                  imersivas, dark mode responsivo, tipografia editorial e
                  efeitos visuais avançados com CSS.
                </p>
              </Reveal>

              {/* Paleta de Cores VittaFit */}
              <Reveal delay={0.22}>
                <p
                  className="t-label"
                  style={{ color: "rgba(255,255,255,0.4)", marginBottom: 12 }}
                >
                  Paleta de Cores
                </p>
                <div style={{ display: "flex", gap: 10, marginBottom: 32 }}>
                  {["#f27825", "#074334", "#12312F", "#FFFFFF", "#07080A"].map(
                    (c) => (
                      <div
                        key={c}
                        title={c}
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: 10,
                          background: c,
                          border: "1px solid rgba(255,255,255,0.15)",
                        }}
                      />
                    ),
                  )}
                </div>
              </Reveal>

              <Reveal delay={0.3}>
                <a
                  href="https://vittafit-app-two.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                  className="btn"
                  style={{
                    background: C.fit,
                    color: "#fff",
                    borderRadius: "100px",
                  }}
                >
                  Ver protótipo →
                </a>
              </Reveal>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 18,
                paddingTop: 24,
              }}
            >
              {[
                {
                  t: "🎯 Personas do projeto",
                  c: "Atletas de alta performance e entusiastas criados sob mapeamento de UX Research para validar dores e hábitos de rotina.",
                },
                {
                  t: "🚀 Funcionalidades conceituais",
                  c: "Sincronização integrada com smartwatches esportivos, painéis de metas biométricas e sugestões automatizadas baseadas em rotinas.",
                },
                {
                  t: "✨ Direção de arte",
                  c: "Estilo dark editorial minimalista. O contraste entre o verde profundo e o laranja transmite a energia e o foco necessários ao ambiente esportivo.",
                },
              ].map((b, i) => (
                <Reveal key={i} delay={i * 0.1} from="right">
                  <div
                    className="ch"
                    style={{
                      border: "1px solid rgba(255,255,255,.08)",
                      borderRadius: 18,
                      padding: "20px 22px",
                      background: "rgba(255,255,255,0.02)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <h4
                      className="f-display"
                      style={{
                        fontSize: 11,
                        letterSpacing: ".18em",
                        textTransform: "uppercase",
                        marginBottom: 8,
                        color: C.fit,
                      }}
                    >
                      {b.t}
                    </h4>
                    <p
                      style={{
                        fontSize: 13.5,
                        lineHeight: 1.7,
                        color: "rgba(255,255,255,0.5)",
                      }}
                    >
                      {b.c}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROJETO 03 — VITTALIS (ATUALIZADA SEM VALORES E COM PALETA) */}
      <section
        id="vittalis"
        style={{
          background: "#F4F7F6",
          color: "#12312F",
          padding: "96px 40px",
          borderTop: "4px solid #12312F",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: -20,
            right: -10,
            fontWeight: 900,
            fontSize: "clamp(8rem, 24vw, 18rem)",
            color: "rgba(18, 49, 47, 0.03)",
            userSelect: "none",
            pointerEvents: "none",
            letterSpacing: "-.06em",
            lineHeight: 0.8,
          }}
        >
          LIS
        </div>
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            position: "relative",
            zIndex: 10,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
              gap: 56,
              alignItems: "start",
            }}
          >
            <div>
              <Reveal>
                <span
                  className="t-label"
                  style={{
                    display: "inline-flex",
                    background: "#12312F",
                    color: "#FFFDF9",
                    fontSize: 9,
                    letterSpacing: ".2em",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    padding: "6px 16px",
                    borderRadius: 100,
                    marginBottom: 16,
                  }}
                >
                  Projeto 03 · Insurtech Fictícia
                </span>
              </Reveal>
              <Reveal delay={0.08}>
                <h2
                  className="f-display t-h1"
                  style={{ color: "#12312F", marginBottom: 12 }}
                >
                  VITTA
                  
                  <span style={{ color: "#FF7A38" }}>LIS</span>
                </h2>
              </Reveal>

              <Reveal delay={0.15}>
                <p
                  style={{
                    fontSize: 15,
                    lineHeight: 1.75,
                    color: "#4A6160",
                    marginBottom: 24,
                    maxWidth: 520,
                  }}
                >
                  Empresa de seguro de vida criada para descomplicar a proteção
                  financeira, com comunicação clara, experiência 100% digital e
                  foco em segurança acessível e humanizada.
                </p>
              </Reveal>

              {/* Paleta de Cores Vittalis Requisitada */}
              <Reveal delay={0.24}>
                <p
                  className="t-label"
                  style={{ color: "#4A6160", marginBottom: 12 }}
                >
                  Paleta de Cores
                </p>
                <div style={{ display: "flex", gap: 10, marginBottom: 32 }}>
                  {["#FF7A38", "#12312F", "#E2EFEA", "#FFFFFF", "#F4F7F6"].map(
                    (c) => (
                      <div
                        key={c}
                        title={c}
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: 10,
                          background: c,
                          border: "1px solid #D1E2DC",
                        }}
                      />
                    ),
                  )}
                </div>
              </Reveal>

              <Reveal delay={0.3}>
                <div
                  style={{
                    display: "inline-flex",
                    flexDirection: "column",
                    gap: 6,
                  }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      padding: "13px 26px",
                      background: "#12312F",
                      color: "rgba(255,255,255,0.4)",
                      fontWeight: 900,
                      fontSize: 10,
                      letterSpacing: ".2em",
                      textTransform: "uppercase",
                      borderRadius: 12,
                      opacity: 0.8,
                      cursor: "not-allowed",
                    }}
                  >
                    Em breve →
                  </span>
                  <p style={{ fontSize: 10, color: "#8FA3A1", marginTop: 4 }}>
                    * Protótipo conceitual em refinamento final
                  </p>
                </div>
              </Reveal>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 18,
                paddingTop: 24,
              }}
            >
              {[
                {
                  t: "🎯 Filosofia Amigável",
                  c: "Digital sim, mas distante nunca. Uma linguagem puramente próxima e empática desenvolvida para apoiar as pessoas em todas as etapas de sua jornada.",
                },
                {
                  t: "🛡️ Sem Letras Miúdas",
                  c: "Garantia absoluta de transparência em todas as cláusulas contratuais, banindo termos técnicos complexos ou ambiguidades.",
                },
                {
                  t: "✨ Propósito Educacional",
                  c: "Simplificando o acesso à proteção através da tecnologia. Um projeto de simulação digital desenvolvido como caso prático no Bootcamp JavaScript Full Stack da Generation Brasil.",
                },
              ].map((b, i) => (
                <Reveal key={i} delay={i * 0.1} from="right">
                  <div
                    className="ch"
                    style={{
                      background: "#FFFFFF",
                      border: "1px solid #E2EFEA",
                      borderRadius: 18,
                      padding: "20px 22px",
                      boxShadow: "0 4px 20px rgba(18, 49, 47, 0.02)",
                    }}
                  >
                    <h4
                      className="f-display"
                      style={{
                        fontSize: 11,
                        letterSpacing: ".18em",
                        textTransform: "uppercase",
                        marginBottom: 8,
                        color: "#12312F",
                      }}
                    >
                      {b.t}
                    </h4>
                    <p
                      style={{
                        fontSize: 13.5,
                        lineHeight: 1.7,
                        color: "#4A6160",
                      }}
                    >
                      {b.c}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section
        style={{
          background: "#0C0E11",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          padding: "60px 48px",
        }}
      >
        <div
          style={{
            maxWidth: 1000,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "40px",
            textAlign: "center",
          }}
        >
          <div>
            <h4 className="f-display" style={{ fontSize: "42px" }}>
              3
            </h4>
            <p
              className="t-label"
              style={{ color: "rgba(255,255,255,0.3)", marginTop: "8px" }}
            >
              Projetos Integrados
            </p>
          </div>
          <div>
            <h4 className="f-display" style={{ fontSize: "42px" }}>
              7
            </h4>
            <p
              className="t-label"
              style={{ color: "rgba(255,255,255,0.3)", marginTop: "8px" }}
            >
              Desenvolvedores
            </p>
          </div>
          <div>
            <h4 className="f-display" style={{ fontSize: "42px" }}>
              14ª
            </h4>
            <p
              className="t-label"
              style={{ color: "rgba(255,255,255,0.3)", marginTop: "8px" }}
            >
              Turma Javascript
            </p>
          </div>
          <div>
            <h4 className="f-display" style={{ fontSize: "42px" }}>
              2026
            </h4>
            <p
              className="t-label"
              style={{ color: "rgba(255,255,255,0.3)", marginTop: "8px" }}
            >
              Ano do Ecossistema
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER COM CANVAS INTERATIVO DE BOLINHAS */}
      <footer
        ref={footerRef}
        style={{
          position: "relative",
          minHeight: "80vh",
          backgroundColor: "#040608",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 24px",
          borderTop: "1px solid rgba(255, 255, 255, 0.05)",
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 10,
            textAlign: "center",
            maxWidth: "540px",
          }}
        >
          <span
            className="t-label"
            style={{
              color: "rgba(255,255,255,0.25)",
              display: "block",
              marginBottom: "16px",
            }}
          >
            Generation Brasil · Turma JavaScript 14
          </span>
          <h2
            className="f-display t-h2"
            style={{
              textTransform: "uppercase",
              marginBottom: "32px",
              fontStyle: "italic",
            }}
          >
            Conecte-se <span style={{ color: "#FF9550" }}>conosco.</span>
          </h2>
          <a
            href="https://linktr.ee/grupo_05turmajavascript_14"
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost"
            style={{ marginBottom: "48px" }}
          >
            Nosso Linkedin →
          </a>

          <div
            style={{
              width: "32px",
              height: "1px",
              background: "rgba(255,255,255,0.1)",
              margin: "0 auto 32px",
            }}
          />

          <p
            className="t-label"
            style={{
              color: "rgba(255,255,255,0.25)",
              marginBottom: "16px",
              fontSize: "9px",
            }}
          >
            Desenvolvido por
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "8px",
              marginBottom: "36px",
            }}
          >
            {[
              "Andressa",
              "Lohanna",
              "Bruna",
              "Kay",
              "Douglas",
              "André",
              "Gabriel",
            ].map((name) => (
              <span
                key={name}
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.4)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "4px",
                  padding: "6px 14px",
                }}
              >
                {name}
              </span>
            ))}
          </div>
          <p
            className="t-label"
            style={{ color: "rgba(255,255,255,0.15)", fontSize: "8px" }}
          >
            Grupo 05 · Turma JavaScript 14 · Generation Brasil · 2026 ·
            Portfólio Acadêmico
          </p>
        </div>
      </footer>
    </div>
  );
}
