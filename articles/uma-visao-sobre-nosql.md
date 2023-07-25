---
title: Uma visão sobre NoSQL
description: Quando ouvi pela primeira vez o termo NoSQL, imaginei logo “Não SQL??” e os questionamentos vieram tão rápido quanto esse pensamento “Como assim não usar SQL não faz sentido algum isso”, “Não é possível usar um Banco de Dados não relacional” entre outros. Está foi a minha visão sobre o tema. Este blog post foi originalmente postado no meu antigo blog que não está mais disponível na internet em 2014. Muita coisa mudou desde então..
date: '2014-07-12'
tags: nosql, opinion, pt-br
lang: pt-BR
image: /static/img/posts/visao-no-sql/cover.jpeg
image-alt: Girl looking for two paths in a cornfield
original_post: https://medium.com/@thedon/uma-vis%C3%A3o-sobre-nosql-8ad02626fb6a
---

Quando ouvi pela primeira vez o termo NoSQL, imaginei logo “Não SQL??” e os questionamentos vieram tão rápido quanto esse pensamento: “Como assim não usar SQL não faz sentido algum isso”, “Não é possível usar um Banco de Dados não relacional” entre outros.

Só que para a minha surpresa alguns meses depois fui conhecendo melhor a tecnologia abordada pelos NoSQL da vida e eles são bem interessantes, mais até do que eu imaginava que pudessem ser.Não sou especialista nessa tecnologia ainda, estou engatinhando nela, entretanto andei lendo alguns artigos e fiquei meio abismado com a modelagem proposta por alguns deles o que me deixou um pouco confuso.

Modelar um banco relacional é algo tão natural hoje que você modela bancos almoçando ou comendo cereal pela manhã. Mas modelar um banco não relacional é algo totalmente diferente pelo menos para mim, ainda fico um pouco com medo de modelar algo assim. Um dos motivos desse “medo” é a aplicação acabar ficando de certa forma inconsistente.

Pode ser que esse seja um pensamento idiota, mas faz algum sentido se parar para pensar que alguns dos NoSQL(como o que eu estou tendo mais contato o MongoDB usarei ele como exemplo) não temos um schema pré definido é o famoso schemaless.

Em algum momento eu posso tentar chamar um determinado dado que só tem em um documento da minha coleção por exemplo. Já te assustei? Eu sabia que não rsrs. No caso o MongoDB oferece alguns recursos para que isso se resolva e você consiga ter dados consistentes nas suas coleções. Não sabe o que é um documento ou uma coleção ??

Certo, fazendo referencia aos Bancos Relacionais, no MongoDB temos as Coleções que são como as Tabelas e os Documentos que são como os registros, basicamente assim. Os registros são armazenados em “documentos” vários documentos se tornam uma coleção e com varias coleções de documentos temos nosso banco =)

Meu Objetivo aqui é apenas demostrar alguns pontos que acho relevantes na abordagem NoSQL, se você leu até aqui e espera que tenham códigos de exemplo abaixo, tenho que lhe informar que não teremos códigos aqui apenas texto corrido sobre minha percepção sobre NoSQL com ênfase no MongoDB. Voltando…Já sabendo o que é uma Coleção e um Documento e sabendo que você não precisa ter toda uma estrutura montada antes de começar a sair codificando ou como gosto de falar “codando”, como eu posso modelar meus dados nesse novo paradigma?

Nos últimos meses passei boa parte do meu tempo pensando em como eu poderia solucionar isso e a solução ainda é confusa pelo menos para mim, caso vocês leitores tenham alguma experiencia com isso mesmo minima peço por gentileza que mandem opiniões de como vocês vem abordando isso.

Mesmo sem saber exatamente como modelar um banco NoSQL algumas coisas vem a minha mente como o que não fazer. Como havia mencionado mais acima vi algumas abordagens onde os autores faziam referencias a outras coleções, sim traduzindo para o nosso mundo SQL eles estavam normalizando o banco NoSQL deles usando as mesmas técnicas que nós usamos no SQL de hoje.

Pelo menos até onde eu entendi a proposta do NoSQL é matar os relacionamentos entre tabelas(no caso coleções) pois foge da proposta do paradigma. Posso estar errado ao pensar assim, mas estamos voltando aos velhos hábitos da modelagem relacional quando fazemos isso não que seja ruim fazer isso, pois funciona bem essa técnica, mas ela tem que ser usada em bancos relacionais pois eles foram feitos para isso.

A partir do momento em que você começa a criar relacionamento entre tabelas em um banco NoSQL você perde totalmente a ideia do paradigma. Pensando por outro lado quando você isso você tem toda a velocidade do MongoDB em uma modelagem que você já usava antes é talvez um MySQL 3.0 (rsrs).

Não defendo essa ideia! A proposta do NoSQL é não depender de relacionamentos, precisa guardar informações de outros dados guarde dentro do seu documento.Pelo menos foi isso que eu entendi, você não tem os velhos problemas de armazenamento que tinhamos há 10 ou 15 anos atrás ou o processamento. Você tem bons processadores e uma Engine fantástica no MongoDB use-a, não tenha medo de ficar replicando dados. A grande pergunta ai para que isso fique bem modelado é: O que pertence ao que?

> – Aqui começa o como modelar um NoSQL(MongoDB) –

Segundo minha concepção do NoSQL, antes de qualquer coisa código tenha em mente as entidades que você vai usar, exceto em casos nos quais você está começando agora e não está enraizado nos moldes da Modelagem Relacional você vai primeiro vai pensar na sua solução como relacional.

Se você conseguir modelar um Modelo de Entidade-Relacionamentos(M-ER) você já consegue responder a pergunta “O que pertence ao que?”. Entretanto nem sempre o que pertence ao que no modelo relacional funciona para suas coleções, entretanto você pelo menos vai ter uma ideia de por onde começar. Veja o exemplo a seguir:

No meu blog, digamos que eu resolva parar de preguiça e fazer ele inteiro na mão ao invés de usar wordpress a estrutura do meu Banco caso relacional seria algo assim:

```jsx
User: ID, NAME, USERNAME, PASSWORD
Post: ID, TITLE, CONTENT, SLUG, PUBDATE, ID_USER
Comments: ID, EMAIL, NAME, TEXT, LINK_PHOTO, ID_POST
```

Um Blog básico precisa de pelo menos isso, um Usuário, Postagens e Comentários. Um Usuário realiza uma postagem e uma postagem pode receber vários comentários.Modelando NoSQL você pode pensar de duas formas, uma delas seria você pensar que o Usuário é sua coleção principal e dentro dos seus documentos você vai ter coleções de postagens e dentro de cada documento de postagens você terá uma coleção de comentários.

```json
{
  "_id": "mkdarkness",
  "name": "Marcos",
  "username": "mkdarkness",
  "password": "876tgfde3tyujhgfe43wes",
  "posts": {
    "_id": "go-rountines",
    "title": "Go Routines",
    "content": "Aqui vai o texto da postagem",
    "slug": "go-routines",
    "pubdate": "2014–05–22 10:11:00",
    "comments": [
      {
        "_id": "marcos@thedon.com.br",
        "email": "marcos@thedon.com.br",
        "name": "Marcos",
        "text": "Cara essa postagem é muito boa!",
        "link_photo": "http:cdn.gravatar.com/marcos.jpg",
        "pubdate": "2014–05–23 15:00:00"
      },
      {
        "_id": "marcos2@thedon.com.br",
        "email": "marcos@thedon.com.br",
        "name": "Marcos",
        "text": "Não me canso de ler e comentar!!",
        "link_photo": "http:cdn.gravatar.com/marcos.jpg",
        "pubdate": "2014–05–23 20:00:00"
      }
    ]
  }
}
```

Temos ai nosso começo de banco já modelado ao estilo NoSQL. Uma outra abordagem que eu consigo imaginar é ao invés de estar dentro de usuário poderiamos modelar esse banco em cima da ideia da postagem ser a coleção maior. Nesse caso ainda teriamos que manter a coleção de usuários para autenticações de login, entretanto no caso de usar somente as postagens você pode ter uma coleção de “autores” dentro da postagem onde você apenas irá utilizar as informações do nome ou username do autor ou no caso simplesmente ter uma propriedade “autor” e colocar o nome do usuário que postou ali.

Ficaria assim:

```json
{
  "_id": "go-rountines",
  "title": "Go Routines",
  "content": "Aqui vai o texto da postagem",
  "slug": "go-routines",
  "pubdate": "2014–05–22 10:11:00",
  "comments": [
    {
      "_id": "marcos@thedon.com.br",
      "email": "marcos@thedon.com.br",
      "name": "Marcos",
      "text": "Cara essa postagem é muito boa!",
      "link_photo": "http:cdn.gravatar.com/marcos.jpg",
      "pubdate": "2014–05–23 15:00:00"
    },
    {
      "_id": "marcos2@thedon.com.br",
      "email": "marcos@thedon.com.br",
      "name": "Marcos",
      "text": "Não me canso de ler e comentar!!",
      "link_photo": "http:cdn.gravatar.com/marcos.jpg",
      "pubdate": "2014–05–23 20:00:00"
    }
  ]
}
```

Por que simplesmente não criar uma referencia ali do usuário nessa última coleção ou simplesmente não ter documentos a parte para conter as postagens e só ter uma referencia no documento do usuário ou melhor ainda ter uma coleção só para referencias.

Existem diversas abordagens para esse problema. Todas com vantagens e desvantagens, mas não é o jeito NoSQL de ser. Se for para modelar assim por favor use um MySQL ou PostgreSQL que vai dar na mesma pois nesse caso a velocidade não seria relevante para o carregamento do seu blog.

Se você escolheu um NoSQL modele um NoSQL. Acabei deixando muitas opiniões minhas nessa postagem, mas é para isso que eu fiz esse blog (rsrs).

Bom, irei falar mais sobre o assunto de NoSQL e MongoDB em outra oportunidade, por hoje meu objetivo foi alcançado.Caso de concordem com o que eu falei deixem um comentário dizendo por que concordam ou simplesmente falem oi =).

Caso discordem por favor deixem comentários também para que eu possa entender melhor esse mundo NoSQL ou rebater um pouco e gerarmos uma discussão saudável onde todos possam se beneficiar com as informações.

Quando ouvi pela primeira vez o termo NoSQL, imaginei logo “Não SQL??” e os questionamentos vieram tão rápido quanto esse pensamento: “Como assim não usar SQL não faz sentido algum isso”, “Não é possível usar um Banco de Dados não relacional” entre outros.

Está foi a minha visão sobre o tema. **Este blog post foi originalmente postado no meu antigo blog que não está mais disponível na internet em 2014. Muita coisa mudou desde então..**

Quando ouvi pela primeira vez o termo NoSQL, imaginei logo “Não SQL??” e os questionamentos vieram tão rápido quanto esse pensamento: “Como assim não usar SQL não faz sentido algum isso”, “Não é possível usar um Banco de Dados não relacional” entre outros.

Está foi a minha visão sobre o tema. **Este blog post foi originalmente postado no meu antigo blog que não está mais disponível na internet em 2014. Muita coisa mudou desde então..**
