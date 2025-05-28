import { View, Text, TextInput, ScrollView, FlatList } from "react-native";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { my } from "@/api/users";

// export const FilterTransactions = () => {
//   const { data, isLoading } = useQuery({
//     queryKey: ["my-transactions"],
//     queryFn: () => my(),
//   });
//   console.log("transaction", data);
//   if (isLoading) {
//     return <Text>Loading...</Text>;
//   }
// const [date, setDate] = useState("");
// const [amount, setAmount] = useState("");

// const filtered = transactions.filter((t: any) => {
//   const matchDate = date ? t.date.includes(date) : true;
//   const matchAmount = amount ? t.amount.toString().includes(amount) : true;
//   return matchDate && matchAmount;
// });

//   return (
//     <View style={{ flex: 1, padding: 16 }}>
//       <Text>jjjjjjjjjjjjjjjj</Text>
//     </View>
//   );
// };

//     }
//   );
// };
