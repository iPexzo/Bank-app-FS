import { deleteToken } from "@/api/storage";
import { me, profile } from "@/api/users";
import CustomLoader from "@/components/Loading";
import AuthContext from "@/context/AuthContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import { Image, Text, TouchableOpacity, View, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";

const MyProfileScreen = () => {
  const router = useRouter();
  const { setIsAuthenticated } = useContext(AuthContext);
  const [image, setImage] = useState<string | null>(null);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["Meee"],
    queryFn: () => me(),
  });

  const { mutate } = useMutation({
    mutationKey: ["Profile"],
    mutationFn: (updatedInfo: any) => profile(updatedInfo),
    onSuccess: () => {
      alert("Edit Done");
      refetch();
    },
    onError: () => {
      alert("Edit Failed");
    },
  });
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.4,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleProfile = () => {
    mutate({
      image,
    });
  };

  if (isLoading) return <CustomLoader />;

  const getImageUrl = (imagePath: string) => {
    if (!imagePath) {
      console.log("No available image.");
    }

    const baseUrl = "https://react-bank-project.eapi.joincoded.com";

    if (imagePath?.startsWith("http://") || imagePath?.startsWith("https://")) {
      console.log("Full URL: ", imagePath);
      return imagePath;
    }

    let fullUrl;
    if (imagePath.startsWith("/")) {
      fullUrl = `${baseUrl}${imagePath}`;
    } else {
      fullUrl = `${baseUrl}/${imagePath}`;
    }

    return fullUrl;
  };

  const imageUrl = getImageUrl(data.image);

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#121212",
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          color: "#ffffff",
          alignSelf: "center",
          marginBottom: 25,
        }}
      >
        My Profile
      </Text>

      <View
        style={{
          backgroundColor: "#002B49",
          padding: 25,
          borderRadius: 20,
          alignItems: "center",
          marginBottom: 30,
          borderWidth: 1,
          borderColor: "#1E3A5F",
        }}
      >
        {imageUrl && (
          <Image
            source={
              imageUrl
                ? {
                    uri: imageUrl,
                  }
                : require("@/assets/images/noAvatar.jpg")
            }
            style={{
              width: 110,
              height: 110,
              borderRadius: 55,
              marginBottom: 15,
              borderWidth: 2,
              borderColor: "#00BFFF",
            }}
          />
        )}
        <Text
          style={{
            fontSize: 20,
            color: "#ffffff",
            fontWeight: "600",
            marginBottom: 8,
          }}
        >
          {data?.username}
        </Text>
        <Text
          style={{
            fontSize: 18,
            color: "#4ade80",
            fontWeight: "bold",
          }}
        >
          {data?.balance} KWD
        </Text>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: "#2c2c3c",
          padding: 15,
          borderRadius: 12,
          marginBottom: 15,
        }}
        onPress={pickImage}
      >
        <Text
          style={{ color: "#fff", textAlign: "center", fontWeight: "bold" }}
        >
          Choose New Profile Image
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: "#2c2c3c",
          padding: 15,
          borderRadius: 12,
          marginBottom: 15,
        }}
        onPress={handleProfile}
      >
        <Text
          style={{
            color: "#ffffff",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Done
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: "#b91c1c",
          padding: 15,
          borderRadius: 12,
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
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Logout
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default MyProfileScreen;
