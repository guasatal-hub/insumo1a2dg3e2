import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email === "" || password === "") {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }
    Alert.alert("✅ Sesión iniciada", `Bienvenido ${email}`);
  };

  return (
    <View style={styles.container}>
      {/* Emoji con texto en vez de un caracter emoji (para evitar errores en algunos sistemas) */}
      <Text style={styles.icon}>💻</Text>

      <Text style={styles.title}>Bienvenido a Gmail Config</Text>
      <Text style={styles.subtitle}>Inicia sesión con tu cuenta</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo Gmail"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </Pressable>

      <Pressable onPress={() => router.push("/registro")}>
        <Text style={styles.registerText}>
          ¿No tienes cuenta? <Text style={styles.link}>Crear cuenta</Text>
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e60",
    justifyContent: "center",
    padding: 25,
  },
  icon: {
    fontSize: 70,
    textAlign: "center",
    marginBottom: 10,
  },
  title: {
    color: "white",
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
  },
  subtitle: {
    color: "#ccc",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    backgroundColor: "#2a2a72",
    color: "white",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#5b2cff",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  registerText: {
    color: "#ccc",
    textAlign: "center",
    marginTop: 15,
  },
  link: {
    color: "#5b2cff",
    fontWeight: "700",
  },
});
