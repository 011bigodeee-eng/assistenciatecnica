"use client";
import dynamic from "next/dynamic";
import { Component, type ReactNode, useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  RotateCcw,
  RotateCw,
  Minus,
  Plus,
  Layers,
  MoveUpRight,
} from "lucide-react";
import { components } from "@/data/company";
import { whatsapp } from "@/lib/domain.mjs";
const PhoneScene = dynamic(() => import("./phone-scene"), {
  ssr: false,
  loading: () => (
    <div className="scene-fallback">Carregando laboratório 3D…</div>
  ),
});
class SceneBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      <div className="scene-fallback">
        <img
          src="/images/hero.svg"
          width={800}
          height={650}
          alt="Smartphone ilustrativo"
        />
        <p>
          A cena 3D não está disponível. Continue pela lista de componentes.
        </p>
      </div>
    ) : (
      this.props.children
    );
  }
}
const visibility = new Map<string, number>();
function Workspace({ lab = false }: { lab?: boolean }) {
  const [selected, setSelected] = useState(lab ? "bateria" : "tela");
  const [exploded, setExploded] = useState(false);
  const [reset, setReset] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(8);
  const [active, setActive] = useState(false);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [notes, setNotes] = useState("");
  const [symptom, setSymptom] = useState("");
  const [review, setReview] = useState(false);
  const [error, setError] = useState("");
  const root = useRef<HTMLDivElement>(null);
  const item = components.find((c) => c.id === selected)!;
  useEffect(() => {
    const node = root.current;
    if (!node) return;
    const id = lab ? "lab" : "diagnostic";
    const update = (event: Event) =>
      setActive((event as CustomEvent<string>).detail === id);
    window.addEventListener("ril-active-scene", update);
    const obs = new IntersectionObserver(
      (entries) => {
        visibility.set(id, entries[0].intersectionRatio);
        const winner =
          [...visibility.entries()]
            .filter(([, ratio]) => ratio > 0)
            .sort((a, b) => b[1] - a[1])[0]?.[0] || "";
        window.dispatchEvent(
          new CustomEvent("ril-active-scene", { detail: winner }),
        );
      },
      { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] },
    );
    obs.observe(node);
    return () => {
      obs.disconnect();
      visibility.delete(id);
      window.removeEventListener("ril-active-scene", update);
    };
  }, [lab]);
  function select(id: string) {
    setSelected(id);
    setSymptom("");
    setReview(false);
    if (!lab) setExploded(id !== "tela" && id !== "outro");
  }
  function resetScene() {
    setReset((r) => r + 1);
    setRotation(0);
    setZoom(8);
    setExploded(false);
  }
  const message = `Olá, equipe Ril Cell! Gostaria de solicitar uma avaliação de ${item.name}.\nMarca: ${brand}\nModelo: ${model}\nSintomas: ${symptom}\nObservações: ${notes || "Nenhuma"}.\nSeleção educativa pelo diagnóstico 3D, sem conclusão técnica.`;
  return (
    <div className="workspace" ref={root}>
      <div className="scene-wrap">
        <div className="scene-label">
          <span className="status-dot" />
          {lab ? "EXPLORAÇÃO DE COMPONENTES" : "DIAGNÓSTICO INTERATIVO"}
          <span>3D / ILUSTRATIVO</span>
        </div>
        <div className="scene-grid" />
        <div className="scene-canvas">
          {active ? (
            <SceneBoundary>
              <PhoneScene
                selected={selected}
                onSelect={select}
                exploded={exploded}
                reset={reset}
                rotation={rotation}
                zoom={zoom}
              />
            </SceneBoundary>
          ) : (
            <div className="scene-fallback">
              <img
                src="/images/hero.svg"
                width={800}
                height={650}
                alt="Representação ilustrativa de smartphone"
              />
            </div>
          )}
        </div>
        <span className="scene-hint">
          ARRASTE PARA GIRAR · SELECIONE PARA EXPLORAR
        </span>
        <div className="scene-controls">
          <button
            aria-label="Girar para esquerda"
            onClick={() => setRotation((r) => Math.max(-2, r - 0.3))}
          >
            <RotateCcw size={17} />
          </button>
          <button
            aria-label="Girar para direita"
            onClick={() => setRotation((r) => Math.min(2, r + 0.3))}
          >
            <RotateCw size={17} />
          </button>
          <button
            aria-label="Aproximar"
            onClick={() => setZoom((z) => Math.max(5.8, z - 0.5))}
          >
            <Plus size={17} />
          </button>
          <button
            aria-label="Afastar"
            onClick={() => setZoom((z) => Math.min(10, z + 0.5))}
          >
            <Minus size={17} />
          </button>
          <button
            aria-label="Reset — restaurar câmera e montagem"
            onClick={resetScene}
          >
            <RotateCcw size={17} />
            <span>Reset</span>
          </button>
        </div>
        {lab && (
          <button
            className="explode-button button secondary"
            onClick={() => setExploded((v) => !v)}
          >
            <Layers size={18} />
            {exploded ? "Montar novamente" : "Explorar componentes"}
          </button>
        )}
      </div>
      <div className="component-panel">
        <span className="mono">
          {lab ? "SELECIONE UM COMPONENTE" : "ONDE ESTÁ O PROBLEMA?"}
        </span>
        <div
          className="component-list"
          role="group"
          aria-label="Componentes do smartphone"
        >
          {components
            .filter((c) =>
              lab ? c.id !== "outro" : !["tampa", "estrutura"].includes(c.id),
            )
            .map((c, i) => (
              <button
                key={c.id}
                className={selected === c.id ? "selected" : ""}
                aria-pressed={selected === c.id}
                onClick={() => select(c.id)}
              >
                <span>{String(i + 1).padStart(2, "0")}</span>
                {c.name}
                <MoveUpRight size={14} />
              </button>
            ))}
        </div>
        <div className="component-info" aria-live="polite">
          <span className="eyebrow">
            {lab ? "POR DENTRO DO APARELHO" : "VAMOS ENTENDER MELHOR"}
          </span>
          <h3>{item.name}</h3>
          {lab ? (
            <p>{item.description}</p>
          ) : (
            <>
              <p>Sintomas comuns</p>
              <ul>
                {item.symptoms.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </>
          )}
          <p className="fine">
            {lab
              ? "Modelo procedural educativo. Não representa documentação exata de um fabricante."
              : "Informações educativas. A seleção não substitui uma avaliação técnica."}
          </p>
        </div>
        {!lab && (
          <form
            className="diagnostic-form"
            onSubmit={(e) => {
              e.preventDefault();
              if (!brand.trim() || !model.trim() || !symptom.trim()) {
                setError("Informe marca, modelo e sintomas.");
                return;
              }
              setError("");
              setReview(true);
            }}
          >
            <div className="form-grid">
              <label>
                Marca
                <input
                  required
                  maxLength={60}
                  value={brand}
                  onChange={(e) => {
                    setBrand(e.target.value);
                    setReview(false);
                  }}
                  placeholder="Ex.: Apple"
                />
              </label>
              <label>
                Modelo
                <input
                  required
                  maxLength={100}
                  value={model}
                  onChange={(e) => {
                    setModel(e.target.value);
                    setReview(false);
                  }}
                  placeholder="Ex.: iPhone 13"
                />
              </label>
            </div>
            <label>
              Sintomas
              <input
                required
                maxLength={500}
                value={symptom}
                onChange={(e) => {
                  setSymptom(e.target.value);
                  setReview(false);
                }}
                placeholder="Descreva o que percebeu"
              />
            </label>
            <label>
              Observações (opcional)
              <textarea
                rows={2}
                maxLength={1000}
                value={notes}
                onChange={(e) => {
                  setNotes(e.target.value);
                  setReview(false);
                }}
              />
            </label>
            <p role="alert" className="error">
              {error}
            </p>
            {review ? (
              <div className="notice">
                <p>
                  {brand} · {model}
                  <br />
                  {item.name}: {symptom}
                  <br />
                  {notes}
                </p>
                <a
                  className="button full"
                  href={whatsapp(message)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Solicitar avaliação <ArrowUpRight size={17} />
                </a>
              </div>
            ) : (
              <button className="button full" type="submit">
                Preparar solicitação <ArrowUpRight size={17} />
              </button>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
export default function Diagnostics() {
  return (
    <>
      <section id="diagnostico" className="section diagnostic-section">
        <div className="container">
          <div className="section-heading reveal">
            <div>
              <span className="eyebrow">02 / TECNOLOGIA QUE APROXIMA</span>
              <h2>
                Descubra por
                <br />
                <span>onde começar.</span>
              </h2>
            </div>
            <p>
              Explore o aparelho, selecione o problema e envie sua solicitação
              para nossa equipe. Você no controle, do primeiro toque ao próximo
              passo.
            </p>
          </div>
          <Workspace />
        </div>
      </section>
      <section id="laboratorio" className="section lab-section">
        <div className="container">
          <div className="section-heading reveal">
            <div>
              <span className="eyebrow">05 / LABORATÓRIO VIRTUAL</span>
              <h2>
                Por dentro
                <br />
                <span>da tecnologia.</span>
              </h2>
            </div>
            <div>
              <span className="demo-badge">EXPERIÊNCIA EDUCATIVA</span>
              <p>
                Uma nova perspectiva sobre o que conecta sua rotina. Desmonte
                virtualmente, gire e conheça cada componente.
              </p>
            </div>
          </div>
          <Workspace lab />
        </div>
      </section>
    </>
  );
}
