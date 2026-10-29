import { fireEvent, render, screen } from "@testing-library/react";
import Form from "../app/components/Form";

describe("Form", () => {
  it("renderiza os campos e o botão de criação", () => {
    render(<Form onCriarTarefa={jest.fn()} />);

    expect(screen.getByLabelText("Tarefa")).toBeInTheDocument();
    expect(screen.getByLabelText(/descri/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/urg/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Criar tarefa" }),
    ).toBeInTheDocument();
  });

  it("não envia quando o nome ou a urgência obrigatória estão vazios", () => {
    const onCriarTarefa = jest.fn();
    render(<Form onCriarTarefa={onCriarTarefa} />);

    const nome = screen.getByLabelText("Tarefa");
    const urgencia = screen.getByLabelText(/urg/i);
    const formulario = screen
      .getByRole("button", { name: "Criar tarefa" })
      .closest("form");

    fireEvent.change(nome, { target: { value: "   " } });
    fireEvent.change(urgencia, { target: { value: "vida-ou-morte" } });
    fireEvent.submit(formulario!);

    expect(onCriarTarefa).not.toHaveBeenCalled();

    fireEvent.change(nome, { target: { value: "Estudar testes" } });
    fireEvent.change(urgencia, { target: { value: "" } });
    fireEvent.submit(formulario!);

    expect(onCriarTarefa).not.toHaveBeenCalled();
  });

  it("envia valores tratados e limpa os campos depois do envio", () => {
    const onCriarTarefa = jest.fn();
    render(<Form onCriarTarefa={onCriarTarefa} />);

    const nome = screen.getByLabelText("Tarefa");
    const descricao = screen.getByLabelText(/descri/i);
    const urgencia = screen.getByLabelText(/urg/i);
    const formulario = screen
      .getByRole("button", { name: "Criar tarefa" })
      .closest("form");

    fireEvent.change(nome, { target: { value: "  Estudar testes  " } });
    fireEvent.change(descricao, {
      target: { value: "  Praticar com Testing Library  " },
    });
    fireEvent.change(urgencia, { target: { value: "melhor-apressar" } });
    fireEvent.submit(formulario!);

    expect(onCriarTarefa).toHaveBeenCalledWith({
      nome: "Estudar testes",
      descricao: "Praticar com Testing Library",
      urgencia: "melhor-apressar",
    });
    expect(nome).toHaveValue("");
    expect(descricao).toHaveValue("");
    expect(urgencia).toHaveValue("");
  });

  it("envia descrição como undefined quando ela é opcional e fica vazia", () => {
    const onCriarTarefa = jest.fn();
    render(<Form onCriarTarefa={onCriarTarefa} />);

    fireEvent.change(screen.getByLabelText("Tarefa"), {
      target: { value: "Organizar tarefas" },
    });
    fireEvent.change(screen.getByLabelText(/urg/i), {
      target: { value: "amanha-eu-faco" },
    });

    const formulario = screen
      .getByRole("button", { name: "Criar tarefa" })
      .closest("form");
    fireEvent.submit(formulario!);

    expect(onCriarTarefa).toHaveBeenCalledWith({
      nome: "Organizar tarefas",
      descricao: undefined,
      urgencia: "amanha-eu-faco",
    });
  });
});
