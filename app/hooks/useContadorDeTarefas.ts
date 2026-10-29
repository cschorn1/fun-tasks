import type { Tarefa } from "../types/tarefa";

export default function useContadorDeTarefas(tarefas: Tarefa[]): number {
  return tarefas.length;
}
