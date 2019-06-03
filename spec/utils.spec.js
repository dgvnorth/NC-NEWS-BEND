const { createRef, formatTimeStamps } = require("../utils/index");
const { expect } = require("chai");

describe("formatTimeStamps", () => {
  it("returns a new empty array, when passed an empty array", () => {
    const articles = [];
    const actual = formatTimeStamps(articles);
    const expected = [];
    expect(actual).to.eql(expected);
    expect(actual).to.not.equal(articles);
  });
  it("returns and array of one sigle object after having changed the created_at property with the right format", () => {
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
  it("returns and array of multiple objects after having changed the created_at property with the right format", () => {
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

// describe.only("createRef", () => {
//   it("returns and empty object when passed and empty array", () => {
//     const owners = [];
//     const actualResult = createRef(owners);
//     const expectedResult = {};
//     expect(actualResult).to.eql(expectedResult);
//   });
//   it("creates an object containing owner name as a key and the id as its value", () => {
//     const owners = [{ forename: "ant", owner_id: 1 }];
//     const actualResult = createRef(owners);
//     const expectedResult = { ant: 1 };
//     expect(actualResult).to.eql(expectedResult);
//   });
//   it("creates an object containing multiple owner names as a key and the id as its value", () => {
//     const owners = [
//       { forename: "ant", owner_id: 1 },
//       { forename: "mitch", owner_id: 2 },
//       { forename: "alex", owner_id: 3 }
//     ];
//     const actualResult = createRef(owners);
//     const expectedResult = { ant: 1, mitch: 2, alex: 3 };
//     expect(actualResult).to.eql(expectedResult);
//   });
// });
