import client from "./client";

export const addReview = async (movieId, reviewData) => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await client.post(`/review/add/${movieId}`, reviewData, {
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

export const getReviewByMovie = async (movieId) => {
  try {
    const { data } = await client.get(
      `/review/get-reviews-by-movie/${movieId}`
    );
    return data;
  } catch (error) {
    const { response } = error;
    return { error: response?.data.msg };
  }
};

export const deleteReview = async (reviewId) => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await client.delete(`/review/${reviewId}`, {
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

export const updateReview = async (reviewId, reviewData) => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await client.patch(`/review/${reviewId}`, reviewData, {
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
