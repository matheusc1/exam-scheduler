# exam-scheduler 📅

Aplicação desenvolvida para agendamento e gerenciamento de avaliações dos cursos da [UNIFAA](https://www.unifaa.edu.br/). A aplicação oferece uma série de funcionalidades para diferentes tipos de usuários.

## Tecnologias utilizadas 💻

- [Typescript](https://www.typescriptlang.org/): Linguagem que adiciona tipagem estática ao JavaScript, oferecendo maior segurança e previsibilidade no código.
- [React](https://react.dev/): Biblioteca para construção de interfaces de usuário interativas e eficientes.
- [React-hook-form](https://react-hook-form.com/): Biblioteca para gerenciar formulários em React de forma simples e com alta performance.
- [shadcn/ui](https://ui.shadcn.com/): Conjunto de componentes de interface de usuário prontos para uso com foco em acessibilidade e customização.
- [Tailwind CSS](https://tailwindcss.com/): Framework CSS utilitário para criação de designs rápidos e responsivos.
- [Axios](https://axios-http.com/docs/intro): Cliente HTTP para fazer requisições assíncronas.
- [Tanstack Query](https://tanstack.com/query/latest): Biblioteca para gerenciar dados assíncronos, como cache, sincronização e atualização de estados de dados.
- [Zod](https://zod.dev/): Biblioteca de validação de esquemas para TypeScript/JavaScript, garantindo dados seguros e tipados.
- [Day.js](https://day.js.org/): Biblioteca JavaScript leve e eficiente para manipulação de datas.

## Executando o projeto 🛠️

### Pré requisitos
- Node instalado (versão recomendada LTS)
- API configurada e em execução. Para detalhes, consulte a [documentação da API](https://github.com/matheusc1/exam-scheduler-server/tree/main)

### Passo a passo

1. Clone o repositório e acesse a pasta do projeto:

```sh
git clone https://github.com/matheusc1/unifaa-exam-scheduler
cd unifaa-exam-scheduler
```

2. Instale as dependências:

```sh
npm install
```

3. Inicie a aplicação:

```sh
npm run dev
```

## Funcionalidades 🚀

#### Estudantes
- Agendamento de avaliação
- Re-agendamento de avaliações

#### Coordenador
- Consultar as avaliações agendadas com base no polo selecionado.

#### Adminstrador
- Gerenciamento de polos, horários de funcionamento, datas e horários disponíveis
- Gerenciamento de períodos, disciplinas, alunos, matrículas
- Visualização de agendamentos
