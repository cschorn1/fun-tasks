# FunTasks

Aplicação de lista de tarefas criada com Next.js, App Router, React e TypeScript. O projeto foi desenvolvido como prática de componentes reutilizáveis, estado no cliente, hooks personalizados e testes unitários.

## Aplicação publicada

Acesse o FunTasks: [https://fun-tasks-pi.vercel.app/](https://fun-tasks-pi.vercel.app/).

## Funcionalidades

- Criar tarefas com nome obrigatório, descrição opcional e urgência.
- Editar o nome e a descrição no próprio card.
- Alterar a urgência pelo seletor do card.
- Marcar tarefas como concluídas ou pendentes.
- Excluir tarefas criadas pela aplicação. As tarefas simuladas não podem ser excluídas.
- Filtrar por todas, concluídas ou pendentes.
- Organizar por urgência ou data de criação.
- Alternar entre uma e duas colunas em telas grandes.
- Consultar a quantidade atual de tarefas com o hook `useContadorDeTarefas`.

As tarefas iniciais vêm de `app/data/tarefasMockadas.ts`. A lista de tarefas é salva no `localStorage` do navegador, então as alterações continuam disponíveis após recarregar a página no mesmo navegador. O projeto ainda não usa banco de dados nem sincroniza os dados entre dispositivos ou navegadores.

## Otimização de performance

Foram realizadas as seguintes melhorias:

- Conversão das imagens dos cards para AVIF, com versões de 640 px e 1280 px e seleção responsiva pelo navegador.
- Adição da metadescrição da página.
- Remoção da animação contínua do fundo da lista de tarefas.
- Atualização do Next.js para a versão 16.4.6 e do React para a versão 19.3.1.

### Comparativo Lighthouse

**Dispositivo Mobile: Antes → Depois**

- Performance: 93 → 98
- TBT: 320 ms → 140 ms
- LCP: 1,8 s → 1,7 s
- CLS: 0 → 0
- SEO: 91 → 100

**Dispositivo Desktop: Antes → Depois**

- Performance: 100 → 100
- TBT: 30 ms → 0 ms
- LCP: 0,4 s → 0,4 s
- CLS: 0 → 0
- SEO: 91 → 100

Os principais resultados foram a redução do trabalho da thread principal no mobile e a melhoria do SEO. Os relatórios completos estão disponíveis em:

- [Relatório Lighthouse mobile - antes](relatorios/lighthouse-mobile-antes.pdf)
- [Relatório Lighthouse mobile - depois](relatorios/lighthouse-mobile-depois.pdf)
- [Relatório Lighthouse desktop - antes](relatorios/lighthouse-desktop-antes.pdf)
- [Relatório Lighthouse desktop - depois](relatorios/lighthouse-desktop-depois.pdf)

## Requisitos

- Node.js 24 e npm instalados.

## Instalação e execução

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

Para gerar a versão de produção:

```bash
npm run build
npm run start
```

## Testes

O projeto usa Jest e React Testing Library. Para executar os testes uma vez:

```bash
npm run test
```

Para executar Jest em modo de observação enquanto desenvolve:

```bash
npm run test:watch
```

## CI/CD

O workflow do GitHub Actions está em `.github/workflows/main.yml`. Ele roda em pushes para `main`, em pull requests destinados a `main` e também pode ser iniciado manualmente pela aba **Actions**.

O pipeline compila o projeto, executa o ESLint e os testes. Após essas verificações passarem, um push para `main` publica a aplicação na Vercel.

O deploy usa os secrets `VERCEL_TOKEN`, `VERCEL_ORG_ID` e `VERCEL_PROJECT_ID`, configurados nas opções **Settings → Secrets and variables → Actions** do repositório. Os valores não devem ser adicionados ao código do projeto.

## Organização principal

```text
app/
  components/       Componentes da interface e gerenciamento das tarefas
  data/             Tarefas simuladas
  hooks/            Hooks personalizados
  types/            Tipos TypeScript compartilhados
  page.tsx          Página principal (Server Component)
__tests__/          Testes automatizados
public/images/      Imagens usadas nos cards
```
