"use client";
import { useState } from "react";
export default function Portfolio() {
  const [value, setValue] = useState(50);
  const [category, setCategory] = useState("Troca de tela");
  return (
    <section className="section portfolio">
      <div className="container split">
        <div className="section-copy">
          <span className="eyebrow">08 / UM NOVO OLHAR</span>
          <h2>
            Resultados que
            <br />
            merecem
            <br />
            <span>ser vistos.</span>
          </h2>
          <p>
            Uma comparação ilustrativa para explorar o antes e depois. Arraste o
            controle e descubra a diferença.
          </p>
          <span className="demo-badge">PORTFÓLIO ILUSTRATIVO</span>
          <p className="fine">
            Composições fotográficas geradas por IA. Não são casos reais ou
            promessa de resultado. Fotografias autorizadas de reparos poderão
            substituir estas imagens.
          </p>
          <label>
            Explorar categoria
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {[
                "Troca de tela",
                "Reparos em placas",
                "Recuperação de aparelhos",
                "Outros serviços",
              ].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <div className="comparison">
            <img
              src="/images/campaign/comparison-after.webp"
              srcSet="/images/campaign/comparison-after-300.webp 300w, /images/campaign/comparison-after.webp 600w"
              sizes="(max-width: 700px) calc(100vw - 40px), 550px"
              width={600}
              height={600}
              loading="lazy"
              alt="Representação ilustrativa de aparelho após reparo"
            />
            <div
              className="before-layer"
              style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}
            >
              <img
                src="/images/campaign/comparison-before.webp"
                srcSet="/images/campaign/comparison-before-300.webp 300w, /images/campaign/comparison-before.webp 600w"
                sizes="(max-width: 700px) calc(100vw - 40px), 550px"
                width={600}
                height={600}
                loading="lazy"
                alt="Representação ilustrativa de aparelho com avarias"
              />
            </div>
            <span className="compare-label before">ANTES · ILUSTRAÇÃO</span>
            <span className="compare-label after">DEPOIS · ILUSTRAÇÃO</span>
            <div className="compare-line" style={{ left: `${value}%` }}>
              <span>↔</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              aria-label="Comparar antes e depois"
            />
          </div>
          <p className="fine">
            {category} · estudo visual demonstrativo, sem caso de cliente
            associado.
          </p>
        </div>
      </div>
    </section>
  );
}
