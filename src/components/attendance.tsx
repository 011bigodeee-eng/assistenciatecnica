"use client";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import {
  MessageCircle,
  ScanLine,
  FileText,
  CheckCheck,
  Camera,
  ArrowUpRight,
} from "lucide-react";
import { attendanceSteps } from "@/data/experience";
import { whatsapp } from "@/lib/domain.mjs";
export function Attendance() {
  const root = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: root,
    offset: ["start 85%", "end 65%"],
  });
  const icons = [MessageCircle, ScanLine, FileText, CheckCheck];
  return (
    <section id="atendimento" className="section attendance" ref={root}>
      <div className="container">
        <div className="section-heading reveal">
          <div>
            <span className="eyebrow">
              04 / DO PRIMEIRO CONTATO AO PRÓXIMO PASSO
            </span>
            <h2>
              Como funciona
              <br />
              <span>nosso atendimento.</span>
            </h2>
          </div>
          <p>Uma conversa clara para você decidir com tranquilidade.</p>
        </div>
        <div className="attendance-path">
          <motion.div
            className="attendance-progress desktop-progress"
            style={{ scaleX: reduce ? 1 : scrollYProgress }}
          />
          <motion.div
            className="attendance-progress mobile-progress"
            style={{ scaleY: reduce ? 1 : scrollYProgress }}
          />
          {attendanceSteps.map(([title, description], i) => {
            const Icon = icons[i];
            return (
              <motion.article
                key={title}
                initial={false}
                whileInView={
                  reduce ? undefined : { opacity: [0.55, 1], y: [14, 0] }
                }
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div className="step-top">
                  <span>0{i + 1}</span>
                  <Icon size={24} aria-hidden="true" />
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
              </motion.article>
            );
          })}
        </div>
        <p className="fine attendance-note">
          Fluxo sugerido de solicitação. Confirme os procedimentos e as
          condições de atendimento com a Ril Cell.
        </p>
      </div>
    </section>
  );
}
export function ContactHelp() {
  const root = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: root,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-12, 12]);
  return (
    <section id="ajuda" className="section contact-help" ref={root}>
      <div className="container help-grid">
        <div className="help-copy reveal">
          <span className="eyebrow">PRECISA DE AJUDA COM SEU APARELHO?</span>
          <h2>
            Seu smartphone
            <br />
            merece atenção
            <br />
            <span>especializada.</span>
          </h2>
          <p>
            Conte para a Ril Cell o que está acontecendo com seu aparelho e
            solicite informações sobre o atendimento.
          </p>
          <div className="help-actions">
            <a
              className="button"
              href={whatsapp(
                "Olá! Gostaria de informações sobre o atendimento para meu aparelho.",
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              Falar com a Ril Cell <ArrowUpRight size={17} />
            </a>
            <a className="button secondary" href="#orcamento">
              Enviar foto do problema <Camera size={17} />
            </a>
          </div>
          <span className="fine">
            Uma conversa é o primeiro passo. Sem envio ou reserva automática.
          </span>
        </div>
        <motion.div className="help-image" style={{ y: reduce ? 0 : y }}>
          <img
            src="/images/campaign/contact.webp"
            srcSet="/images/campaign/contact-300.webp 300w, /images/campaign/contact.webp 600w"
            sizes="(max-width: 800px) 100vw, 55vw"
            width={600}
            height={600}
            alt="Smartphone em bancada com ferramentas de precisão, composição ilustrativa gerada por IA"
            loading="lazy"
          />
          <span className="image-disclaimer">Composição ilustrativa · IA</span>
        </motion.div>
      </div>
    </section>
  );
}
