"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X, MessageCircle } from "lucide-react";
import { whatsapp } from "@/lib/domain.mjs";
const links = [
  ["Início", "#inicio"],
  ["Serviços", "#servicos"],
  ["Diagnóstico 3D", "#diagnostico"],
  ["Acompanhar reparo", "#reparo"],
  ["Agendamento", "#agendamento"],
  ["Contato", "#contato"],
];
export function Logo() {
  return (
    <span className="logo">
      ril<span className="logo-cell">cell</span>
      <i /> <small>REPARO & TECNOLOGIA</small>
    </span>
  );
}
export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const scroll = () => setScrolled(window.scrollY > 30);
    scroll();
    window.addEventListener("scroll", scroll);
    return () => window.removeEventListener("scroll", scroll);
  }, []);
  useEffect(() => {
    if (!open) return;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menuRef.current?.querySelector<HTMLElement>("a")?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
      if (e.key === "Tab") {
        const items = Array.from(
          menuRef.current?.querySelectorAll<HTMLElement>("a,button") ?? [],
        );
        const first = items[0],
          last = items.at(-1);
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    window.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = old;
      window.removeEventListener("keydown", key);
    };
  }, [open]);
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <header className={scrolled ? "header compact" : "header"}>
        <div className="nav-shell">
          <a href="#inicio" aria-label="rilcell Reparo & Tecnologia — início">
            <Logo />
          </a>
          <nav className="desktop-nav" aria-label="Principal">
            {links.map(([label, url]) => (
              <a key={url} href={url}>
                {label}
              </a>
            ))}
          </nav>
          <a
            className="button small header-cta"
            href={whatsapp()}
            target="_blank"
            rel="noopener noreferrer"
          >
            Solicitar orçamento <ArrowUpRight size={16} />
          </a>
          <button
            className="icon-button menu-trigger"
            aria-label="Abrir menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            ref={trigger}
            onClick={() => setOpen(true)}
          >
            <Menu />
          </button>
        </div>
      </header>
      {open && (
        <div
          id="mobile-menu"
          className="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navegação"
          ref={menuRef}
        >
          <button
            className="icon-button close-menu"
            aria-label="Fechar menu"
            onClick={() => {
              setOpen(false);
              trigger.current?.focus();
            }}
          >
            <X />
          </button>
          <Logo />
          <nav>
            {links.map(([label, url]) => (
              <a href={url} key={url} onClick={() => setOpen(false)}>
                {label}
                <ArrowUpRight />
              </a>
            ))}
          </nav>
        </div>
      )}
      <a
        className="floating-wa"
        href={whatsapp()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Conversar pelo WhatsApp"
      >
        <MessageCircle size={22} />
      </a>
    </>
  );
}
export function Intro() {
  const [show, setShow] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    try {
      if (
        sessionStorage.getItem("ril-intro") ||
        matchMedia("(prefers-reduced-motion: reduce)").matches
      )
        return;
      sessionStorage.setItem("ril-intro", "1");
      const start = Number(
        document.documentElement.dataset.introStarted || performance.now(),
      );
      const passed = Math.max(0, performance.now() - start);
      if (passed >= 1800) {
        document.documentElement.classList.remove("intro-pending");
        return;
      }
      setElapsed(passed);
      setShow(true);
      requestAnimationFrame(() =>
        document.documentElement.classList.remove("intro-pending"),
      );
      const timeout = setTimeout(
        () => setShow(false),
        Math.max(0, 1800 - passed),
      );
      return () => clearTimeout(timeout);
    } catch {
      document.documentElement.classList.remove("intro-pending");
    }
  }, []);
  return show ? (
    <div className="intro" style={{ animationDelay: `${1350 - elapsed}ms` }}>
      <div className="intro-line" />
      <Logo />
      <span>PRECISÃO. CUIDADO. CONEXÃO.</span>
      <button onClick={() => setShow(false)}>Pular introdução ↗</button>
    </div>
  ) : null;
}
export function Reveal() {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    elements.forEach((el) => {
      el.classList.add("will-reveal");
      observer.observe(el);
    });
    return () => {
      observer.disconnect();
      elements.forEach((el) => el.classList.remove("will-reveal"));
    };
  }, []);
  return null;
}
