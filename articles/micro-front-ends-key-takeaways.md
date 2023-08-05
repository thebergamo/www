---
title: Micro Front-Ends Key Takeaways
description: Micro-Frontends are not a new trend anymore, but a reality. In this post I will to share about my experience building my own framework.
date: '2022-12-01'
tags: architecture, front-end, en-us, talks, micro-frontends
lang: en-US
image: /static/img/posts/mfe/mfe-cover.jpg
image_credit: Photo by [Robert Anasch](https://unsplash.com/@diesektion?utm_source=thedon.com.br&utm_medium=referral) on  on [Unsplash](https://unsplash.com/?utm_source=thedon.com.br&utm_medium=referral)
image_alt: Two yellow and red wooden doors
---

> This post was originally an internal talk I gave at EPAM. Usually while giving a talk I like to write up a bit on what I would like to talk… so here we are :)

## Introduction

Micro-Frontends are not exactly something new, but I believe it gets lately more attention because, Front-End applications are getting more complex every year.

As before we had such a revolution with Micro Services, when the backend services emerged from a “well organized IT room cables” that had to be even. more organized, the Micro Frontends have their prom lately.

I have had in the past years inside EPAM to work in couple of products/teams that were in touch with such subject but in most cases, we’re not even calling it Micro Frontends, but rather “Portals” for internal applications.

And in a previous assignment I had the pleasure to design and implement our own Micro-Frontends architecture, but with focus on the framework itself and that’s exactly what I would like to dive with you today.

## Decision Framework

![Decision Framework](/static/img/posts/mfe/decision-framework.webp)

> Image Source: [From Luca Mezzalira post](https://lucamezzalira.medium.com/micro-frontends-decisions-framework-ebcd22256513)

I will show you today a simplified architecture of what exactly was done back then, but I think you will get the point, if not, by the end I will try to answer any of your questions.

### Building Blocks

As of many applications, in order to build something bigger basically we must start with the basic building blocks that we have and need to do it.

In most cases, the main building blocks are:

1. An App Shell
2. A Router/Orchestrator
3. A “messenger”

Of course you could have other capabilities that would be useful for your Micro-Frontend to go to production, but those are the most important ones from my experience.

### App Shell

The Application shell is usually responsible to control some key aspects of your application, as it is usually the part that would manage things on the Client Side. - But Marcos, what about Server Side Micro Frontends? - Glad you asked Marcos, great listener 🙂

Let’s talk about it after the building blocks, so lets put a pin on it.

At least in the MF Framework/Server I built the App Shell had many responsibilities all together as it was wrapping the micro-frontends, responsible for client side orchestration in general.

It was responsible to load most of the common assets, for instance we had an internal Design System using Web Components.

Yes, we used Web Components on the Design System level and you know what? Adopt React, Angular, Vue or any other thing if you can.

Things will be easier for the whole team, unified tooling, common language among developers and so on. We love to embrace freedom to choose our own tools, but Web Components have potential to create some burden that it might not worth it.

So, in general your App Shell would be the boot loader of your MFs, keep it clean, provide modular functionalities to it to enhance the experience of other Micro frontends would be damn helpful.

Some other alternative could be to create some kind of SDK (a big one such as AWS SDK v2, or a more modular like v3, the JS one of course I mean).

That could give you some flexibility to your MF applications, but at the same time it could create a bit of trouble…

Do the application need to embed the sdk? What about never versions vs old version? Deprecations? Major releases with breaking changes?

In general, specially with a big number of dependant applications, avoid Breaking changes whenever you can, but this applies to everything not only in MF cases.

In most cases you could make them part of the injected libs from your Application shell, so your users don’t need to pay the toll for this dependencies.

**In Summary**

- App Shell is the first thing your client would receive
- It will be responsible to inject and provide the shared capabilities and libraries to others
- It is responsible for most of the work on the client side
- Smaller footprint app shell means faster startup

### Router/Orchestrator

Your app shell will prepare the stage for the show to begin, but you need a MC to get the show started.

Who is available? Who is next? Where is that MF?

There are couple of possibilities on how you can orchestrate a Micro Frontend same for the app shell composition of those pages, but I want to focus on the one I used.

We decided to take a “Vertical split” for the micro frontends to be served, so they could be responsible for their whole flow and the development closer to regular SPAs as possible.

So, in this case our Server Application was responsible to based on the requested “path” to choose the correct MF and add it to the page.

No Module Federation or anything was available, so we basically while building the “index.html” based on our template and after resolving which MF should be loaded, we embedded the “app.js” and any other asset it required to be loaded.

And our orchestrator was the responsible of resolving it.

We had some flexible configuration files for each MF that many things could be changed and the Orchestrator understand and to the necessary things to be ready.

### The “messenger”

If this talk were done in Brazil I would probably change “Messenger” to WhatsApp to have a quick pun intended, but well in Poland the most used as far as I know is the other one from Facebook.

The main goal in here is to have a way to those Micro Front ends to communicate.

In our case, we didn’t have much need of such communications as the Micro frontends did not communicate that much between each other, but rather some shared capabilities that we developed as separated micro-frontends were that needed.

In general, I believe the most recommended way to handle such case is following the same recommendations of MicroService world and have an Event based architecture so we can have a loose coupled architecture between the MFs.

Won’t dive that much into this area as I haven’t touch it that much, but the most challenging part here is about creating some patterns and contracts that could be followed by all the teams to avoid conflicts between services and wrong messages flowing around.

So, before services communicating, better let the people talk.

### The Decision framework

I have talked about this 3 main building blocks that from my experience were the most useful, but how do I came to those?

Back then, it was basically some patterns that I have seem in other applications were using and a bit on structuring and gut feeling, but nowadays we have much more research and structure to be based.

One of the known names in the Micro-Frontends space is Luca Mezzalira and he also wrote a really insightful book about it.

He created the Micro-Frontends decisions framework as you can see in this picture.

Well, he split the points into 4 decisions in order to build your framework.

1. Definition
2. Composition
3. Route
4. Communication

Don’t want to be too much repetitive in here, but it is kind of the building blocks I showed previously, but want to go a bit more in details in some aspects I skipped earlier.

### Definition

Basically we need to define how the Micro-Frontends would be created?

Is a team responsible for a set of components of a page? (Horizontal)

Or is a team responsible for the whole page? (Vertical)

Here is a way we want to create the boundaries between the teams in a horizontal split, you can have some granularity on what exactly your team would work with and not necessarily build some “components” that not necessarily are important for your team.

For instance, let’s imagine the YouTube page, if you’re part of the Player Team, you not necessarily would need to know about the recommendation widget or other parts that won’t aggregate that much other than the player.

So you can leave such expertise to other team and be focused on one part of the domain.

Some other way around is for example if your teams are split in the development of those pages and some micro apps inside the whole application. So, the vertical split would make more sense in this area and in fact in some cases it would even be closer to the SPA development that we’re used to. it.

So, there are many pros and cons on that, but it would depend mostly on how the domains in your company are split.

In my case, it made more sense to let the MicroFrontends being isolated from the beginning and the level of integration was vertical.

### Composition

How the views and apps are getting composed?

And in here it comes with a mix of “previous” too components that we talked in some situations. In general we have 3 possible splits nowadays.

**Client Side**

Starting from the client side, we’re talking about the App Shell being fully responsible to understand the context it is and load the correct micro-frontends to the correct places, so despite your previous choice, in case this is the choice for composition, having a smarter app shell would be the case in here.

And there are many techniques to be applied in here, for example loading the MFEs as iframes such as Luigi Framework or if you are not big fan of iframes, you could take a look on how Single SPA is solving this part.

Single SPA for example have a way to use any framework you wish as far you implement the Single SPA lifecycles for your MFE then it will do the composition to you.

**Server Side**

Moving to the server side, your server must be responsible to understand where the MFEs are and how to put everything together.

Same as my previous case where I mentioned the Orchestrator, it should understand that the “client” is requesting some portion of the page or the whole page and things should be rendered on the server for being rehydrated later on the client if needed.

Something similar to the App Shell, but running on the backend. (that seems to be to obvious)

In general most of the solutions in many cases falls into the same principles as a Layout “parser” if you have worked with this template libraries before Angular and React were cool, that would be basically a “more complex” version of those as the process would be the same.

Parsing a template, identify dependencies, load them and build it.

**Edge Side**

Edge Side is not new also, as there is something called Edge Side Includes or ESI that is a small markup language to be used inside CDNs that basically is a way to compose those templates too.

To be honest, I won’t go further in this direction of the ESIs because despite being around for over 20+ years it didn’t got that much traction, maybe it was too much ahead of its time.

Let's rather focus on the capacities we have nowadays with Cloudflare Workers, Vercel and Labda@Edge are better technologies to think about.

Again, no big news in here, for me it is basically a limited Server Side option as of now (but for sure would be much improved sooner) that is closer to your end user.

So most of Server Side applies here.

### Routing

Again, Client Side, Server Side and @Edge.

To not deviate much I believe in here, best is to keep in sync with previous decision and do the routing aligned with the composition.

In the case of my project we decided to do the hard work on the server side, it was easier because of the vertical split, so our router just needed to load the MFE based on the url was pointed and from that point the internal routing of the app was based on their own SPA router.

That brings some interesting challenges on for example, how we’re sure that the application won’t have a link to a different MFE assuming it would load it’s own and stay in the correct place after some “refresh”?

### Communication

Just to be brief in here again, best would to combine a single mechanism to dispatch messages to communicate between those MFEs and it could be combined with URL for cases when you want to also pass those messages after some full refresh or requesting also some trigger on the backend.

For example in my current project, we’re using some internal MFE framework that loads those MFEs completely independent and it would be hard to pass messages around without some BE integration, the way to mitigate it a bit was introducing some passing messages by URL using some query params to be used something like JSURL or you can also go wild and use JSON with base64 encodings, up to you 🙂

When you have this App Shell in place and you can control these messages in the browser to being passed and kept, use some Event-Emitter, Event Bus or even Custom Events and be happy.

## Available Tools

There are many great frameworks out there that can help you to use most of the options chosen during the decision framework.

So don’t be afraid of explore them and check if those requirements would fit in your use case before deciding to build your own.

Some of the ones I would like to highlght in this session are:

- [Module Federation](https://module-federation.github.io/)
  It’s was initially a webpack plugin that went bigger and now its creator is making many ports for it to be used and available everywhere, so it worth to take a look and build on top of it when it makes sense.
  For me to be honest, if you just need a simple way to resolve multiple apps and compose them all together into a bigger application it would be a great choice and even more complexes integrations can be built on top of it as it would do the hard lifiting of lazy loading those remotely.
- [TailorX](https://github.com/StyleT/tailorx)
  Still on the smaller libraries to get started faster, TailorX would give you ability to build and parse your templates and serve them quite fast, so composing would be easier.
  If I would build something that is custom right now, I would use TailorX as a base line for the orchestrator and initial layouts as it is easy and integrate easily with other tools, so pretty much easy to expand it’s capabilities.
- [Single SPA](https://single-spa.js.org/)
  As mentioned, Single SPA is also a good option in here and it does have already many features out of the box that can fit most of use cases of MicroFrontends.
- [Isomorphic Layout Composer](http://ilc.namecheap.technology/)
  Think about Single SPA + TailorX best of both words so ILC wraps around those great tools to make your life easier too.
  Besides, Built-in registry, framework agnostic and so on
- [Open Components](https://opencomponents.github.io/)
  Besides creating the composition of those MFEs we have other challenges like, how to find those MFEs in the wild? Moving forward with other more complete tools, we have OC that also make available a registry for your MFEs which makes much easier to have the full flow in here.
- [Piral](https://piral.io/)
  On the complete solutions, Piral offers you also a great solution end to end to your MFEs so you don’t need to extend that much up front and can get started faster, so just extend as your requirements need and manage around extensions of Piral.
  I could go further as there are many tools available in a lot of specifics, but let me move forward 🙂

## Build or Buy

So, the Build or Buy question is always important in such cases, well, not exactly buy but rather using something that already exist.

Because on the developer heart, it is always funnier to create your own tool, specially that we always think that our use case is unique.

Well, if we think deeper our uniqueness is in general 10% of the general use cases, so my recommendation is to try to find the tools that solve most of the common use cases, but instead of re-creating the wheel, try to extend and evolve current tools available.

That’s at least how I approach most of those cases and based on my experience inside EPAM it is pretty much similar.

So in this block I would rather talk about a bit of the challenges we’re about to check before looking into a fully custom solution.

For the sake of this presentation I would like to hightlight two points that I consider fairly important for adoption inside organizations.

### DX

One of the key successes of our previous project adoption was that we focused on an easy way for developers to get started to use our framework, so tooling and documentation was easy enough to get started.

We used a lot generators to bootstrap applications, simple to use CLI and ability to run the application locally with fully infrastructure the same as in the higher environment.

There were a use case that one specific team in a business unit of our customer, wanted to have our “server” running inside their custom infrastructure due to some specifics of their product, so they did without much trouble because our “server” was already ready to be used with docker and even with a more complex deployment they had it wasn’t a big challenge because our DX was simple to be used and production ready even in local development.

Besides of it, we had a lot of self service apis fully scoped to avoid one MFE messing with others. (I didn’t want to maintain any complex pipeline or more complex management of those MFEs, so we allow our users to do it on their own with our guardrails in place)

### Shared Capabilities

What should goes inside the App Shell? What capabilities should be part of the core framework and what should be done 3rd party.

In most of the open source solutions they already provide some idea on what should be part of the framework and you can just build around of it.

When deciding on a custom solution you need to decide what should be a MFE and what should be a core capability and that can blurry some lines, specially when you’re building a framework and want others to adopt it inside the organization because they would ask you for some capabilities such as Authorization and Authentication (usually SSO) from the framework.

In general even being provided as “core capability” I would say that it is better to make it as its own MFE being maintained by the Framework team.

### One more thing…

In general, the main problem with MFEs are trying to solve isn’t the tech itself, usually the technology is the easiest part of our jobs.

Most techniques were being used for couple of years before we talked about MFEs and we can always simply have good modularity of our code and things would be fine.

The main problem is how to keep sane with a monolith being touched by couple of tens, hundreds or even thousands of developers spread around multiple teams not talking with each other but at the same time maintaining this little monster.

It isn’t impossible without MFEs, but similar as MicroServices it lies on people to fix it.

Splitting the knowledge into smaller domains, embracing automation and autonomy are the pillars that would make a MFE project work, having the teams working on the correct places without need to know the whole app and breaking stuff is easier, but in isolated MFEs it might be simpler to maintain in the longer run.

Again, going into MFEs and starting to create “nano” FEs won’t help much, so try to keep the balance and use the known knowledge for split the domains and creating those projects wisely as we do in MicroServices stuff.

I guess that’s basically it, I didn’t went deeper, but I believe I could made a spark on you to go and learn more about this great topic 🙂

Thank you.
