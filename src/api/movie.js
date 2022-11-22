import client from "./client";

export const getTopRatedMovies = async (type) => {
  try {
    let endpoint = "/movie/top-rated";
    if (type) endpoint = endpoint + "?type=" + type;
    const { data } = await client(endpoint);
    return data;
  } catch (error) {
    const { response } = error;
    return { error: response?.data.msg };
  }
};

export const getLatestUploads = async () => {
  try {
    const { data } = await client("/movie/latest-uploads");
    return data;
  } catch (error) {
    const { response } = error;
    return { error: response?.data.msg };
  }
};

export const getSingleMovie = async (id) => {
  try {
    const { data } = await client("/movie/single/" + id);
    return data;
  } catch (error) {
    const { response } = error;
    return { error: response?.data.msg };
  }
};

export const getRelatedMovies = async (id) => {
  try {
    const { data } = await client("/movie/related/" + id);
    return data;
  } catch (error) {
    const { response } = error;
    return { error: response?.data.msg };
  }
};

export const searchPublicMovies = async (title) => {
  try {
    const { data } = await client("/movie/search-public?title=" + title);
    return data;
  } catch (error) {
    const { response } = error;
    return { error: response?.data.msg };
  }
};
