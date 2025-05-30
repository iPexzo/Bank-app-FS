import instance from ".";
import { Transactions } from "@/types/types";
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

const deposit = async (Amount: number) => {
  const { data } = await instance.put("/transactions/deposit", {
    amount: Amount,
  });
  return data;
};

const withdraw = async (Amount: number) => {
  const { data } = await instance.put("/transactions/withdraw", {
    amount: Amount,
  });
  return data;
};
const transferMoney = async (Amount: number, username: string) => {
  const { data } = await instance.put(`/transactions/transfer/${username}`, {
    amount: Amount,
  });
  console.log(" from transaction:", data);
  return data;
};

export {
  getAllUsers,
  me,
  my,
  updateUserImage,
  deposit,
  withdraw,
  userId,
  transferMoney,
};
