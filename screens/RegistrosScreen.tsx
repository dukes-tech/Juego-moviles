import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';

import { auth, db } from '../firebase/config';

export default function RegistrosScreen({ navigation }: any) {

  const [correo, setCorreo] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [cargando, setCargando] = useState(false);

  async function registro() {

    if (
      !nombre.trim() ||
      !edad.trim() ||
      !correo.trim() ||
      !contrasenia.trim()
    ) {
      Alert.alert(
        'Campos incompletos',
        'Completa todos los campos.'
      );
      return;
    }

    if (contrasenia.length < 6) {
      Alert.alert(
        'Contraseña inválida',
        'La contraseña debe tener mínimo 6 caracteres.'
      );
      return;
    }

    try {

      setCargando(true);

      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          correo.trim(),
          contrasenia
        );

      const user = userCredential.user;

      await set(ref(db, `users/${user.uid}`), {
        username: nombre.trim(),
        email: correo.trim(),
        age: edad,
        mejorPuntaje: 0,
        ultimoPuntaje: 0,
        partidas: 0,
      });

      Alert.alert(
        '🎮 Cuenta creada',
        'Tu jugador fue registrado correctamente.',
        [
          {
            text: 'Iniciar sesión',
            onPress: () => navigation.replace('Login'),
          },
        ]
      );

    } catch (error: any) {

      console.log(error.code);

      if (error.code === 'auth/email-already-in-use') {

        Alert.alert(
          'Correo registrado',
          'Ya existe una cuenta con este correo.'
        );

      } else if (error.code === 'auth/invalid-email') {

        Alert.alert(
          'Correo inválido',
          'Ingresa un correo electrónico válido.'
        );

      } else if (error.code === 'auth/weak-password') {

        Alert.alert(
          'Contraseña débil',
          'Utiliza una contraseña de mínimo 6 caracteres.'
        );

      } else {

        Alert.alert(
          'Error',
          'No se pudo crear la cuenta.'
        );
      }

    } finally {
      setCargando(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >

      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.logo}>
          <Text style={styles.logoIcon}>
            🎯
          </Text>
        </View>

        <Text style={styles.titulo}>
          CREA TU JUGADOR
        </Text>

        <Text style={styles.subtitulo}>
          Regístrate y comienza a competir
        </Text>

        <View style={styles.card}>

          <Text style={styles.label}>
            Nombre del jugador
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Nickname"
            placeholderTextColor="#6B7280"
            value={nombre}
            onChangeText={setNombre}
          />

          <Text style={styles.label}>
            Edad
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Ej:20"
            placeholderTextColor="#6B7280"
            value={edad}
            onChangeText={setEdad}
            keyboardType="number-pad"
            maxLength={3}
          />

          <Text style={styles.label}>
            Correo electrónico
          </Text>

          <TextInput
            style={styles.input}
            placeholder="jugador@email.com"
            placeholderTextColor="#6B7280"
            value={correo}
            onChangeText={setCorreo}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Text style={styles.label}>
            Contraseña
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Mínimo 6 caracteres"
            placeholderTextColor="#6B7280"
            value={contrasenia}
            onChangeText={setContrasenia}
            secureTextEntry
          />

          <TouchableOpacity
            style={[
              styles.botonPrincipal,
              cargando && styles.botonDeshabilitado
            ]}
            onPress={registro}
            disabled={cargando}
          >
            <Text style={styles.textoBoton}>
              {cargando
                ? 'CREANDO CUENTA...'
                : 'CREAR CUENTA'}
            </Text>
          </TouchableOpacity>

          <View style={styles.loginContainer}>

            <Text style={styles.yaCuenta}>
              ¿Ya tienes una cuenta?
            </Text>

            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.login}>
                Inicia sesión
              </Text>
            </TouchableOpacity>

          </View>

        </View>

        <Text style={styles.footer}>
          🏆 Crea tu cuenta y entra al ranking
        </Text>

      </ScrollView>

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#0B1120',
  },

  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },

  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#111827',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#2563EB',
    marginBottom: 18,
  },

  logoIcon: {
    fontSize: 45,
  },

  titulo: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: 1.5,
  },

  subtitulo: {
    color: '#94A3B8',
    textAlign: 'center',
    fontSize: 14,
    marginTop: 6,
    marginBottom: 25,
  },

  card: {
    backgroundColor: '#111827',
    borderRadius: 22,
    padding: 22,
    borderWidth: 1,
    borderColor: '#1F2937',
  },

  label: {
    color: '#CBD5E1',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 7,
  },

  input: {
    height: 52,
    backgroundColor: '#1F2937',
    borderRadius: 12,
    paddingHorizontal: 16,
    color: '#FFFFFF',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#374151',
    marginBottom: 17,
  },

  botonPrincipal: {
    backgroundColor: '#2563EB',
    height: 55,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },

  botonDeshabilitado: {
    opacity: 0.6,
  },

  textoBoton: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 0.5,
  },

  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 22,
  },

  yaCuenta: {
    color: '#94A3B8',
    fontSize: 14,
  },

  login: {
    color: '#3B82F6',
    fontSize: 14,
    fontWeight: '800',
    marginLeft: 5,
  },

  footer: {
    color: '#64748B',
    textAlign: 'center',
    fontSize: 12,
    marginTop: 22,
  },

});