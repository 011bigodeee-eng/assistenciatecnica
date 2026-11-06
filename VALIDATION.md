# Validação da atualização premium RIL CELL

## Ambiente

Node.js 24.22.1, Next.js 16.4.5, Chromium em `/usr/bin/chromium`. Instalação via npm e lockfile atualizado. Sem banco ou credenciais de aplicação para executar a prévia. Sem publicação ou deploy automático.

## Verificações executadas

- `npm test`: 5 testes passaram. Validação de mensagens, datas em Fortaleza, domingos, datas impossíveis, horários e arquivos de imagem. O teste exclusivo do rastreamento foi removido junto com a funcionalidade.
- `npm run build`: build de produção e geração estática aprovados.
- `npm run typecheck`: aprovado.
- `npm start` seguido de `npm run test:e2e`: 12 testes passaram.

Os testes de navegador verificam:

- Links internos com destino existente, imagens carregadas e número oficial em todas as URLs WhatsApp verificadas.
- Ausência de rastreamento, canvas 3D e painel antigo; presença das quatro etapas e acesso à fotografia pelo novo CTA.
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

Capturas de diagnóstico visual, componentes, atendimento e contato em 1440, 390 e 320 px foram geradas em `/tmp/ril-*.png`. Seções principais inspecionadas visualmente. Os seletores horizontais ficam contidos na seção; imagens e textos têm espaço reservado. Após o último ajuste de CSS, uma verificação funcional adicional percorreu as 17 opções nas oito larguras solicitadas: variação de altura de 0 px em cada seletor e nenhum overflow horizontal. O botão flutuante é ocultado em celulares para não cobrir formulários; o WhatsApp continua disponível no cabeçalho e nas ações.

Foram adicionadas 18 cenas geradas por IA, exportadas em 37 arquivos WebP responsivos (aproximadamente 1,3 MB no total em disco). O navegador seleciona variantes; imagens abaixo da dobra usam carregamento tardio. Ver `ASSETS.md`. Three.js, Fiber, Drei e tipos exclusivos foram removidos; Motion foi adicionado. Não há dependência de WebGL.

## Limites e configuração real

- WhatsApp abre uma conversa com texto preparado. Nenhuma mensagem foi enviada nos testes. Fotos não são anexadas automaticamente pela URL; o visitante anexa manualmente ou usa o compartilhamento nativo quando suportado.
- A agenda continua sendo uma solicitação, sem integração de disponibilidade ou reserva.
- Categorias de serviços e etapas de atendimento precisam de validação comercial pela empresa; estão centralizadas em arquivos de dados para edição. Dados comerciais preexistentes e canais oficiais foram preservados.
- Imagens são ilustrativas e não documentam peças de um modelo específico ou instalações reais. Portfólio permanece ilustrativo.
- A auditoria automática não substitui avaliação com leitores de tela e aparelhos físicos. O teste de toque usa emulação de navegador.
- Lighthouse e Web Vitals não foram medidos nesta atualização. Relatórios antigos não estabelecem desempenho da versão atual. Domínio, dados empresariais e publicação devem ser confirmados antes de produção.
