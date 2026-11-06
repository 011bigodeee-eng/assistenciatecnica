"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Upload, Camera, Check, X, Share2 } from "lucide-react";
import { validatePhoto, whatsapp } from "@/lib/domain.mjs";
const brands = [
  "Apple",
  "Samsung",
  "Motorola",
  "Xiaomi",
  "Outra",
  "Não sei informar",
];
const problems = [
  "Tela quebrada",
  "Bateria",
  "Não carrega",
  "Não liga",
  "Aparelho molhado",
  "Câmera",
  "Placa",
  "Outro",
];
export default function PhotoRequest() {
  const [step, setStep] = useState(0);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [problem, setProblem] = useState("");
  const [notes, setNotes] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");
  const [share, setShare] = useState(false);
  const [feedback, setFeedback] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);
  const cameraInput = useRef<HTMLInputElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (!file) {
      setPreview("");
      setShare(false);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    try {
      setShare(!!navigator.canShare?.({ files: [file] }));
    } catch {
      setShare(false);
    }
    return () => URL.revokeObjectURL(url);
  }, [file]);
  function selectFile(next?: File) {
    if (!next) return;
    const invalid = validatePhoto(next);
    setError(invalid);
    if (!invalid) setFile(next);
  }
  const message = `Olá, equipe Ril Cell!\nGostaria de solicitar uma avaliação.\nMarca: ${brand}\nModelo: ${model}\nProblema: ${problem}\nDetalhes: ${notes || "Sem observações."}${file ? "\nTenho uma fotografia do aparelho para compartilhar." : ""}`;
  function next() {
    if (step === 0 && (!brand || !model.trim() || !problem)) {
      setError("Informe a marca, o modelo e o problema.");
      return;
    }
    setError("");
    setStep(step + 1);
    heading.current?.focus();
  }
  async function nativeShare() {
    if (!file) return;
    try {
      await navigator.share({
        title: "Solicitação Ril Cell",
        text: message,
        files: [file],
      });
      setFeedback(
        "Compartilhamento concluído pelo navegador. Confirme o destino escolhido.",
      );
    } catch (e) {
      setFeedback(
        e instanceof Error && e.name === "AbortError"
          ? "Compartilhamento cancelado. Sua foto continua aqui."
          : "Não foi possível compartilhar. Use o WhatsApp e anexe a foto manualmente.",
      );
    }
  }
  return (
    <section id="orcamento" className="section">
      <div className="container">
        <div className="section-heading reveal">
          <div>
            <span className="eyebrow">04 / UM PRIMEIRO PASSO SIMPLES</span>
            <h2>
              Mostre o problema.
              <br />
              <span>Nós ajudamos com o próximo passo.</span>
            </h2>
          </div>
          <p>
            Conte o que aconteceu. Prepare sua solicitação e converse
            diretamente com quem pode ajudar.
          </p>
        </div>
        <div className="photo-flow reveal">
          <aside>
            <span className="mono">SOLICITAÇÃO DE AVALIAÇÃO</span>
            <ol className="form-steps">
              {["Seu aparelho", "Uma imagem ajuda", "Revisar e conversar"].map(
                (name, i) => (
                  <li
                    key={name}
                    className={
                      step === i ? "active" : step > i ? "complete" : ""
                    }
                  >
                    <span>{step > i ? <Check size={16} /> : `0${i + 1}`}</span>
                    {name}
                  </li>
                ),
              )}
            </ol>
            <p className="fine">
              <span className="status-dot" /> A fotografia fica apenas neste
              navegador. Nenhum upload para servidor.
            </p>
          </aside>
          <div className="flow-content">
            <h3 ref={heading} tabIndex={-1}>
              {
                [
                  "Vamos conhecer seu aparelho.",
                  "Uma imagem conta mais.",
                  "Tudo pronto para conversar.",
                ][step]
              }
            </h3>
            {step === 0 && (
              <div className="form-grid">
                <label htmlFor="photo-brand">
                  Marca
                  <select
                    id="photo-brand"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  >
                    <option value="">Selecione a marca</option>
                    {brands.map((b) => (
                      <option key={b}>{b}</option>
                    ))}
                  </select>
                </label>
                <label htmlFor="photo-model">
                  Modelo
                  <input
                    id="photo-model"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    maxLength={100}
                    placeholder="Ex.: iPhone 13"
                  />
                </label>
                <label className="wide" htmlFor="photo-problem">
                  O que está acontecendo?
                  <select
                    id="photo-problem"
                    value={problem}
                    onChange={(e) => setProblem(e.target.value)}
                  >
                    <option value="">Selecione o problema</option>
                    {problems.map((p) => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                </label>
              </div>
            )}
            {step === 1 && (
              <>
                <div
                  className="upload-zone"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    selectFile(e.dataTransfer.files[0]);
                  }}
                >
                  {preview ? (
                    <>
                      <img
                        src={preview}
                        alt="Prévia da fotografia selecionada"
                      />
                      <span className="fine">{file?.name}</span>
                      <button
                        className="text-button"
                        onClick={() => {
                          setFile(null);
                          if (fileInput.current) fileInput.current.value = "";
                          if (cameraInput.current)
                            cameraInput.current.value = "";
                        }}
                      >
                        <X size={16} /> Remover imagem
                      </button>
                    </>
                  ) : (
                    <>
                      <Upload size={28} />
                      <strong>Arraste uma imagem para cá</strong>
                      <span>JPEG, PNG ou WebP · até 8 MB</span>
                    </>
                  )}
                  <div className="upload-actions">
                    <button
                      className="button secondary small"
                      onClick={() => fileInput.current?.click()}
                    >
                      {file ? "Substituir" : "Selecionar imagem"}
                    </button>
                    <button
                      className="text-button"
                      onClick={() => cameraInput.current?.click()}
                    >
                      <Camera size={16} /> Tirar foto
                    </button>
                  </div>
                </div>
                <input
                  ref={fileInput}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  aria-label="Selecionar fotografia"
                  hidden
                  onChange={(e) => selectFile(e.target.files?.[0])}
                />
                <input
                  ref={cameraInput}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  capture="environment"
                  aria-label="Tirar fotografia"
                  hidden
                  onChange={(e) => selectFile(e.target.files?.[0])}
                />
                <p className="fine">
                  Foto opcional. Evite dados pessoais, documentos ou informações
                  sensíveis na tela.
                </p>
                <label>
                  Observações <span className="muted">(opcional)</span>
                  <textarea
                    rows={3}
                    maxLength={1500}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Como o problema começou?"
                  />
                </label>
              </>
            )}
            {step === 2 && (
              <>
                <dl className="review">
                  <div>
                    <dt>Aparelho</dt>
                    <dd>
                      {brand} · {model}
                    </dd>
                  </div>
                  <div>
                    <dt>Problema</dt>
                    <dd>{problem}</dd>
                  </div>
                  <div>
                    <dt>Observações</dt>
                    <dd>{notes || "Nenhuma"}</dd>
                  </div>
                  <div>
                    <dt>Fotografia</dt>
                    <dd>{file?.name || "Não selecionada"}</dd>
                  </div>
                </dl>
                {preview && (
                  <img
                    className="review-photo"
                    src={preview}
                    alt="Fotografia selecionada para anexar manualmente"
                  />
                )}
                <p className="notice">
                  O WhatsApp abre com o texto preenchido. A foto não é anexada
                  automaticamente: anexe-a manualmente na conversa.
                </p>
                <a
                  className="button"
                  href={whatsapp(message)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Continuar no WhatsApp <ArrowRight size={17} />
                </a>
                {share && (
                  <button className="button secondary" onClick={nativeShare}>
                    <Share2 size={16} /> Compartilhar com foto
                  </button>
                )}
                {preview && (
                  <a
                    className="text-button"
                    href={preview}
                    download={file?.name}
                  >
                    Baixar foto selecionada
                  </a>
                )}
                <p className="fine">
                  O compartilhamento nativo depende do navegador e dos
                  aplicativos disponíveis; o destino é escolhido por você.
                </p>
              </>
            )}
            <p className="error" role="alert">
              {error}
            </p>
            <p aria-live="polite">{feedback}</p>
            <div className="flow-navigation">
              {step > 0 && (
                <button
                  className="text-button"
                  onClick={() => {
                    setStep(step - 1);
                    setError("");
                  }}
                >
                  ← Voltar
                </button>
              )}
              {step < 2 && (
                <button className="button" onClick={next}>
                  Continuar <ArrowRight size={17} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
