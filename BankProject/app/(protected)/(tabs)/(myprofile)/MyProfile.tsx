import { getAllUsers } from "@/api/users";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const MyProfile = () => {
  const [allUsers, setAllUsers] = useState("");
  const { data, isFetching, isSuccess } = useQuery({
    queryKey: ["getallusers"],
    queryFn: () => getAllUsers(),
  });

  if (isFetching) return <Text>Loading...</Text>;
  return (
    <View>
      {/* {isSuccess &&
        data?.map((user: any) => <Text key={user.id}>{user?.username}</Text>)} */}
    </View>
  );
};
export default MyProfile;

const styles = StyleSheet.create({});
