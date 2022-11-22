const { default: client } = require("./client");

export const createUser = async (userInfo) => {
  try {
    const { data } = await client.post("/auth/create", userInfo);
    return data;
  } catch (error) {
    const { response } = error;
    return { error: response?.data.msg };
  }
};
