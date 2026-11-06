# Validação da prévia RIL CELL

## Ambiente e execução

- Node.js 24.22.1; Next.js 16.4.5; Chromium do ambiente.
- Instalação reproduzível pelo `package-lock.json`: `npm ci --prefer-offline` (cache explicitamente direcionado a `/tmp/ril-npm-cache` durante a verificação).
- `npm run build`: passou, incluindo TypeScript e geração estática de página, robots, sitemap e ícone.
- Servidor de produção iniciado por `npm start` e utilizado nos testes reais de navegador.
- `npm run dev -- --port 3001`: inicialização e resposta funcional verificadas; processo de desenvolvimento encerrado após o teste.

## Testes executados

`npm test`: **6 testes passaram**.

- Mensagens de WhatsApp preservam acentos e caracteres especiais.
- Datas calculadas em America/Fortaleza, incluindo virada de dia UTC.
- Datas passadas, domingos e datas impossíveis rejeitadas.
- Horários fora da lista e horários passados rejeitados.
- Tipos/tamanhos de arquivo aceitos e rejeitados corretamente.
- Adaptador retorna somente o código demonstrativo, sem inventar resultados para outros códigos.

`npx playwright test`: **12 testes passaram** na versão final.

- Página de produção, destinos dos links internos, imagens HTML e estrutura dos links WhatsApp.
- Código demonstrativo e código não encontrado.
- Formulário de fotografia, campos, arquivo inválido, prévia e revisão com anexo manual.
- Domingo rejeitado e solicitação de horário futuro sem confirmação automática.
- Canvas WebGL real presente, seleção por lista, zoom, reset e controles de montagem do laboratório.
- Sem overflow horizontal em 320, 360, 375, 390, 414, 768, 1024, 1440 e 1920 pixels; menu mobile abre, fecha por Escape e fecha após navegação.
- Reduced motion pula a introdução; nenhuma exceção de aplicação no cenário monitorado.
- WebGL indisponível: lista e conteúdo educativo continuam utilizáveis.
- Introdução pulável e uma vez por sessão.
- Web Share API simulada com suporte a arquivos: cancelamento preserva a fotografia.
- Comparador responde a setas e Home no teclado.
- Axe: nenhuma violação automática WCAG 2 A/AA e WCAG 2.1 AA no cenário desktop auditado.

Os testes de compartilhamento usam uma implementação simulada da API no navegador. Não comprovam envio real para WhatsApp em um aparelho físico. Os links foram validados sem enviar mensagens à empresa. A presença e os controles do canvas foram verificados; gestos físicos de toque e leitores de tela exigem avaliação em dispositivos reais.

## Inspeção visual

Capturas de viewport desktop e mobile inspecionadas: hero, serviços com imagens ilustrativas, painel de diagnóstico e formulário mobile. Ajustados contraste de textos e altura da região 3D. Capturas são artefatos temporários em `/tmp/ril-*.png`.

## Desempenho

Lighthouse local, perfil mobile padrão com throttling simulado, executado sem a suíte de navegador concorrente:

| Medida                 | Resultado |
| ---------------------- | --------- |
| Performance            | 83 / 100  |
| Accessibility          | 100 / 100 |
| Best Practices         | 100 / 100 |
| SEO                    | 100 / 100 |
| LCP                    | 3,8 s     |
| CLS                    | 0,006     |
| Total Blocking Time    | 240 ms    |
| First Contentful Paint | 1,0 s     |

As metas de Performance 90+, acessibilidade automática e CLS foram atingidas nesta medição local. A meta de LCP abaixo de 2,5 s **não foi atingida**: o resultado foi 3,0 s. Fontes variáveis locais, imagens responsivas em três resoluções e abertura com duração contada desde o carregamento foram aplicadas. Novas otimizações devem ser orientadas por medição no deploy e em dispositivos reais, especialmente para a imagem principal e a abertura cinematográfica.

Comando: `CHROME_PATH=/usr/bin/chromium npx lighthouse http://127.0.0.1:3000 --output=json --output-path=/tmp/ril-lighthouse-final.json --chrome-flags='--headless --no-sandbox --enable-unsafe-swiftshader' --only-categories=performance,accessibility,best-practices,seo --quiet`.

Web Vitals de campo, INP real, redes/dispositivos reais e métricas do deploy Vercel não foram medidos. Resultados locais de laboratório não garantem metas em produção. O relatório bruto permanece em `/tmp/ril-lighthouse-final.json`; resumo versionado em `reports/lighthouse-summary.json`.

## Pendências para produção

- Confirmar dados comerciais com o proprietário. `rilcell.com` não pôde ser consultado: o proxy retornou 403.
- Fornecer logotipo oficial em boa qualidade, endereço confirmado se desejado e fotos reais autorizadas.
- Integrar ordens de serviço e agenda com segurança e autorização. A prévia não cria reservas nem apresenta reparos reais.
- Substituir portfólio ilustrativo por fotos reais e adicionar avaliações somente com origem verificável.
- Confirmar canonical e domínio antes de publicar na Vercel.
- Validar compartilhamento em navegadores móveis reais, gestos de toque, leitores de tela e desempenho em aparelhos modestos.

A configuração reutilizável do ambiente foi salva como rascunho: `install_script` e `start_skill`. Ela não foi publicada e nenhum deploy Vercel foi executado.
