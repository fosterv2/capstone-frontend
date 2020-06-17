# CatsSpace - Social Media for Cats

An app for cats to connect with each other and share their thoughts and feelings (because cats do have feelings).

This project was started with [Create React App](https://github.com/facebook/create-react-app).

This project requires use of the [backend repository](https://github.com/fosterv2/capstone-backend)

## Getting Started

To use this app you should fork and clone this repository and the the backend repository

### Prerequisites

To run this project you have to have rails installed on your computer

### Installing

#### back-end

To get the back-end running, you should run all of these commands in the back-end folder

```
rails db:create"
rails db:migrate
rails db:seed"
```
then `rails s` to start the server

#### front-end

To get the front-end running, you should run all of these commands in the front-end folder

```
npm install
npm install react-router-dom
npm start
```

### In the App

Before login/ signup, you can see the "about", "login/signup", and "home" pages with all of the posts for the site at "home". Once logged in, a user can see all posts, make a post, see info about all groups and join any group, like any other user's posts once and comment on them.

