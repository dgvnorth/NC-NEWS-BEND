## NC News API

NC News API is the RESTful API for my [NC News](https://dgv-nc-news.netlify.com/), a Reddit-style website to enjoy northcoders news.

The [API](https://dgv-nc-news.herokuapp.com/api/articles) for [NC News](https://dgv-nc-news.netlify.com/) has been hosted on [Heroku](https://www.heroku.com/) and can be accessed on https://dgv-nc-news.herokuapp.com/api/articles.

### Getting Started

#### Prerequisites

Ensure that you have [NodeJS](https://nodejs.org/en/) and [PostgreSQL](https://www.postgresql.org/)

#### Installing

Clone this repository:

git clone https://github.com/dgvnorth/NC-NEWS-BEND

Install npm packages

npm install

#### Testing

npm test

#### Running development server

npm run dev

#### Using the API

The below are all available endpoints. GET requests can be easily access on a browser, preferably google chrome, by connecting to localhost:9090/api. [Insomnia](https://insomnia.rest/) is recommended for POST, PUT or DELETE requests. Link: https://insomnia.rest/

sudo snap install insomnia

##### EndPoints

```javascript
GET /api
Is the HomePage

GET /api/topics
Returns all topics

GET /api/topics/:topic_id/articles
Using a valid topic_id, it returns all articles for that topic

GET /api/articles
Returns all articles

GET /api/articles/:articleId
Returns an article by its ID

GET/api/articles/:aritcle_id/comments
Using a valid article_id, it returns all comments for that article

POST /api/articles/:article_id/comments
Adds a new comment to an article. This route requires a JSON body in the following format with the exact keys i.e: {"username": "jessjelly",
"body": "Your comment here"}

PATCH /api/articles/:article_id
Increment or decrements the votes of an article by one. This route will require a JSON body in the following format with the exact key i.e: {"inc_votes": 1 }

PATCH /api/comments/:comment_id
Increment or decrements the votes of a comment by one. This route will require a JSON body in the following format with the exact key i.e: {"inc_votes": 1 }

DELETE /api/comments/:comment_id
Deletes a comment by its comment_id
```

### Built with

- [NPM](https://www.npmjs.com/) - JavaScript package manager
- [ExpressJS](https://expressjs.com/) - Web framework for Node.js
- [KnexJS](https://knexjs.org/) - SQL Query builder
