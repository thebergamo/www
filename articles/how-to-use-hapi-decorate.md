---
title: How to use Hapi decorate
date: '2015-12-04'
tags: development, en-us, hapijs, nodejs
lang: en-US
image: /static/img/posts/hapi/hapi_logo.png
original_post: https://medium.com/@thedon/how-to-use-hapi-decorate-3b3896045ae1
---

### Brief

Days ago, I want to improve performance to my boilerplate for Hapi + MongoDB apps. On this crusade, I came across an interesting feature in the Hapi documentation: **[Decorate](http://hapijs.com/api#serverdecoratetype-property-method-options).**

This open my mind about how handle my throws in the source of my Hapi apps, and I want to share with you!

### Previously

Previously I meet **Decorate** my implementation in _controllers/xpto_ is something like this:

[Old controllers/user.js without decorate](https://gist.github.com/thebergamo/058e64b6afceebdcb783#file-user-js)

Old controllers/user.js without decorate

This is an extracted part of my _controllers/user.js,_ the method GET will return the information about an single user.

But you can see in this case I need to import Boom and reply then every time I need to dispatch an error for User not found. And in every new controller import Boom again.

> You can just make boom globally, and then just call where you want importing Boom once! — Some newbie Dev

<aside>
💡 Globally is not an option!

</aside>

### Decorate to the rescue!

[lib/decorate.js plugin](https://gist.github.com/thebergamo/e02147f717954a820bf0#file-decorate-js)

lib/decorate.js plugin

As you can see above, I write my common errors in a file and export a Hapi's Plugin. We can just load this plugin in your server instance and call it on yours controllers like in this snippet:

[New controllers/user.js with decorate](https://gist.github.com/thebergamo/3c750c9cf2e6a74b226f#file-user-js)

New controllers/user.js with decorate

Just cleaner right?

### More than you saw here

Decorates can do more than just implement a simple wrapper for errors in your controller. You can extend the request, reply and server interfaces just like you saw above.

Importing and load your plugin in one place and sharing it in your entire application with this simple function **Decorate.**

You can see more about this in Hapi Documentation [here](http://hapijs.com/api#serverdecoratetype-property-method-options).

### Conclusion

This awesome feature of Hapi is very helpful if you want to write less code and keep [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) in your mind for bind your focus on your Business.

This and another studies are based on my Boilerplate called [Start Hapiness](https://github.com/thebergamo/start-hapiness), if you have any suggestion for improve this project feel free to open an issue or a pull request, it is both much welcomed!

---

### Updates

**2015–12–04 23:12:00**

[https://twitter.com/AdriVanHoudt\_/status/672926580851802112?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E672926580851802112%7Ctwgr%5E%7Ctwcon%5Es1_c10&ref_url=https%3A%2F%2Fmedium.com%2Fmedia%2Fba355aaae2dfbcf03231d3797c4ed280](https://twitter.com/AdriVanHoudt_/status/672926580851802112?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E672926580851802112%7Ctwgr%5E%7Ctwcon%5Es1_c10&ref_url=https%3A%2F%2Fmedium.com%2Fmedia%2Fba355aaae2dfbcf03231d3797c4ed280)

My example about using decorators to handle on time Boom module in reply interface has a module called [hapi-boom-decorators](https://www.npmjs.com/package/hapi-boom-decorators). Thanks [Adri Van Houdt](https://medium.com/u/13c973ca52b0) for this update =D
