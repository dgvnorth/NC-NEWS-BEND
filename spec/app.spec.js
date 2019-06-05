process.env.NODE_ENV = "test";

const { expect } = require("chai");
const request = require("supertest");

const app = require("../app");
const connection = require("../db/connection");

describe.only("/", () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());

  describe("/api", () => {
    it("GET status:200", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then(({ body }) => {
          expect(body.ok).to.equal(true);
        });
    });
    describe("/topics", () => {
      it("GET status:200, returns a topic object containing the slug and description properties", () => {
        return request(app)
          .get("/api/topics")
          .expect(200)
          .then(({ body }) => {
            expect(body.topics).to.be.an("object");
            expect(body.topics).to.contain.keys("slug", "description");
          });
      });
    });
    describe("/users", () => {
      describe("users/:username", () => {
        it("GET status:200, returns a user object containing the username, avatar_url and name properties", () => {
          return request(app)
            .get("/api/users/butter_bridge")
            .expect(200)
            .then(({ body }) => {
              expect(body.user).to.be.an("object");
              expect(body.user).to.contain.keys(
                "username",
                "avatar_url",
                "name"
              );
              expect(body.user).to.eql({
                username: "butter_bridge",
                name: "jonny",
                avatar_url:
                  "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg"
              });
            });
        });
        it("GET status:404, for an non existing username", () => {
          return request(app)
            .get("/api/users/999999")
            .expect(404);
        });
      });
    });
    describe("/articles", () => {
      describe("/articles/article_id", () => {
        it("GET status:200, returns an article object containing the author, article_id, body, topic, created_at, votes and comment_count properties", () => {
          return request(app)
            .get("/api/articles/1")
            .expect(200)
            .then(({ body }) => {
              expect(body.article).to.be.an("object");
              expect(body.article).to.contain.keys(
                "author",
                "title",
                "article_id",
                "body",
                "topic",
                "created_at",
                "votes",
                "comment_count"
              );
              expect(+body.article.comment_count).to.equal(13);
            });
        });
        it("GET status:400, for an invalid article_id", () => {
          return request(app)
            .get("/api/articles/notAndId")
            .expect(400);
        });
        it("GET status:404, for a non-existing article_id", () => {
          return request(app)
            .get("/api/articles/1999999")
            .expect(404);
        });
        it("PATCH /:article_id - status:200, increments votes and returns the updated article", () => {
          const newVote = 10;
          return request(app)
            .patch("/api/articles/1")
            .send({ inc_votes: newVote })
            .expect(200)
            .then(({ body }) => {
              expect(body.article).to.eql({
                author: "butter_bridge",
                title: "Living in the shadow of a great man",
                article_id: 1,
                body: "I find this existence challenging",
                topic: "mitch",
                created_at: "2018-11-15T12:21:54.171Z",
                votes: 110
              });
            });
        });
        it("PATCH/:article_id - status 400 - for an invalid article_id", () => {
          const newVote = 10;
          return request(app)
            .patch("/api/articles/notAndId")
            .send({ inc_votes: newVote })
            .expect(400);
        });
        it("PATCH/:article_id - status 404 - for a non-existing article_id", () => {
          const newVote = 10;
          return request(app)
            .patch("/api/articles/1999999")
            .send({ inc_votes: newVote })
            .expect(404);
        });
      });
      describe.only("/:article_id/comments", () => {
        it("POST/:article_id/comments  - status 201 - accepts an object with the username and body properties and responds with the posted comment", () => {
          return request(app)
            .post("/api/articles/1/comments")
            .send({
              username: "butter_bridge",
              body:
                "I recommend this movie, it makes you reflect about the meaning of life"
            })
            .expect(201)
            .then(({ body }) => {
              expect(body.comment.body).to.eql(
                "I recommend this movie, it makes you reflect about the meaning of life"
              );
            });
        });
        it("POST/:article_id/comments  - status 400 - when passed an empty comment object", () => {
          return request(app)
            .post("/api/articles/1/comments")
            .send({
              username: 1,
              body: ""
            })
            .expect(400);
        });
        it("POST/:article_id/comments  - status 404 - when passed an empty comment object", () => {
          return request(app)
            .post("/api/articles/1/comments")
            .send({})
            .expect(404);
        });
      });
    });
  });
});
