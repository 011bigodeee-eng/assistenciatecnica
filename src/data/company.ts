export const DEMO_MODE = true;
export { company } from "./company-info.mjs";
export const services = [
  {
    id: "tela",
    title: "Troca de tela",
    description:
      "Uma nova perspectiva para o seu smartphone. Avaliação de vidro, display e toque.",
    icon: "screen",
    image: "screen",
  },
  {
    id: "bateria",
    title: "Troca de bateria",
    description:
      "Mais energia para a sua rotina. Avaliação de autonomia e desligamentos.",
    icon: "battery",
    image: "battery",
  },
  {
    id: "conector",
    title: "Problemas de carregamento",
    description:
      "Conexão restabelecida. Avaliação do conector e do circuito de carga.",
    icon: "plug",
    image: "connector",
  },
  {
    id: "placa",
    title: "Reparo avançado em placa",
    description:
      "Precisão nos menores detalhes. Diagnóstico de circuitos e microsoldagem.",
    icon: "chip",
    image: "board",
  },
  {
    id: "recuperacao",
    title: "Recuperação de aparelhos",
    description:
      "O próximo passo para aparelhos que não ligam ou tiveram contato com líquidos.",
    icon: "drop",
    image: "recovery",
  },
  {
    id: "iphone",
    title: "Assistência para iPhone",
    description:
      "Cuidado especializado para o seu iPhone, da avaliação ao reparo.",
    icon: "phone",
    image: "iphone",
  },
];
export const components = [
  {
    id: "tela",
    name: "Tela e display",
    symptoms: [
      "Vidro quebrado",
      "Falhas de toque",
      "Manchas na imagem",
      "Tela sem imagem",
    ],
    description:
      "Transforma sinais em imagens e permite a interação por toque.",
  },
  {
    id: "bateria",
    name: "Bateria",
    symptoms: [
      "Descarga rápida",
      "Desligamentos inesperados",
      "Dificuldade de manter carga",
    ],
    description:
      "Armazena energia para o funcionamento do aparelho. Falhas podem causar baixa autonomia ou desligamentos.",
  },
  {
    id: "camera",
    name: "Câmera",
    symptoms: ["Imagem desfocada", "Câmera não abre", "Manchas nas fotos"],
    description:
      "Combina lentes e sensores para capturar fotografias e vídeos.",
  },
  {
    id: "conector",
    name: "Conector de carregamento",
    symptoms: ["Não carrega", "Cabo com mau contato", "Conexão intermitente"],
    description: "Conecta o aparelho à alimentação e à transferência de dados.",
  },
  {
    id: "som",
    name: "Alto-falante",
    symptoms: ["Sem som", "Áudio baixo", "Ruídos"],
    description:
      "Converte sinais elétricos em som para chamadas e reprodução de áudio.",
  },
  {
    id: "placa",
    name: "Placa principal",
    symptoms: ["Não liga", "Reinicia sozinho", "Falhas em múltiplas funções"],
    description:
      "Concentra circuitos e componentes eletrônicos essenciais ao funcionamento do smartphone.",
  },
  {
    id: "estrutura",
    name: "Estrutura",
    symptoms: ["Estrutura deformada", "Danos após queda"],
    description: "Sustenta e protege os componentes internos do aparelho.",
  },
  {
    id: "tampa",
    name: "Tampa traseira",
    symptoms: ["Tampa quebrada", "Tampa solta"],
    description:
      "Protege a parte traseira e ajuda a manter os componentes resguardados.",
  },
  {
    id: "outro",
    name: "Outro problema",
    symptoms: ["Descreva o que está acontecendo"],
    description:
      "Nem todo sintoma tem uma origem evidente. Uma avaliação técnica é necessária.",
  },
];
