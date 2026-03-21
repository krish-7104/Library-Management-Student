import { Violet } from "@/utils/color-helper";
import { Link } from "expo-router";
import React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const ForgotPassword = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Forgot Password</Text>
      <Text style={styles.subheading}>
        Enter your email and we will send you a password reset link.
      </Text>
      <TextInput
        placeholder="Email"
        placeholderTextColor={Violet[400]}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />
      <TouchableOpacity style={styles.resetButton}>
        <Text style={styles.resetButtonText}>Send Reset Link</Text>
      </TouchableOpacity>
      <Link href="/" style={styles.backLink}>
        Back to Login
      </Link>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Violet[50],
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  heading: {
    fontSize: 28,
    fontWeight: "700",
    color: Violet[900],
    marginBottom: 8,
  },
  subheading: {
    fontSize: 15,
    color: Violet[700],
    marginBottom: 20,
    lineHeight: 22,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: Violet[200],
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: Violet[900],
    backgroundColor: "white",
    marginBottom: 14,
  },
  resetButton: {
    width: "100%",
    backgroundColor: Violet[600],
    borderRadius: 12,
    paddingVertical: 13,
  },
  resetButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
  },
  backLink: {
    textAlign: "center",
    color: Violet[700],
    marginTop: 16,
    fontWeight: "600",
  },
});
