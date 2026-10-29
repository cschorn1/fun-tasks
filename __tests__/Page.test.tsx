import { render, screen, within } from "@testing-library/react";
import Page from "../app/page";

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

describe("Página inicial", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("renderiza a estrutura principal e as tarefas locais iniciais", () => {
    render(<Page />);

    expect(screen.getByRole("banner")).toHaveTextContent("FunTasks");
    expect(
      screen.getByRole("heading", { name: "Suas tarefas" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Criar tarefa" }),
    ).toBeInTheDocument();

    const lista = screen.getByRole("list");

    expect(
      within(lista).getByRole("heading", {
        name: "Criar estrutura do site",
      }),
    ).toBeInTheDocument();
    expect(
      within(lista).getByRole("heading", { name: "Estilizar o Site" }),
    ).toBeInTheDocument();
    expect(
      within(lista).getByRole("heading", { name: "Criar e aplicar testes" }),
    ).toBeInTheDocument();

    expect(screen.getByRole("contentinfo")).toHaveTextContent(
      "2026 FunTasks - Todos os direitos Reservados",
    );
  });
});
