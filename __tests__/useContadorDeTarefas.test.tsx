import { renderHook } from "@testing-library/react";
import useContadorDeTarefas from "../app/hooks/useContadorDeTarefas";
import type { Tarefa } from "../app/types/tarefa";

function criarTarefa(id: string): Tarefa {
  return {
    id,
    criadoEm: "2026-01-01T12:00:00.000Z",
    nome: `Tarefa ${id}`,
    urgencia: "melhor-apressar",
    status: "pendente",
    isMock: false,
  };
}

describe("useContadorDeTarefas", () => {
  it("retorna zero quando a lista está vazia", () => {
    const { result } = renderHook(() => useContadorDeTarefas([]));

    expect(result.current).toBe(0);
  });

  it("retorna a quantidade de tarefas recebida", () => {
    const tarefas = [criarTarefa("1"), criarTarefa("2"), criarTarefa("3")];
    const { result } = renderHook(() => useContadorDeTarefas(tarefas));

    expect(result.current).toBe(3);
  });

  it("atualiza o valor quando a lista muda", () => {
    const { result, rerender } = renderHook(
      ({ tarefas }: { tarefas: Tarefa[] }) => useContadorDeTarefas(tarefas),
      { initialProps: { tarefas: [criarTarefa("1")] } },
    );

    expect(result.current).toBe(1);

    rerender({ tarefas: [criarTarefa("1"), criarTarefa("2")] });

    expect(result.current).toBe(2);
  });
});
