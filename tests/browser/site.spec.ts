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
  const serviceImages = await page
    .locator(".service-image img")
    .evaluateAll((images) => images.map((img) => img.getAttribute("src")));
  expect(new Set(serviceImages).size).toBe(6);
  expect(issues.anchors).toEqual([]);
  expect(issues.broken).toEqual([]);
  expect(issues.wa.length).toBeGreaterThan(10);
  for (const link of issues.wa) {
    const url = new URL(link);
    expect(url.pathname).toBe("/5585997096401");
    expect(url.searchParams.get("text")?.length).toBeGreaterThan(10);
  }
});
test("campaign photography replaces old assets and uses dedicated mobile hero", async ({
  browser,
  page,
}) => {
  await expect(page.locator("#diferenciais")).toHaveCount(0);
  await expect(
    page.getByRole("heading", { name: /Tecnologia na experiência/ }),
  ).toHaveCount(0);
  const imagePaths = await page
    .locator("img")
    .evaluateAll((images) => images.map((image) => image.getAttribute("src")));
  expect(imagePaths.every((src) => src?.startsWith("/images/campaign/"))).toBe(
    true,
  );
  const services = await page
    .locator(".service-image img")
    .evaluateAll((images) => images.map((image) => image.getAttribute("src")));
  const problems = await page
    .locator("#diagnostico .visual-options img")
    .evaluateAll((images) =>
      images.map((image) =>
        image.getAttribute("src")?.replace("-300.webp", ".webp"),
      ),
    );
  expect(
    services.filter((src) => src !== null && problems.includes(src)),
  ).toEqual([]);
  for (const width of [390, 1440]) {
    const context = await browser.newContext({
      viewport: { width, height: 1000 },
      deviceScaleFactor: 2,
      reducedMotion: "reduce",
    });
    const screen = await context.newPage();
    await screen.goto("http://127.0.0.1:3000");
    const hero = screen.locator(".hero-art img");
    await expect(hero).toHaveJSProperty("complete", true);
    const state = await hero.evaluate((image: HTMLImageElement) => {
      const copy = document
        .querySelector(".hero-copy")!
        .getBoundingClientRect();
      const art = document.querySelector(".hero-art")!.getBoundingClientRect();
      return {
        src: image.currentSrc,
        width: image.naturalWidth,
        fit: getComputedStyle(image).objectFit,
        separated: copy.right <= art.left || copy.bottom <= art.top,
      };
    });
    expect(state.src).toContain(
      width < 700 ? "hero-mobile-1024.webp" : "hero-desktop-1536.webp",
    );
    expect(state.width).toBeGreaterThan(0);
    expect(state.fit).toBe("contain");
    expect(state.separated).toBe(true);
    await expect(hero).toHaveAttribute("fetchpriority", "high");
    await screen.screenshot({
      path: `/tmp/ril-campaign-hero-${width}.png`,
      fullPage: false,
      scale: "css",
    });
    await context.close();
  }
});
test("removed sections are replaced by attendance and contact actions", async ({
  page,
}) => {
  await expect(page.locator("#reparo")).toHaveCount(0);
  await expect(page.locator("canvas")).toHaveCount(0);
  await expect(
    page.getByText("SEU PRÓXIMO ATENDIMENTO", { exact: true }),
  ).toHaveCount(0);
  await expect(page.locator("#atendimento article")).toHaveCount(4);
  const contact = page.locator("#ajuda");
  await expect(
    contact.getByRole("link", { name: "Falar com a Ril Cell" }),
  ).toHaveAttribute("href", /wa.me\/5585997096401/);
  await contact.getByRole("link", { name: "Enviar foto do problema" }).click();
  await expect(page).toHaveURL(/#orcamento$/);
  await expect(
    page.locator("#orcamento").getByLabel("Modelo", { exact: true }),
  ).toBeInViewport();
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
  const capture = section.getByLabel("Tirar fotografia", { exact: true });
  await expect(capture).toHaveAttribute("capture", "environment");
  await capture.setInputFiles({
    name: "camera.png",
    mimeType: "image/png",
    buffer: Buffer.from(
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRz0AAAAASUVORK5CYII=",
      "base64",
    ),
  });
  await expect(section.getByText("camera.png", { exact: true })).toBeVisible();
  await section.getByRole("button", { name: "Remover imagem" }).click();
  await expect(
    section.getByAltText("Prévia da fotografia selecionada"),
  ).toHaveCount(0);
  await expect(capture).toHaveValue("");
  await expect(input).toHaveValue("");
  await input.setInputFiles({
    name: "replacement.png",
    mimeType: "image/png",
    buffer: Buffer.from(
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRz0AAAAASUVORK5CYII=",
      "base64",
    ),
  });
  await section
    .getByLabel("Observações")
    .fill("A tela trincou após uma queda.");
  await section.getByRole("button", { name: "Continuar", exact: true }).click();
  await expect(
    section.getByText("A foto não é anexada automaticamente", { exact: false }),
  ).toBeVisible();
  const link = section.getByRole("link", { name: "Continuar no WhatsApp" });
  expect(
    new URL((await link.getAttribute("href"))!).searchParams.get("text"),
  ).toContain("iPhone 13");
  expect(
    new URL((await link.getAttribute("href"))!).searchParams.get("text"),
  ).toContain("A tela trincou após uma queda.");
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
test("all visual selections update distinct images, descriptions and WhatsApp messages", async ({
  page,
}) => {
  for (const id of ["diagnostico", "laboratorio"]) {
    const section = page.locator(`#${id}`);
    const options = section.getByRole("button");
    expect(await options.count()).toBe(id === "diagnostico" ? 9 : 8);
    const images = new Set<string>();
    const descriptions = new Set<string>();
    for (const option of await options.all()) {
      const name = (await option.locator("span").last().textContent())!;
      await option.click();
      await expect(option).toHaveAttribute("aria-pressed", "true");
      await expect(
        section.locator(".visual-options [aria-pressed=true]"),
      ).toHaveCount(1);
      await expect(section.getByRole("heading", { level: 3 })).toHaveText(name);
      const image = section.locator(".visual-stage img").last();
      await expect(image).toBeVisible();
      await expect(image).toHaveJSProperty("complete", true);
      expect(
        await image.evaluate((img: HTMLImageElement) => img.naturalWidth),
      ).toBeGreaterThan(0);
      images.add((await image.getAttribute("src"))!);
      descriptions.add(
        (await section
          .locator(".visual-description > p")
          .first()
          .textContent())!,
      );
      if (id === "diagnostico") {
        const link = await section
          .getByRole("link", { name: "Solicitar avaliação" })
          .getAttribute("href");
        const url = new URL(link!);
        expect(url.pathname).toBe("/5585997096401");
        expect(url.searchParams.get("text")).toBe(
          `Olá! Gostaria de solicitar uma avaliação do meu aparelho. O problema que selecionei foi: ${name}.`,
        );
      }
    }
    expect(images.size).toBe(await options.count());
    expect(descriptions.size).toBe(await options.count());
    await options.first().focus();
    await page.keyboard.press("Enter");
    await expect(options.first()).toHaveAttribute("aria-pressed", "true");
    await page.keyboard.press("Tab");
    await expect(options.nth(1)).toBeFocused();
    await page.keyboard.press("Space");
    await expect(options.nth(1)).toHaveAttribute("aria-pressed", "true");
  }
});
test("responsive widths have no horizontal overflow and mobile menu supports escape", async ({
  page,
}) => {
  for (const width of [320, 375, 390, 430, 768, 1024, 1440, 1920]) {
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
test("mobile touch selectors remain contained and show every component", async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 320, height: 850 },
    isMobile: true,
    hasTouch: true,
  });
  const page = await context.newPage();
  await page.addInitScript(() => sessionStorage.setItem("ril-intro", "1"));
  await page.goto("/");
  for (const id of ["diagnostico", "laboratorio"]) {
    const section = page.locator(`#${id}`);
    for (const button of await section.getByRole("button").all()) {
      await button.scrollIntoViewIfNeeded();
      await button.tap();
      await expect(button).toHaveAttribute("aria-pressed", "true");
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
    }
    await expect(section.locator(".visual-description h3")).toBeVisible();
  }
  await context.close();
});
test("intro closes automatically once per session without a skip button", async ({
  page,
}) => {
  await expect(page.locator(".intro")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Pular introdução" }),
  ).toHaveCount(0);
  await expect(page.locator(".intro")).toHaveCount(0, { timeout: 5000 });
  await expect(page.locator(".trust-grid > div")).toHaveCount(3);
  await expect(
    page.getByText("aparelhos consertados", { exact: false }),
  ).toHaveCount(0);
  await page.reload({ waitUntil: "domcontentloaded" });
  await expect(page.locator(".intro")).toHaveCount(0);
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
