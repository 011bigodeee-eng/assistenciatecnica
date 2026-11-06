# Validação da correção visual RIL CELL

## Ambiente

Node.js 24.22.1, Next.js 16.4.5, Chromium em `/usr/bin/chromium`. Instalação via npm e lockfile atualizado. Sem banco ou credenciais de aplicação para executar a prévia. Sem publicação ou deploy automático.

## Verificações executadas

- `npm test`: 5 testes passaram. Validação de mensagens, datas em Fortaleza, domingos, datas impossíveis, horários e arquivos de imagem. O teste exclusivo do rastreamento foi removido junto com a funcionalidade.
- `npm run build`: build de produção e geração estática aprovados.
- `npm run typecheck`: aprovado.
- `npm start` seguido de `npm run test:e2e`: 13 testes passaram.

Os testes de navegador verificam:

- Links internos com destino existente, imagens carregadas e número oficial em todas as URLs WhatsApp verificadas.
- Ausência de rastreamento, canvas 3D, painel antigo e seção de diferenciais removida; presença das quatro etapas e acesso à fotografia pelo CTA.
- Hero com composição específica para mobile e desktop, fonte correta em densidade 2×, prioridade alta, imagem íntegra sem sobrepor o texto.
- Todos os elementos `<img>` iniciais apontam para a campanha nova. Serviços e diagnóstico usam cenas diferentes.
- As nove opções de problema e os oito componentes: imagem individual carregada, título, descrição e opção ativa; texto exato personalizado de WhatsApp para cada problema.
- Navegação dos seletores por Enter, Tab e Espaço e interação por toque em viewport de 320 px.
- Ausência de overflow horizontal em 320, 375, 390, 430, 768, 1024, 1440 e 1920 px; menu mobile e Escape.
- Fluxo de fotografia: campos, tipo inválido, prévia, entrada de captura, substituição, remoção, observações, revisão, download local, texto com modelo e orientação de anexo manual.
- Agenda: domingo rejeitado, pedido futuro preparado e aviso de que nenhuma reserva foi criada.
- Compartilhamento nativo simulado com arquivos: cancelamento preserva a fotografia.
- Abertura pulável e uma vez por sessão; redução de movimento; cenário monitorado sem exceções de aplicação.
- Comparação ilustrativa antes/depois operável por teclado.
- Axe: nenhuma violação automática WCAG 2 A/AA e WCAG 2.1 AA no cenário desktop auditado.

## Revisão visual e assets

As duas composições de Hero e as sete grades de origem foram inspecionadas. A campanha usa preto, grafite, metal e iluminação azul discreta; nenhuma imagem antiga foi apenas escurecida ou filtrada. Uma checagem complementar dos WebP principais reduzidos para amostragem encontrou 0 pixels com predominância verde em 802.240 pixels. Essa checagem complementa a inspeção visual, sem comprovar a exatidão técnica de peças geradas por IA.

Capturas da Hero em desktop e mobile com emulação de densidade 2×: `/tmp/ril-campaign-hero-1440.png` e `/tmp/ril-campaign-hero-390.png`. Capturas das seções de serviços, diagnóstico, componentes e contato: `/tmp/ril-campaign-*.png`. Imagens mantêm sua proporção com espaço reservado; a Hero não usa máscara, corte automático ou animação flutuante contínua. A seção removida não tem substituta e a sequência editorial segue para o portfólio.

Foram geradas 29 cenas novas em 58 arquivos WebP responsivos (aproximadamente 3,4 MB somando todas as variantes). A Hero tem versões de até 1536 px no desktop e 1024 px no mobile; as demais imagens têm variantes de 300/600 px. A exportação não amplia pixels de origem. Todos os antigos assets de `public/images`, incluindo os verdes e os SVGs fotográficos substituídos, foram removidos. Ver `ASSETS.md` para proveniência e reprodução.

A agenda, os contatos, os dados comerciais, o formulário de fotografia, a introdução e o comparador permanecem. A presença de fotos e a paleta não criam novas integrações.

## Limites e configuração real

- WhatsApp abre uma conversa com texto preparado. Nenhuma mensagem foi enviada nos testes. Fotos não são anexadas automaticamente pela URL; o visitante anexa manualmente ou usa o compartilhamento nativo quando suportado.
- A agenda continua sendo uma solicitação, sem integração de disponibilidade ou reserva.
- Categorias de serviços e etapas de atendimento precisam de validação comercial pela empresa; estão centralizadas em arquivos de dados para edição. Dados comerciais preexistentes e canais oficiais foram preservados.
- Imagens são ilustrativas e não documentam peças de um modelo específico ou instalações reais. Portfólio permanece ilustrativo.
- A auditoria automática não substitui avaliação com leitores de tela e aparelhos físicos. O teste de toque usa emulação de navegador.
- Lighthouse e Web Vitals não foram medidos nesta atualização. Relatórios antigos não estabelecem desempenho da versão atual. Domínio, dados empresariais e publicação devem ser confirmados antes de produção.
