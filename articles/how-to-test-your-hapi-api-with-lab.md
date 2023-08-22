---
title: How to test your Hapi API with Lab
description: Started a mad API but, when the next step is wanted I got a problem. How is the better approach to testing my API? Mocha? Jasmine? Wows?
date: '2015-12-07'
tags: development, en-us, hapijs, nodejs
lang: en-US
image: /static/img/posts/hapi/mad-science.png
original_post: https://medium.com/@thedon/how-test-your-hapi-api-with-lab-b72f6e8ed641
---

## Brief

Started a mad API but, when the next step is wanted I got a problem. How is the better approach to testing my API? Mocha? Jasmine? Wows?

In Hapi ecosystem we have **[Lab](https://github.com/hapijs/lab)** a powerful and clean engine for you test you api made easy. For this propose we'll focused in **[e2e](https://www.techopedia.com/definition/7035/end-to-end-test)**(end to end) tests for our MAD API.

## Proposes Mad API

Just for this example proposes, imagine a simple API with just one endpoint called TODO.

The TODO endpoint, have the methods **LIST**, **GET**, **CREATE**, **UPDATE** and **DESTROY** just another REST API with a **CRUD(**Create, Read, Update, Delete).

## Tools

We will just use **Lab** and **[Chai](http://chaijs.com/). Chai** is an Assertion library. We've some other tools like: Should, **[Code](https://github.com/hapijs/code)** and the standard Assertion library in Node. But I'm more close with Chai and this library help me a lot because I can use promises in some cases and other cool stuffs in Chai just installing a Chai plugin.

Code is good and are in Hapi organization in Github. Feel free to choose the assertion library you're more confident.

## Inside your Laboratory

I like creating an simple _index.spec.js_ in my **tests** root directory for bootstrapping your dependencies and waiting when database is connected.

[https://gist.github.com/thebergamo/cc33659b14b3826f81b7#file-index-spec-js](https://gist.github.com/thebergamo/cc33659b14b3826f81b7#file-index-spec-js)

In my case I have some Globals, sorry for that. :(

Lab is inspired by Mocha and your simplicity, we have some different method in Lab too, but in my case I choose have a similar interface like Mocha for keep the simplicity.

The really cool goal is in line #13 when we require our server. In this file we just require and load plugins and interfaces required for running our server and export the instance of Hapi server.

After this, we can write our code like Mocha applications, but with the powers of \*server.inject() **\***function. (just waiting for few more lines)

This source above is an snippet extracted from my project for illustrate with more fidelity a real test.

[https://gist.github.com/thebergamo/e93748884b06de49b45a#file-todo-spec-js](https://gist.github.com/thebergamo/e93748884b06de49b45a#file-todo-spec-js)

Note, in this case, we can write our tests like a **mocha** tests, because we previously export functions like mocha for testing.

The coolest part is the **_server.inject_** function because we can call our web server up and running in our tests. Just like the module **[request](https://www.npmjs.com/package/request)** but this feature is provided by **[wreck](https://www.npmjs.com/package/wreck).**

So, the rest of our tests is very like any other e2e tests for API, calling endpoint, wait the correct data and be hapi =D

I hide a lot of the implementation for this snippet and you can see the entire source [here](https://github.com/thebergamo/start-hapiness/blob/master/test/routes/todo.spec.js).

So the next step is running our tests. And **lab** beyond mocha features, it have the features of **[istanbul](https://www.npmjs.com/package/istanbul)** for code coverage too and show you possible leaks and the lines you not passed directly in your terminal.

![npm test](https://cdn-images-1.medium.com/max/1600/1*MMQ1vzJNCqmmtm2aG9WPTg.png)

npm test

After running _npm test_ I got this output. Total of tests complete, duration, percent of coveraged source and the lines my tests are not coveraged.

But, just running _npm test_ will not ouput this directly you need say to npm run lab.

```bash
./node_modules/.bin/lab -c -t 90 -v -l
```

- **c** — This is the flag to say "Lab run the coverage!"
- **t 90** — This say to lab "My minimum coverage is 90%"
- **v** — This say to lab "Please, run my tests verbose!"
- **l** — This is specific in my test cases, say "Ignore globals variable leaks detection"

Lab has a lot of more options, but I like using just these.

## Conclusion

Well, this is an little snippet about how I use lab in my Mad APIs and pet projects. Isn't a full complete approach of tests with lab, but is wanna be a start point for who wants more information about how you can tests your Hapi api with lab.

Feel free to help me to improve this post send me feedbacks in comments =D
