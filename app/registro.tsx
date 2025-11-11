import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, Alert, ScrollView } from "react-native";
import TextField from "@/components/TextField";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";

// 🔒 Esquema de validación con Zod
const schema = z
  .object({
    nombre: z.string().min(3, "Tu nombre debe tener al menos 3 letras"),
    usuario: z.string().min(3, "El nombre de usuario debe tener al menos 3 letras"),
    numero: z.string().min(10, "Debe tener al menos 10 dígitos"),
    correo: z
      .string()
      .email("Formato de correo inválido")
      .refine((v) => v.includes("@gmail.com"), {
        message: "Debe ser un correo de Gmail (@gmail.com)",
      }),
    contrasena: z
      .string()
      .min(6, "Mínimo 6 caracteres")
      .regex(/[A-Z]/, "Debe incluir al menos una mayúscula")
      .regex(/[0-9]/, "Debe incluir al menos un número"),
    confirmar: z.string(),
  })
  .refine((data) => data.contrasena === data.confirmar, {
    message: "Las contraseñas no coinciden",
    path: ["confirmar"],
  });

type FormValues = z.infer<typeof schema>;

export default function RegistroScreen() {
  const router = useRouter();
  const { control, handleSubmit, formState } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      nombre: "",
      usuario: "",
      numero: "",
      correo: "",
      contrasena: "",
      confirmar: "",
    },
    mode: "onChange",
  });

  const onSubmit = (data: FormValues) => {
    Alert.alert("✅ Cuenta creada", JSON.stringify(data, null, 2));
    router.push("/"); // vuelve al login
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Crear nueva cuenta</Text>

      <TextField name="nombre" control={control} label="Nombre completo" placeholder="Tu nombre" />
      <TextField name="usuario" control={control} label="Nombre de usuario" placeholder="Ej: mateo123" />
      <TextField name="numero" control={control} label="Número de teléfono" placeholder="0987654321" keyboardType="default" />
      <TextField name="correo" control={control} label="Correo Gmail" placeholder="ejemplo@gmail.com" keyboardType="email-address" />
      <TextField name="contrasena" control={control} label="Contraseña" placeholder="********" secureTextEntry />
      <TextField name="confirmar" control={control} label="Confirmar contraseña" placeholder="********" secureTextEntry />

      <Pressable
        onPress={handleSubmit(onSubmit)}
        style={[styles.button, !formState.isValid && { opacity: 0.6 }]}
      >
        <Text style={styles.buttonText}>Crear cuenta</Text>
      </Pressable>

      <Pressable onPress={() => router.push("/")}>
        <Text style={styles.linkText}>← Volver al inicio de sesión</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e60",
    padding: 25,
  },
  title: {
    color: "white",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 25,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#5b2cff",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  linkText: {
    color: "#bfbff5",
    fontSize: 13,
    textAlign: "center",
    marginTop: 20,
  },
});
