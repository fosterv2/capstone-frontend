# CatsSpace - Social Media for Cats

An app for cats to connect with each other and share their thoughts and feelings (because cats do have feelings).

This project was started with [Create React App](https://github.com/facebook/create-react-app).

This project requires use of the [backend repository](https://github.com/fosterv2/capstone-backend).

CatSpace is deployed through Heroku [here](https://cat-space-frontend.herokuapp.com/).

## Getting Started

To use this app you should fork and clone this repository and the the backend repository

## Prerequisites

To run this project you have to have rails installed on your computer

## Installing

### back-end

To get the back-end running, you should run all of these commands in the back-end folder

```
rails db:create
rails db:migrate
rails db:seed
```
then `rails s` to start the server

### front-end

To get the front-end running, you should run all of these commands in the front-end folder

```
npm install
npm install react-router-dom
npm start
```

## Using CatSpace

Before login/ signup, you can see the "about", "login/signup", and "home" pages with all of the posts for the site at "home". Once logged in, a user can see their profile and groups along with posts on the home page. They can make posts with a picture and content and tag it to groups and edit or delete them. They can also make comments on any posts and like any other user's posts once. A user can also join and leave groups and see all posts associated with the groups they have joined. A user can also follow any other user through their profile on the group page or the page of one of their posts.

## Contact

If you want to contact me you can reach me at fosterv2@outlook.com.

## License

This project uses the following license: [MIT License](https://choosealicense.com/licenses/mit/)
