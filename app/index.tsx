import { Violet } from "@/utils/color-helper";
import { Link } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log(email, password);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.text}>Welcome to XYZ Library!</Text>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.loginHeading}>Login</Text>
        <TextInput
          placeholder="Email"
          placeholderTextColor={"grey"}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor={"grey"}
          secureTextEntry
          style={styles.input}
        />
        <Link href="/forgot-password" asChild>
          <TouchableOpacity>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
        </Link>
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Violet[500],
  },
  topContainer: {
    flexDirection: "row",
    width: "100%",
    height: "30%",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  bottomContainer: {
    alignItems: "center",
    backgroundColor: Violet[50],
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    width: "100%",
    height: "70%",
    paddingHorizontal: 20,
    paddingTop: 30,
    gap: 14,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 30,
  },
  loginHeading: {
    fontSize: 28,
    fontWeight: "700",
    color: Violet[900],
    marginBottom: 8,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: "white",
    backgroundColor: "white",
  },
  forgotText: {
    color: Violet[900],
    fontSize: 14,
    fontWeight: "600",
    alignSelf: "flex-end",
  },
  loginButton: {
    width: "100%",
    backgroundColor: Violet[600],
    borderRadius: 12,
    paddingVertical: 13,
    marginTop: 6,
  },
  loginButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
  },
});
