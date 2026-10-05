---
version: alpha
name: Currículo Fácil
description: "Design system mobile-first, acessível, calmo e de baixa carga cognitiva para uma experiência guiada de criação de currículo."

colors:
  primary: "#175CD3"
  primary-hover: "#1849A9"
  primary-soft: "#EEF4FF"
  focus: "#84ADFF"

  canvas: "#F7F6F2"
  surface: "#FFFFFF"

  on-surface: "#1C1917"
  text-body: "#44403C"
  text-muted: "#68645E"
  text-subtle: "#8B867E"

  border: "#D9D6CF"
  border-strong: "#BEB9AF"

  error: "#B42318"
  error-soft: "#FEF3F2"

  success: "#067647"
  success-soft: "#ECFDF3"

  on-primary: "#FFFFFF"
  scrim: "rgba(28, 25, 23, 0.28)"

typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: -0.02em

  headline-md:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: -0.015em

  headline-sm:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: 600
    lineHeight: 1.25

  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.5

  body-md:
    fontFamily: Inter
    fontSize: 17px
    fontWeight: 400
    lineHeight: 1.45

  body-sm:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.45

  label-lg:
    fontFamily: Inter
    fontSize: 17px
    fontWeight: 600
    lineHeight: 1.25

  label-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.25

  label-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.35

  caption:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.4

  resume-name:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: 700
    lineHeight: 1.2

  resume-section:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: 0.02em

  resume-body:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.45

  resume-meta:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.4

rounded:
  none: 0px
  sm: 6px
  md: 10px
  lg: 12px
  xl: 20px
  sheet: 24px
  full: 9999px

spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px

  mobile-margin: 24px
  desktop-margin: 64px
  form-max-width: 640px
  desktop-max-width: 1280px
  desktop-gutter: 64px

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.md}"
    padding: 16px
    height: 56px

  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.md}"
    padding: 16px
    height: 56px

  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.md}"
    padding: 16px
    height: 56px

  button-tertiary:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.sm}"
    padding: 12px
    height: 48px

  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 16px
    height: 56px

  textarea:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 16px
    height: 112px

  choice:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 16px
    height: 56px

  choice-selected:
    backgroundColor: "{colors.primary-soft}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 16px
    height: 56px

  skill-chip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-body}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: 12px
    height: 48px

  skill-chip-selected:
    backgroundColor: "{colors.primary-soft}"
    textColor: "{colors.primary}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: 12px
    height: 48px

  preview-tray:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-md}"
    rounded: "{rounded.xl}"
    padding: 24px
    height: 72px

  preview-sheet:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sheet}"
    padding: 24px

  progress:
    backgroundColor: "{colors.primary}"
    rounded: "{rounded.full}"
    height: 4px

  resume-preview:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: 24px
---

# Currículo Fácil

## Overview

O Currículo Fácil deve transmitir simplicidade, clareza, confiança e autonomia.

A experiência é destinada a pessoas com idades e níveis de familiaridade digital variados. O design deve reduzir barreiras de uso sem infantilizar o usuário ou pressupor incapacidade.

A interface deve parecer simples antes mesmo de ser utilizada.

A direção visual combina:

- baixa densidade visual;
- bastante espaço em branco;
- superfícies claras;
- tipografia legível;
- controles familiares;
- hierarquia evidente;
- uma única cor de ação predominante.

A experiência deve evitar tanto a aparência de um sistema administrativo antigo quanto a de um SaaS excessivamente carregado.

Não usar dashboards, painéis, widgets ou cards como padrão visual quando texto, alinhamento e espaçamento forem suficientes.

A principal regra de composição é:

> Uma decisão principal por vez.

A pessoa deve conseguir identificar rapidamente:

1. onde está;
2. o que precisa fazer;
3. qual é a próxima ação.

A linguagem visual deve ser adulta, tranquila e profissional, sem parecer excessivamente formal.

Referências conceituais incluem a simplicidade editorial de Notion e Paper, a organização e sensação de superfície do Goodnotes e padrões de interação claros encontrados em serviços digitais como GOV.UK e NHS.

## Colors

A paleta deve permanecer pequena e funcional.

Cor não deve ser utilizada apenas para tornar a interface visualmente mais interessante. Cada cor deve possuir função clara.

### Canvas

`canvas` é o fundo principal da aplicação.

O tom `#F7F6F2` é um off-white levemente quente, utilizado para produzir uma experiência menos clínica que um fundo branco puro.

### Surface

`surface` representa elementos que precisam se destacar do canvas, como campos, documentos e superfícies sobrepostas.

Evitar criar múltiplas superfícies brancas aninhadas apenas para gerar separação visual.

### Texto

`on-surface` é reservado para texto principal e títulos.

`text-body` é utilizado no conteúdo corrente.

`text-muted` serve para informações secundárias, exemplos e textos de ajuda.

`text-subtle` só deve ser utilizado para conteúdo não essencial. Ele não deve ser utilizado para informações necessárias para entender ou concluir uma tarefa.

### Primary

`primary` é a principal cor interativa da aplicação.

Usar para:

- ação principal;
- links;
- progresso;
- seleção;
- estados ativos;
- foco quando apropriado.

Uma tela não deve apresentar várias áreas azuis competindo pela atenção.

O azul não é uma cor decorativa.

### Focus

Estados de foco precisam ser claramente perceptíveis.

Mudanças sutis apenas na cor da borda não são suficientes.

O foco deve possuir contraste claro em relação tanto ao componente quanto ao fundo.

### Error

`error` identifica problemas que exigem correção.

Nunca usar apenas vermelho para indicar erro.

A indicação visual deve ser acompanhada por texto explicando o problema.

### Success

`success` deve aparecer apenas quando uma ação realmente foi concluída com sucesso.

Não utilizar verde para mensagens neutras ou informativas.

### Contraste

Todo conteúdo necessário à operação da interface deve atender pelo menos ao nível AA da WCAG.

Sempre que possível, buscar contraste confortável acima do mínimo técnico.

## Typography

A aplicação utiliza Inter como única família tipográfica.

Uma única família mantém consistência visual e reduz ruído.

Os pesos principais são:

- 400 para leitura;
- 500 para informação secundária;
- 600 para títulos, labels e ações.

O peso 700 deve ser usado de forma pontual.

Evitar mais de dois pesos concorrentes dentro de uma mesma região visual.

### Títulos

Títulos devem explicar claramente a tarefa atual.

Preferir linguagem natural quando ela ajudar na compreensão.

Exemplo preferível:

> Que trabalho você procura?

em vez de:

> Objetivo profissional

Títulos devem ser curtos.

A interface não utiliza tipografia exageradamente grande ou características de landing pages de marketing.

### Corpo

O texto-base da interface utiliza 17px.

O tamanho é deliberadamente confortável para um público com ampla variação de idade e capacidade visual.

A entrelinha deve permanecer generosa.

Textos explicativos devem ser curtos e próximos do contexto em que são necessários.

### Labels

Todo campo possui label permanentemente visível.

Placeholder nunca substitui label.

Preferir:

**Nome completo**

`Ex.: Carlos da Silva`

e evitar campos cujo único identificador desapareça quando a pessoa começa a digitar.

### Microcopy

A linguagem deve ser:

- simples;
- direta;
- adulta;
- concreta;
- respeitosa.

Evitar jargões quando uma expressão cotidiana for mais clara.

Preferir:

> O que você fazia nesse trabalho?

em vez de:

> Descreva suas atribuições profissionais.

Exemplos devem esclarecer o formato esperado, não induzir respostas.

## Layout

O sistema segue uma abordagem mobile-first.

### Mobile

O fluxo principal utiliza uma única coluna.

A margem horizontal padrão é 24px.

O layout deve funcionar corretamente em larguras a partir de aproximadamente 320 CSS px sem exigir rolagem horizontal para o conteúdo principal.

Não tentar fazer todo o formulário caber na primeira dobra.

Rolagem vertical é esperada e preferível a:

- diminuir fontes;
- reduzir áreas de toque;
- comprimir espaçamento;
- aumentar densidade visual.

Cada tela deve possuir uma hierarquia simples:

1. contexto ou progresso;
2. título;
3. explicação curta quando necessária;
4. conteúdo principal;
5. ação principal;
6. acesso à prévia quando aplicável.

### Desktop

Em telas largas, a interface pode utilizar duas regiões principais:

- formulário;
- prévia.

O conteúdo deve permanecer centralizado, com largura máxima aproximada de 1280px.

O formulário deve manter largura confortável, normalmente entre 520px e 640px.

A prévia do documento não precisa de múltiplos containers ao redor dela. O próprio documento funciona como superfície visual.

### Spacing

O espaçamento segue principalmente múltiplos de 4px e 8px.

Relações comuns:

- 4px para microajustes;
- 8px entre elementos intimamente relacionados;
- 12px entre pequenos grupos;
- 16px entre elementos relacionados;
- 24px entre grupos;
- 32px entre seções;
- 48–64px entre regiões importantes.

Espaço vazio é um elemento deliberado de composição.

Não preencher espaços apenas para aumentar a densidade da tela.

### Progresso

O progresso deve ser simples.

Formato preferencial:

> Etapa 3 de 6

seguido por uma única barra horizontal.

Não utilizar steppers complexos, círculos numerados ou seis elementos visuais concorrentes em telas pequenas.

O texto continua sendo a principal fonte de significado; a barra complementa a informação.

## Elevation & Depth

A interface é predominantemente flat.

Hierarquia é produzida principalmente através de:

- cor de fundo;
- borda;
- espaçamento;
- tipografia;
- alinhamento;
- sobreposição funcional.

Sombras não são usadas como decoração padrão.

Evitar cards elevados simplesmente para criar sensação de modernidade.

### Tonal Layers

A principal separação visual ocorre entre o canvas quente e superfícies brancas.

Sempre preferir diferença tonal e espaçamento antes de adicionar uma sombra.

### Overlays

Elementos sobrepostos, como a prévia mobile expandida, podem utilizar:

- scrim discreto;
- borda;
- sombra muito suave quando necessária.

Não utilizar:

- glassmorphism;
- blur decorativo;
- superfícies translúcidas complexas;
- sombras pesadas.

## Shapes

A linguagem de formas é suave, mas contida.

Controles comuns usam raios entre 10px e 12px.

Isso oferece uma aparência amigável sem transformar toda a interface em elementos excessivamente arredondados.

### Inputs e botões

Inputs e botões principais utilizam normalmente raio de 10px.

Sua forma deve continuar imediatamente reconhecível como um controle convencional.

### Bottom sheet

Bottom sheets podem utilizar raio de aproximadamente 24px nos cantos superiores.

### Pills

Formas totalmente arredondadas devem ser reservadas para elementos que realmente funcionam como tags ou indicadores compactos.

Não utilizar pills como formato universal para botões e campos.

### Touch targets

Todo controle interativo importante deve possuir área de interação mínima de 48 × 48px.

Inputs e botões principais utilizam 56px de altura.

A área clicável pode ser maior que o elemento visual quando necessário.

## Components

### Guided Form

A experiência principal utiliza um formulário guiado dividido em etapas.

Cada etapa deve concentrar informações relacionadas entre si.

Evitar os dois extremos:

- uma pergunta isolada por tela sem necessidade;
- um formulário único e muito longo com todas as informações simultaneamente.

A próxima ação deve permanecer visualmente evidente.

O usuário deve poder voltar sem perder o que já preencheu.

### Progress Indicator

O componente utiliza:

- texto `Etapa X de Y`;
- barra fina de progresso.

O indicador deve permanecer discreto.

Seu objetivo é orientar, não dominar a tela.

### Buttons

#### Primary

Ação principal da tela.

Altura: 56px.

No mobile, normalmente ocupa toda a largura disponível.

Deve existir apenas uma ação visualmente dominante por contexto.

Preferir labels específicos:

- Continuar
- Revisar currículo
- Baixar currículo

Evitar labels vagos quando uma ação específica puder ser descrita.

#### Secondary

Usado para uma ação relevante, porém não principal.

Possui superfície clara, borda visível e menor peso visual.

#### Tertiary

Ações simples podem aparecer como botão textual ou link.

Sua área interativa continua respeitando o mínimo de 48px, mesmo quando o texto visual ocupa menos espaço.

### Input Fields

Inputs utilizam:

- altura de 56px;
- texto de 17px;
- label visível;
- borda claramente identificável;
- placeholder somente como exemplo;
- estado de foco evidente.

Campos relacionados devem ter espaçamento suficiente para não parecerem um único bloco.

Não utilizar floating labels.

### Text Areas

Text areas seguem o mesmo padrão dos inputs.

A altura inicial recomendada é 112px.

O componente deve permitir crescimento quando o conteúdo exigir.

### Helper Text

Textos auxiliares devem ser curtos e diretamente relacionados ao campo.

Exemplo:

> Pode ser o número que você usa no WhatsApp.

Informações necessárias para preencher um campo não devem depender de:

- hover;
- tooltip;
- ícone de ajuda;
- interação adicional.

### Validation and Error States

Erros não devem aparecer de maneira agressiva enquanto a pessoa ainda está digitando.

Quando um erro for exibido:

- preservar o valor informado;
- identificar visualmente o campo;
- mostrar uma mensagem específica;
- explicar como corrigir;
- não depender somente de cor.

Preferir:

> Digite um e-mail como nome@exemplo.com.

Evitar:

> Campo inválido.

O foco visual de erro deve continuar distinguível do estado de foco normal.

### Choice Controls

Para conjuntos pequenos de opções, preferir escolhas visíveis a dropdowns.

Radio buttons ou linhas de seleção podem ocupar toda a largura disponível.

Toda a linha deve ser interativa.

O estado selecionado deve utilizar mais de um indicador visual, como:

- radio marcado;
- mudança de borda;
- alteração tonal.

Não depender somente da cor.

### Skill Chips

Chips podem ajudar em seleções rápidas.

Altura mínima: 48px.

Devem possuir estado selecionado visualmente claro e não depender exclusivamente da cor.

Chips não substituem uma forma aberta de entrada quando uma resposta personalizada for válida.

Não transformar grandes quantidades de opções em uma nuvem visual difícil de escanear.

### Preview Tray

Em telas mobile, uma prévia pode permanecer acessível através de um tray junto à região inferior.

O estado fechado deve ser simples, por exemplo:

> Prévia do currículo  
> Arraste para cima ou toque

O tray possui um puxador visual.

O puxador deve possuir área interativa de pelo menos 48px mesmo quando sua representação visual for menor.

O gesto de arrastar é sempre opcional.

Tocar no tray ou no puxador deve oferecer a mesma função principal.

### Preview Bottom Sheet

Ao expandir a prévia, ela aparece como bottom sheet sobre o conteúdo.

O estado expandido deve possuir:

- puxador;
- título;
- ação textual clara para fechar;
- conteúdo da prévia;
- scrim discreto.

Deve ser possível fechar através de mais de um mecanismo, incluindo uma ação simples de toque.

A interação não pode depender exclusivamente de drag.

Quando utilizada com teclado ou tecnologia assistiva, o foco deve ser gerenciado de forma previsível.

Ao fechar, o foco retorna ao controle que abriu a superfície.

Animações devem ser curtas e funcionais.

Reduzir ou remover movimento quando `prefers-reduced-motion` estiver ativo.

### Resume Preview

A prévia deve se comportar visualmente como um documento, e não como outro painel da interface.

Utilizar:

- fundo branco;
- uma coluna;
- hierarquia tipográfica clara;
- alinhamento simples;
- espaçamento consistente;
- decoração mínima.

Evitar:

- barras de porcentagem;
- gráficos de habilidades;
- sidebars puramente decorativas;
- excesso de ícones;
- elementos que dificultem leitura;
- múltiplas colunas sem necessidade.

A aparência deve continuar boa em preto e branco.

### Resume Document

O documento final utiliza formato visual A4.

A hierarquia preferencial é simples:

- nome;
- contato;
- seções;
- conteúdo.

Se uma seção não possuir conteúdo, seu título também não deve aparecer.

A identidade visual da aplicação não precisa ser transferida integralmente para o documento.

O currículo deve parecer um documento profissional, e não uma captura de tela da aplicação.

### Empty and Optional States

Informações opcionais devem ser indicadas explicitamente com:

> opcional

Evitar excesso de asteriscos e legendas explicando campos obrigatórios.

Ausência de determinada informação não deve ser apresentada visualmente como erro quando aquela informação não for necessária.

### Accessibility States

A experiência visual deve continuar compreensível quando:

- cores não forem percebidas;
- o zoom for aumentado;
- a tela for estreita;
- o usuário navegar por teclado;
- animações forem reduzidas.

Ícones complementam texto, mas não substituem labels de ações críticas.

Foco deve permanecer visível em todos os controles interativos.

Nenhuma função essencial deve depender exclusivamente de:

- cor;
- hover;
- drag;
- gesto;
- posição visual.

## Do's and Don'ts

### Do

- Use uma única ação principal por contexto.
- Use espaço em branco como parte da hierarquia.
- Priorize leitura antes de densidade.
- Use controles convencionais e previsíveis.
- Use labels permanentes em campos.
- Use exemplos curtos e concretos.
- Mantenha texto principal confortável para leitura.
- Mantenha controles interativos com pelo menos 48px de área de toque.
- Use 56px para ações e campos principais.
- Preserve uma hierarquia visual calma.
- Mantenha o azul primário reservado principalmente para interação.
- Ofereça alternativa simples a qualquer gesto de arrastar.
- Mantenha erros próximos ao elemento que precisa ser corrigido.
- Preserve o conteúdo digitado durante correções.
- Permita rolagem vertical quando o conteúdo exigir.
- Considere diferentes idades e níveis de familiaridade digital sem infantilizar a interface.
- Trate a prévia do currículo como documento, não como dashboard.

### Don't

- Não transforme a interface em dashboard.
- Não coloque cada seção dentro de um card por padrão.
- Não aninhe cards dentro de cards.
- Não utilize sombra apenas para preencher a composição.
- Não use glassmorphism.
- Não use gradientes como identidade principal.
- Não use várias cores de destaque concorrentes.
- Não utilize azul apenas como decoração.
- Não reduza fontes ou controles apenas para evitar scroll.
- Não use placeholder como label.
- Não esconda informação necessária em tooltip.
- Não dependa de hover.
- Não dependa de drag.
- Não dependa exclusivamente de cor.
- Não use mensagens genéricas como “Campo inválido”.
- Não apresente múltiplas ações primárias simultaneamente.
- Não use ícones sem texto em ações importantes.
- Não use texto pequeno e de baixo contraste para informações necessárias.
- Não transforme todo controle em pill.
- Não infantilize linguagem ou aparência.
- Não sobrecarregue uma tela apenas porque existe espaço disponível.