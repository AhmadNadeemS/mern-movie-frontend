import client from "./client";

export const getAppInfo = async () => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await client("/admin/app-info", {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    const { response } = error;
    return { error: response?.data.msg };
  }
};

export const getMostRatedMovies = async () => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await client("/admin/most-rated", {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    const { response } = error;
    return { error: response?.data.msg };
  }
};
