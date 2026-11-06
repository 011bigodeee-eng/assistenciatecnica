"use client";
import { useState } from "react";
import { ArrowUpRight, Check, Search, Wrench } from "lucide-react";
import { getRepairStatus, whatsapp } from "@/lib/domain.mjs";
type Repair = NonNullable<Awaited<ReturnType<typeof getRepairStatus>>>;
export default function Tracking() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState<Repair | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  async function lookup(value: string) {
    setLoading(true);
    setResult(null);
    setError("");
    try {
      const repair = await getRepairStatus(value);
      if (repair) setResult(repair);
      else setError("Não encontramos esse código na demonstração.");
    } catch {
      setError("Não foi possível consultar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <section id="reparo" className="section tracking-section">
      <div className="container split">
        <div className="section-copy reveal">
          <span className="eyebrow">03 / SEM INCERTEZAS</span>
          <h2>
            Seu reparo,
            <br />
            acompanhado
            <br />
            <span>de perto.</span>
          </h2>
          <p>
            Consulte o andamento do atendimento utilizando seu código de
            serviço.
          </p>
          <span className="demo-badge">MODO DEMONSTRAÇÃO</span>
          <p className="fine">
            Demonstração com informações fictícias. Não representa um reparo
            real. Não há integração com ordens de serviço.
          </p>
        </div>
        <div className="tracking-panel reveal">
          <div className="panel-top">
            <span>
              <i className="status-dot" /> CENTRAL DE ACOMPANHAMENTO
            </span>
            <Wrench size={17} />
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              lookup(code);
            }}
          >
            <label htmlFor="repair-code">Código de acompanhamento</label>
            <div className="input-group">
              <input
                id="repair-code"
                placeholder="Ex.: DEMO-RC-2048"
                value={code}
                required
                maxLength={60}
                onChange={(e) => setCode(e.target.value)}
              />
              <button
                className="button"
                disabled={loading}
                aria-label="Consultar reparo"
              >
                <Search size={19} />
              </button>
            </div>
            <button
              className="text-button"
              type="button"
              disabled={loading}
              onClick={() => {
                setCode("DEMO-RC-2048");
                lookup("DEMO-RC-2048");
              }}
            >
              Testar demonstração <ArrowUpRight size={15} />
            </button>
          </form>
          <div aria-live="polite" aria-busy={loading}>
            {loading && <p className="loading">Consultando demonstração…</p>}
            {error && (
              <p className="error" role="alert">
                {error}
              </p>
            )}
            {result ? (
              <>
                <div className="repair-device">
                  <div>
                    <small>
                      {result.code} · {result.customer}
                    </small>
                    <h3>{result.device}</h3>
                    <p>{result.service}</p>
                  </div>
                  <span className="tag">{result.status}</span>
                </div>
                <ol className="repair-timeline">
                  {[
                    "Aparelho recebido",
                    "Diagnóstico concluído",
                    "Reparo em andamento",
                    "Testes finais",
                    "Pronto para retirada",
                  ].map((step, i) => (
                    <li
                      className={
                        i < result.step
                          ? "done"
                          : i === result.step
                            ? "current"
                            : ""
                      }
                      key={step}
                    >
                      <span>
                        {i < result.step ? (
                          <Check size={13} />
                        ) : (
                          String(i + 1).padStart(2, "0")
                        )}
                      </span>
                      <div>
                        {step}
                        {i === result.step && (
                          <small>ETAPA ATUAL · DEMONSTRAÇÃO</small>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              </>
            ) : (
              !loading &&
              !error && (
                <div className="tracking-empty">
                  <div className="radar">
                    <Wrench size={24} />
                  </div>
                  <h3>Cada etapa, mais tranquilidade.</h3>
                  <p>Experimente a consulta com um código demonstrativo.</p>
                </div>
              )
            )}
          </div>
          <a
            className="panel-footer"
            href={whatsapp(
              "Olá! Gostaria de conversar sobre o acompanhamento do meu reparo.",
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            Precisa de ajuda? Fale com a equipe <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
