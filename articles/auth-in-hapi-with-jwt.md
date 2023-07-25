---
title: Auth in Hapi with JWT
date: '2015-12-11'
tags: development, en-us, hapijs, nodejs
lang: en-US
image: /static/img/posts/hapi/auth_hapi-1.png
original_post: https://medium.com/@thedon/auth-in-hapi-with-jwt-780ce4d072c7
---

### Brief

The new buzz word is **[JWT](https://jwt.io/)**(JSON Web Token)[I know, is not so new now :( ]. Well, this cool approach for send and consume an information easily with an encode for "security".

So, Hapi have an awesome auth system where you can create a lot of auth types, for you use when is required for that case, for example, internally you can use a **JWT** and for external connection an **[Hawk](https://github.com/hueniverse/hawk),** Basic Auth, or an **OAuth** auth. You can have one for case you need, but in this case we'll talk about JWT auth!

### **The Road**

I really don't want to entry in the internals about the auth system in Hapi, but show how you can implementing Hapi + JWT for authenticate your users and distribute a token for retrieve information.

My favorite plugin for that is **[hapi-auth-jwt2](https://www.npmjs.com/package/hapi-auth-jwt2).** You maybe are asking: "Why jwt2?" this is simple because "hapi-auth-jwt" was taken :p

[https://gist.github.com/thebergamo/927a4a7b5b1606370313#file-authjwt-js](https://gist.github.com/thebergamo/927a4a7b5b1606370313#file-authjwt-js)

This is my implementation of **hapi-auth-jwt2**, this code consist in two "big" functions.

**registerAuth** is the registry function in Hapi, that configuring the plugin with your settings.

You must passing an object with **key** value to be an "secretKey" for your JWT validating if the token is trusted.

**validateFunc** is a function that is called every time a request is received and you business rules validate if the token is valid.

**verifyOptions** is an Object with some options for JWT internals, but I only use the algorithms for setting it, you can see more [here](https://www.npmjs.com/package/hapi-auth-jwt2#documentation).

The second "big" function is the **validate** function. This function is used in validateFunc.

In that function, we receive an decoded JWT and a request interface and a [callback](https://lh4.googleusercontent.com/-EoaLtqgg3D8/VUJ45tPi1AI/AAAAAAAAARg/h9edt1nEgTI/w1010-h424-no/javascript_callback_hell.png).

My case is so simple, my JWT is the ID of the user in database, so just find the user's ID and if the ID is valid, we can continue or not, **YOU SHALL NOT PASS!**

But Marcos, you don't show me how I can generate the JWT to send for my clients. Just see bellow Padawan!

[https://gist.github.com/thebergamo/bcc2b572f93edfdddebd#file-usercontroller-js](https://gist.github.com/thebergamo/bcc2b572f93edfdddebd#file-usercontroller-js)

When a user is created or just logged in, we send the token for our users.

Because when you create your account is very useful(and cool) when the site redirect you already logged(IMO).

And in my function **getToken** I just use the module **[jsonwebtoken](https://npmjs.com/jsonwebtoken)** for sign the token with the ID.

If you want to use scopes for require a specific role for this route, you can pass in JWT an array with the user's roles.(In a soon post, I'll talk about it! _-_)

getToken, set the **secretKey**, equal than our previously secretKey in our auth plugin above. (If you specify a different secretKey, the plugin cannot trust your token)

In _jwt.sign_ function, you need pass the object that you want to encode in a JWT, your secretKey and options for your JWT. In my case I just set expiresIn with 18 hours.

And thats all folks! Simple and Cool!

You can see this authenticate schema implemented in my boilerplate project called **[start-hapiness](https://github.com/thebergamo/start-hapiness)**.

### Tricks

If you want to use JWT please, never, I said NEVER send sensitive informations here, because JWT is not encrypted, is just encoded you can encrypt it with a RSA key stored the User's model or something like that, but NEVER send passwords or other sensitive informations.

Because JWT is just encoded, if you've an token, you can see the content easily like this:

```jsx
let token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ'
```

```jsx
atob(token.split('.')[1]) // see your content here =D
```

This token is extracted from JWT's site, you can see the real content there.

### Thanks folks

I need to say Thank you folks for seeing, replying and recommend my post. It's very gratifying to know that I’m helping someone with my posts.

Again, THANKS VERY MUCH!!
