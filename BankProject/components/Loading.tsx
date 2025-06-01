import React from "react";
import { View } from "react-native";
import LottieView from "lottie-react-native";

const CustomLoader = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <LottieView
        source={require("@/assets/images/loading.json")}
        autoPlay
        loop
        style={{ width: 200, height: 200 }}
      />
    </View>
  );
};

export default CustomLoader;
