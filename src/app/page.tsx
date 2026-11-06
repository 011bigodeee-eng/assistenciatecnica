import {
  ArrowUpRight,
  ShieldCheck,
  MapPin,
  Clock3,
  Smartphone,
  BatteryCharging,
  Cable,
  Cpu,
  Camera,
  Volume2,
  MessageCircle,
  Instagram,
  MoveDown,
  ScanLine,
} from "lucide-react";
import { Header, Intro, Logo, Reveal } from "@/components/chrome";
import Diagnostics from "@/components/diagnostics";
import {
  Attendance,
  ContactHelp,
  DigitalBenefits,
} from "@/components/attendance";
import PhotoRequest from "@/components/photo-request";
import Scheduling from "@/components/scheduling";
import Portfolio from "@/components/portfolio";
import VerifiedReviews from "@/components/verified-reviews";
import { company, services, DEMO_MODE } from "@/data/company";
import { whatsapp } from "@/lib/domain.mjs";
const icons = [Smartphone, BatteryCharging, Cable, Camera, Volume2, Cpu];
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
                  <ScanLine size={18} /> Selecionar meu problema
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
                  Soluções para
                  <br />
                  <span>seu dispositivo.</span>
                </h2>
              </div>
              <div>
                <p>
                  Conte o que precisa e consulte a equipe sobre a avaliação e os
                  serviços disponíveis para seu aparelho.
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
                        `Olá, equipe Ril Cell! Gostaria de informações sobre ${s.title.toLowerCase()}. Vocês podem avaliar meu aparelho?`,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Solicitar informações: ${s.title}`}
                    >
                      <div className="service-image">
                        <img
                          className="premium-service-photo"
                          src={s.image}
                          srcSet={`${s.image.replace(".webp", "-240.webp")} 240w, ${s.image} 412w`}
                          sizes="(max-width: 600px) calc(100vw - 48px), 380px"
                          width={412}
                          height={412}
                          loading="lazy"
                          alt={`Imagem ilustrativa gerada por IA: ${s.title.toLowerCase()}`}
                        />
                        <span className="service-number">0{i + 1}</span>
                        <span className="image-disclaimer">Ilustração</span>
                      </div>
                      <div className="service-content">
                        <Icon size={22} />
                        <h3>{s.title}</h3>
                        <p>{s.description}</p>
                        <span className="service-link">
                          Solicitar informações <ArrowUpRight size={16} />
                        </span>
                      </div>
                    </a>
                  </article>
                );
              })}
            </div>
            <p className="fine source-note">
              ¹ Quantidade de aparelhos informada no briefing, sujeita à
              confirmação. Categorias para consulta. A disponibilidade e as
              condições de cada serviço dependem de confirmação da equipe para
              seu aparelho.
            </p>
          </div>
        </section>
        <Diagnostics />
        <Attendance />
        <ContactHelp />
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
        <DigitalBenefits />
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
            <a href="#diagnostico">Seleção do problema</a>
            <a href="#laboratorio">Componentes internos</a>
            <a href="#atendimento">Como funciona</a>
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
                ? "Agenda sem confirmação automática. Portfólio e imagens são ilustrativos."
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
