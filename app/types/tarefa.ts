export type UrgenciaTarefa =
  | "vida-ou-morte"
  | "melhor-apressar"
  | "amanha-eu-faco";

export type StatusTarefa = "concluida" | "pendente";

export type Tarefa = {
  id: string;
  criadoEm: string;
  nome: string;
  descricao?: string;
  urgencia: UrgenciaTarefa;
  status: StatusTarefa;
  isMock: boolean;
};
