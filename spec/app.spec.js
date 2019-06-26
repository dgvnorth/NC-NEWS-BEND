process.env.NODE_ENV = "test";
const request = require("supertest");

const chai = require("chai");
chai.use(require("chai-sorted"));
const { expect } = chai;

const app = require("../app");
const connection = require("../db/connection");

describe("/", () => {
  beforeEach(function() {
    this.timeout(4000);
    return connection.seed.run();
  });
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
            expect(body.topics).to.be.an("array");
            expect(body.topics[0]).to.contain.keys("slug", "description");
          });
      });
      it("PATCH status:405, for an invalid method", () => {
        return request(app)
          .patch("/api/topics")
          .expect(405);
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
            .expect(404)
            .then(res => {
              expect(res.body.message).to.equal("username not found");
            });
        });
        it("PUT/:username - status:405, for an invalid method", () => {
          return request(app)
            .put("/api/users/1000")
            .expect(405);
        });
      });
    });
    describe("/articles", () => {
      it("GET status:200, returns all article objects containing the author, article_id, body, topic, created_at, votes and comment_count properties", () => {
        return request(app)
          .get("/api/articles")
          .expect(200)
          .then(({ body }) => {
            expect(body.articles[0]).to.be.an("object");
            expect(body.articles[0]).to.contain.keys(
              "author",
              "title",
              "article_id",
              "body",
              "topic",
              "created_at",
              "votes",
              "comment_count"
            );
            expect(body.articles[0].comment_count).to.equal("13");
          });
      });
      it("GET status:200, returns an article object sorted_by any valid column containing the author, article_id, body, topic, created_at, votes and comment_count properties", () => {
        return request(app)
          .get("/api/articles?sort_by=author")
          .expect(200)
          .then(({ body }) => {
            const sorted_by = "author";
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
              descending: true
            });
          });
      });
      it("GET status:200, returns filtered articles by the username value specified in the query", () => {
        return request(app)
          .get("/api/articles?author=butter_bridge")
          .expect(200)
          .then(({ body }) => {
            const articles = body.articles;
            const constainAuthor = ({ articles }) => {
              let count = 0;
              for (let i = 0; i < articles.length; i++) {
                count++;
              }
              return count;
            };
            expect(body.articles).to.be.an("array");
            expect(constainAuthor({ articles })).to.equal(3);
          });
      });
      it("GET status:200, returns filtered articles by the topic value specified in the query", () => {
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
                comment_count: "2",
                created_at: "2002-11-19T12:21:54.171Z",
                votes: 0
              }
            ]);
          });
      });
      it("GET/:topic - status:404 - when topic not found", () => {
        return request(app)
          .get("/api/articles?topic=noExistingTopic")
          .expect(404)
          .then(res => {
            expect(res.body.message).to.equal("not found");
          });
      });
      it("GET/:author - status:404 - when author not found", () => {
        return request(app)
          .get("/api/articles?author=noExistingAuthor")
          .expect(404)
          .then(res => {
            expect(res.body.message).to.equal("not found");
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
              expect(body.article.comment_count).to.equal("13");
            });
        });
        it.only("GET status:400, for an invalid article_id", () => {
          return request(app)
            .get("/api/articles/notAndId")
            .expect(400)
            .then(res => {
              expect(res.body.message).to.equal(
                '400: invalid input syntax for integer: "notAndId"'
              );
            });
        });
        it("GET status:404, for a non-existing article_id", () => {
          return request(app)
            .get("/api/articles/1999999")
            .expect(404)
            .then(res => {
              expect(res.body.message).to.equal("article not found");
            });
        });
        it("PATCH /:article_id - status:200, increments votes and returns the updated article", () => {
          const newVote = 1;
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
                votes: 101
              });
            });
        });
        it("PATCH/:article_id - status:400 - for an invalid article_id", () => {
          const newVote = 10;
          return request(app)
            .patch("/api/articles/notAndId")
            .send({ inc_votes: newVote })
            .expect(400)
            .then(res => {
              expect(res.body.message).to.equal(
                ' invalid input syntax for integer: "notAndId"'
              );
            });
        });
        it("PATCH/:article_id - status:404 - for a non-existing article_id", () => {
          const newVote = 10;
          return request(app)
            .patch("/api/articles/1999999")
            .send({ inc_votes: newVote })
            .expect(404)
            .then(res => {
              expect(res.body.message).to.equal("article not found");
            });
        });
        it("PATCH status:405, for an invalid method when no passing article_id", () => {
          return request(app)
            .patch("/api/articles")
            .expect(405);
        });
        it("PUT/:article_id - status:405, for an invalid method", () => {
          return request(app)
            .put("/api/articles/1")
            .expect(405);
        });
      });
      describe("/:article_id/comments", () => {
        it("POST/:article_id/comments  - status:201 - accepts an object with the username and body properties and responds with the posted comment", () => {
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
        it("POST/:article_id/comments  - status:400 - when passed a comment object with missing required keys", () => {
          return request(app)
            .post("/api/articles/1/comments")
            .send({
              username: 1,
              body: ""
            })
            .expect(400)
            .then(res => {
              const actual =
                ' insert or update on table "comments" violates foreign key constraint "comments_author_foreign"';
              expect(res.body.message).to.equal(actual);
            });
        });
        it("POST/:article_id/comments  - status:400 - when passed an empty comment object", () => {
          return request(app)
            .post("/api/articles/1/comments")
            .send({})
            .expect(400)
            .then(res => {
              expect(res.body.message).to.equal(
                ' null value in column "author" violates not'
              );
            });
        });
        it("POST/:article_id/comments - status:404 - valid article_id does not exist", () => {
          return request(app)
            .post("/api/articles/19999/comments")
            .send({
              username: 1,
              body: "testing"
            })
            .expect(404)
            .then(res => {
              expect(res.body.message).to.equal("article not found");
            });
        });
        it("GET/:article_id/comments - status:200 - an array of comments for the given article_id of which each comment should have the comment_id, votes, created_at, author and body properties", () => {
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
        it("GET/:article_id/comments - status:200 - returns an array of comments for the given article_id sorted by article_id", () => {
          return request(app)
            .get("/api/articles/1/comments?sort_by=votes")
            .expect(200)
            .then(({ body }) => {
              expect(body.comments).to.be.an("array");
              expect(body.comments).to.be.sortedBy("votes", {
                descending: true
              });
            });
        });
        it("GET/:article_id/comments - status:200 - returns an array of comments for the given article_id sorted by article_id in an ascending order", () => {
          return request(app)
            .get("/api/articles/1/comments?order=asc")
            .expect(200)
            .then(({ body }) => {
              expect(body.comments).to.be.an("array");
              expect(body.comments).to.be.sortedBy("created_at", {
                ascending: true
              });
            });
        });
        it("GET/:article_id/comments - status:200 - returns an array of comments for the given article_id sorted by article_id in an descending order", () => {
          return request(app)
            .get("/api/articles/1/comments?order=desc")
            .expect(200)
            .then(({ body }) => {
              expect(body.comments).to.be.an("array");
              expect(body.comments).to.be.sortedBy("created_at", {
                descending: true
              });
            });
        });
        it("GET status:400, for an invalid article_id", () => {
          return request(app)
            .get("/api/articles/notAndId/comments")
            .expect(400)
            .then(res => {
              expect(res.body.message).to.equal(
                ' invalid input syntax for integer: "notAndId"'
              );
            });
        });
        it("GET status:404, for an existing article_id  with no comments", () => {
          return request(app)
            .get("/api/articles/99999/comments")
            .expect(404)
            .then(res => {
              expect(res.body.message).to.equal("article not found");
            });
        });
        it("PUT/:article_id/comments - status:405 - for an invalid method", () => {
          return request(app)
            .put("/api/articles/3/comments")
            .expect(405);
        });
      });
      describe("/comments/:comment_id", () => {
        it("PATCH /:comment_id - status:200, increments votes and returns the updated comment", () => {
          const newVote = 1;
          return request(app)
            .patch("/api/comments/3")
            .send({ inc_votes: newVote })
            .expect(200)
            .then(({ body }) => {
              expect(body.comment).to.eql({
                comment_id: 3,
                author: "icellusedkars",
                article_id: 1,
                votes: 101,
                created_at: "2015-11-23T12:36:03.389Z",
                body:
                  "Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works."
              });
            });
        });
        it("PATCH/:comment_id - status:400 - for an invalid comment_id", () => {
          const newVote = 10;
          return request(app)
            .patch("/api/comments/notAndId")
            .send({ inc_votes: newVote })
            .expect(400)
            .then(res => {
              expect(res.body.message).to.equal(
                ' invalid input syntax for integer: "notAndId"'
              );
            });
        });
        it("PATCH/:comment_id - status:404 - for a non-existing comment_id", () => {
          const newVote = 10;
          return request(app)
            .patch("/api/comments/1999999")
            .send({ inc_votes: newVote })
            .expect(404)
            .then(res => {
              expect(res.body.message).to.equal("comment not found");
            });
        });
        it("PUT/:comments_id - status:405, for an invalid method", () => {
          return request(app)
            .put("/api/comments/1")
            .expect(405);
        });
        it("DELETE/:comment_id - status:204 - deletes the selected comment", () => {
          return request(app)
            .delete("/api/comments/3")
            .expect(204);
        });
        it("DELETE/:comment_id - status:400 - for an invalid comment_id", () => {
          return request(app)
            .patch("/api/comments/notAndId")
            .expect(400)
            .then(res => {
              expect(res.body.message).to.equal(
                ' invalid input syntax for integer: "notAndId"'
              );
            });
        });
        it("DELETE/:comment_id - status:400 - for an non-existing comment_id", () => {
          return request(app)
            .patch("/api/comments/199999")
            .expect(404)
            .then(res => {
              expect(res.body.message).to.equal("comment not found");
            });
        });
      });
    });
  });
});
