import { Ionicons } from "@expo/vector-icons";
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#ffd33d",        
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home-sharp" : "home-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="tcp"
        options={{
          title: "TCP",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons name="wifi" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="udp"
        options={{
          title: "UDP",
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons name="wifi-tethering" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cloundAPI"
        options={{
          title: "CloundAPI",
          tabBarIcon: ({ color, focused }) => (
            <Entypo name="icloud" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
