import Footer from "./components/Footer";
import GerenciadorTarefas from "./components/GerenciadorTarefas";
import Header from "./components/Header";
import { tarefasMockadas } from "./data/tarefasMockadas";

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <GerenciadorTarefas tarefasIniciais={tarefasMockadas} />
      </main>
      <Footer />
    </>
  );
}
