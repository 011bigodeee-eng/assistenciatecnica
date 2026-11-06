import {
  ArrowUpRight,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Clock3,
  Smartphone,
  BatteryCharging,
  Cable,
  Cpu,
  Droplets,
  Check,
  MessageCircle,
  Instagram,
  MoveDown,
  ScanLine,
} from "lucide-react";
import { Header, Intro, Logo, Reveal } from "@/components/chrome";
import Diagnostics from "@/components/diagnostics";
import Tracking from "@/components/tracking";
import PhotoRequest from "@/components/photo-request";
import Scheduling from "@/components/scheduling";
import Portfolio from "@/components/portfolio";
import VerifiedReviews from "@/components/verified-reviews";
import { company, services, DEMO_MODE } from "@/data/company";
import { whatsapp } from "@/lib/domain.mjs";
const icons = [Smartphone, BatteryCharging, Cable, Cpu, Droplets, Smartphone];
export default function Home() {
  return (
    <>
      <Intro />
      <Header />
      <main id="conteudo">
        <section id="inicio" className="hero">
          <div className="hero-grid" />
          <div className="container hero-inner">
            <div className="hero-copy">
              <span className="eyebrow">
                <i className="status-dot" /> ASSISTÊNCIA TÉCNICA ESPECIALIZADA
                EM FORTALEZA
              </span>
              <h1>
                Seu celular
                <br />
                merece um reparo
                <br />
                <span>à altura.</span>
              </h1>
              <p>
                Da troca de tela aos reparos avançados em placa,
                <br className="desktop-break" /> cuidado especializado para
                Android e iPhone.
              </p>
              <div className="hero-actions">
                <a
                  className="button"
                  href={whatsapp()}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Solicitar orçamento <ArrowUpRight size={18} />
                </a>
                <a className="button ghost" href="#diagnostico">
                  <ScanLine size={18} /> Explorar diagnóstico 3D
                </a>
              </div>
              <div className="hero-promise">
                <Clock3 size={15} />
                <span>
                  Conserto no mesmo dia, <strong>na maioria dos casos.</strong>
                </span>
              </div>
            </div>
            <div className="hero-art">
              <div className="orbital orbit-one" />
              <div className="orbital orbit-two" />
              <img
                src="/images/phone-campaign.webp"
                srcSet="/images/phone-campaign-840.webp 840w, /images/phone-campaign-1200.webp 1200w, /images/phone-campaign.webp 1672w"
                sizes="(max-width: 600px) 100vw, (max-width: 1100px) 55vw, 700px"
                alt="Smartphone premium em perspectiva; imagem ilustrativa gerada por IA"
                fetchPriority="high"
                width={1672}
                height={941}
              />
              <span className="art-coordinate top">
                RC / PRECISION CARE
                <br />
                <b>TECNOLOGIA EM CADA DETALHE</b>
              </span>
              <div className="floating-label label-one">
                <span className="tiny-cross">+</span>
                <div>
                  Diagnóstico técnico<small>O cuidado começa aqui.</small>
                </div>
              </div>
              <div className="floating-label label-two">
                <ShieldCheck size={21} />
                <div>
                  3 meses<small>de garantia anunciada</small>
                </div>
              </div>
              <span className="art-coordinate bottom">
                01 — REPARAR É RECONECTAR.
              </span>
              <span className="image-disclaimer">Visual ilustrativo</span>
            </div>
            <div className="hero-bottom">
              <a href="#servicos">
                <MoveDown size={16} /> EXPLORE A EXPERIÊNCIA
              </a>
              <span>PRECISÃO NO REPARO. CONEXÃO COM A SUA ROTINA.</span>
            </div>
          </div>
        </section>
        <section className="trust-bar" aria-label="Informações da empresa">
          <div className="container trust-grid">
            <div>
              <strong>
                1.000<span>+</span>
              </strong>
              <small>aparelhos consertados¹</small>
            </div>
            <div>
              <ShieldCheck />
              <span>
                <strong>3 meses</strong>
                <small>de garantia anunciada</small>
              </span>
            </div>
            <div>
              <MapPin />
              <span>
                <strong>Fortaleza, CE</strong>
                <small>atendimento presencial</small>
              </span>
            </div>
            <div>
              <MessageCircle />
              <span>
                <strong>Conversa direta</strong>
                <small>atendimento pelo WhatsApp</small>
              </span>
            </div>
          </div>
        </section>
        <section id="servicos" className="section services-section">
          <div className="container">
            <div className="section-heading reveal">
              <div>
                <span className="eyebrow">01 / ESPECIALISTAS EM CUIDAR</span>
                <h2>
                  Precisão em
                  <br />
                  <span>cada reparo.</span>
                </h2>
              </div>
              <div>
                <p>
                  Soluções técnicas para os problemas
                  <br />
                  que interrompem sua rotina.
                </p>
                <a className="text-button" href="#orcamento">
                  Encontre o seu próximo passo <ArrowUpRight size={17} />
                </a>
              </div>
            </div>
            <div className="service-grid">
              {services.map((s, i) => {
                const Icon = icons[i];
                return (
                  <article className="service-card reveal" key={s.id}>
                    <a
                      href={whatsapp(
                        `Olá, equipe Ril Cell! Gostaria de solicitar uma avaliação para ${s.title.toLowerCase()}.`,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Solicitar avaliação: ${s.title}`}
                    >
                      <div className="service-image">
                        <div
                          className={`service-photo photo-${i}`}
                          role="img"
                          aria-label={`Imagem ilustrativa gerada por IA: ${s.title.toLowerCase()}`}
                        />
                        <span className="service-number">0{i + 1}</span>
                        <span className="image-disclaimer">Ilustração</span>
                      </div>
                      <div className="service-content">
                        <Icon size={22} />
                        <h3>{s.title}</h3>
                        <p>{s.description}</p>
                        <span className="service-link">
                          Saiba como podemos ajudar <ArrowUpRight size={16} />
                        </span>
                      </div>
                    </a>
                  </article>
                );
              })}
            </div>
            <p className="fine source-note">
              ¹ Quantidade declarada no site atual, conforme briefing.
              Informações comerciais sujeitas à confirmação.
            </p>
          </div>
        </section>
        <Diagnostics />
        <Tracking />
        <PhotoRequest />
        <Scheduling />
        <section className="section editorial">
          <div className="container editorial-grid">
            <div className="editorial-image reveal">
              <div
                className="editorial-photo"
                role="img"
                aria-label="Macro de circuitos eletrônicos; imagem ilustrativa gerada por IA"
              />
              <span className="image-disclaimer">
                Representação ilustrativa
              </span>
              <div className="technical-caption">
                MICROESCALA.
                <br />
                <strong>GRANDE ATENÇÃO.</strong>
              </div>
            </div>
            <div className="section-copy reveal">
              <span className="eyebrow">07 / ALÉM DO QUE SE VÊ</span>
              <h2>
                Tecnologia
                <br />e precisão
                <br />
                <span>nos detalhes.</span>
              </h2>
              <p>
                Reparos em placa exigem diagnóstico técnico e atenção a
                componentes delicados. Conheça o atendimento especializado da
                Ril Cell.
              </p>
              <a
                className="button secondary"
                href={whatsapp(
                  "Olá! Gostaria de consultar um reparo em placa.",
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                Consultar reparo em placa <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
        </section>
        <section className="section care">
          <div className="container split">
            <div className="section-copy reveal">
              <span className="eyebrow">CUIDADO EM CADA ETAPA</span>
              <h2>
                Seu aparelho
                <br />
                <span>em boas mãos.</span>
              </h2>
              <p>
                Mais do que voltar a funcionar. Voltar a fazer parte da sua
                rotina.
              </p>
              <ul className="care-list">
                {[
                  "Atendimento especializado em smartphones",
                  "Orçamento na hora, conforme divulgado",
                  "Três meses de garantia anunciada",
                  "Possibilidade de conserto no mesmo dia",
                  "Atendimento presencial em Fortaleza",
                ].map((t) => (
                  <li key={t}>
                    <Check size={17} />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="care-art reveal">
              <img
                src="/images/workbench.svg"
                alt="Representação ilustrativa de bancada e smartphone, sem retratar instalações da empresa"
                loading="lazy"
              />
              <span className="image-disclaimer">Bancada ilustrativa</span>
              <div className="care-overlay">
                <span className="mono">NOSSA CONEXÃO É COM VOCÊ.</span>
                <h3>
                  Cuidado técnico.
                  <br />
                  Atendimento próximo.
                </h3>
              </div>
            </div>
          </div>
        </section>
        <section className="section journey">
          <div className="container">
            <span className="eyebrow">UMA JORNADA MAIS SIMPLES</span>
            <h2>
              Do problema <span>à solução.</span>
            </h2>
            <div className="journey-grid">
              {[
                [
                  "Solicitação",
                  "Conte o que aconteceu e converse com nossa equipe.",
                ],
                [
                  "Avaliação técnica",
                  "O próximo passo começa com uma análise do aparelho.",
                ],
                [
                  "Reparo",
                  "Atendimento especializado após aprovação do orçamento.",
                ],
                ["Entrega", "Seu aparelho de volta à sua rotina."],
              ].map(([title, desc], i) => (
                <div className="journey-step reveal" key={title}>
                  <span>0{i + 1}</span>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                  <ArrowRight size={18} />
                </div>
              ))}
            </div>
            <p className="fine">
              Jornada conceitual. Procedimentos e prazos dependem de avaliação e
              confirmação da equipe.
            </p>
          </div>
        </section>
        <Portfolio />
        <section className="institutional">
          <div className="container">
            <ShieldCheck size={30} />
            <div>
              <span className="eyebrow">
                RELAÇÕES REAIS. CONFIANÇA CONSTRUÍDA.
              </span>
              <h2>A confiança começa no atendimento.</h2>
              <p>
                Converse com a equipe, tire suas dúvidas e conheça o
                atendimento. Avaliações verificadas poderão ser adicionadas com
                seus links de origem.
              </p>
            </div>
            <a
              className="text-button"
              href={whatsapp()}
              target="_blank"
              rel="noopener noreferrer"
            >
              Vamos conversar <ArrowUpRight size={18} />
            </a>
          </div>
        </section>
        <VerifiedReviews reviews={[]} />
        <section className="final-cta">
          <div className="cta-orbit" />
          <div className="container">
            <span className="eyebrow">RECONECTE-SE AO QUE IMPORTA</span>
            <h2>
              Seu celular parou.
              <br />
              <span>Sua rotina não precisa parar.</span>
            </h2>
            <p>
              Fale com a Ril Cell, explique o problema e solicite uma avaliação
              para seu aparelho.
            </p>
            <div className="hero-actions">
              <a
                className="button"
                href={whatsapp()}
                target="_blank"
                rel="noopener noreferrer"
              >
                Falar com a Ril Cell <ArrowUpRight size={18} />
              </a>
              <a className="button secondary" href="#diagnostico">
                Solicitar diagnóstico <ArrowRight size={17} />
              </a>
            </div>
          </div>
        </section>
      </main>
      <footer id="contato">
        <div className="container footer-grid">
          <div>
            <a href="#inicio" aria-label="rilcell Reparo & Tecnologia — início">
              <Logo />
            </a>
            <p>
              Precisão para reparar.
              <br />
              Cuidado para reconectar.
            </p>
            <span className="footer-location">
              <MapPin size={16} />
              {company.city}
            </span>
          </div>
          <div>
            <h3>Explore</h3>
            <a href="#servicos">Serviços</a>
            <a href="#diagnostico">Diagnóstico 3D</a>
            <a href="#laboratorio">Laboratório virtual</a>
            <a href="#reparo">Acompanhar reparo</a>
            <a href="#agendamento">Agendamento</a>
          </div>
          <div>
            <h3>Vamos conversar</h3>
            <a href={whatsapp()} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={15} />
              {company.phoneLabel}
            </a>
            <a
              href={`https://instagram.com/${company.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram size={15} />@{company.instagram}
            </a>
            <p>
              Segunda a sábado
              <br />
              09h às 18h
            </p>
          </div>
          <div className="footer-note">
            <span className="demo-badge">PRÉVIA COMERCIAL</span>
            <p>
              {DEMO_MODE
                ? "Recursos de acompanhamento, agenda, portfólio e 3D são demonstrativos."
                : "Consulte a equipe sobre os serviços."}
            </p>
            <p>
              Assistência independente. Sem vínculo de autorização com
              fabricantes.
            </p>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} RIL CELL · Fortaleza, Ceará</span>
          <span>TECNOLOGIA COM PROPÓSITO.</span>
        </div>
      </footer>
      <Reveal />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: company.name,
            url: company.url,
            telephone: "+5585997096401",
            areaServed: { "@type": "City", name: "Fortaleza" },
            sameAs: [`https://instagram.com/${company.instagram}`],
            description:
              "Assistência técnica independente de smartphones Android e iPhone em Fortaleza.",
          }).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
