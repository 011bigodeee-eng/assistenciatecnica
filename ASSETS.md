# Campanha visual RIL CELL

A campanha atual usa 29 cenas novas geradas por IA, exportadas em 58 arquivos WebP. Todas as imagens fotográficas renderizadas estão em `public/images/campaign/`. Os assets antigos, incluindo iluminação verde, hero anterior e SVGs ilustrativos de bancada/comparação, foram retirados da pasta pública.

## Direção de arte

Preto, grafite, vidro escuro, metal prateado e iluminação branca com azul discreto, coerente com a paleta já usada pelo projeto (`#2563eb` e `#38bdf8`). Nenhuma nova cor principal foi introduzida. Contatos metálicos podem ter a tonalidade natural do material. Sem marcas, palavras incorporadas, mãos, peças flutuantes ou atribuição a modelos reais de fabricantes.

As imagens são composições ilustrativas geradas por IA, não fotografias de instalações da empresa, reparos de clientes ou documentação técnica de peças específicas. Essa condição permanece visível no site. O comparador antes/depois não comprova resultado de serviço.

## Originais e correspondência

Os originais foram gerados e inspecionados em `/workspace/generated_images/`. As grades 2 × 2 servem apenas como origem de exportação: cada cena é um arquivo individual no site.

| Original PNG                                    | Destinos                                                                                      |
| ----------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `exec-bbb49682-d884-4f49-8f45-bf499730765e.png` | Hero desktop: composição horizontal própria, 1536 × 1024                                      |
| `exec-2ec0b008-eaf2-486d-851f-481e6605a03d.png` | Hero mobile: composição vertical própria, 1024 × 1536                                         |
| `exec-b91551ed-70ea-4d2c-8a31-5e664efa5740.png` | Diagnóstico: câmera, bateria, tela, carregamento                                              |
| `exec-bbcae70b-d10e-433a-bb5a-29e59008afff.png` | Diagnóstico: alto-falante, microfone, botões, sistema                                         |
| `exec-adecfbbc-aa05-40b2-a53f-7ca3eb6f7a0d.png` | Componentes: placa, processador, bateria, câmeras                                             |
| `exec-53e56f59-740a-432c-b052-175131b3461c.png` | Componentes: display, conector, alto-falantes, sensores                                       |
| `exec-0e017d83-8669-45c5-8476-644222bd6304.png` | Serviços: tela, bateria, carregamento, câmera                                                 |
| `exec-f80d6a4f-507a-4de3-9438-fee7d3c6ce4b.png` | Serviços: áudio, sistema; diagnóstico: outros; CTA: bancada de contato                        |
| `exec-47919cff-0b7f-40f7-9e5f-f6e72efd4596.png` | Editorial: macro de placa; comparador: antes e depois. A região superior direita não é usada. |

Cada uma das seis categorias de serviço usa uma cena diferente da série de diagnóstico. As oito categorias internas usam imagens próprias. O processo de atendimento permanece uma composição tipográfica com ícones e linha de progresso; não utiliza fotografia.

## Exportação e carregamento

- WebP, qualidade 93, sem filtros para esconder cores antigas e sem ampliação artificial da resolução de origem.
- Hero desktop: 960 e 1536 px de largura; hero mobile: 640 e 1024 px. O `<picture>` seleciona composições diferentes até 700 px. Prioridade alta e carregamento imediato.
- Demais imagens: 300 e 600 px, com proporção preservada, recorte apenas das bordas divisórias das grades e carregamento tardio.
- Aproximadamente 3,4 MB em disco somando todas as variantes. O navegador seleciona os arquivos necessários; não baixa todas as versões por padrão.
- `scripts/export-campaign.cjs` documenta e executa a exportação. Requer os PNGs originais disponíveis em `CAMPAIGN_SOURCE_DIR` (padrão: `/workspace/generated_images`). O build normal usa somente os WebP versionados e não requer os originais nem a ferramenta de geração.

## Fontes e ícones

Inter e Space Grotesk: pacotes Fontsource, SIL Open Font License. Ícones Lucide: ISC. Motion, React e Next.js mantêm suas respectivas licenças nos pacotes instalados. Favicon SVG preservado como identidade do projeto, sem substituir fotografia de produto.
