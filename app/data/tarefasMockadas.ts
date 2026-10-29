import type { Tarefa } from "../types/tarefa";

export const tarefasMockadas: Tarefa[] = [
  {
    id: "mock-1",
    criadoEm: "2026-10-25T09:00:00.000Z",
    nome: "Criar estrutura do site",
    descricao: "Organizar o App Router e os principais componentes da aplicação.",
    urgencia: "vida-ou-morte",
    status: "pendente",
    isMock: true,
  },
  {
    id: "mock-2",
    criadoEm: "2026-10-26T09:00:00.000Z",
    nome: "Estilizar o Site",
    descricao: "Definir cores, espaçamentos e a identidade visual do projeto.",
    urgencia: "melhor-apressar",
    status: "pendente",
    isMock: true,
  },
  {
    id: "mock-3",
    criadoEm: "2026-10-27T09:00:00.000Z",
    nome: "Criar e aplicar testes",
    descricao: "Verificar os componentes e os fluxos principais com testes automatizados.",
    urgencia: "amanha-eu-faco",
    status: "pendente",
    isMock: true,
  },
];
