"use client";

import { useState, type FormEvent } from "react";
import type { UrgenciaTarefa } from "../../types/tarefa";
import styles from "./Form.module.css";

export type DadosNovaTarefa = {
  nome: string;
  descricao?: string;
  urgencia: UrgenciaTarefa;
};

type FormProps = {
  onCriarTarefa?: (dados: DadosNovaTarefa) => void;
};

export default function Form({ onCriarTarefa }: FormProps) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [urgencia, setUrgencia] = useState<UrgenciaTarefa | "">("");

  function lidarComSubmissao(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nomeValido = nome.trim();

    if (!onCriarTarefa || !nomeValido || !urgencia) {
      return;
    }

    onCriarTarefa({
      nome: nomeValido,
      descricao: descricao.trim() || undefined,
      urgencia,
    });

    setNome("");
    setDescricao("");
    setUrgencia("");
  }

  return (
    <form className={styles.form} onSubmit={lidarComSubmissao}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="titulo-tarefa">
          Tarefa
        </label>
        <input
          className={styles.input}
          id="titulo-tarefa"
          name="tarefa"
          type="text"
          value={nome}
          onChange={(event) => setNome(event.target.value)}
          placeholder="Digite o título da tarefa"
          required
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="descricao-tarefa">
          Descrição (opcional)
        </label>
        <textarea
          className={styles.textarea}
          id="descricao-tarefa"
          name="descricao"
          value={descricao}
          onChange={(event) => setDescricao(event.target.value)}
          placeholder="Digite a descrição da tarefa"
          rows={3}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="urgencia-tarefa">
          Urgência
        </label>
        <select
          className={styles.select}
          id="urgencia-tarefa"
          name="urgencia"
          value={urgencia}
          onChange={(event) =>
            setUrgencia(event.target.value as UrgenciaTarefa | "")
          }
          required
        >
          <option value="" disabled>
            Selecione a urgência
          </option>
          <option value="vida-ou-morte">Vida ou morte</option>
          <option value="melhor-apressar">Melhor apressar</option>
          <option value="amanha-eu-faco">Amanhã eu faço</option>
        </select>
      </div>

      <button className={styles.submit} type="submit">
        Criar tarefa
      </button>
    </form>
  );
}
