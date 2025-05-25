import instance from ".";

const getAllUsers = async () => {
  const { data } = await instance.get("users");
  return data;
};

const updateUsers = async (userId: string) => {
  const { data } = await instance.put(`users/${userId}/updateusers`);
  return data;
};

const me = async () => {
  const { data } = await instance.get("/auth/me");
  return data;
};

const my = async () => {
  const { data } = await instance.get("/transactions/my");
  return data;
};

export { getAllUsers, updateUsers, me, my };
