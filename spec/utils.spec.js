const {
  createRef,
  formatTimeStamps,
  formatBelongToComments,
  renameCommentsKeys
} = require("../utils/index");
const { expect } = require("chai");

describe("formatTimeStamps()", () => {
  it("returns a new empty array, when passed an empty array", () => {
    const articles = [];
    const actual = formatTimeStamps(articles);
    const expected = [];
    expect(actual).to.eql(expected);
    expect(actual).to.not.equal(articles);
  });
  it("returns an array of one sigle object after having changed the created_at property with the right format", () => {
    const articles = [
      {
        title: "Running a Node App",
        topic: "coding",
        author: "jessjelly",
        body:
          "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
        created_at: 1471522072389
      }
    ];
    const actual = formatTimeStamps(articles);
    const expected = [
      {
        title: "Running a Node App",
        topic: "coding",
        author: "jessjelly",
        body:
          "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
        created_at: new Date(1471522072389)
      }
    ];
    expect(actual).to.eql(expected);
    expect(actual).to.not.equal(articles);
  });
  it("returns an array of multiple objects after having changed the created_at property with the right format", () => {
    const articles = [
      {
        title:
          "The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
        topic: "coding",
        author: "jessjelly",
        body:
          "Many people know Watson as the IBM-developed cognitive super computer that won the Jeopardy! gameshow in 2011. In truth, Watson is not actually a computer but a set of algorithms and APIs, and since winning TV fame (and a $1 million prize) IBM has put it to use tackling tough problems in every industry from healthcare to finance. Most recently, IBM has announced several new partnerships which aim to take things even further, and put its cognitive capabilities to use solving a whole new range of problems around the world.",
        created_at: 1500584273256
      },
      {
        title: "22 Amazing open source React projects",
        topic: "coding",
        author: "happyamy2016",
        body:
          "This is a collection of open source apps built with React.JS library. In this observation, we compared nearly 800 projects to pick the top 22. (React Native: 11, React: 11). To evaluate the quality, Mybridge AI considered a variety of factors to determine how useful the projects are for programmers. To give you an idea on the quality, the average number of Github stars from the 22 projects was 1,681.",
        created_at: 1500659650346
      },
      {
        title: "Making sense of Redux",
        topic: "coding",
        author: "jessjelly",
        body:
          "When I first started learning React, I remember reading lots of articles about the different technologies associated with it. In particular, this one article stood out. It mentions how confusing the ecosystem is, and how developers often feel they have to know ALL of the ecosystem before using React. And as someone who’s used React daily for the past 8 months or so, I can definitely say that I’m still barely scratching the surface in terms of understanding how the entire ecosystem works! But my time spent using React has given me some insight into when and why it might be appropriate to use another technology — Redux (a variant of the Flux architecture).",
        created_at: 1514093931240
      }
    ];
    const actual = formatTimeStamps(articles);
    const expected = [
      {
        title:
          "The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
        topic: "coding",
        author: "jessjelly",
        body:
          "Many people know Watson as the IBM-developed cognitive super computer that won the Jeopardy! gameshow in 2011. In truth, Watson is not actually a computer but a set of algorithms and APIs, and since winning TV fame (and a $1 million prize) IBM has put it to use tackling tough problems in every industry from healthcare to finance. Most recently, IBM has announced several new partnerships which aim to take things even further, and put its cognitive capabilities to use solving a whole new range of problems around the world.",
        created_at: new Date(1500584273256)
      },
      {
        title: "22 Amazing open source React projects",
        topic: "coding",
        author: "happyamy2016",
        body:
          "This is a collection of open source apps built with React.JS library. In this observation, we compared nearly 800 projects to pick the top 22. (React Native: 11, React: 11). To evaluate the quality, Mybridge AI considered a variety of factors to determine how useful the projects are for programmers. To give you an idea on the quality, the average number of Github stars from the 22 projects was 1,681.",
        created_at: new Date(1500659650346)
      },
      {
        title: "Making sense of Redux",
        topic: "coding",
        author: "jessjelly",
        body:
          "When I first started learning React, I remember reading lots of articles about the different technologies associated with it. In particular, this one article stood out. It mentions how confusing the ecosystem is, and how developers often feel they have to know ALL of the ecosystem before using React. And as someone who’s used React daily for the past 8 months or so, I can definitely say that I’m still barely scratching the surface in terms of understanding how the entire ecosystem works! But my time spent using React has given me some insight into when and why it might be appropriate to use another technology — Redux (a variant of the Flux architecture).",
        created_at: new Date(1514093931240)
      }
    ];
    expect(actual).to.eql(expected);
    expect(actual).to.not.equal(articles);
  });
});

describe("createRef()", () => {
  it("returns an empty object when passed and empty array", () => {
    const articlesData = [];
    const actualResult = createRef(articlesData, "title", "article_id");
    const expectedResult = {};
    expect(actualResult).to.eql(expectedResult);
  });
  it("creates an object with the article title as key and the article id as its value when passed a single article", () => {
    const articlesData = [
      {
        article_id: 1,
        title: "Running a Node App",
        topic: "coding",
        author: "jessjelly",
        body:
          "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
        created_at: new Date(1471522072389)
      }
    ];
    const actualResult = createRef(articlesData, "title", "article_id");
    const expectedResult = {
      "Running a Node App": 1
    };
    expect(actualResult).to.eql(expectedResult);
  });
  it("creates an object with the article titles as keys and the article id's as their values when passed multiple articles", () => {
    const articlesData = [
      {
        article_id: 1,
        title: "Running a Node App",
        topic: "coding",
        author: "jessjelly",
        body:
          "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
        created_at: 1471522072389
      },
      {
        article_id: 2,
        title:
          "The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
        topic: "coding",
        author: "jessjelly",
        body:
          "Many people know Watson as the IBM-developed cognitive super computer that won the Jeopardy! gameshow in 2011. In truth, Watson is not actually a computer but a set of algorithms and APIs, and since winning TV fame (and a $1 million prize) IBM has put it to use tackling tough problems in every industry from healthcare to finance. Most recently, IBM has announced several new partnerships which aim to take things even further, and put its cognitive capabilities to use solving a whole new range of problems around the world.",
        created_at: 1500584273256
      },
      {
        article_id: 3,
        title: "22 Amazing open source React projects",
        topic: "coding",
        author: "happyamy2016",
        body:
          "This is a collection of open source apps built with React.JS library. In this observation, we compared nearly 800 projects to pick the top 22. (React Native: 11, React: 11). To evaluate the quality, Mybridge AI considered a variety of factors to determine how useful the projects are for programmers. To give you an idea on the quality, the average number of Github stars from the 22 projects was 1,681.",
        created_at: 1500659650346
      }
    ];
    const actualResult = createRef(articlesData, "title", "article_id");
    const expectedResult = {
      "Running a Node App": 1,
      "The Rise Of Thinking Machines: How IBM's Watson Takes On The World": 2,
      "22 Amazing open source React projects": 3
    };
    expect(actualResult).to.eql(expectedResult);
  });
});
describe("formatBelongToComments()", () => {
  it("returns a new empty array, when passed an empty array", () => {
    const comments = [];
    const articlesRef = {};
    const actual = formatBelongToComments(comments, articlesRef);
    const expected = [];
    expect(actual).to.eql(expected);
    expect(actual).to.not.equal(comments);
  });
  it("returns an array of a single object after having changed the belong_to key pair to the right format", () => {
    const comments = [
      {
        body:
          "Qui sunt sit voluptas repellendus sed. Voluptatem et repellat fugiat. Rerum doloribus eveniet quidem vero aut sint officiis. Dolor facere et et architecto vero qui et perferendis dolorem. Magni quis ratione adipisci error assumenda ut. Id rerum eos facere sit nihil ipsam officia aspernatur odio.",
        belongs_to: "22 Amazing open source React projects",
        created_by: "grumpy19",
        votes: 3,
        created_at: 1504183900263
      }
    ];
    const articlesRef = { "22 Amazing open source React projects": 3 };
    const actual = formatBelongToComments(comments, articlesRef);
    const expected = [
      {
        body:
          "Qui sunt sit voluptas repellendus sed. Voluptatem et repellat fugiat. Rerum doloribus eveniet quidem vero aut sint officiis. Dolor facere et et architecto vero qui et perferendis dolorem. Magni quis ratione adipisci error assumenda ut. Id rerum eos facere sit nihil ipsam officia aspernatur odio.",
        article_id: 3,
        created_by: "grumpy19",
        votes: 3,
        created_at: 1504183900263
      }
    ];
    expect(actual).to.eql(expected);
    expect(actual).to.not.equal(comments);
  });
  it("returns an array of multiple objects after having changed the belong_to key pairs to the right format", () => {
    const comments = [
      {
        body:
          "Qui sunt sit voluptas repellendus sed. Voluptatem et repellat fugiat. Rerum doloribus eveniet quidem vero aut sint officiis. Dolor facere et et architecto vero qui et perferendis dolorem. Magni quis ratione adipisci error assumenda ut. Id rerum eos facere sit nihil ipsam officia aspernatur odio.",
        belongs_to: "22 Amazing open source React projects",
        created_by: "grumpy19",
        votes: 3,
        created_at: 1504183900263
      },
      {
        body:
          "Est pariatur quis ipsa culpa unde temporibus et accusantium rerum. Consequatur in occaecati aut non similique aut quibusdam. Qui sunt magnam iure blanditiis. Et est non enim. Est ab vero dolor.",
        belongs_to:
          "The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
        created_by: "jessjelly",
        votes: -1,
        created_at: 1468655332950
      },
      {
        body:
          "Sit sequi odio suscipit. Iure quisquam qui alias distinctio eos officia enim aut sit. Corrupti ut praesentium ut iste earum itaque qui. Dolores in ab rerum consequuntur. Id ab aliquid autem dolore.",
        belongs_to: "Running a Node App",
        created_by: "weegembump",
        votes: 11,
        created_at: 1454293795551
      }
    ];
    const articlesRef = {
      "22 Amazing open source React projects": 3,
      "The Rise Of Thinking Machines: How IBM's Watson Takes On The World": 2,
      "Running a Node App": 1
    };
    const actual = formatBelongToComments(comments, articlesRef);
    const expected = [
      {
        body:
          "Qui sunt sit voluptas repellendus sed. Voluptatem et repellat fugiat. Rerum doloribus eveniet quidem vero aut sint officiis. Dolor facere et et architecto vero qui et perferendis dolorem. Magni quis ratione adipisci error assumenda ut. Id rerum eos facere sit nihil ipsam officia aspernatur odio.",
        article_id: 3,
        created_by: "grumpy19",
        votes: 3,
        created_at: 1504183900263
      },
      {
        body:
          "Est pariatur quis ipsa culpa unde temporibus et accusantium rerum. Consequatur in occaecati aut non similique aut quibusdam. Qui sunt magnam iure blanditiis. Et est non enim. Est ab vero dolor.",
        article_id: 2,
        created_by: "jessjelly",
        votes: -1,
        created_at: 1468655332950
      },
      {
        body:
          "Sit sequi odio suscipit. Iure quisquam qui alias distinctio eos officia enim aut sit. Corrupti ut praesentium ut iste earum itaque qui. Dolores in ab rerum consequuntur. Id ab aliquid autem dolore.",
        article_id: 1,
        created_by: "weegembump",
        votes: 11,
        created_at: 1454293795551
      }
    ];
    expect(actual).to.eql(expected);
    expect(actual).to.not.equal(comments);
  });
});
describe("renameCommentsKeys()", () => {
  it("returns a new empty array, when passed an empty array", () => {
    const comments = [];
    const keyToChange = "created_by";
    const newKey = "author";
    const actual = renameCommentsKeys(comments, keyToChange, newKey);
    const expected = [];
    expect(actual).to.eql(expected);
    expect(actual).to.not.equal(comments);
  });
  it("returns a new array with one object after having renamed created_by by author", () => {
    const comments = [
      {
        body:
          "Sit sequi odio suscipit. Iure quisquam qui alias distinctio eos officia enim aut sit. Corrupti ut praesentium ut iste earum itaque qui. Dolores in ab rerum consequuntur. Id ab aliquid autem dolore.",
        article_id: 1,
        created_by: "weegembump",
        votes: 11,
        created_at: 1454293795551
      }
    ];
    const keyToChange = "created_by";
    const newKey = "author";
    const actual = renameCommentsKeys(comments, keyToChange, newKey);
    const expected = [
      {
        body:
          "Sit sequi odio suscipit. Iure quisquam qui alias distinctio eos officia enim aut sit. Corrupti ut praesentium ut iste earum itaque qui. Dolores in ab rerum consequuntur. Id ab aliquid autem dolore.",
        article_id: 1,
        author: "weegembump",
        votes: 11,
        created_at: 1454293795551
      }
    ];
    expect(actual).to.eql(expected);
    expect(actual).to.not.equal(comments);
  });
  it("returns a new array with multiple objects after having renamed created_by by author", () => {
    const comments = [
      {
        body:
          "Sit sequi odio suscipit. Iure quisquam qui alias distinctio eos officia enim aut sit. Corrupti ut praesentium ut iste earum itaque qui. Dolores in ab rerum consequuntur. Id ab aliquid autem dolore.",
        article_id: 1,
        created_by: "weegembump",
        votes: 11,
        created_at: 1454293795551
      },
      {
        body:
          "Est pariatur quis ipsa culpa unde temporibus et accusantium rerum. Consequatur in occaecati aut non similique aut quibusdam. Qui sunt magnam iure blanditiis. Et est non enim. Est ab vero dolor.",
        article_id: 2,
        created_by: "jessjelly",
        votes: -1,
        created_at: 1468655332950
      },
      {
        body:
          "Qui sunt sit voluptas repellendus sed. Voluptatem et repellat fugiat. Rerum doloribus eveniet quidem vero aut sint officiis. Dolor facere et et architecto vero qui et perferendis dolorem. Magni quis ratione adipisci error assumenda ut. Id rerum eos facere sit nihil ipsam officia aspernatur odio.",
        article_id: 3,
        created_by: "grumpy19",
        votes: 3,
        created_at: 1504183900263
      }
    ];
    const keyToChange = "created_by";
    const newKey = "author";
    const actual = renameCommentsKeys(comments, keyToChange, newKey);
    const expected = [
      {
        body:
          "Sit sequi odio suscipit. Iure quisquam qui alias distinctio eos officia enim aut sit. Corrupti ut praesentium ut iste earum itaque qui. Dolores in ab rerum consequuntur. Id ab aliquid autem dolore.",
        article_id: 1,
        author: "weegembump",
        votes: 11,
        created_at: 1454293795551
      },
      {
        body:
          "Est pariatur quis ipsa culpa unde temporibus et accusantium rerum. Consequatur in occaecati aut non similique aut quibusdam. Qui sunt magnam iure blanditiis. Et est non enim. Est ab vero dolor.",
        article_id: 2,
        author: "jessjelly",
        votes: -1,
        created_at: 1468655332950
      },
      {
        body:
          "Qui sunt sit voluptas repellendus sed. Voluptatem et repellat fugiat. Rerum doloribus eveniet quidem vero aut sint officiis. Dolor facere et et architecto vero qui et perferendis dolorem. Magni quis ratione adipisci error assumenda ut. Id rerum eos facere sit nihil ipsam officia aspernatur odio.",
        article_id: 3,
        author: "grumpy19",
        votes: 3,
        created_at: 1504183900263
      }
    ];
    expect(actual).to.eql(expected);
    expect(actual).to.not.equal(comments);
  });
});
