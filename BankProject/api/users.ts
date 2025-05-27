import instance from ".";

const getAllUsers = async () => {
  const { data } = await instance.get("/auth/users");
  return data;
};

const updateUsers = async (userId: string, body: { image: string }) => {
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
  return data;
};

const deposit = async () => {
  const { data } = await instance.post("/transactions/deposit");
  return data;
};

const withdraw = async (body: { amount: number }) => {
  const { data } = await instance.post("/transactions/withdraw", body);
  return data;
};

export { getAllUsers, me, my, updateUsers, deposit, withdraw, userId };
