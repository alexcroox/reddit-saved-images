# Reddit Saved Images

> View all your Reddit saved image posts in a grid for easy reference

[https://redditsaved.com](https://redditsaved.com)

![screenshot](https://cl.ly/62c414d20816/Screenshot%202019-04-26%20at%2022.37.42.jpg)

## Privacy and security

**This app runs entirely in your browser**, there is no server to send data to.

Your Reddit access token and displayed saved posts will remain only in your browser, with no tracking scripts used.

## Motivation

I often "Save to Reddit" images and gifs I like for future sharing. It's often hard trying to re-find them at a later date when browsing `/user/me/saved/` as they are mixed with non-image posts. This project fetches all saved images and gifs and presents them in a grid for easier browsing.

### Learning

I needed to re-learn Vue.js for a new job after years of React. This project was a way of re-familiarising myself with the framework.

## Code consistancy

It is highly recommended you install both `Vetur` and `Eslint` IDE extensions in order to keep consistant formatting and auto check for errors in your code.

I prefer Standard JS but it doesn't support Vue component files. I'm personally not a fan of Prettier's lack of spacing after function names, and it's something they rejected as a config option :(

## TODO

- Replace the masonry grid, it's janky at best. It's not an easy problem to solve given there is no image/video loaded detection which makes auto layouts tricky.

- Use the oauth refresh token.

- Vuetify is used because my new company utilises it so I needed to check it out. Currently the entire lib is imported for learnig convenience but I need to import just the components used to reduce bundle size.

- TESTS!
