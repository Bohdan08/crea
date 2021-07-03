/* changes nullable values to empty strings */

const removeNullsInObject = (obj) => {
  for (let key in obj) {
    if (obj[key] === null) {
      obj[key] = "";
    }
  }
  return obj;
};

export default removeNullsInObject;
