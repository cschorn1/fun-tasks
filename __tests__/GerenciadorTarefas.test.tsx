import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import GerenciadorTarefas from "../app/components/GerenciadorTarefas";
import type { Tarefa } from "../app/types/tarefa";

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    className,
  }: {
    src: string;
    alt: string;
    className?: string;
  }) => <img src={src} alt={alt} className={className} />,
}));

const CHAVE_TAREFAS = "fun-tasks:tarefas";

function criarTarefa(id: string, nome: string): Tarefa {
  return {
    id,
    criadoEm: "2026-01-01T12:00:00.000Z",
    nome,
    descricao: "Descrição da tarefa de teste.",
    urgencia: "melhor-apressar",
    status: "pendente",
    isMock: false,
  };
}

describe("GerenciadorTarefas e persistência", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("carrega do localStorage as tarefas salvas anteriormente", async () => {
    const tarefaSalva = criarTarefa("salva-1", "Tarefa recuperada");
    const tarefaInicial = criarTarefa("inicial-1", "Tarefa inicial");

    window.localStorage.setItem(CHAVE_TAREFAS, JSON.stringify([tarefaSalva]));

    render(<GerenciadorTarefas tarefasIniciais={[tarefaInicial]} />);

    expect(
      await screen.findByRole("heading", { name: "Tarefa recuperada" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Tarefa inicial" }),
    ).not.toBeInTheDocument();
  });

  it("grava no localStorage uma mudança de status", async () => {
    const tarefa = criarTarefa("status-1", "Tarefa para concluir");

    render(<GerenciadorTarefas tarefasIniciais={[tarefa]} />);

    await waitFor(() => {
      expect(JSON.parse(window.localStorage.getItem(CHAVE_TAREFAS) ?? "[]"))
        .toEqual([tarefa]);
    });

    fireEvent.click(
      screen.getByRole("button", { name: /Marcar.*como/ }),
    );

    await waitFor(() => {
      const tarefasSalvas: Tarefa[] = JSON.parse(
        window.localStorage.getItem(CHAVE_TAREFAS) ?? "[]",
      );

      expect(tarefasSalvas[0].status).toBe("concluida");
    });
  });
});
