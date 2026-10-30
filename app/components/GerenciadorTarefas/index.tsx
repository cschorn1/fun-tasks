"use client";

import { useEffect, useState } from "react";
import Form, { type DadosNovaTarefa } from "../Form";
import ListaTarefas from "../ListaTarefas";
import useContadorDeTarefas from "../../hooks/useContadorDeTarefas";
import type { Tarefa, UrgenciaTarefa } from "../../types/tarefa";

type GerenciadorTarefasProps = {
  tarefasIniciais: Tarefa[];
};

const CHAVE_TAREFAS = "fun-tasks:tarefas";

function ehTarefa(valor: unknown): valor is Tarefa {
  if (typeof valor !== "object" || valor === null) {
    return false;
  }

  const tarefa = valor as Record<string, unknown>;
  const urgenciasValidas: UrgenciaTarefa[] = [
    "vida-ou-morte",
    "melhor-apressar",
    "amanha-eu-faco",
  ];

  return (
    typeof tarefa.id === "string" &&
    typeof tarefa.criadoEm === "string" &&
    typeof tarefa.nome === "string" &&
    (typeof tarefa.descricao === "string" || tarefa.descricao === undefined) &&
    urgenciasValidas.includes(tarefa.urgencia as UrgenciaTarefa) &&
    (tarefa.status === "concluida" || tarefa.status === "pendente") &&
    typeof tarefa.isMock === "boolean"
  );
}

export default function GerenciadorTarefas({
  tarefasIniciais,
}: GerenciadorTarefasProps) {
  const [tarefas, setTarefas] = useState<Tarefa[]>(tarefasIniciais);
  const [carregouTarefasSalvas, setCarregouTarefasSalvas] = useState(false);
  const quantidadeTarefas = useContadorDeTarefas(tarefas);

  useEffect(() => {
    try {
      const tarefasSalvas = localStorage.getItem(CHAVE_TAREFAS);

      if (tarefasSalvas) {
        const dadosArmazenados: unknown = JSON.parse(tarefasSalvas);

        if (Array.isArray(dadosArmazenados)) {
          // eslint-disable-next-line react-hooks/set-state-in-effect -- restaura as tarefas do localStorage após a hidratação no navegador.
          setTarefas(dadosArmazenados.filter(ehTarefa));
        }
      }
    } catch {
      // Se o armazenamento estiver inválido ou indisponível, mantém a lista inicial.
    } finally {
      setCarregouTarefasSalvas(true);
    }
  }, []);

  useEffect(() => {
    if (!carregouTarefasSalvas) {
      return;
    }

    try {
      localStorage.setItem(CHAVE_TAREFAS, JSON.stringify(tarefas));
    } catch {
      // A aplicação continua funcionando mesmo se o navegador bloquear o armazenamento.
    }
  }, [tarefas, carregouTarefasSalvas]);

  function criarTarefa(dados: DadosNovaTarefa) {
    const novaTarefa: Tarefa = {
      id: crypto.randomUUID(),
      criadoEm: new Date().toISOString(),
      nome: dados.nome,
      descricao: dados.descricao,
      urgencia: dados.urgencia,
      status: "pendente",
      isMock: false,
    };

    setTarefas((tarefasAtuais) => [novaTarefa, ...tarefasAtuais]);
  }

  function alternarStatus(id: string) {
    setTarefas((tarefasAtuais) =>
      tarefasAtuais.map((tarefa) =>
        tarefa.id === id
          ? {
              ...tarefa,
              status: tarefa.status === "pendente" ? "concluida" : "pendente",
            }
          : tarefa,
      ),
    );
  }

  function salvarEdicao(
    id: string,
    dados: { nome: string; descricao?: string },
  ) {
    setTarefas((tarefasAtuais) =>
      tarefasAtuais.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, ...dados } : tarefa,
      ),
    );
  }

  function alterarUrgencia(id: string, urgencia: UrgenciaTarefa) {
    setTarefas((tarefasAtuais) =>
      tarefasAtuais.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, urgencia } : tarefa,
      ),
    );
  }

  function excluirTarefa(id: string) {
    setTarefas((tarefasAtuais) =>
      tarefasAtuais.filter((tarefa) => tarefa.id !== id || tarefa.isMock),
    );
  }

  return (
    <>
      <Form onCriarTarefa={criarTarefa} />
      <ListaTarefas
        tarefas={tarefas}
        quantidadeTarefas={quantidadeTarefas}
        onAlternarStatus={alternarStatus}
        onExcluir={excluirTarefa}
        onSalvarEdicao={salvarEdicao}
        onAlterarUrgencia={alterarUrgencia}
      />
    </>
  );
}
