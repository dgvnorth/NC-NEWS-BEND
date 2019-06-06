process.env.NODE_ENV = "test";

// const { expect } = require("chai");
const request = require("supertest");

const chai = require("chai");
chai.use(require("chai-sorted"));
const { expect } = chai;

const app = require("../app");
const connection = require("../db/connection");

describe("/", () => {
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
      it("GET status:200, returns an article object sorted_by any valid column containing the author, article_id, body, topic, created_at, votes and comment_count properties", () => {
        return request(app)
          .get("/api/articles?sort_by=created_at")
          .expect(200)
          .then(({ body }) => {
            const sorted_by = "created_at";
            expect(body.articles).to.be.an("array");
            expect(body.articles).to.be.sortedBy(sorted_by, {
              descending: true
            });
          });
      });
      it("GET status:200, returns an article object order ascendingly", () => {
        return request(app)
          .get("/api/articles?order=asc")
          .expect(200)
          .then(({ body }) => {
            const sorted_by = "article_id";
            expect(body.articles).to.be.an("array");
            expect(body.articles).to.be.sortedBy(sorted_by, {
              ascending: true
            });
          });
      });
      it.only("GET status:200, returns filtered articles by the username value specified in the query", () => {
        return request(app)
          .get("/api/articles?author=butter_bridge")
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).to.be.an("array");
            expect(body.articles).to.be.eql([
              {
                article_id: 1,
                title: "Living in the shadow of a great man",
                topic: "mitch",
                author: "butter_bridge",
                body: "I find this existence challenging",
                created_at: "2018-11-15T12:21:54.171Z",
                votes: 100
              },
              {
                article_id: 9,
                title: "They're not exactly dogs, are they?",
                topic: "mitch",
                author: "butter_bridge",
                body: "Well? Think about it.",
                created_at: "1986-11-23T12:21:54.171Z",
                votes: 0
              },
              {
                article_id: 12,
                title: "Moustache",
                topic: "mitch",
                author: "butter_bridge",
                body: "Have you seen the size of that thing?",
                created_at: "1974-11-26T12:21:54.171Z",
                votes: 0
              }
            ]);
          });
      });
      it.only("GET status:200, returns filtered articles by the topic value specified in the query", () => {
        return request(app)
          .get("/api/articles?topic=cats")
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).to.be.an("array");
            expect(body.articles).to.be.eql([
              {
                article_id: 5,
                title: "UNCOVERED: catspiracy to bring down democracy",
                topic: "cats",
                author: "rogersop",
                body: "Bastet walks amongst us, and the cats are taking arms!",
                created_at: "2002-11-19T12:21:54.171Z",
                votes: 0
              }
            ]);
          });
      });
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
      describe("/:article_id/comments", () => {
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
        it("GET/:article_id/comments - status 200 - an array of comments for the given article_id of which each comment should have the comment_id, votes, created_at, author and body properties", () => {
          return request(app)
            .get("/api/articles/1/comments")
            .expect(200)
            .then(({ body }) => {
              expect(body.comments).to.be.an("array");
              expect(body.comments[0]).to.contain.keys(
                "comment_id",
                "votes",
                "created_at",
                "author",
                "body"
              );
            });
        });
        it("GET/:article_id/comments - status 200 - returns an array of comments for the given article_id sorted by article_id", () => {
          return request(app)
            .get("/api/articles/1/comments?sort_by=article_id")
            .expect(200)
            .then(({ body }) => {
              expect(body.comments).to.be.an("array");
              expect(body.comments).to.be.sortedBy("article_id");
            });
        });
        it("GET/:article_id/comments - status 200 - returns an array of comments for the given article_id sorted by article_id in an ascending order", () => {
          return request(app)
            .get("/api/articles/1/comments?order=asc")
            .expect(200)
            .then(({ body }) => {
              expect(body.comments).to.be.an("array");
              expect(body.comments).to.be.sortedBy("article_id", {
                ascending: true
              });
            });
        });
        it("GET/:article_id/comments - status 200 - returns an array of comments for the given article_id sorted by article_id in an descending order", () => {
          return request(app)
            .get("/api/articles/1/comments?order=asc")
            .expect(200)
            .then(({ body }) => {
              expect(body.comments).to.be.an("array");
              expect(body.comments).to.be.sortedBy("article_id", {
                ascending: true
              });
            });
        });
        it("GET status:400, for an invalid article_id", () => {
          return request(app)
            .get("/api/articles/notAndId/comments")
            .expect(400);
        });
        it("GET status:404, for an existing article_id  with no comments", () => {
          return request(app)
            .get("/api/articles/3/comments")
            .expect(404);
        });
        it("GET status:404, for a non-existing article_id  with no comments", () => {
          return request(app)
            .get("/api/articles/19999999/comments")
            .expect(404);
        });
      });
    });
  });
});
