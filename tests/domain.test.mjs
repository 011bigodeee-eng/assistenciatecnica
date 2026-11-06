import test from "node:test";
import assert from "node:assert/strict";
import {
  whatsapp,
  todayFortaleza,
  validateDate,
  validateAppointment,
  validatePhoto,
  getRepairStatus,
} from "../src/lib/domain.mjs";
const now = new Date("2026-11-06T15:30:00Z");
test("WhatsApp preserva acentos, linhas e caracteres especiais", () => {
  const text = "Olá!\nTela & bateria + avaliação";
  const url = new URL(whatsapp(text));
  assert.equal(url.hostname, "wa.me");
  assert.equal(url.pathname, "/5585997096401");
  assert.equal(url.searchParams.get("text"), text);
});
test("data usa Fortaleza mesmo durante virada do dia UTC", () => {
  assert.equal(todayFortaleza(new Date("2026-11-06T01:00:00Z")), "2026-11-05");
});
test("datas passadas, domingos e datas impossíveis são rejeitadas", () => {
  for (const d of ["2026-11-05", "2026-11-08", "2026-02-30", "", "invalid"])
    assert.notEqual(validateDate(d, now), "");
  assert.equal(validateDate("2026-11-07", now), "");
});
test("agenda rejeita horas passadas ou fora da faixa e aceita solicitação futura", () => {
  for (const t of ["08:00", "18:00", "22:00", "09:30", ""])
    assert.notEqual(validateAppointment("2026-11-07", t, now), "");
  assert.notEqual(validateAppointment("2026-11-06", "09:00", now), "");
  assert.equal(validateAppointment("2026-11-07", "09:00", now), "");
});
test("foto aceita apenas imagens suportadas com tamanho válido", () => {
  for (const type of ["image/jpeg", "image/png", "image/webp"])
    assert.equal(validatePhoto({ type, size: 1024 }), "");
  assert.notEqual(validatePhoto({ type: "image/svg+xml", size: 100 }), "");
  assert.notEqual(
    validatePhoto({ type: "image/jpeg", size: 8 * 1024 * 1024 + 1 }),
    "",
  );
  assert.notEqual(validatePhoto({ type: "image/jpeg", size: 0 }), "");
});
test("adaptador retorna apenas o reparo fictício cadastrado", async () => {
  const result = await getRepairStatus(" demo-rc-2048 ");
  assert.equal(result.device, "Samsung Galaxy A54");
  assert.equal(result.step, 2);
  assert.equal(result.customer, "Cliente demonstrativo");
  assert.equal(await getRepairStatus("RC-1234"), null);
});
