# AGENTS.md

> **Project:** Currículo Fácil é uma aplicação web do APIExt IV que guia estudantes da EJA na criação de um currículo profissional, com uso prioritário em dispositivos móveis.
> **Core constraints:** O fluxo principal não exige login nem backend. Dados pessoais permanecem no navegador; a aplicação é uma PWA, deve continuar funcional offline após o primeiro carregamento e gera o currículo em PDF no próprio dispositivo.

## Technical Baseline

- Angular + TypeScript.
- Angular Signal Forms para formulários e estado de formulário.
- Angular Aria (`@angular/aria`) para padrões de interação acessíveis quando aplicável.
- Angular PWA / Service Worker para instalação e funcionamento offline.
- Persistência de dados exclusivamente no navegador.
- Geração de PDF exclusivamente no cliente. A biblioteca de PDF ainda não está definida.
- `DESIGN.md` é a fonte de verdade para UI, UX, responsividade, acessibilidade visual e content design.

## Judgment Boundaries

### NEVER

- Enviar ou armazenar dados pessoais do currículo em um servidor durante o fluxo normal da aplicação.
- Tornar login ou criação de conta necessários para criar e baixar um currículo.
- Substituir Angular Signal Forms por outra abordagem de formulários sem uma decisão explícita do projeto.
- Duplicar neste arquivo regras visuais ou de interação que pertencem ao `DESIGN.md`.

### ASK

- Antes de introduzir backend, autenticação, banco de dados, APIs externas ou qualquer fluxo que envie dados pessoais para fora do dispositivo.
- Antes de adicionar ou substituir uma dependência que altere a arquitetura principal do projeto.
- Antes de escolher e adicionar a biblioteca responsável pela geração de PDF.
- Antes de alterar os requisitos de funcionamento offline ou persistência local.

### ALWAYS

- Preservar a arquitetura local-first para os dados do currículo.
- Preservar o funcionamento essencial da aplicação sem conexão após o primeiro carregamento.
- Seguir o `DESIGN.md` ao criar ou alterar interfaces e interações.
- Considerar o público da EJA ao tomar decisões que afetem a complexidade do fluxo ou a facilidade de uso.