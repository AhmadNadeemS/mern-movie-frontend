export const validateMovie = (movieInfo) => {
  const {
    title,
    storyLine,
    tags,
    cast,
    director,
    writers,
    releaseDate,
    poster,
    genres,
    type,
    language,
    status,
  } = movieInfo;
  if (!title.trim()) return { error: "Title is missing" };
  if (!storyLine.trim()) return { error: "storyLine is missing" };
  if (!language.trim()) return { error: "language is missing" };
  if (!releaseDate.trim()) return { error: "releaseDate is missing" };
  if (!type.trim()) return { error: "type is missing" };
  if (!status.trim()) return { error: "status is missing" };
  if (!genres.length) return { error: "genres is missing" };
  for (let gen of genres) {
    if (!gen.trim()) return { error: "invalid genres" };
  }
  if (!tags.length) return { error: "tags is missing" };
  for (let tag of tags) {
    if (!tag.trim()) return { error: "invalid tags" };
  }
  if (!cast.length) return { error: "cast is missing" };
  for (let c of cast) {
    if (typeof c !== "object") return { error: "invalid cast" };
  }
  return { error: null };
};
