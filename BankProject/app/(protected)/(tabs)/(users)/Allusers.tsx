import { getAllUsers } from "@/api/users";
import { userscard } from "@/data/usersdata";
import { useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
// import { users } from "@/app/data/users";

// const UsersScreen = () => {
//   const [allUsers, setAllUsers] = useState("");
//   const { data, isFetching, isSuccess } = useQuery({
//     queryKey: ["getallusers"],
//     queryFn: () => getAllUsers(),
//   });

//   console.log("Fetching all users...", data);

//   if (isFetching) return <Text>Loading...</Text>;
//   return (
//     <View>
//       {isSuccess &&
//         data?.map((user: any) => <Text key={user.id}>{user.name}</Text>)}
//     </View>
//   );
// };

// export default UsersScreen;

// const styles = StyleSheet.create({});
const Allusers = () => {
  return (
    <View style={{ padding: 20, backgroundColor: "#2f4f4f", flex: 1 }}>
      <View>
        <Text
          style={{
            color: "white",
            marginBottom: 20,
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          LIST OF USERS:
        </Text>
      </View>
      <ScrollView>
        {userscard.map((users) => (
          <View
            key={users.id}
            style={{
              flexDirection: "row",
              backgroundColor: "#191970",
              padding: 15,
              marginBottom: 15,
              borderRadius: 15,
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: users.image }}
              style={{
                width: 55,
                height: 55,
                borderRadius: 30,
                marginRight: 15,
                borderWidth: 2,
              }}
            />

            <View style={{ width: "70%" }}>
              <Text
                style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
              >
                {users.name}
              </Text>
              <Text style={{ color: "#cdcdcd", fontSize: 13, marginTop: 2 }}>
                {users.email}
              </Text>
              <Text
                style={{
                  color: "#32cd32",
                  fontSize: 15,
                  fontWeight: "600",
                  marginTop: 5,
                }}
              >
                ${users.salary}
              </Text>
              <Link href={`/(users)/${users.id}`} asChild>
                <TouchableOpacity
                  style={{
                    backgroundColor: "white",
                    alignSelf: "flex-end",
                    padding: 5,
                    marginTop: 5,
                    borderRadius: 10,
                  }}
                >
                  <Text style={{ color: "black" }}> Transfer</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
export default Allusers;

{
  /* <Button
        title="Transfer"
        onPress={() => {
          alert("Clicked");
        }}
      /> */
}
