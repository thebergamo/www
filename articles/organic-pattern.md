---
title: Organic Pattern
description: This is my 1st draft as a proposal for creation of a pattern of development for applications of this new Cloud generation that is emerging.
date: '2014-12-04'
tags: design-patterns, development, en-us, engineering
lang: en-US
image: /static/img/posts/organic-pattern/cover.jpeg
original_post: https://medium.com/@thedon/organic-pattern-first-draft-146ae3265a95
---

### **Overview**

This is my first draft as a proposal for the creation of a pattern of development for the applications of this new Cloud generation that is emerging.

The ideas that I will present below, were based on my short experience with Node.js and in my experience using other older languages such as PHP, Java and Delphi.

### **Insight**

As a software developer, design patterns and planning have always been crucial to their development, even though in theory they flow better than just being on daily bases hard work.

When I started my first course focused on the development area, saw some interesting patterns are presented, what most caught my attention and made and still makes a lot of sense is the famous **[MVC](http://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)** or Model-View-Controller in many system implementations that nature do even make much sense this development model.

### **The Cloud**

Well, we living on the “Boom of the **[Cloud Computing](http://en.wikipedia.org/wiki/Cloud_computing)** and is possible an application evolve of day to night, 1 to 100 and 1 million of users is much dynamic for you care alone of one server on the day and 12 hours later need to care 200 servers.

The Cloud are coming to help us on the task of best scaling our applications and to think better in how we’ll develop the applications too. Study, Planning and Execute are task so common today(not always in this order, but we do as we can).

### **The problem**

Our focus now is how to make our applications more and more conducive and organized: Creation of New Features, Codes Maintenance, Sudden changes in the code among other tasks to be taken into account.

The idea of MVC makes a lot of sense in several of these aspects, but ended up having a certain work to resolve when we think much more sudden changes. But my point is not to make criticism of this wonderful pattern of development that I believe still make sense for another good time.

When developed using frameworks like Zend, Cake, Yii, CodeIgniter and other PHP frameworks, or Spring (I will not comment on others not to talk nonsense, just out of curiosity Hibernate is a framework?) Of Java, we have arranged a little locked and regulated by the frameworks.

Worked with Yii in most projects related to PHP, so I will use it will sample nature to dominate best, but I believe that others follow the same line. In the case of Yii in its 1.x verse we have a certain folder structure that we cannot choose very well where we want certain files or the like become, we have to follow the guidelines of way “Yii” or any other of working framework.

If you move a folder or file the same place just going crazy.

That’s not bad, I’m just showing the forest before showing the new leafy trees. When you’re starting something is very important to have a standard to follow, not to get lost and follow what we call a “Best Practices”.

When we speak specifically of Node.js still have not so strong which will give the exact guideline for us. Some frameworks like **[Sails](http://sailsjs.org/)** or **[Kraken](http://krakenjs.com/)** are there to help us in this task of “finding the best pattern for folders and files.”

But as you will be developing in Node.js and begin to notice the nuances of the JavaScript language and Node platform, you see that these ancient points are not as strong as before in Java or PHP.

You totally free to choose will what best assist you. One of the phrases that I like, even if taken from a comic is:

> “With great power comes great responsibility” — Ben Parker.

And that is the biggest problem of Node.js, or appears to have. We can do everything in different ways, using different paradigms and so on, have it in other languages as well, but it is relatively new compared to other Node.js still lacks a bit of a strong pattern, but only a suggestion, not as required.

Another major problem we face in various languages and platforms is the complexity of the systems where we have databases, external services all in one giant application and almost unreadable because there are so many dependencies among the codes and everything.

It is to help these scenarios Cloud, codes Organization and Avoid systems Giants and illegible the Organic Pattern will help.

### **The possible Solution**

The idea behind the Organic Pattern is almost a mix of some new “ways” to develop systems today.

The biggest inspiration came from **[Atomic Design](http://bradfrost.com/blog/post/atomic-web-design/)**, the model is structured as the components that will make web pages at the end enchanted me. I wanted to bring something like this to my side “Backend of force.”

It was hence that the first ideas have emerged in parallel with this, I came across the concept of **[Microservices](http://martinfowler.com/articles/microservices.html)**, which also ended up showing me that I was really on the right track, or at least was walking together with progress in software development.

From this line will try to better explain the idea of this proposed standard, is only conceptual for now.

### **The Way**

If we analyze the application (solution) as a whole, I can find many analogies with our body. Applications are also bodies.

Every part of our body has a responsibility and specifies all these small parts make something bigger, each part has its share of good functioning as a whole and sometimes changes are necessary for improvement.

I think the best analogy I could make an application and the specialization of small parts of them perhaps in independent modules that can work together would neurons.

Neurons have very specific functions, some are pagers, others are just transmitters, among other possibilities (I am not as expert as you like in Neuroscience).

We can compare most of our components in a single system as a neuron. The best example I can think of would be of database.

At the moment we are planning the system the choice of database can make a big difference in the short, medium or long term, but if we focus on a module that responds to the rest of the application in a “X, Y, Z,” independent the database structure is MySQL or MongoDB as the Communication from the rest of the application will only be for this interface that will always respond the same way. Making transparent the database. If we begin our application using MySQL and a future need to migrate to MongoDB, the nuances of each of them will be abstracted to the module and this in turn responsible for performing similar functions that were used in MySQL in MongoDB.

Thus creating small modules that all of these makes possible the application itself.

### **The End**

Well, is not something very tangible, these in which I include myself as well, because the idea in my design is good but still needs improvement. I would love to hear from other developers, experienced to get an idea whether to follow or simply ball forward. Thank you for your attention.

_Thanks a lot for the help on translate this article to English: Vinicius Vasconcelos you’re the best!_
