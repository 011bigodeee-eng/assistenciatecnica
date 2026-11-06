# RIL CELL — prévia comercial

Experiência Dark Tech para uma assistência técnica independente em Fortaleza. Next.js App Router, React, TypeScript, Three.js, React Three Fiber e Drei. Não requer banco de dados nem credenciais para executar a demonstração.

## Executar

Requer Node.js 20.9 ou mais recente (validado com Node 24) e npm.

```sh
npm ci
npm run dev
```

Produção:

```sh
npm run build
npm start
```

## Verificação

```sh
npm run typecheck
npm test
npx playwright test
```

Os testes de navegador usam `/usr/bin/chromium`. Para outro executável, defina `CHROMIUM_PATH`. Inicie `npm start` antes de executá-los. Em máquinas sem Chromium, instale um navegador compatível com Playwright; o download pode depender da política de rede.

## Funcionalidades

- Abertura curta, pulável, uma vez por sessão; redução de movimento respeitada.
- Hero com imagem publicitária ilustrativa gerada por IA, serviços e contato contextual via WhatsApp.
- Diagnóstico 3D procedural: componentes clicáveis, rotação limitada, zoom por botão, reset e formulário para preparar avaliação. Lista acessível equivalente e fallback quando WebGL falha.
- Laboratório educativo com montagem e vista explodida interpolada. Apenas uma cena WebGL ativa por vez, conforme visibilidade.
- Rastreamento demonstrativo: `DEMO-RC-2048`. Outros códigos não produzem resultados inventados. Adaptador `getRepairStatus` em `src/lib/domain.mjs`.
- Solicitação em etapas com imagem local (JPEG, PNG, WebP, máximo de 8 MB), prévia, remoção, substituição, captura compatível e revisão. Nada é enviado a servidor. Web Share API com arquivos quando suportada e fluxo universal por texto com anexo manual.
- Solicitação de horário: datas em Fortaleza, bloqueio de domingos, datas/horas passadas e horários fora da lista. Revisão e mensagem no WhatsApp, sem reserva automática.
- Comparação ilustrativa antes/depois por range acessível a teclado, mouse e toque.
- Metadata, Open Graph, Twitter Cards, robots, sitemap e dados estruturados sem endereço ou avaliações inventadas.

## Estrutura

- `src/app`: página, layout, estilos e metadados.
- `src/components`: navegação, formulários e experiências independentes.
- `src/data/company.ts`: informações comerciais, serviços, componentes e `DEMO_MODE`.
- `src/lib/domain.mjs`: regras testáveis e adaptador demonstrativo.
- `public/images`: assets locais.
- `tests`: regras de domínio e fluxos de navegador.

## Vercel

1. Importe o repositório com preset Next.js e raiz do projeto neste diretório.
2. Use Node.js 24, instalação `npm ci` e build `npm run build`.
3. Para a prévia, não são necessárias variáveis ou segredos.
4. Antes de produção, confirme domínio, canonical, dados comerciais, textos de garantia e permissões de uso de imagens. Aponte canonical e sitemap ao domínio definitivo autorizado.
5. Faça o deploy pelo painel da Vercel. Este projeto não foi publicado automaticamente.

## Demonstração e integrações futuras

`DEMO_MODE = true` documenta o estado da prévia; mudar essa constante não cria integrações reais. O rastreamento utiliza exclusivamente dados fictícios e a agenda não consulta disponibilidade. O portfólio é uma ilustração, e o 3D não representa um modelo exato de fabricante. Não há depoimentos, endereços, preços, avaliações ou certificações inventados.

Para produção: backend de ordens de serviço e agenda, autenticação da equipe, permissões, identificadores não previsíveis, proteção de dados, limitação de consultas, histórico/auditoria e disponibilidade real. Adicionar cancelamento, reagendamento e notificações somente com integrações autorizadas. Avaliações verificadas deverão conter nome, texto, nota, data e link de origem; não há avaliações carregadas na prévia.

## Confirmar com o proprietário

Telefone (85) 99709-6401, Instagram @rilcell__, horário de segunda a sábado 09h–18h, serviços oferecidos, condições da garantia de três meses, orçamento na hora, conserto no mesmo dia na maioria dos casos e declaração de mais de 1.000 aparelhos. Os dados vieram do briefing: o site de origem não pôde ser consultado devido à política de rede. Endereço, CNPJ, marca original em alta resolução e fotos reais autorizadas não foram fornecidos e não foram inventados.

## Assets e licenças

Consulte `ASSETS.md`. As imagens geradas e representações procedurais são ilustrativas, sem representar instalações ou reparos reais. Fontes Inter e Space Grotesk são distribuídas localmente via Fontsource sob SIL Open Font License. Bibliotecas mantêm suas próprias licenças em `node_modules`.

## Limites

Um link `wa.me` preenche texto, mas não anexa fotografias. Compartilhar com arquivos depende do navegador e dos aplicativos instalados; o usuário escolhe o destino. Abrir a conversa não envia mensagens. Nenhuma função desta prévia cria ordem real, reserva ou confirmação de recebimento.

Metas de Web Vitals e Lighthouse dependem de medição no deploy e em dispositivos reais. Veja `VALIDATION.md` para resultados executados e limitações.
