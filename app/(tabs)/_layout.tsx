import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "#7f22fe" }}>
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons size={24} name="home-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="books"
        options={{
          title: "Search Books",
          tabBarIcon: ({ color }) => (
            <Ionicons size={24} name="book-outline" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
