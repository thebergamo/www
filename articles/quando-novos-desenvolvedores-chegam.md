---
title: Quando novos desenvolvedores chegam
description: Neste post dedico a algumas opniões que eu particularmente gostaria de receber quando começar em um novo emprego
date: '2016-02-10'
tags: development, engineering, opinion, pt-br
lang: pt-BR
image: /static/img/posts/novos-devs/cover.jpeg
original_post: https://medium.com/@thedon/quando-novos-desenvolvedores-chegam-b38c0ddd6ae0
---

### Antes de começar…

No último [post](/blog/precisamos-falar-sobre-os-novos-desevolvedores), falei um pouco sobre algo que estava me incomodando há algum tempo, e vi não era apenas comigo que a situação da falta de meios para que o novo membro da equipe se sinta em casa e tenha como começar a trabalhar sem tomar tanto tempo da equipe com perguntas básicas sobre o que ele está fazendo ali.

Alguns pediram para que eu comentasse algumas sugestões, sobre como melhorar isso, então decidi que talvez fosse interessante falar desse assunto. Entretanto, gostaria de frisar que todo o conteúdo apresentado abaixo é apenas minha opinião e como eu gostaria de ser recebido em uma nova empresa.

### A jornada começa já na entrevista…

Quando estamos na entrevista de emprego, muita coisa é dita sobre o produto que iremos trabalhar em si ou pelo menos o básico para que alguém de fora possa saber. Após esse primeiro contato maquinamos em nossos cérebros como a coisa deve funcionar como um todo.

Após o processo de contratação você está dentro da empresa e como é de se esperar, você deve produzir. (Não quero tratar de casos extremos, como quando não existe uma ferramenta de versionamento de código, mas infelizmente existem casos assim.)

No mundo ideal, um tempo será destinado a sua adaptação, dependendo do quão complexo é sua empresa, ramo ou a ferramenta em si, isso pode variar de 15 á 30 dias, em alguns casos talvez mais do que isso, mas vale uma auto-avaliação dos gestores.

### Estar interessado no business é tão importante quanto no código…

Considerando o mundo ideal, a empresa na qual você está ingressando tem algum documento que explique no que realmente você está trabalhando. Normalmente o pessoal do comercial tem o melhor material para isso, pois eles tem que explicar para leigos o que a empresa entrega.

Esse primeiro contato, talvez seja uma responsabilidade do novo contratado buscar entender mais no que vai trabalhar, mas não custa nada quebrar esse galho no primeiro dia para ele (temos muitos desenvolvedores um pouco tímidos).

Uma vez com as informações básicas sobre o que você vai fazer, é interessante entender melhor sobre isso. O **business** importa! E nesse caso, entender um pouco do business vai mostrar no futuro o por que algumas das soluções foram executadas de determinado jeito. Não é necessário nesse momento entender todos os pontos e virgulas de como o business foi dado, mas conhecer um pouco irá ajudar.

Algumas formas de se resolver isso seria uma apresentação de 20 minutos sobre a empresa e o produto por algum Líder Técnico para o novato, ou pelo menos uma apresentação de Slides sobre o produto como um todo.

### É hora de botar os OLHOS no código…

Se você é o novo desenvolvedor, deve estar cansado de tanto business e business vindo em cima de você, e está na hora de pegar um café e olhar o código um pouco.

Acho que nesse ponto, a maioria das empresas pecam. Pois mesmo que o produto tenha uma documentação linda para os desenvolvedores integrarem na sua ferramenta, a documentação interna de como as coisas funcionam ficam a desejar.

Quando olhamos para projetos open-source notamos que a primeira coisa que vamos ler é o "**Getting Started**" ou em português: **Começando.**

Ter uma seção de "**Começando**" no nosso repositório seria algo realmente fantástico, pois como disse antes, isso com toda certeza vai evitar diversas perguntas banais.

Nessa seção, pode ter coisas simples, imagine uma receita de bolo para iniciar sua aplicação:

- Clone esse repositório
- Faça download das dependências: MongoDB, Node.js, Redis…
- Crie um arquivo `.env`na raiz do projeto com as seguintes opções: `DB_URL`, `SERVER_HOST`, `SERVER_PORT`.
- Rode o comando: `npm install` para instalar as dependências.
- Rode o comando: `npm start` para iniciar a aplicação.
- Para testar: `npm test`.

Claro que pode conter muito mais detalhes específicos do que apenas o que eu disse, mas algo assim já seria um grande começo.

Gostaria muito de encontrar uma charge, onde mostrava como são nossos repositórios privados e públicos, onde os públicos eram sempre organizados, bonitos e seguiam os melhores padrões, já os privados, bom vocês sabem tão bem quanto eu como são nossos repositórios privados.

### Conhecer as regras da casa pode ajudar, ou ajudar a cria-las…

Uma vez que tenhamos essa seção de iniciando direto no `README.md`, podemos começar uma Wiki com algumas informações básicas como: Guia de Estilos(Style Guide), Como o projeto é estruturado, Convenções e um mapa do banco de dados.

Se você usa um banco de dados relacional, um MER (Modelo Entidade-Relacionamento) ou DER (Diagrama Entidade-Relacionamento) já resolvem seu problema, se não algo parecido com isso seria interessante para entender melhor como foi modelado seu banco de dados.

Como o projeto é estruturado é algo que eu pelo menos acredito ser algo realmente importante, navegar diretório por diretório e abrir pelo menos um arquivo para ver o que ele faz ou o que tem dentro do diretório é algo realmente maçante. Saber como foi convencionado as estruturas ajuda a evitar esse tempo perdido navegando.

Guia de Estilo e Convenções, esses dois pontos são os mais importantes, sem sombra de dúvidas, um bom código escrito em equipe tem que ser um código, onde não se percebe que foi escrito por mais de uma pessoa. Um acordo mútuo entre os desenvolvedores para criar padrões ajuda muito na hora de se ler um código.

Exemplos práticos disso são como muitos escrevem os IFs, o posicionamento das Chaves, nomenclatura de variáveis e por ai vai, estes são exemplos simples, mas podem se tornar um pouco mais chatos se entrarmos em peculiaridades das linguagens como por exemplo JavaScript. Imagine um projeto onde 1/3 é escrito com Callbacks, 1/3 escrito com Promises e 1/3 escrito com algo que o próprio desenvolvedor criou.

Não vou entrar em muitos detalhes sobre isso, principalmente por que pode gerar muitas criticas em relação a coisas que não estão relacionadas ao assunto geral.

Entretanto, ter um acordo comum sobre tudo isso, faz com que o código seja mais consistente e quando o desenvolvedor ver que estas regras estão sendo aplicadas, ele não vai se sentir um estranho no ninho, por que não existe um código mais certo que o outro, pois tudo tem o mesmo padrão.

Ferramentas como Github e Bitbucket, tem Wikis já embutidas, assim fica mais fácil manter, revisar e sempre ter atualizado tudo isso. É um trabalho maçante também manter tudo isso, mas tem que ser feito, pense que um dia pode ser você entrando na empresa e não encontrar tudo uma verdadeira zona e você perdido no meio disso tudo.

Um ultimo ponto desse assunto, é que mesmo que muitos dos desenvolvedores, me incluindo odeiam a dita **UML** (Unified Modeling Language), entretanto alguns desses diagramas podem ser úteis, como alguns que mostram os fluxos da aplicação e um pouco de como tudo se organiza.

Não tenha medo de aproveitar algo daquelas aulas chatas sobre UML na faculdade, podem ajudar muito no entendimento na aplicação para os novos membros da equipe.

Bom, sobre documentação direto no código… é um assunto que sou um pouco xiita, pois sou contra essa política, pois o código fica poluído com tanta informação, comentários no código, é OK e considero uma boa prática, mas a documentação em si para ferramentas que automatizam a geração do mesmo, sou contra, mas é algo meu. (Alguns podem concordar e outros não)

### Agora é com vocês!

Acredito que meus 10 centavos de contribuição sobre esse assunto foram dados.

Pense sempre que investir algum tempo preparando o terreno para o plantil pode gerar ótimos frutos na colheita, principalmente se for para colher desenvolvedores prontos para escrever códigos em produção mais rápido.

Se você é desenvolvedor, é de suma importância também que você queira melhorar sua vida e a dos futuros coleguinhas de trabalho, procure sempre documentar seus processos para não esquecer e para que o próximo possa fazer também, além de querer conhecer mais sobre a empresa e produto que está trabalhando, o mundo precisa de desenvolvedores pensando não máquinas.
