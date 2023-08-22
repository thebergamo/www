---
title: Don't break my Pipe without telling me!
description: Trabalhar com Child Processes no Node.js não é uma tarefa simples, nesse post conto um pouco sobre uma issue que me deixou de cabelos brancos
date: '2015-03-06'
tags: development, engineering, nodejs, pt-br
lang: pt-BR
image: /static/img/posts/break-pipe/cover.jpeg
original_post: https://medium.com/@thedon/brasil-c62f5d48d15c
---

## The Background

No dia de Ontem, descobri uma artimanha bem interessante do _Node.js_, meu aplicativo em produção começou a ficar parado sem motivo ou razão para mim. Chegava em certa parte do _Log_ ele simplesmente parava de funcionar e a partir dai nem com reza brava eu conseguia pegar o problema real da coisa.

Conforme eu incluía mais _logs_ no sistema menos informações apareciam, cheguei a cogitar com a equipe vários possíveis problemas, minha lógica errada, um componente que podia estar com algum _bug_, na real foram algumas horas até conseguir, como diriam meus avós: “Pegar o fio da meada”.

## The Problem

Acontece que grandes quantidades de _log_ ao usar _Child Process_ do _Node.js_ são um pequeno problema. Na verdade no meu caso acabou sendo um grande problema!

Eu usava o método _Spawn_ da _api Child Process_, até então nos meus testes em desenvolvimento, nunca tive qualquer problema com isso. Meu aplicativo que pega um _script_(leia aqui como roteiro, não script de códigos) em _Json_ e executa algumas funções a partir desse _script_, mas como programador só sabe fazer testes viciados, nunca fiz um script tão grande que pudesse quebrar o _pipe_ entre a aplicação pai e seu processo filho.

Mas até ai, tudo bem, encheu o _buffer_, não consegue liberar a memoria o processo fica parado, mas o _Node_ vai me retornar algo pra avisar!

## #SQN

A dor de cabeça foi maior pelo fato do _Node.js_ não me retornar nenhum tipo de _log_ quando esse tipo de situação acontece.

Dando uma olhada no código fonte do _Node.js_ e baseado em nesta _[issue#6764](https://github.com/joyent/node/issues/6764)_ dá pra ter uma ideia de que mais ou menos quando seu _buffer_ fica com +/- 24kb ele vai simplesmente parar de responder o processo Pai e não gerar nenhuma _exception_, erro, _exit_ ou qualquer coisa do tipo!

E isso galera, é #foda! mas é #MTOFODA! por que eu realmente não sei o que está acontecendo com a minha aplicação, não tenho nenhum mecanismo pra saber o que aconteceu.

Mas é claro que isso fica muito bem documentado na _API_ de _Child Process_ né não? #SQN!

## The answer

Baseado em um post no _StackOverflow_(eu perdi o link, mas sei a solução abordada lá, quando eu encontrar posto aqui =D ) lá é sugerido que redirecionemos o nosso _output_ vindo do processo filho pro processo pai.

Por que isso? Minha teoria é simples, conforme você está soltando os logs do seu processo filho e jogando para o pai, esse processo não vai encher o seu buffer de execução com seus logs, pois eles estaram sendo redirecionados para outro lugar. Na resposta essa foi a solução:

Eu particularmente, penso que seja mais pratico, mandar o output ou o erro caso, percebam que eu disse CASO, não vá usar essas informações como é o meu caso, você pode mandar todo o log desse pipe pro buraco negro do Linux. “/dev/null” #ftw

Assim você não vai estourar seu _buffer_!

Espero que isso seja útil para que algumas pessoas não sofram como eu para achar o problema :/

Valeu e até a próxima!
