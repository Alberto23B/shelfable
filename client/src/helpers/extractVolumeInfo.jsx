export const extractVolumeInfo = (array, obj) => {
  for (let i in obj) {
    const { title } = obj[i].volumeInfo;
    let { authors } = obj[i].volumeInfo === undefined ? "" : obj[i].volumeInfo;
    const { smallThumbnail } =
      obj[i].volumeInfo.imageLinks === undefined
        ? ""
        : obj[i].volumeInfo.imageLinks;
    const { infoLink } =
      obj[i].volumeInfo === undefined ? "" : obj[i].volumeInfo;
    const { description } = obj[i].volumeInfo;
    array.push({
      title: title,
      author: authors ? authors : "",
      img: smallThumbnail,
      info: infoLink,
      description: description,
    });
  }
};
