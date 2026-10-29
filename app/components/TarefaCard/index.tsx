"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Tarefa, UrgenciaTarefa } from "../../types/tarefa";
import styles from "./TarefaCard.module.css";

type TarefaCardProps = {
  tarefa: Tarefa;
  onAlternarStatus?: (id: string) => void;
  onExcluir?: (id: string) => void;
  onSalvarEdicao?: (
    id: string,
    dados: { nome: string; descricao?: string },
  ) => void;
  onAlterarUrgencia?: (id: string, urgencia: UrgenciaTarefa) => void;
};

const opcoesUrgencia: { valor: UrgenciaTarefa; texto: string }[] = [
  { valor: "vida-ou-morte", texto: "Vida ou morte" },
  { valor: "melhor-apressar", texto: "Melhor apressar" },
  { valor: "amanha-eu-faco", texto: "Amanhã eu faço" },
];

const nomesUrgencia = {
  "vida-ou-morte": "Vida ou morte",
  "melhor-apressar": "Melhor apressar",
  "amanha-eu-faco": "Amanhã eu faço",
} as const;

const imagensPorUrgencia: Record<Tarefa["urgencia"], string> = {
  "vida-ou-morte": "/images/roxa.png?v=2",
  "melhor-apressar": "/images/amarela.png?v=2",
  "amanha-eu-faco": "/images/verde.png",
};

export default function TarefaCard({
  tarefa,
  onAlternarStatus,
  onExcluir,
  onSalvarEdicao,
  onAlterarUrgencia,
}: TarefaCardProps) {
  const [menuAberto, setMenuAberto] = useState(false);
  const [editando, setEditando] = useState(false);
  const [nomeEditado, setNomeEditado] = useState(tarefa.nome);
  const [descricaoEditada, setDescricaoEditada] = useState(
    tarefa.descricao ?? "",
  );
  const [nomeInvalido, setNomeInvalido] = useState(false);
  const [seletorUrgenciaAberto, setSeletorUrgenciaAberto] = useState(false);
  const [descricaoExpandida, setDescricaoExpandida] = useState(false);
  const [statusClicadoNoHover, setStatusClicadoNoHover] = useState(false);
  const [statusEmPrevia, setStatusEmPrevia] = useState(false);
  const [urgenciaAtual, setUrgenciaAtual] = useState(tarefa.urgencia);
  const estaConcluida = tarefa.status === "concluida";
  const textoStatus =
    statusEmPrevia && !statusClicadoNoHover
      ? estaConcluida
        ? "Pendente"
        : "Concluída"
      : estaConcluida
        ? "Concluída"
        : "Pendente";
  const descricao = tarefa.descricao ?? "";
  const descricaoLonga = descricao.length > 140;
  const descricaoVisivel =
    descricaoLonga && !descricaoExpandida
      ? `${descricao.slice(0, 140).trimEnd()}…`
      : descricao;
  const idMenu = `menu-tarefa-${tarefa.id}`;
  const idMenuUrgencia = `menu-urgencia-${tarefa.id}`;

  useEffect(() => {
    setUrgenciaAtual(tarefa.urgencia);
  }, [tarefa.urgencia]);

  function iniciarEdicao() {
    setNomeEditado(tarefa.nome);
    setDescricaoEditada(tarefa.descricao ?? "");
    setNomeInvalido(false);
    setEditando(true);
    setMenuAberto(false);
  }

  function salvarEdicao() {
    const nomeValido = nomeEditado.trim();

    if (!nomeValido) {
      setNomeInvalido(true);
      return;
    }

    onSalvarEdicao?.(tarefa.id, {
      nome: nomeValido,
      descricao: descricaoEditada.trim() || undefined,
    });
    setNomeInvalido(false);
    setEditando(false);
  }

  function alterarUrgencia(urgencia: UrgenciaTarefa) {
    setUrgenciaAtual(urgencia);
    onAlterarUrgencia?.(tarefa.id, urgencia);
    setSeletorUrgenciaAberto(false);
  }

  return (
    <article
      className={styles.tarefaCard}
      data-urgencia={urgenciaAtual}
      data-status={tarefa.status}
      data-mock={tarefa.isMock}
      data-menu-aberto={menuAberto || seletorUrgenciaAberto}
      data-status-clicado={statusClicadoNoHover}
    >
      <div
        className={styles.tarefaCard__imagem}
        role="img"
        aria-label={`Imagem da tarefa: ${tarefa.nome}`}
      >
        <Image
          src={imagensPorUrgencia[urgenciaAtual]}
          alt=""
          fill
          unoptimized
          sizes="(max-width: 640px) 100vw, 34vw"
          className={styles.tarefaCard__imagemArquivo}
        />
      </div>

      <div className={styles.tarefaCard__conteudo}>
        <div className={styles.tarefaCard__cabecalho}>
          {editando ? (
            <div className={styles.tarefaCard__edicaoNome}>
              <input
                type="text"
                required
                value={nomeEditado}
                onChange={(event) => {
                  setNomeEditado(event.target.value);
                  setNomeInvalido(false);
                }}
                aria-label={`Editar nome da tarefa ${tarefa.nome}`}
                aria-invalid={nomeInvalido}
                aria-describedby={
                  nomeInvalido ? `erro-nome-${tarefa.id}` : undefined
                }
                className={`${styles.tarefaCard__inputEdicao} ${nomeInvalido ? styles.tarefaCard__inputEdicaoInvalido : ""}`}
              />
              {nomeInvalido && (
                <span
                  id={`erro-nome-${tarefa.id}`}
                  role="alert"
                  className={styles.tarefaCard__erroNome}
                >
                  O nome da tarefa é obrigatório.
                </span>
              )}
            </div>
          ) : (
            <h2 className={styles.tarefaCard__nome}>{tarefa.nome}</h2>
          )}

          {editando ? (
            <div className={styles.tarefaCard__botoesEdicao}>
              <button
                type="button"
                className={styles.tarefaCard__acaoMenu}
                onClick={salvarEdicao}
              >
                Salvar
              </button>
              <button
                type="button"
                className={styles.tarefaCard__acaoMenu}
                onClick={() => setEditando(false)}
              >
                Cancelar
              </button>
            </div>
          ) : (
            <div className={styles.tarefaCard__opcoesContainer}>
            <button
              className={styles.tarefaCard__opcoes}
              type="button"
              aria-label={`Opções da tarefa ${tarefa.nome}`}
              aria-expanded={menuAberto}
              aria-controls={idMenu}
              onClick={() => setMenuAberto((aberto) => !aberto)}
            >
              <span aria-hidden="true">⋮</span>
            </button>

            <div
              id={idMenu}
              role="group"
              aria-label={`Ações da tarefa ${tarefa.nome}`}
              aria-hidden={!menuAberto}
              className={`${styles.tarefaCard__menuAcoes} ${menuAberto ? styles.tarefaCard__menuAcoesAberto : styles.tarefaCard__menuAcoesFechado}`}
            >
              <button
                type="button"
                className={styles.tarefaCard__acaoMenu}
                onClick={iniciarEdicao}
              >
                Editar
              </button>

              {!tarefa.isMock && (
                <button
                  type="button"
                  className={styles.tarefaCard__acaoMenu}
                  onClick={() => {
                    onExcluir?.(tarefa.id);
                    setMenuAberto(false);
                  }}
                >
                  Excluir
                </button>
              )}
            </div>
            </div>
          )}
        </div>

        {editando ? (
          <textarea
            value={descricaoEditada}
            onChange={(event) => setDescricaoEditada(event.target.value)}
            aria-label={`Editar descrição da tarefa ${tarefa.nome}`}
            placeholder="Descrição (opcional)"
            rows={3}
            className={styles.tarefaCard__textareaEdicao}
          />
        ) : descricao ? (
          <p className={styles.tarefaCard__descricao}>
            <span>{descricaoVisivel}</span>
            {descricaoLonga && (
              <button
                className={styles.tarefaCard__verDescricao}
                type="button"
                aria-expanded={descricaoExpandida}
                onClick={() => setDescricaoExpandida((expandida) => !expandida)}
              >
                {descricaoExpandida ? "Ver menos" : "Ver mais"}
              </button>
            )}
          </p>
        ) : null}

        <div className={styles.tarefaCard__acoes}>
        <div
          className={styles.tarefaCard__seletorUrgencia}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setSeletorUrgenciaAberto(false);
            }
          }}
        >
          <div
            className={styles.tarefaCard__urgencia}
            aria-label={`Urgência: ${nomesUrgencia[urgenciaAtual]}`}
          >
            <span>{nomesUrgencia[urgenciaAtual]}</span>
            <span className={styles.tarefaCard__controlesUrgencia}>
              <span className={styles.tarefaCard__divisorUrgencia} />
              <button
                className={styles.tarefaCard__setaUrgencia}
                type="button"
                aria-label={`Alterar urgência da tarefa ${tarefa.nome}`}
                aria-expanded={seletorUrgenciaAberto}
                aria-controls={idMenuUrgencia}
                onClick={() => setSeletorUrgenciaAberto((aberto) => !aberto)}
              >
                <span aria-hidden="true" />
              </button>
            </span>
          </div>
          {seletorUrgenciaAberto && (
            <div
              id={idMenuUrgencia}
              role="group"
              aria-label={`Opcoes de urgencia para ${tarefa.nome}`}
              className={styles.tarefaCard__menuUrgencia}
            >
              {opcoesUrgencia.map((opcao) => {
                const selecionada = opcao.valor === urgenciaAtual;

                return (
                  <button
                    key={opcao.valor}
                    type="button"
                    aria-pressed={selecionada}
                    data-urgencia={opcao.valor}
                    onClick={() => alterarUrgencia(opcao.valor)}
                    className={styles.tarefaCard__opcaoUrgencia}
                  >
                    {opcao.texto}
                  </button>
                );
              })}
            </div>
          )}
        </div>
        <button
          className={styles.tarefaCard__status}
          type="button"
          onClick={() => {
            if (onAlternarStatus) {
              onAlternarStatus(tarefa.id);
              setStatusClicadoNoHover(true);
            }
          }}
          onPointerEnter={() => {
            setStatusEmPrevia(true);
            setStatusClicadoNoHover(false);
          }}
          onPointerLeave={() => {
            setStatusEmPrevia(false);
            setStatusClicadoNoHover(false);
          }}
          onFocus={() => {
            setStatusEmPrevia(true);
            setStatusClicadoNoHover(false);
          }}
          onBlur={() => {
            setStatusEmPrevia(false);
            setStatusClicadoNoHover(false);
          }}
          aria-pressed={estaConcluida}
          aria-label={
            estaConcluida
              ? `Marcar ${tarefa.nome} como pendente`
              : `Marcar ${tarefa.nome} como concluída`
          }
        >
          <span>{textoStatus}</span>
        </button>
        </div>
      </div>
    </article>
  );
}
