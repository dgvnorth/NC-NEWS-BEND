process.env.NODE_ENV = "test";

const { expect } = require("chai");
const request = require("supertest");

const app = require("../app");
const connection = require("../db/connection");

describe("/", () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());

  describe.only("/api", () => {
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
        it("GET status:400, for an non existing username", () => {
          return request(app)
            .get("/api/users/notAndId")
            .expect(400);
        });
        it("GET status:404, when route not found", () => {
          return request(app)
            .get("/api/userss/butter_bridge")
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
              expect(body.article).to.eql({
                author: "butter_bridge",
                title: "They're not exactly dogs, are they?",
                article_id: 9,
                body: "Well? Think about it.",
                topic: "mitch",
                created_at: "1986-11-23T12:21:54.171Z",
                votes: 0,
                comment_count: "2"
              });
            });
        });
        it("GET status:400, for an invalid article_id", () => {
          return request(app)
            .get("/api/articles/notAndId")
            .expect(400);
        });
        it("GET status:404, when route not found", () => {
          return request(app)
            .get("/api/articless/1")
            .expect(404);
        });
        it("GET status:404, for a non-existing article_id", () => {
          return request(app)
            .get("/api/articless/199")
            .expect(404);
        });
      });
    });
  });
});
