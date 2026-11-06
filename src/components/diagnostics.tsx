"use client";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { problems, internals, type VisualItem } from "@/data/experience";
import { whatsapp } from "@/lib/domain.mjs";
function VisualSelector({
  items,
  educational = false,
}: {
  items: VisualItem[];
  educational?: boolean;
}) {
  const [selected, setSelected] = useState(items[0]);
  const reduce = useReducedMotion();
  return (
    <div
      className={`visual-selector ${educational ? "internal-selector" : "problem-selector"}`}
    >
      <div
        className="visual-options"
        role="group"
        aria-label={
          educational ? "Componentes internos" : "Problemas do dispositivo"
        }
      >
        {items.map((item, i) => (
          <button
            type="button"
            key={item.id}
            aria-pressed={item.id === selected.id}
            aria-controls={educational ? "internal-detail" : "problem-detail"}
            onClick={() => setSelected(item)}
          >
            {!educational && (
              <img
                src={item.image.replace(".webp", "-240.webp")}
                width={56}
                height={56}
                alt=""
                loading="lazy"
              />
            )}
            {educational && (
              <span className="option-number">
                {String(i + 1).padStart(2, "0")}
              </span>
            )}
            <span>{item.name}</span>
            <ArrowUpRight size={16} aria-hidden="true" />
          </button>
        ))}
      </div>
      <div
        className="visual-detail"
        id={educational ? "internal-detail" : "problem-detail"}
      >
        <div className="visual-stage">
          <span className="visual-coordinate">
            RIL CELL / {educational ? "POR DENTRO" : "SELEÇÃO VISUAL"}
          </span>
          <AnimatePresence initial={false}>
            <motion.img
              key={selected.id}
              src={selected.image}
              srcSet={`${selected.image.replace(".webp", "-240.webp")} 240w, ${selected.image} 412w`}
              sizes="(max-width: 600px) calc(100vw - 48px), 412px"
              width={412}
              height={412}
              alt={selected.alt}
              loading="lazy"
              initial={{ opacity: 0, scale: reduce ? 1 : 1.025 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.35 }}
            />
          </AnimatePresence>
          <span className="visual-caption">
            {educational ? "ANATOMIA ILUSTRATIVA" : "IMAGEM ILUSTRATIVA"} · IA
          </span>
        </div>
        <div
          className="visual-description"
          aria-live="polite"
          aria-atomic="true"
        >
          <span className="eyebrow">
            {educational ? "ENTENDA A FUNÇÃO" : "VAMOS ENTENDER O SINTOMA"}
          </span>
          <h3>{selected.name}</h3>
          <p>{selected.description}</p>
          {!educational && (
            <a
              className="button"
              href={whatsapp(
                `Olá! Gostaria de solicitar uma avaliação do meu aparelho. O problema que selecionei foi: ${selected.name}.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              Solicitar avaliação <ArrowUpRight size={17} />
            </a>
          )}
          <p className="fine">
            {educational
              ? "Representações educativas geradas por IA. Não correspondem a peças de um modelo específico."
              : "Possíveis causas, sem diagnóstico automático ou orçamento preciso. A avaliação é feita pela equipe."}
          </p>
        </div>
      </div>
    </div>
  );
}
export default function Diagnostics() {
  return (
    <>
      <section id="diagnostico" className="section visual-section">
        <div className="container">
          <div className="section-heading reveal">
            <div>
              <span className="eyebrow">02 / UM PRIMEIRO OLHAR</span>
              <h2>
                O que aconteceu
                <br />
                <span>com seu dispositivo?</span>
              </h2>
            </div>
            <p>Selecione o problema e descubra como podemos ajudar você.</p>
          </div>
          <VisualSelector items={problems} />
        </div>
      </section>
      <section id="laboratorio" className="section interior-section">
        <div className="container">
          <div className="section-heading reveal">
            <div>
              <span className="eyebrow">03 / TECNOLOGIA EM DETALHE</span>
              <h2>
                Conheça o interior
                <br />
                <span>do seu smartphone.</span>
              </h2>
            </div>
            <div>
              <p>
                Explore os principais componentes que fazem seu dispositivo
                funcionar.
              </p>
              <a className="text-button" href="#diagnostico">
                Precisa de uma avaliação? <ArrowRight size={16} />
              </a>
            </div>
          </div>
          <VisualSelector items={internals} educational />
        </div>
      </section>
    </>
  );
}
