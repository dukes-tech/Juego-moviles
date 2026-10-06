import React, { useEffect, useState } from 'react';

import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { signOut } from 'firebase/auth';
import { onValue, ref } from 'firebase/database';

import { auth, db } from '../firebase/config';

type Usuario = {
  username: string;
  email: string;
  age: string;
  mejorPuntaje: number;
  ultimoPuntaje: number;
  partidas: number;
};

export default function PerfilScreen({ navigation }: any) {

  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {

    const usuarioActual = auth.currentUser;

    if (!usuarioActual) {
      return;
    }

    const usuarioRef = ref(
      db,
      `users/${usuarioActual.uid}`
    );

    const unsubscribe = onValue(
      usuarioRef,
      (snapshot) => {

        if (snapshot.exists()) {

          const data = snapshot.val();

          setUsuario({
            username: data.username || 'Jugador',
            email: data.email || usuarioActual.email || '',
            age: data.age || '-',
            mejorPuntaje: Number(data.mejorPuntaje) || 0,
            ultimoPuntaje: Number(data.ultimoPuntaje) || 0,
            partidas: Number(data.partidas) || 0,
          });

        }
      }
    );

    return () => unsubscribe();

  }, []);

  function cerrarSesion() {

    Alert.alert(
      'Cerrar sesión',
      '¿Seguro que deseas salir de Target Rush?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Cerrar sesión',
          style: 'destructive',
          onPress: logout,
        },
      ]
    );
  }

  async function logout() {

    try {

      await signOut(auth);

      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'Welcome',
          },
        ],
      });

    } catch (error) {

      console.log(error);

      Alert.alert(
        'Error',
        'No se pudo cerrar la sesión.'
      );
    }
  }

  if (!usuario) {

    return (
      <View style={styles.cargandoContainer}>
        <Text style={styles.cargando}>
          Cargando perfil...
        </Text>
      </View>
    );
  }

  const inicial =
    usuario.username
      .charAt(0)
      .toUpperCase();

  return (
    <View style={styles.container}>

      <View style={styles.encabezado}>

        <View style={styles.avatar}>
          <Text style={styles.avatarTexto}>
            {inicial}
          </Text>
        </View>

        <Text style={styles.nombre}>
          {usuario.username}
        </Text>

        <Text style={styles.email}>
          {usuario.email}
        </Text>

        <View style={styles.nivel}>
          <Text style={styles.nivelTexto}>
            🎮 JUGADOR TARGET RUSH
          </Text>
        </View>

      </View>

      <Text style={styles.tituloSeccion}>
        ESTADÍSTICAS
      </Text>

      <View style={styles.estadisticas}>

        <View style={styles.estadistica}>
          <Text style={styles.icono}>
            🏆
          </Text>

          <Text style={styles.numero}>
            {usuario.mejorPuntaje}
          </Text>

          <Text style={styles.descripcion}>
            Mejor puntaje
          </Text>
        </View>

        <View style={styles.estadistica}>
          <Text style={styles.icono}>
            🎯
          </Text>

          <Text style={styles.numero}>
            {usuario.ultimoPuntaje}
          </Text>

          <Text style={styles.descripcion}>
            Último puntaje
          </Text>
        </View>

        <View style={styles.estadistica}>
          <Text style={styles.icono}>
            🎮
          </Text>

          <Text style={styles.numero}>
            {usuario.partidas}
          </Text>

          <Text style={styles.descripcion}>
            Partidas
          </Text>
        </View>

      </View>

      <Text style={styles.tituloSeccion}>
        INFORMACIÓN DEL JUGADOR
      </Text>

      <View style={styles.card}>

        <View style={styles.fila}>
          <Text style={styles.label}>
            👤 Nombre
          </Text>

          <Text style={styles.valor}>
            {usuario.username}
          </Text>
        </View>

        <View style={styles.separador} />

        <View style={styles.fila}>
          <Text style={styles.label}>
            🎂 Edad
          </Text>

          <Text style={styles.valor}>
            {usuario.age} años
          </Text>
        </View>

        <View style={styles.separador} />

        <View style={styles.fila}>
          <Text style={styles.label}>
            ✉️ Correo
          </Text>

          <Text
            style={styles.valorEmail}
            numberOfLines={1}
          >
            {usuario.email}
          </Text>
        </View>

      </View>

      <TouchableOpacity
        style={styles.botonJugar}
        onPress={() =>
          navigation.navigate('Juegos')
        }
      >
        <Text style={styles.textoJugar}>
          🎯 JUGAR AHORA
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botonSalir}
        onPress={cerrarSesion}
      >
        <Text style={styles.textoSalir}>
          CERRAR SESIÓN
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#0B1120',
    paddingHorizontal: 20,
    paddingTop: 25,
  },

  cargandoContainer: {
    flex: 1,
    backgroundColor: '#0B1120',
    justifyContent: 'center',
    alignItems: 'center',
  },

  cargando: {
    color: '#94A3B8',
    fontSize: 16,
  },

  encabezado: {
    alignItems: 'center',
    marginBottom: 28,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#1E3A8A',
  },

  avatarTexto: {
    color: '#FFFFFF',
    fontSize: 38,
    fontWeight: '900',
  },

  nombre: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '900',
    marginTop: 14,
  },

  email: {
    color: '#94A3B8',
    fontSize: 14,
    marginTop: 4,
  },

  nivel: {
    backgroundColor: '#172554',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    marginTop: 12,
  },

  nivelTexto: {
    color: '#60A5FA',
    fontSize: 11,
    fontWeight: '800',
  },

  tituloSeccion: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 10,
  },

  estadisticas: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },

  estadistica: {
    width: '31%',
    backgroundColor: '#111827',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1F2937',
  },

  icono: {
    fontSize: 24,
  },

  numero: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
    marginTop: 6,
  },

  descripcion: {
    color: '#94A3B8',
    fontSize: 10,
    marginTop: 4,
    textAlign: 'center',
  },

  card: {
    backgroundColor: '#111827',
    borderRadius: 16,
    paddingHorizontal: 18,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#1F2937',
  },

  fila: {
    minHeight: 58,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  label: {
    color: '#94A3B8',
    fontSize: 14,
  },

  valor: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },

  valorEmail: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
    maxWidth: '55%',
  },

  separador: {
    height: 1,
    backgroundColor: '#1F2937',
  },

  botonJugar: {
    height: 54,
    backgroundColor: '#2563EB',
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },

  textoJugar: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },

  botonSalir: {
    height: 52,
    borderWidth: 1,
    borderColor: '#7F1D1D',
    backgroundColor: '#1F1215',
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },

  textoSalir: {
    color: '#F87171',
    fontSize: 14,
    fontWeight: '800',
  },

});