import { test, expect } from "@playwright/test";
test.beforeEach(async ({ page }, testInfo) => {
  if (
    !testInfo.title.startsWith("intro") &&
    !testInfo.title.startsWith("reduced motion")
  )
    await page.addInitScript(() => sessionStorage.setItem("ril-intro", "1"));
  await page.goto("/");
});
test("production page, internal links, photos and WhatsApp links", async ({
  page,
}) => {
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Seu celular",
  );
  const issues = await page.evaluate(() => ({
    anchors: [...document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')]
      .filter((a) => !document.getElementById(a.hash.slice(1)))
      .map((a) => a.hash),
    broken: [...document.images]
      .filter((i) => i.complete && i.naturalWidth === 0)
      .map((i) => i.src),
    wa: [
      ...document.querySelectorAll<HTMLAnchorElement>('a[href*="wa.me"]'),
    ].map((a) => a.href),
  }));
  expect(issues.anchors).toEqual([]);
  expect(issues.broken).toEqual([]);
  expect(issues.wa.length).toBeGreaterThan(10);
  for (const link of issues.wa) {
    const url = new URL(link);
    expect(url.pathname).toBe("/5585997096401");
    expect(url.searchParams.get("text")?.length).toBeGreaterThan(10);
  }
});
test("tracking returns demo and rejects unknown code", async ({ page }) => {
  const section = page.locator("#reparo");
  await section.getByRole("button", { name: "Testar demonstração" }).click();
  await expect(
    section.getByRole("heading", { name: "Samsung Galaxy A54" }),
  ).toBeVisible();
  await expect(section.getByText(/^Reparo em andamento/)).toBeVisible();
  await section.getByLabel("Código de acompanhamento").fill("REAL-999");
  await section.getByRole("button", { name: "Consultar reparo" }).click();
  await expect(section.getByRole("alert")).toHaveText(
    "Não encontramos esse código na demonstração.",
  );
  await expect(section.getByText("Samsung Galaxy A54")).toHaveCount(0);
});
test("photo flow validates fields and file, reviews and preserves manual attachment", async ({
  page,
}) => {
  const section = page.locator("#orcamento");
  await section.getByRole("button", { name: "Continuar", exact: true }).click();
  await expect(section.getByRole("alert")).toContainText("Informe");
  await section
    .getByRole("combobox", { name: "Marca", exact: true })
    .selectOption("Apple");
  await section.getByLabel("Modelo", { exact: true }).fill("iPhone 13");
  await section
    .getByLabel("O que está acontecendo?")
    .selectOption("Tela quebrada");
  await section.getByRole("button", { name: "Continuar", exact: true }).click();
  const input = section.getByLabel("Selecionar fotografia", { exact: true });
  await input.setInputFiles({
    name: "bad.txt",
    mimeType: "text/plain",
    buffer: Buffer.from("text"),
  });
  await expect(section.getByRole("alert")).toContainText("JPEG");
  await input.setInputFiles({
    name: "test.png",
    mimeType: "image/png",
    buffer: Buffer.from(
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRz0AAAAASUVORK5CYII=",
      "base64",
    ),
  });
  await expect(
    section.getByAltText("Prévia da fotografia selecionada"),
  ).toBeVisible();
  await section.getByRole("button", { name: "Continuar", exact: true }).click();
  await expect(
    section.getByText("A foto não é anexada automaticamente", { exact: false }),
  ).toBeVisible();
  const link = section.getByRole("link", { name: "Continuar no WhatsApp" });
  expect(
    new URL((await link.getAttribute("href"))!).searchParams.get("text"),
  ).toContain("iPhone 13");
  await expect(
    section.getByRole("link", { name: "Baixar foto selecionada" }),
  ).toBeVisible();
});
test("scheduling rejects Sunday and past date then produces request awaiting confirmation", async ({
  page,
}) => {
  const section = page.locator("#agendamento");
  await section.getByLabel("Marca e modelo").fill("Samsung A54");
  await section.getByLabel("Data desejada").fill("2099-01-04");
  await section.getByRole("button", { name: "09:00", exact: true }).click();
  await section.getByRole("button", { name: "Revisar solicitação" }).click();
  await expect(section.getByRole("alert")).toContainText("domingos");
  await section.getByLabel("Data desejada").fill("2099-01-05");
  await section.getByRole("button", { name: "10:00", exact: true }).click();
  await section.getByRole("button", { name: "Revisar solicitação" }).click();
  await expect(
    section.getByText("Nenhuma reserva foi criada.", { exact: false }),
  ).toBeVisible();
  expect(
    await section
      .getByRole("link", { name: "Solicitar confirmação" })
      .getAttribute("href"),
  ).toContain("Aguardo%20confirma%C3%A7%C3%A3o");
});
test("diagnostics and virtual lab component controls", async ({ page }) => {
  const diagnostic = page.locator("#diagnostico");
  await diagnostic.getByRole("button", { name: "02 Bateria" }).click();
  await expect(diagnostic.locator("canvas")).toBeVisible();
  await expect(
    diagnostic.getByRole("heading", { name: "Bateria", exact: true }),
  ).toBeVisible();
  await expect(
    diagnostic.getByText("Descarga rápida", { exact: true }),
  ).toBeVisible();
  await diagnostic
    .getByRole("button", { name: "Aproximar", exact: true })
    .click();
  await diagnostic
    .getByRole("button", { name: /restaurar câmera e montagem/i })
    .click();
  const lab = page.locator("#laboratorio");
  await lab
    .getByRole("button", { name: "Explorar componentes", exact: true })
    .click();
  await expect(
    lab.getByRole("button", { name: "Montar novamente" }),
  ).toBeVisible();
  await lab.getByRole("button", { name: "06 Placa principal" }).click();
  await expect(
    lab.getByRole("heading", { name: "Placa principal" }),
  ).toBeVisible();
  await lab.getByRole("button", { name: "Montar novamente" }).click();
  await expect(
    lab.getByRole("button", { name: "Explorar componentes", exact: true }),
  ).toBeVisible();
});
test("responsive widths have no horizontal overflow and mobile menu supports escape", async ({
  page,
}) => {
  for (const width of [320, 360, 375, 390, 414, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await page.waitForTimeout(100);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      `overflow at ${width}`,
    ).toBe(true);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Abrir menu" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page.getByRole("button", { name: "Abrir menu" }).click();
  await page
    .getByRole("dialog")
    .getByRole("link", { name: "Serviços" })
    .click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page.screenshot({ path: "/tmp/ril-mobile.png", fullPage: true });
});
test("reduced motion skips intro; screenshot desktop and no application errors", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.evaluate(() => sessionStorage.removeItem("ril-intro"));
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Pular introdução" }),
  ).toHaveCount(0);
  await page.screenshot({ path: "/tmp/ril-desktop.png", fullPage: true });
  expect(errors).toEqual([]);
});
test("WebGL unavailable keeps educational component list usable", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (
      this: HTMLCanvasElement,
      type: string,
      ...args: unknown[]
    ) {
      if (type.startsWith("webgl")) return null;
      return original.call(this, type, ...(args as []));
    } as typeof original;
  });
  await page.reload();
  const section = page.locator("#diagnostico");
  await section.getByRole("button", { name: "02 Bateria" }).click();
  await expect(
    section.getByText("WebGL indisponível.", { exact: false }),
  ).toBeVisible();
  await expect(
    section.getByRole("heading", { name: "Bateria", exact: true }),
  ).toBeVisible();
});
test("intro plays once and is skippable", async ({ page }) => {
  await page.waitForFunction(() => sessionStorage.getItem("ril-intro") === "1");
  await page.evaluate(() => sessionStorage.removeItem("ril-intro"));
  await page.reload({ waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: "Pular introdução" }).click();
  await expect(
    page.getByRole("button", { name: "Pular introdução" }),
  ).toHaveCount(0);
  await page.reload({ waitUntil: "domcontentloaded" });
  await expect(
    page.getByRole("button", { name: "Pular introdução" }),
  ).toHaveCount(0);
});
test("native sharing is offered only with file support and cancellation preserves photo", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "canShare", {
      configurable: true,
      value: () => true,
    });
    Object.defineProperty(navigator, "share", {
      configurable: true,
      value: () => Promise.reject(new DOMException("Cancelled", "AbortError")),
    });
  });
  await page.reload();
  const section = page.locator("#orcamento");
  await section
    .getByRole("combobox", { name: "Marca", exact: true })
    .selectOption("Samsung");
  await section
    .getByRole("textbox", { name: "Modelo", exact: true })
    .fill("Galaxy A54");
  await section
    .getByRole("combobox", { name: "O que está acontecendo?" })
    .selectOption("Bateria");
  await section.getByRole("button", { name: "Continuar", exact: true }).click();
  await section
    .getByLabel("Selecionar fotografia", { exact: true })
    .setInputFiles({
      name: "test.png",
      mimeType: "image/png",
      buffer: Buffer.from(
        "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRz0AAAAASUVORK5CYII=",
        "base64",
      ),
    });
  await section.getByRole("button", { name: "Continuar", exact: true }).click();
  await section.getByRole("button", { name: "Compartilhar com foto" }).click();
  await expect(
    section.getByText("Compartilhamento cancelado. Sua foto continua aqui."),
  ).toBeVisible();
  await expect(
    section.getByRole("link", { name: "Baixar foto selecionada" }),
  ).toBeVisible();
});
test("comparison slider responds to keyboard", async ({ page }) => {
  const slider = page.getByRole("slider", { name: "Comparar antes e depois" });
  await slider.focus();
  await page.keyboard.press("ArrowRight");
  await expect(slider).toHaveValue("51");
  await page.keyboard.press("Home");
  await expect(slider).toHaveValue("0");
});
