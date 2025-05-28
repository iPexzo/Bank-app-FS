import instance from ".";

const getAllUsers = async () => {
  const { data } = await instance.get("/auth/users");
  return data;
};

const updateUserImage = async (userId: string, body: { image: string }) => {
  const { data } = await instance.put(
    `/auth/profile/${userId}/updateusers`,
    body
  );
  return data;
};

const me = async () => {
  const { data } = await instance.get("/auth/me");
  return data;
};

const userId = async () => {
  const { data } = await instance.get("/auth/userId");
  return data;
};
const my = async () => {
  const { data } = await instance.get("/transactions/my");
  console.log(" from transaction:", data);
  return data;
};

const deposit = async () => {
  const { data } = await instance.post("/transactions/deposit");
  return data;
};

const withdraw = async () => {
  const { data } = await instance.post("/transactions/withdraw");
  return data;
};

export { getAllUsers, me, my, updateUserImage, deposit, withdraw, userId };
