import instance from ".";
import { Transactions } from "@/types/types";

//List of users
const getAllUsers = async () => {
  const { data } = await instance.get("/auth/users");
  return data;
};

// update
// const updateUserImage = async (userId: string, body: { image: string }) => {
//   const { data } = await instance.put(
//     `/auth/profile/${userId}/updateusers`,
//     body
//   );
//   return data;
// };

//get your profile
const me = async () => {
  const { data } = await instance.get("/auth/me");
  return data;
};

// get user info by user id
const userId = async () => {
  const { data } = await instance.get("/auth/userId");
  return data;
};
// get your transaction
const my = async () => {
  const { data } = await instance.get("/transactions/my");
  console.log(" from transaction:", data);
  return data;
};

//
const deposit = async (amount: number) => {
  const { data } = await instance.put("/transactions/deposit", {
    amount,
  });
  return data;
};
//
const withdraw = async (amount: number) => {
  const { data } = await instance.put("/transactions/withdraw", {
    amount,
  });
  return data;
};
//
const transferMoney = async (Amount: number, username: string) => {
  const { data } = await instance.put(`/transactions/transfer/${username}`, {
    amount: Number(Amount),
  });
  console.log(" from transaction:", data);
  return data;
};

const profile = async (updatedInfo: { image: string }) => {
  const formData = new FormData();

  formData.append("image", {
    uri: updatedInfo.image,
    name: "profile.jpg",
    type: "image/jpeg",
  } as any);

  const { data } = await instance.put("/auth/profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export {
  getAllUsers,
  me,
  my,
  // updateUserImage,
  deposit,
  withdraw,
  userId,
  transferMoney,
  profile,
};
