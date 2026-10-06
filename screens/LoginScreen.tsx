import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { signInWithEmailAndPassword } from 'firebase/auth';
import * as LocalAuthentication from 'expo-local-authentication';

import { auth } from '../firebase/config';

export default function LoginScreen({ navigation }: any) {

  const [correo, setCorreo] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [cargando, setCargando] = useState(false);

  async function login() {

    if (!correo.trim() || !contrasenia.trim()) {
      Alert.alert(
        'Campos incompletos',
        'Ingresa tu correo y contraseña.'
      );
      return;
    }

    try {

      setCargando(true);

      await signInWithEmailAndPassword(
        auth,
        correo.trim(),
        contrasenia
      );

      navigation.replace('Drawer');

    } catch (error: any) {

      console.log(error.code);

      if (error.code === 'auth/invalid-email') {
        Alert.alert('Error', 'El correo electrónico no es válido.');
      } else if (error.code === 'auth/invalid-credential') {
        Alert.alert('Error', 'Correo o contraseña incorrectos.');
      } else if (error.code === 'auth/too-many-requests') {
        Alert.alert(
          'Acceso bloqueado temporalmente',
          'Intenta nuevamente más tarde.'
        );
      } else {
        Alert.alert(
          'Error',
          'No se pudo iniciar sesión.'
        );
      }

    } finally {
      setCargando(false);
    }
  }

  async function autenticarBiometria() {

    const compatible =
      await LocalAuthentication.hasHardwareAsync();

    if (!compatible) {
      Alert.alert(
        'No disponible',
        'Este dispositivo no soporta autenticación biométrica.'
      );
      return;
    }

    const registrado =
      await LocalAuthentication.isEnrolledAsync();

    if (!registrado) {
      Alert.alert(
        'Biometría no configurada',
        'Configura huella o reconocimiento facial en el dispositivo.'
      );
      return;
    }

    const resultado =
      await LocalAuthentication.authenticateAsync({
        promptMessage: 'Ingresar a Target Rush',
        cancelLabel: 'Cancelar',
        fallbackLabel: 'Usar contraseña',
      });

    if (resultado.success) {
      navigation.replace('Drawer');
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >

      <View style={styles.logoContainer}>

        <View style={styles.logo}>
          <Text style={styles.logoIcon}>
            🎯
          </Text>
        </View>

        <Text style={styles.titulo}>
          TARGET RUSH
        </Text>

        <Text style={styles.subtitulo}>
          Velocidad. Precisión. Récord.
        </Text>

      </View>

      <View style={styles.card}>

        <Text style={styles.bienvenida}>
          Bienvenido
        </Text>

        <Text style={styles.descripcion}>
          Inicia sesión para jugar y superar tu mejor puntaje
        </Text>

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
          placeholder="••••••••"
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
          onPress={login}
          disabled={cargando}
        >
          <Text style={styles.textoBotonPrincipal}>
            {cargando ? 'INGRESANDO...' : 'INICIAR SESIÓN'}
          </Text>
        </TouchableOpacity>

        <View style={styles.separadorContainer}>
          <View style={styles.linea} />

          <Text style={styles.separador}>
            O
          </Text>

          <View style={styles.linea} />
        </View>

        <TouchableOpacity
          style={styles.botonBiometrico}
          onPress={autenticarBiometria}
        >
          <Text style={styles.iconoBiometrico}>
            🔐
          </Text>

          <Text style={styles.textoBiometrico}>
            Ingresar con biometría
          </Text>
        </TouchableOpacity>

        <View style={styles.registroContainer}>

          <Text style={styles.sinCuenta}>
            ¿No tienes una cuenta?
          </Text>

          <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.registrate}>
              Regístrate
            </Text>
          </TouchableOpacity>

        </View>

      </View>

      <Text style={styles.footer}>
        🎮 Compite · Mejora · Domina el ranking
      </Text>

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#0B1120',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  logoContainer: {
    alignItems: 'center',
    marginBottom: 28,
  },

  logo: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#1E293B',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
    borderWidth: 2,
    borderColor: '#2563EB',
  },

  logoIcon: {
    fontSize: 50,
  },

  titulo: {
    color: '#FFFFFF',
    fontSize: 31,
    fontWeight: '900',
    letterSpacing: 2,
  },

  subtitulo: {
    color: '#94A3B8',
    fontSize: 14,
    marginTop: 5,
  },

  card: {
    backgroundColor: '#111827',
    borderRadius: 22,
    padding: 22,
    borderWidth: 1,
    borderColor: '#1F2937',
  },

  bienvenida: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
  },

  descripcion: {
    color: '#94A3B8',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 5,
    marginBottom: 22,
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
    height: 54,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },

  botonDeshabilitado: {
    opacity: 0.6,
  },

  textoBotonPrincipal: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
  },

  separadorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },

  linea: {
    flex: 1,
    height: 1,
    backgroundColor: '#374151',
  },

  separador: {
    color: '#64748B',
    marginHorizontal: 14,
    fontSize: 12,
    fontWeight: '700',
  },

  botonBiometrico: {
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#374151',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1F2937',
  },

  iconoBiometrico: {
    fontSize: 20,
    marginRight: 10,
  },

  textoBiometrico: {
    color: '#E5E7EB',
    fontSize: 15,
    fontWeight: '600',
  },

  registroContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 22,
  },

  sinCuenta: {
    color: '#94A3B8',
    fontSize: 14,
  },

  registrate: {
    color: '#3B82F6',
    fontWeight: '800',
    fontSize: 14,
    marginLeft: 5,
  },

  footer: {
    color: '#64748B',
    textAlign: 'center',
    marginTop: 25,
    fontSize: 12,
  },

});