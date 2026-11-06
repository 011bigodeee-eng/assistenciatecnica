export const DEMO_MODE = true;
export { company } from "./company-info.mjs";
// Categorias de consulta: não implicam disponibilidade de serviço confirmada.
export const services = [
  {
    id: "tela",
    title: "Tela e toque",
    description:
      "Vidro trincado, manchas ou toque sem resposta? Consulte as possibilidades de avaliação.",
    image: "/images/premium/problem-screen.webp",
  },
  {
    id: "bateria",
    title: "Bateria e autonomia",
    description:
      "Conte sobre a duração da carga e os desligamentos para orientar o primeiro contato.",
    image: "/images/premium/problem-battery.webp",
  },
  {
    id: "conector",
    title: "Carregamento",
    description:
      "Explique as falhas de carga e consulte o atendimento indicado para seu aparelho.",
    image: "/images/premium/problem-charging.webp",
  },
  {
    id: "camera",
    title: "Câmera e imagem",
    description:
      "Foco, captura e qualidade de imagem: descreva o sintoma e solicite informações.",
    image: "/images/premium/problem-camera.webp",
  },
  {
    id: "audio",
    title: "Áudio e chamadas",
    description:
      "Som baixo, ruídos ou falhas na captação? Informe em quais situações acontecem.",
    image: "/images/premium/problem-speaker.webp",
  },
  {
    id: "sistema",
    title: "Sistema e desempenho",
    description:
      "Relate lentidão, travamentos ou reinicializações e converse sobre uma avaliação.",
    image: "/images/premium/problem-system.webp",
  },
];
