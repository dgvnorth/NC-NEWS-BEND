exports.createRef = (array, key, value) => {
  return array.reduce((acc, cur) => {
    acc[cur[key]] = cur[value];
    return acc;
  }, {});
};

exports.formatTimeStamps = articles => {
  return articles.map(article => {
    let { created_at: timeStamp, ...restOfArr } = article;
    return { created_at: new Date(timeStamp), ...restOfArr };
  });
};

exports.formatBelongToComments = (comments, articlesRef) => {
  return comments.map(comment => {
    let { belongs_to, ...restOfArr } = comment;
    return { article_id: articlesRef[belongs_to], ...restOfArr };
  });
};

exports.renameCommentsKeys = (comments, keyToChange, newKey) => {
  return comments.map(comment => {
    const { created_by, ...restOfArr } = comment;
    return { author: created_by, ...restOfArr };
  });
};
