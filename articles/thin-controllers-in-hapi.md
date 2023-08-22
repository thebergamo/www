---
title: Thin Controllers in Hapi
date: '2015-12-09'
tags: development, en-us, hapijs, nodejs
lang: en-US
image: /static/img/posts/hapi/thin_controllers.png
original_post: https://medium.com/@thedon/thin-controller-in-hapi-e52cfcb3962d
---

## Brief

In MVC [Controllers](http://stackoverflow.com/questions/1015813/what-goes-into-the-controller-in-mvc) just delegate the tasks for the right parts of the source code. But validate inputs and other things are located in that, for me its a dummy way to do this things, because your controller increase your weight with this unnecessary things and Hapi got a cool Academy for make your controller more **Thin**!

## Thin Controller

Hapi provide us some tools for our controller lose weight, the most part of this tools is granted by the Hapi Request Life-Cycle, but this is an subject for another post.

When receive an incoming request, we need validate ours inputs, check the auth token or something like this. Check my _routes/todo.js_ bellow:

[https://gist.github.com/thebergamo/cf26fce44a9d00706a25#file-todo-js](https://gist.github.com/thebergamo/cf26fce44a9d00706a25#file-todo-js)

Just for example, consider we have an auth system default based on **[JWT](http://jwt.io/).** In other opportunity I can talk about it.

Well, our routes need be authenticated, because we defined it before and our JWT auth is default, if we need in a route disable, just adding a line before _handler_ like this:

```jsx
auth: false
```

And this specified route are not validated with our auth system, very useful in cases like SignIn, SignUp.

So, my favorite feature provided by Hapi is the **_validate_** in route object, because in validate we can check all the needed parameters in payload, querystring, headers and others, you can see more options **[here](http://hapijs.com/api#route-options)**.

**[Joi](https://github.com/hapijs/joi)** is part of this, and you can define a lot of validations for yours parameters using it.

Like conditional parameters, complex objects internals, arrays, and all of yours necessities want!

## Power Resumed

In resume about all I said above, all validations and auth logic is provided by Hapi for you don't worry about this simple things. By the Request Life-Cycle if any of validation not are passing, your code are not executed. Fail fast!

In your controller you will assume all things are ok and then you can produce a Thin controller like this:

[https://gist.github.com/thebergamo/630386548d2d4f4de081#file-controller-js](https://gist.github.com/thebergamo/630386548d2d4f4de081#file-controller-js)

You can get all parameters in your request with no guilty, because Hapi check all parameters if its are correct and have the expected values for you.

If you have a better way to do this things, please say in comments, twitter or github, because comments help me to improve and say to anothers about best pratices!
