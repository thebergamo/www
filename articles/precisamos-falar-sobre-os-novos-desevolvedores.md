---
title: Precisamos falar sobre os novos desevolvedores!
description: Começar um emprego novo é sempre uma experiência cheia de aprendizados, gostaria de compartilhar o meu sentimento sobre essa nova vivência
date: '2016-02-10'
tags: development, engineering, opinion, pt-br
lang: pt-BR
image: /static/img/posts/novos-devs/cover1.jpeg
original_post: https://medium.com/@thedon/precisamos-falar-sobre-os-novos-desenvolvedores-11ae73af8424
---

<aside>
💡 Talvez seja apenas um sentimento meu, mas mesmo que seja acho que é um ponto válido a compartilhar.
</aside>

### Conhecendo a casa nova!

Quando entramos em uma empresa nova de desenvolvimento, seja uma startup, uma consultoria, uma software house ou até mesmo grandes corporações, algo que me deixa um pouco intrigado é a falta de documentação para novos desenvolvedores.

Ainda não trabalhei em uma grande corporação, mas reza a lenda que eles tem manuais para tudo até como sentar, e coisas do tipo, não sou de duvidar, burocracia a alma do negócio(em alguns casos).

Mas, a escassez desses manuais torna-se um problema também, uma vez que estamos construindo nosso sistema desde o começo é fácil pegar todas as partes, entender e juntar as mesmas, entretanto, quando o sistema já está no ar, funcionando com diversas regras de negócio complexas e afins é realmente algo bem complicado de se assimilar.

Quando a equipe cresce precisamos ter um mecanismo para que nossos desenvolvedores possam fazer o bootstrap da nossa aplicação da maneira mais simples e rápida para que eles consigam se encontrar no código e produzir algo útil.

### Falar é mais fácil do que entender o código

Como eu fiz o sistema, ou peguei ele desde o começo ou a versão 2.0 onde matamos tudo o que tinha na anterior é tudo muito claro na minha mente. Mesmo que usando as ferramentas mais comuns, cada sistema tem uma peculiaridade que deve constar em algum lugar de fácil acesso a ingressantes na empresa.

> "Existe um arquivo .env de exemplo para que eu possa usar para iniciar o sistema aqui?""Não, nunca pensamos que alguém ia perguntar isso!"

Mesmo que seu sistema use o framework mais usado no mundo, tenho 100% de certeza que ele vai ter alguma peculiaridade única que pode influenciar o bootstrap do mesmo. A não ser que o seu sistema seja apenas um CRUD de exemplo do framework, ai realmente não é preciso documentar nada, apenas indicar a página da documentação do seu framework.

Entretanto, para os outros casos (maioria acredito) ter um README no repositório do código com os primeiros passos para rodar seu sistema, evitaria 90% das perguntas básicas de quando baixamos pela primeira vez o sistema.

```
git clonegit@github.com:thebergamo/start-hapiness.git
```

> "Como eu faço para rodar o projeto? Rodo esse arquivo main? Tem que baixar alguma coisa além do <nome do interpretador/compilador da sua lang>?"

> "Tem que instalar qual banco de dados? Tem usuário padrão setado no código?"

### Business é importante também!

Certo, deixando o código um pouco de lado, vamos falar um pouco sobre o que estamos desenvolvendo também, não apenas o código em si.

Na minha opinião, saber o que estamos desenvolvendo ou por que estamos desenvolvendo e para onde estamos indo ajuda na hora de resolver os problemas que podem ser ocasionados em código.

Entender o produto é algo importante para o desenvolvimento, isso eu aprendi no meu curto período na Pagar.me, não podemos simplesmente sentar o traseiro na cadeira e escrever códigos com um cabresto.

Devemos saber onde estamos trabalhando, o que estamos fazendo para fazer sempre o melhor.

Sabendo o que a feature xpto1 representa no contexto geral da aplicação, dos negócios, por que ela é importante pode mudar completamente como a mesma vai ser implementada, pois "construir uma função que receba um número e devolver outro número derivado" é algo muito abstrato.

Mas, quando sabemos que essa função vai ser parte de uma outra função que vai retornar as _estatísticas de acessos do usuário_ ou algo que seja realmente importante pro futuro, pode dar uma brecha para fazermos uma função genérica que possa ser estendida no futuro já que uma nova função talvez fosse gerada para suprir uma outra necessidade, mas como você sabia que essa necessidade viria, tornou sua função mais extensível para já estar preparada para o que viria no futuro.

### Precisamos ter em vista futuros colegas chegando!

O que quero dizer é que você como desenvolvedor que está iniciando um projeto na sua nova empresa deve ter sempre em mente que sua equipe pode crescer da noite pro dia, dependendo do sucesso da sua empresa, sendo assim você vai tem que estar preparado para não desperdiçar 1 ou 2 meses treinando o novo funcionário em coisas banais do seu sistema, pois poderia investir algum tempo a mais e documentar os processos e as regras de negócios que sua API deveria contemplar, ou pelo menos um resumo.

> "A documentação é meu código, se o cara não entender o que está escrito ali, ele não deve mexer"

E você desenvolvedor que está ingressando na empresa também deveria estar mais preocupado em entender mais sobre o que está fazendo, não apenas sentar e ouvir as ordens e simplesmente fazer.

### Entenda, Pense e Faça!

Pois em algum momento, desenvolvedores que simplesmente escrevem o código sem saber para que estão escrevendo serão substituídos por máquinas, pois podem ser automatizados.

> "Quero alguém que pense, não um robô, escrever código é fácil, desenvolver sistemas é que é complicado"

Somos todos responsáveis por fazer nosso local de trabalho um lugar melhor para nós e para nossos atuais e futuros colegas de trabalho. Gastar um pouco de tempo a mais documentando da maneira mais simples possível um processo pode causar uma economia absurda de tempo quando temos um novo colega para mostrar a casa.

Sempre tenham como espelhos os projetos OpenSource e mantenha a casa bem arrumada, para que quando novos contribuidores apareçam eles se sintam bem acomodados, não no meio de uma zona de guerra!

Obrigado =D
