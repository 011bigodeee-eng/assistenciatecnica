"use client";
import { useState } from "react";
import { CalendarDays, ArrowUpRight, Check } from "lucide-react";
import {
  appointmentTimes,
  todayFortaleza,
  validateAppointment,
  whatsapp,
} from "@/lib/domain.mjs";
export default function Scheduling() {
  const [service, setService] = useState("Troca de tela");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [device, setDevice] = useState("");
  const [error, setError] = useState("");
  const [review, setReview] = useState(false);
  const [today] = useState(() => todayFortaleza());
  const message = `Olá, equipe Ril Cell!\nGostaria de solicitar um agendamento.\nServiço: ${service}\nAparelho: ${device}\nData desejada: ${date.split("-").reverse().join("/")}\nHorário desejado: ${time}\nAguardo confirmação da disponibilidade.`;
  return (
    <section id="agendamento" className="section scheduling">
      <div className="container split">
        <div className="section-copy reveal">
          <span className="eyebrow">06 / NO SEU TEMPO</span>
          <h2>
            Um cuidado que
            <br />
            cabe na
            <br />
            <span>sua rotina.</span>
          </h2>
          <p>
            Escolha o melhor momento para cuidar do seu celular. Solicite um
            horário e aguarde a confirmação da equipe.
          </p>
          <div className="hours">
            <CalendarDays />
            <div>
              Segunda a sábado<strong>09h às 18h · Fortaleza</strong>
            </div>
          </div>
          <span className="demo-badge">HORÁRIOS ILUSTRATIVOS</span>
          <p className="fine">
            Sem consulta à agenda real. Esta é uma solicitação de horário. A
            confirmação será feita pela equipe Ril Cell.
          </p>
        </div>
        <form
          className="schedule-panel reveal"
          onSubmit={(e) => {
            e.preventDefault();
            const invalid = validateAppointment(date, time);
            setError(invalid);
            if (!invalid) setReview(true);
          }}
        >
          <div className="panel-top">
            <span>SEU PRÓXIMO ATENDIMENTO</span>
            <CalendarDays size={18} />
          </div>
          <label>
            Serviço
            <select
              value={service}
              onChange={(e) => {
                setService(e.target.value);
                setReview(false);
              }}
            >
              {[
                "Troca de tela",
                "Troca de bateria",
                "Problema de carregamento",
                "Avaliação de placa",
                "Avaliação de aparelho molhado",
                "Outro atendimento",
              ].map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
          <label>
            Data desejada
            <input
              type="date"
              required
              min={today}
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                setTime("");
                setReview(false);
                setError("");
              }}
            />
          </label>
          <fieldset>
            <legend>
              Horário desejado <span className="muted">· demonstração</span>
            </legend>
            <div className="time-grid">
              {appointmentTimes.map((t) => (
                <button
                  type="button"
                  key={t}
                  aria-pressed={time === t}
                  className={time === t ? "time active" : "time"}
                  onClick={() => {
                    setTime(t);
                    setReview(false);
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </fieldset>
          <label>
            Marca e modelo
            <input
              required
              value={device}
              maxLength={120}
              placeholder="Ex.: Samsung Galaxy A54"
              onChange={(e) => {
                setDevice(e.target.value);
                setReview(false);
              }}
            />
          </label>
          <p className="error" role="alert">
            {error}
          </p>
          {review ? (
            <div className="notice" aria-live="polite">
              <strong>
                <Check size={16} /> Revise sua solicitação
              </strong>
              <p>
                {service} · {device}
                <br />
                {date.split("-").reverse().join("/")} às {time} (Fortaleza)
              </p>
              <a
                className="button"
                href={whatsapp(message)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  const invalid = validateAppointment(date, time);
                  if (invalid) {
                    e.preventDefault();
                    setError(invalid);
                    setReview(false);
                  }
                }}
              >
                Solicitar confirmação <ArrowUpRight size={17} />
              </a>
              <p className="fine">
                Nenhuma reserva foi criada. Aguarde a resposta da equipe.
              </p>
            </div>
          ) : (
            <button className="button full" type="submit">
              Revisar solicitação <ArrowUpRight size={17} />
            </button>
          )}
        </form>
      </div>
    </section>
  );
}
