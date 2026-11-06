export type VisualItem = {
  id: string;
  name: string;
  description: string;
  image: string;
  alt: string;
};
const visual = (
  id: string,
  name: string,
  description: string,
  image: string,
  alt: string,
): VisualItem => ({
  id,
  name,
  description,
  image: `/images/campaign/${image}.webp`,
  alt: `${alt}; ilustração gerada por IA`,
});
export const problems = [
  visual(
    "camera",
    "Câmera",
    "Foco instável, manchas ou falhas ao abrir a câmera podem estar relacionados às lentes, ao módulo ou ao software. Uma avaliação ajuda a identificar a origem.",
    "problem-camera",
    "Módulo de câmeras na traseira de um smartphone",
  ),
  visual(
    "bateria",
    "Bateria",
    "Baixa autonomia e desligamentos podem envolver desgaste da bateria, consumo de aplicativos ou o circuito de alimentação. A causa depende de avaliação técnica.",
    "problem-battery",
    "Smartphone aberto com bateria interna em destaque",
  ),
  visual(
    "tela",
    "Tela",
    "Trincas, manchas e falhas de toque podem envolver vidro, display ou conexões internas. Conte como o problema começou para orientar a avaliação.",
    "problem-screen",
    "Smartphone com vidro da tela trincado",
  ),
  visual(
    "conector",
    "Conector de carregamento",
    "Carga intermitente pode estar relacionada ao cabo, à fonte, ao conector ou ao circuito interno. A seleção do sintoma não determina qual peça precisa de reparo.",
    "problem-charging",
    "Detalhe macro de uma entrada USB-C",
  ),
  visual(
    "som",
    "Alto-falante",
    "Som baixo ou com ruído pode envolver a saída acústica, o módulo de áudio ou configurações. Informe se acontece em chamadas, músicas ou nos dois casos.",
    "problem-speaker",
    "Módulo de alto-falante de smartphone",
  ),
  visual(
    "microfone",
    "Microfone",
    "Falhas na captação podem envolver o microfone, suas conexões ou permissões de aplicativos. Descreva se o problema ocorre em chamadas ou gravações.",
    "problem-microphone",
    "Microfone miniaturizado com circuito flexível",
  ),
  visual(
    "botoes",
    "Botões",
    "Botões sem resposta ou acionamentos involuntários podem envolver desgaste, encaixe ou conexões internas. A avaliação verifica o funcionamento do conjunto.",
    "problem-buttons",
    "Lateral metálica de smartphone com botões físicos",
  ),
  visual(
    "sistema",
    "Sistema e desempenho",
    "Lentidão e reinicializações podem ter relação com armazenamento, aplicativos, sistema ou hardware. Relate quando acontecem, sem compartilhar senhas ou dados pessoais.",
    "problem-system",
    "Smartphone com visualização abstrata de processamento na tela",
  ),
  visual(
    "outros",
    "Outros problemas",
    "Não encontrou uma opção? Conte o modelo e o que percebeu no aparelho. A equipe poderá orientar sobre a avaliação e as possibilidades de atendimento.",
    "problem-other",
    "Smartphone em bancada com ferramentas de precisão",
  ),
];
export const internals = [
  visual(
    "placa",
    "Placa principal",
    "Interliga os circuitos e distribui sinais e energia entre os componentes do smartphone.",
    "component-board",
    "Placa lógica com circuitos, chips e conectores",
  ),
  visual(
    "processador",
    "Processador",
    "Executa instruções e coordena tarefas, do funcionamento dos aplicativos ao processamento de imagens.",
    "component-processor",
    "Chip de processamento sobre placa eletrônica",
  ),
  visual(
    "bateria",
    "Bateria",
    "Armazena a energia utilizada pelo aparelho. Sua capacidade e seu estado influenciam a autonomia.",
    "component-battery",
    "Bateria interna com conexão flexível",
  ),
  visual(
    "cameras",
    "Câmeras",
    "Combinam lentes e sensores para transformar luz em fotografias e vídeos.",
    "component-cameras",
    "Conjunto de módulos internos de câmeras e lentes",
  ),
  visual(
    "tela",
    "Tela",
    "O display produz as imagens; a camada sensível ao toque permite interagir com o sistema.",
    "component-display",
    "Conjunto de display visto em perspectiva, com conexão flexível",
  ),
  visual(
    "conector",
    "Conector de carga",
    "Faz a conexão física para alimentação e, nos aparelhos compatíveis, transferência de dados.",
    "component-charging",
    "Módulo interno USB-C com placa e conexão flexível",
  ),
  visual(
    "som",
    "Alto-falantes",
    "Transformam sinais elétricos em vibrações sonoras para chamadas, alertas e reprodução de áudio.",
    "component-speakers",
    "Módulo interno de áudio com contatos e grade acústica",
  ),
  visual(
    "sensores",
    "Sensores",
    "Detectam condições como luz, proximidade e movimento para adaptar funções do aparelho.",
    "component-sensors",
    "Sensores de luz e proximidade sobre circuito flexível",
  ),
];
// Apresentação sugerida: editar após validação dos procedimentos pela empresa.
export const attendanceSteps = [
  ["Entre em contato", "Informe o modelo do aparelho e descreva o problema."],
  [
    "Solicite uma avaliação",
    "A equipe poderá orientar sobre os próximos passos e as condições de atendimento.",
  ],
  [
    "Receba as orientações",
    "Obtenha informações sobre avaliação, disponibilidade e eventual orçamento.",
  ],
  [
    "Autorize o serviço",
    "Após receber as condições aplicáveis, decida se deseja prosseguir.",
  ],
];
