---
title: 'Decoupling your User entity from Symfony’s security'
date: '2018-10-10'
tags:
  - PHP
  - Symfony
---

<div class="alert">
  <strong>2021-08-07</strong><br>
  Symfony has changed a bit since the time of writing. As of 5.3, Guard authenticators have
  been deprecated. The code below would need to change to use the
  <a href="https://symfony.com/doc/current/security/authenticator_manager.html">new authenticator-based system</a>.
</div>

This post is about my experience in decoupling the security component User from my
application User as described on [Iltar van der Berg’s post][1].

I thought I would write this article to document my takeaways from Iltar’s blog post,
and maybe help others with implementation by giving more code examples.

---

## Why decouple them?

A big reason I had was a security hole caused by references. The User entity was being
stored in session and Doctrine held a reference to it in its identity map. The app was
making changes to the User entity that weren't persisted in the DB, yet *were*
unintentionally being stored in session (due to the reference) and causing issues.

That particular case is easy to work around, but it was only an accidental discovery.
It got me wondering if similar problems could occur in any of the other many parts of
the app that touch User entities.

Besides that, there are cases I've had where trying to store the User entity in session
was really tricky. Relationships, roles from DB, serialization/deserialization, and impersonation.

Creating a new “SecurityUser” for Symfony's security component greatly simplified things
in the end.

---

## How to separate them

Iltar’s blog post gives some code but it doesn’t fully connect the dots. I’d like to show how
I did it. Please note that this is just one possible way and isn’t a one-size-fits-all solution.

1. Create a separate SecurityUser class to be used by the Security component. `SecurityUser.php` below

2. Create a user provider to load a SecurityUser by email. `SecurityUserProvider.php` below.
   (This is optional if you’re using a Guard class; you could load the user in Guard’s getUser method.)

3. Configure Symfony to use the new SecurityUser and provider. `security.yaml` below

4. (optional) Create a user provider to fetch a User entity when provided a SecurityUser.
   `CurrentUserProvider.php` below. In my apps, I inject this service where I need the current user.
   There are other ways. e.g. As Iltar said, for controllers you could create an ArgumentValueResolver.


### Code:

*(public props & methods clipped for brevity)*

<script src="https://gist.github.com/simshaun/89407e39c7c6ef66268fd5327ea8a6a1.js"></script>


[1]: https://stovepipe.systems/post/decoupling-your-security-user
[2]: https://api-platform.com/
