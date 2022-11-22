import client from "./client";

export const createActor = async (formData) => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await client.post("/actor/create", formData, {
      headers: {
        authorization: "Bearer " + token,
        "content-type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    console.log(error.response.data);
    const { response } = error;
    if (response?.data) return response.data;
    return { error: error.msg || error };
  }
};

export const updateActor = async (id, formData) => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await client.post("/actor/update/" + id, formData, {
      headers: {
        authorization: "Bearer " + token,
        "content-type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    // console.log(error.response.data);
    const { response } = error;
    // if (response?.data) return response.data;
    return { error: response?.data.msg };
  }
};

export const searchActor = async (query) => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await client.get(`/actor/search?name=${query}`, {
      headers: {
        authorization: "Bearer " + token,
        "content-type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    const { response } = error;
    return { error: response?.data.msg };
  }
};

export const getActorProfile = async (id) => {
  try {
    const { data } = await client.get(`/actor/single/${id}`);
    // console.log(data);
    return data;
  } catch (error) {
    const { response } = error;
    return { error: response?.data.msg };
  }
};

export const getActors = async (pageNo, limit) => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await client(
      `/actor/actors?pageNo=${pageNo}&limit=${limit}`,
      {
        headers: {
          authorization: "Bearer " + token,
          "content-type": "multipart/form-data",
        },
      }
    );
    return data;
  } catch (error) {
    const { response } = error;
    return { error: response?.data.msg };
  }
};

export const deleteActor = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await client.delete("/actor/" + id, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    // console.log(data);
    return data;
  } catch (error) {
    const { response } = error;
    return { error: response?.data.msg };
  }
};

export const getMovies = async (pageNo, limit) => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await client.get(
      `/movie/movies?pageNo=${pageNo}&limit=${limit}`,
      {
        headers: {
          authorization: "Bearer " + token,
          //   "content-type": "multipart/form-data",
        },
      }
    );
    // console.log(data);
    return data;
  } catch (error) {
    const { response } = error;
    // if (response?.data) return response.data;
    return { error: response?.data.msg };
  }
};

export const getMovieForUpdate = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await client.get("/movie/for-update/" + id, {
      headers: {
        authorization: "Bearer " + token,
        // "content-type": "multipart/form-data",
      },
    });
    // console.log(data);
    return data;
  } catch (error) {
    const { response } = error;
    // if (response?.data) return response.data;
    return { error: response?.data.msg };
  }
};

export const updateMovie = async (id, formData) => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await client.patch("/movie/update/" + id, formData, {
      headers: {
        authorization: "Bearer " + token,
        "content-type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    const { response } = error;
    // if (response?.data) return response.data;
    return { error: response?.data.msg };
  }
};
export const deleteMovie = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await client.delete("/movie/" + id, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    const { response } = error;
    // if (response?.data) return response.data;
    return { error: response?.data.msg };
  }
};
export const searchMovieForAdmin = async (title) => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await client(`/movie/search?title=${title}`, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    // console.log(data);
    return data;
  } catch (error) {
    const { response } = error;
    // if (response?.data) return response.data;
    return { error: response?.data.msg };
  }
};
