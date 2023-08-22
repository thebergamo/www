---
title: Scoping roles in Hapi
date: '2015-12-16'
tags: development, en-us, hapijs, nodejs
lang: en-US
image: /static/img/posts/hapi/scopes.jpeg
original_post: https://medium.com/@thedon/scoping-roles-in-hapi-1f3ab86d6576
---

## Brief

When we write an API, after defining the auth system, and many other things, we need defining who will can access the routes. I like the **roles** where an user need has in yours roles the specific for access that content.

More or less like this: _"Jeff want to see the Mary's phone, but for that Jeff need have an access for a telephone catalog with an subscriber role."_

Telephone catalog is old huh? Well, if Jeff aren't a subscriber for a telefone company, he cannot have a catalog (or asking for a friend with this role, but this is other story).

## A Scope for access all things

If you see the last article, you're familiar with **[JWT auth in Hapi](https://medium.com/@thedon/auth-in-hapi-with-jwt-780ce4d072c7).** Well, this article is similar, but with just one improvement.

Hapi provide us a built-in way to check the roles directly in routes. check bellow:

[https://gist.github.com/thebergamo/a4815c768e5fe9149fb4#file-todo-route-js](https://gist.github.com/thebergamo/a4815c768e5fe9149fb4#file-todo-route-js)

As you can see, adding in lines 19–21 and 30–32 an object _auth_ this object, contain the scopes for the routes. You can adding an array of strings to allow users with different roles to access this route. The user only need have one of this strings roles for given access.

So, where I will get the roles? You need to adding this roles in your auth scheme. When you generate your JWT and response that for your user, you need send the roles too, no more just the ID.

In my case, I generate the JWT in user's controller in cases of LogIn and Create, well, in both cases after success, the function getToken is called.

## Get the token!

If in your case you cannot have this function, you just adding role array or string in your JWT and this will work fine.

[https://gist.github.com/thebergamo/f572b70fb49b25adb179#file-gettoken-js](https://gist.github.com/thebergamo/f572b70fb49b25adb179#file-gettoken-js)

Instead just passing the ID in _getToken()_ function, you must passing the user object and set in _jwt.sign_ the ID and Roles of this user. After that Hapi will can validate the roles of the user when this is requested.

When you don't add _scope_ option \*\*in a route, no roles are required for access this route and the route will be accessible for all users without restrictions.

## Roles Checked

The scopes are checked automatically by Hapi when you provide the informations. This check will occur in Auth cycle, so your controller not need to know about the user roles, because this is a function of the auth scheme not controller.

Well, that's all folks for now!! See ya!
