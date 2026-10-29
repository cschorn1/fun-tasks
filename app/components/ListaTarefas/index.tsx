"use client";

import { useState } from "react";
import TarefaCard from "../TarefaCard";
import type { Tarefa, UrgenciaTarefa } from "../../types/tarefa";
import styles from "./ListaTarefas.module.css";

type FiltroTarefas = "todas" | "concluidas" | "pendentes";
type OrdenacaoTarefas = "urgencia" | "data";
type QuantidadeColunas = 1 | 2;

const opcoesFiltro: { valor: FiltroTarefas; texto: string }[] = [
  { valor: "todas", texto: "Todas" },
  { valor: "concluidas", texto: "Concluídas" },
  { valor: "pendentes", texto: "Pendentes" },
];

const prioridadeUrgencia: Record<UrgenciaTarefa, number> = {
  "vida-ou-morte": 0,
  "melhor-apressar": 1,
  "amanha-eu-faco": 2,
};

type ListaTarefasProps = {
  tarefas: Tarefa[];
  quantidadeTarefas?: number;
  onAlternarStatus?: (id: string) => void;
  onExcluir?: (id: string) => void;
  onSalvarEdicao?: (
    id: string,
    dados: { nome: string; descricao?: string },
  ) => void;
  onAlterarUrgencia?: (id: string, urgencia: UrgenciaTarefa) => void;
};

export default function ListaTarefas({
  tarefas,
  quantidadeTarefas,
  onAlternarStatus,
  onExcluir,
  onSalvarEdicao,
  onAlterarUrgencia,
}: ListaTarefasProps) {
  const [filtroAtual, setFiltroAtual] = useState<FiltroTarefas>("todas");
  const [ordenacaoAtual, setOrdenacaoAtual] =
    useState<OrdenacaoTarefas>("data");
  const [quantidadeColunas, setQuantidadeColunas] =
    useState<QuantidadeColunas>(1);

  const tarefasFiltradas = tarefas.filter((tarefa) => {
    if (filtroAtual === "concluidas") {
      return tarefa.status === "concluida";
    }

    if (filtroAtual === "pendentes") {
      return tarefa.status === "pendente";
    }

    return true;
  });

  const tarefasVisiveis = [...tarefasFiltradas].sort((tarefaA, tarefaB) => {
    if (ordenacaoAtual === "urgencia") {
      const diferencaUrgencia =
        prioridadeUrgencia[tarefaA.urgencia] -
        prioridadeUrgencia[tarefaB.urgencia];

      if (diferencaUrgencia !== 0) {
        return diferencaUrgencia;
      }
    }

    return (
      new Date(tarefaB.criadoEm).getTime() -
      new Date(tarefaA.criadoEm).getTime()
    );
  });

  const totalTarefas = quantidadeTarefas ?? tarefas.length;
  const quantidadeConcluidas = tarefas.filter(
    (tarefa) => tarefa.status === "concluida",
  ).length;
  const quantidadePendentes = tarefas.filter(
    (tarefa) => tarefa.status === "pendente",
  ).length;
  const quantidadesPorFiltro: Record<FiltroTarefas, number> = {
    todas: totalTarefas,
    concluidas: quantidadeConcluidas,
    pendentes: quantidadePendentes,
  };

  return (
    <section
      className={styles.listaTarefas}
      aria-labelledby="titulo-lista-tarefas"
    >
      <h2
        className={styles.listaTarefas__titulo}
        id="titulo-lista-tarefas"
      >
        <span className={styles.listaTarefas__tituloMarca}>Suas</span>{" "}
        <span className={styles.listaTarefas__tituloDestaque}>tarefas</span>
      </h2>

      <div className={styles.listaTarefas__barraControles}>
        <div className={styles.listaTarefas__ordenacao}>
          <label htmlFor="ordenar-tarefas">Organizar por</label>
          <select
            id="ordenar-tarefas"
            value={ordenacaoAtual}
            onChange={(event) =>
              setOrdenacaoAtual(event.target.value as OrdenacaoTarefas)
            }
          >
            <option value="urgencia">Urgência</option>
            <option value="data">Data de criação</option>
          </select>
        </div>

        <div
          className={styles.listaTarefas__visualizacao}
          role="group"
          aria-label="Quantidade de colunas da lista"
        >
          <button
            className={styles.listaTarefas__botaoVisualizacao}
            type="button"
            aria-label="Exibir em uma coluna"
            aria-pressed={quantidadeColunas === 1}
            onClick={() => setQuantidadeColunas(1)}
          >
            <span
              className={styles.listaTarefas__iconeUmaColuna}
              aria-hidden="true"
            >
              <span />
            </span>
          </button>
          <button
            className={styles.listaTarefas__botaoVisualizacao}
            type="button"
            aria-label="Exibir em duas colunas"
            aria-pressed={quantidadeColunas === 2}
            onClick={() => setQuantidadeColunas(2)}
          >
            <span
              className={styles.listaTarefas__iconeDuasColunas}
              aria-hidden="true"
            >
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      <div
        className={styles.listaTarefas__filtros}
        role="group"
        aria-label="Filtrar tarefas por status"
      >
        {opcoesFiltro.map((opcao) => (
          <button
            className={styles.listaTarefas__filtro}
            key={opcao.valor}
            type="button"
            aria-pressed={filtroAtual === opcao.valor}
            data-filtro={opcao.valor}
            onClick={() => setFiltroAtual(opcao.valor)}
          >
            <span>{opcao.texto}</span>
            <span className={styles.listaTarefas__contagem}>
              {quantidadesPorFiltro[opcao.valor]}
            </span>
          </button>
        ))}
      </div>

      {tarefas.length === 0 ? (
        <p className={styles.listaTarefas__vazia}>
          Nenhuma tarefa por aqui. Que tal criar a primeira?
        </p>
      ) : tarefasVisiveis.length === 0 ? (
        <p className={styles.listaTarefas__vazia}>
          {filtroAtual === "concluidas"
            ? "Você ainda não concluiu nenhuma tarefa."
            : "Não há tarefas pendentes no momento."}
        </p>
      ) : (
        <ul
          className={styles.listaTarefas__itens}
          data-colunas={quantidadeColunas}
        >
          {tarefasVisiveis.map((tarefa) => (
            <li className={styles.listaTarefas__item} key={tarefa.id}>
              <TarefaCard
                tarefa={tarefa}
                onAlternarStatus={onAlternarStatus}
                onExcluir={onExcluir}
                onSalvarEdicao={onSalvarEdicao}
                onAlterarUrgencia={onAlterarUrgencia}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
