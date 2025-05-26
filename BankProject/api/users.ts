import instance from ".";

const getAllUsers = async () => {
  const { data } = await instance.get("/mini-project/api/auth/users");
  return data;
};

const updateUsers = async (userId: string) => {
  const { data } = await instance.put(
    `/mini-project/api/auth/profile/${userId}/updateusers`
  );
  return data;
};

const me = async () => {
  const { data } = await instance.get("/mini-project/api/auth/me");
  return data;
};

const my = async () => {
  const { data } = await instance.get("/mini-project/api/transactions/my");
  return data;
};

const deposit = async () => {
  const { data } = await instance.post(
    "/mini-project/api/transactions/deposit"
  );
  return data;
};

const withdraw = async () => {
  const { data } = await instance.post(
    "/mini-project/api/transactions/withdraw"
  );
  return data;
};

export { getAllUsers, me, my, updateUsers, deposit, withdraw };
