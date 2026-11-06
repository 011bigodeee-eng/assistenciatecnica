import { company } from "../data/company-info.mjs";
import { appointmentTimes } from "../data/demo-availability.mjs";
import { demoRepair } from "../data/demo-repairs.mjs";
export const whatsapp = (
  message = "Olá, equipe Ril Cell! Gostaria de solicitar um orçamento.",
) => `https://wa.me/${company.phone}?text=${encodeURIComponent(message)}`;
export const todayFortaleza = (now = new Date()) =>
  new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Fortaleza",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
export function validateDate(date, now = new Date()) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return "Escolha uma data válida.";
  const parsed = new Date(`${date}T12:00:00-03:00`);
  if (Number.isNaN(parsed.getTime()) || todayFortaleza(parsed) !== date)
    return "Escolha uma data válida.";
  if (date < todayFortaleza(now)) return "Escolha uma data de hoje em diante.";
  if (parsed.getUTCDay() === 0) return "Não há atendimento aos domingos.";
  return "";
}
export { appointmentTimes };
export function validateAppointment(date, time, now = new Date()) {
  const error = validateDate(date, now);
  if (error) return error;
  if (!appointmentTimes.includes(time))
    return "Selecione um horário entre 09h e 18h.";
  if (new Date(`${date}T${time}:00-03:00`) <= now)
    return "Escolha um horário futuro.";
  return "";
}
export function validatePhoto(file) {
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type))
    return "Selecione uma imagem JPEG, PNG ou WebP.";
  if (file.size > 8 * 1024 * 1024) return "A imagem deve ter no máximo 8 MB.";
  if (file.size === 0) return "O arquivo está vazio.";
  return "";
}
export async function getRepairStatus(code) {
  await new Promise((resolve) => setTimeout(resolve, 450));
  if (code.trim().toUpperCase() !== "DEMO-RC-2048") return null;
  return { ...demoRepair };
}
