---
title: Lógica de Programação em pauta
description: Uma das primeiras aventuras que temos quando estamos iniciando no universo da programação é a famosa "Lógica de Programação"
date: '2016-12-14'
tags: beginners, computer-science, pt-br
lang: pt-BR
image: /static/img/posts/logica-programacao/img_logica.jpeg
original_post: https://medium.com/@thedon/l%C3%B3gica-de-programa%C3%A7%C3%A3o-em-pauta-ae4ea052a246
---

A jornada começa por aqui...

Quando entramos na faculdade de TI em geral, uma das primeiras matérias que vemos pela frente é **Lógica de Programação,** que na maioria das vezes é ensinada errada para os alunos, entretanto conforme o curso evolui os alunos começam a refinar algumas concepções que nessa matéria talvez tenham passado despercebidas.

Alguns desses problemas se dão ás ferramentas empregadas com a finalidade de ensinar a lógica em si. Fiz essa matéria 3 vezes, não por bombar nela, mas por trocar de cursos e acabei querendo fazer novamente para ter um novo _insight_ da mesma, sob diferentes óticas.

Uma destas foi no curso técnico da **ETEC Coronel Raphael Brandão** em Barretos, onde tive o primeiro contato de verdade com lógica de programação, não apenas vendo códigos em [PHP](https://pt.wikipedia.org/wiki/PHP) e tentando decifrar aquilo sem entender, as outras já foram no ensino superior, mas não citarei nomes nesse caso.

Let’s vamos aos principais problemas na minha visão:

### Ferramentas

Irei fazer um comparativo das 3 vezes que cursei o Lógica de Programação e uma quarta da qual eu acredito ser mais prática e eficaz.

Acredito que uma das premissas de usar as ferramentas listadas abaixo para o ensino da lógica de programação seja que o estudante já tenha familiaridade com uma dessas ferramentas utilizadas no mercado e ser um bom inicio para a carreira do mesmo.

### #1 Lógica de Programação com Java

[Java](https://pt.wikipedia.org/wiki/Java_%28linguagem_de_programa%C3%A7%C3%A3o%29) é uma das linguagens mais utilizadas no mundo, além de ser a linguagem de programação utilizada para o desenvolvimento de aplicativos Android.

Entretanto, para quem já teve contato com a mesma, sabe que ela é deveras muito verbosa para coisas realmente simples, como um simples exemplo de _Hello World._ Veja no exemplo abaixo:

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

Para uma pessoa que nunca teve contato com nenhuma linguagem de programação, ver tanta coisa para simplesmente imprimir _Hello, World!_ em uma telinha preta, pode parecer algo de outro mundo.

Mas, o grande ponto nem é esse, eu deveria estar aprendendo lógica, não Java, e em muitas vezes os professores simplesmente pedem para você ignorar todo o resto do código e focar apenas no meio do mesmo que é onde você realmente escreve ou te dá uma explicação minima e rápida só para você ficar quieto e focar na lógica, ignorando todo o resto a volta do seu código.

O que mexe um pouco com a nossa natureza, pois simplesmente ignorar parte importante do código ali, pode nos tornar um pouco preguiçosos com algo que não devíamos fazer. Temos que entender o que está se passando no nosso código, não dá para simplesmente ignorar isso.

O que nos leva ao nosso segundo exemplo.

### #2 Lógica de Programação com C/C++

[C/C++](https://pt.wikipedia.org/wiki/C%2B%2B) é praticamente a mãe de muitas linguagens, foi uma das primeiras linguagens criadas para uso “doméstico” se posso usar esse termo. A linguagem em si, dá praticamente super poderes para seu usuário, pois ele tem a possibilidade de escrever também códigos de mais baixo nível, entretanto a responsabilidade de cuidar da memória também passa para o programador.

No final é uma linguagem um pouco menos verbosa que o Java, entretanto temos algumas peculiaridades da linguagem que não necessariamente precisa entrar como lógica de programação, mas acabamos vendo, pois é uma característica importante da linguagem.

```cpp
#include <stdio.h>

int main (int argc, char** argv) {
 printf(“Hello World!\n”);
 return (0);
}

```

Novamente, temos diversos elementos que “Nós não precisamos saber o que significam agora”.

Se não precisamos saber para o que servem essas partes do código agora, não seria melhor achar alguma linguagem de mercado que pudêssemos simplesmente usar sem ter que carregar códigos que não precisamos conhecer ou usar uma estrutura sem saber realmente a necessidade?

### #3 Lógica de Programação usando Papel e Caneta

Para ser bem sincero essa é uma das que menos me frustra, claro hoje em dia. Na época que eu estava iniciando, em meados de 2010, o que eu mais queria era passar mais tempo no computador e o máximo que eu pudesse escrever e compilar diretamente nele seria o ideal.

Entretanto, para cunho de aprendizado, quando escrevemos nossos algoritmos, aplicamos testes de mesa e estamos treinando nossa lógica, tem seu ganho escrever diretamente no papel usando, talvez até Português Estruturado. (Não vá querer escrever em Java no papel, pois suas mãos não merecem isso e no papel não tem _ctrl + space_)

Por um lado isso é bom, mas se pensarmos que o retorno do que escrevemos é um pouco demorado, principalmente nas primeiras iterações, pois temos que fazer sempre o teste de mesa para garantir que a lógica aplicada está correta.

Com o tempo, isso melhora e conseguimos até prever erros apenas olhando o código sem rodar o mesmo, mas isso leva tempo e experiência.

### #4 Lógica de Programação com linguagens interpretadas

Quando utilizamos linguagens como **C/C++** ou **Java** precisamos Linkeditar/Compilar nosso código para algo que o computador entenda. E isso tem que entrar no seu ciclo de desenvolvimento, além de ter códigos que você não entende, ainda tem que executar uns comandos lá na telinha preta também.

Quando usamos uma linguagem interpretada, normalmente essas linguagens trazem consigo uma ferramenta chamada **REPL**(**R**ead **E**val **P**rint **L**oop), que basicamente é um terminal iterativo da linguagem em si, onde os comandos normalmente são separados por linhas e você consegue executar um código na linguagem e ter um retorno instantâneo, seja a sua resposta ou um erro.

Além disso, você consegue também escrever seu código, chamar o interpretador apontando para seu arquivo e o conteúdo será executado.

Tendo isso em vista, temos 2 candidatos fortíssimos para esse páreo. **[Python](https://pt.wikipedia.org/wiki/Python)** e **[Ruby](https://pt.wikipedia.org/wiki/Python).** Antes de mais nada, como é um _Hello World_ nessas duas linguagens?

**Ruby**

```ruby
puts 'Hello, world!'
```

**Python**

```python
print “Hello, World!”
```

Perceba que você não tem nenhum cabeçalho especifico ou nada do gênero para conseguir rodar o seu programa de exemplo, imprimindo na sua tela o texto _Hello, world!_.

### KISS — Keep It Simple Stupid

O importante é aprendermos lógica e o ideal é manter o mais simples possível, não existe um motivo para usar uma ferramenta que adiciona uma complexidade desnecessária ao conjunto da obra.

Em computação, você deve ouvir muito o termo _[KISS](https://pt.wikipedia.org/wiki/Keep_It_Simple)_ e é algo que deveríamos passar logo inicio para os ingressantes na área. Me lembro que meus amigos e até eu mesmo, na época que cursamos o técnico em informática, a matéria de Java era uma das mais temidas, por conta da curva de aprendizado inicial alta.

O foco deve ser sempre no objetivo(frase feita). Ensinar Java, C/C++ ou outra linguagem que demanda um pouco mais de entendimento é o foco nas aulas de lógica de programação? Se sim, continuem, mas se o foco realmente for ensinar a lógica, devemos quebrar um pouco o pensamento arcaico e voltarmos ao princípio e usar a maneira mais simples e eficiente.

### Melhorias Continuas

A área da computação, independente de onde você atue, é sempre muito iterativa e você deve sempre buscar melhorar a cada ciclo de sua aprendizagem.

Uma das sugestões do livro _[O Programador Pragmático](https://www.amazon.com/Pragmatic-Programmer-Journeyman-Master/dp/020161622X/ref=sr_1_1)_ é que devemos tentar aprender uma linguagem por ano, seja uma que o mercado demande ou uma para aprender algo novo também. Aliás, é um ótimo livro que recomendo para todos, ingressantes ou já atuantes na área.

Nesse processo de melhoria continua, recomendo que você também aprenda Java, C/C++, [JavaScript](https://pt.wikipedia.org/wiki/JavaScript), [Elixir](https://pt.wikipedia.org/wiki/Elixir_%28linguagem_de_programa%C3%A7%C3%A3o%29), [Haskell](https://pt.wikipedia.org/wiki/Haskell_%28linguagem_de_programa%C3%A7%C3%A3o%29), [Rust](https://pt.wikipedia.org/wiki/Rust_%28linguagem_de_programa%C3%A7%C3%A3o%29), entre outras linguagens que temos a nossa disposição, pois cada uma delas com toda certeza irá lhe beneficiar de alguma maneira, seja talvez apenas uma maneira nova de codificar.

Por fim, o mais importante é termos a lógica afiada, pois ela é a base do conhecimento, a linguagem em si é apenas um ferramenta para moldar sua lógica em código de máquina.
