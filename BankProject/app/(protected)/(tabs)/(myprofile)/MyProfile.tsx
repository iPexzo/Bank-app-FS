import { getAllUsers, updateUserImage } from "@/api/users";

import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// const MyProfile = () => {
//   const [allUsers, setAllUsers] = useState("");
//   const { data, isFetching, isSuccess } = useQuery({
//     queryKey: ["getallusers"],
//     queryFn: () => getAllUsers(),
//   });

//   if (isFetching) return <Text>Loading...</Text>;
//   return (
//     <View>
//       {/* {isSuccess &&
//         data?.map((user: any) => <Text key={user.id}>{user?.username}</Text>)} */}
//     </View>
//   );
// };
// export default MyProfile;

// const styles = StyleSheet.create({});
// const MyProfile = () => {
//   const { userid } = useLocalSearchParams();
//   const user = .find((item) => item.id === Number(userid));
//   return (
//     <View
//       style={{
//         padding: 20,
//         flex: 1,
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <Image
//         source={{ uri: user?.image }}
//         style={{
//           width: 300,
//           height: 300,
//           borderRadius: 30,
//           marginRight: 15,
//           borderWidth: 2,
//         }}
//       />
//       <Text>{user?.name}</Text>
//       <Text>{user?.email}</Text>
//       <Text>{user?.salary} KWD</Text>
//     </View>
//   );
// };

// export default MyProfile;

// const styles = StyleSheet.create({});
import { useQuery } from "@tanstack/react-query";
import { me } from "@/api/users";
import { userscard } from "@/data/usersdata";
import AuthContext from "@/context/AuthContext";
import { deleteToken } from "@/api/storage";
import * as ImagePicker from "expo-image-picker";
import UserId from "../(home)/transaction1";
const MyProfileScreen = () => {
  const router = useRouter();
  const { setIsAuthenticated } = useContext(AuthContext);
  const { data, isLoading, error } = useQuery({
    queryKey: ["Meee"],
    queryFn: () => me(),
  });

  console.log("profile", data);
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#121212",
        paddingHorizontal: 20,
        paddingTop: 60,
      }}
    >
      <Text
        style={{
          fontSize: 22,
          fontWeight: "bold",
          color: "#fff",
          alignSelf: "center",
          marginBottom: 20,
        }}
      >
        Personal info
      </Text>

      <View
        style={{
          backgroundColor: "#1e3a8a",
          borderRadius: 15,
          padding: 20,
          alignItems: "center",
          marginBottom: 30,
        }}
      >
        <Image
          source={{
            uri: data?.image,
          }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 35,
            marginBottom: 10,
            borderWidth: 2,
          }}
        />
        <Text style={{ color: "#ffffff", fontSize: 20, fontWeight: "bold" }}>
          {data?.username}
        </Text>
        {/* <Text style={{ color: "#ccc", fontSize: 14, marginBottom: 10 }}></Text> */}
        <Text style={{ color: "#4ade80", fontSize: 18, fontWeight: "bold" }}>
          {data?.balance} KWD
        </Text>
      </View>

      <View>
        <TouchableOpacity
          style={{
            backgroundColor: "#374151",
            padding: 15,
            borderRadius: 10,
            marginBottom: 15,
          }}
        >
          <Text
            style={{ color: "#fff", textAlign: "center", fontWeight: "bold" }}
          >
            Edit Profile
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: "#b91c1c",
            padding: 15,
            borderRadius: 10,
          }}
          onPress={() => {
            deleteToken();

            setIsAuthenticated(false);
            router.replace("/Login");
          }}
        >
          <Text
            style={{
              color: "#ffffff",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MyProfileScreen;
