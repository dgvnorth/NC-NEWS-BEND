// exports.createRef = (array, value1, value2) => {
//   return array.reduce((acc, cur) => {
//     console.log(cur);
//     acc[cur[value1]] = cur[value2];
//     return acc;
//   }, {});
// };

exports.formatTimeStamps = articles => {
  return articles.map(article => {
    let { created_at: timeStamp, ...restOfArr } = article;
    return { created_at: new Date(timeStamp), ...restOfArr };
  });
};
