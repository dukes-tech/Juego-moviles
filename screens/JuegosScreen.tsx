import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';

const { width } = Dimensions.get('window');
import { auth, db } from '../firebase/config';
import { ref, get, update } from 'firebase/database';

export default function JuegosScreen() {

  const [puntaje, setPuntaje] = useState(0);
  const [tiempo, setTiempo] = useState(30);
  const [jugando, setJugando] = useState(false);

  const [posicion, setPosicion] = useState({
    x: 100,
    y: 150,
  });

  useEffect(() => {

    if (!jugando) return;

    if (tiempo === 0) {

      setJugando(false);

      guardarPuntaje(puntaje);

      Alert.alert(
        '🏁 Partida terminada',
        `Tu puntaje fue: ${puntaje}`
      );

      return;
    }

    const intervalo = setInterval(() => {
      setTiempo((anterior) => anterior - 1);
    }, 1000);

    return () => clearInterval(intervalo);

  }, [tiempo, jugando]);

  function moverObjetivo() {

    if (!jugando) return;

    const maxX = width - 130;
    const maxY = 420;

    const nuevaX = Math.random() * maxX;
    const nuevaY = Math.random() * maxY;

    setPosicion({
      x: nuevaX,
      y: nuevaY,
    });

    setPuntaje((anterior) => anterior + 10);
  }
  async function guardarPuntaje(puntajeFinal: number) {

  const usuario = auth.currentUser;

  if (!usuario) return;

  const usuarioRef = ref(db, `users/${usuario.uid}`);

  try {

    const snapshot = await get(usuarioRef);

    if (snapshot.exists()) {

      const datosUsuario = snapshot.val();

      const mejorAnterior = datosUsuario.mejorPuntaje || 0;
      const partidasAnteriores = datosUsuario.partidas || 0;

      await update(usuarioRef, {
        mejorPuntaje:
          puntajeFinal > mejorAnterior
            ? puntajeFinal
            : mejorAnterior,

        ultimoPuntaje: puntajeFinal,

        partidas: partidasAnteriores + 1,
      });

      console.log('Puntaje guardado correctamente');
    }

  } catch (error) {
    console.log('Error guardando puntaje:', error);
  }
}
  function iniciarJuego() {

    setPuntaje(0);
    setTiempo(30);
    setJugando(true);

    setPosicion({
      x: 100,
      y: 150,
    });
  }

  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>
        🎯 TARGET RUSH
      </Text>

      <View style={styles.estadisticas}>

        <Text style={styles.puntaje}>
          ⭐ {puntaje}
        </Text>

        <Text style={styles.tiempo}>
          ⏱️ {tiempo}s
        </Text>

      </View>

      <View style={styles.areaJuego}>

        {jugando ? (

          <TouchableOpacity
            style={[
              styles.objetivo,
              {
                left: posicion.x,
                top: posicion.y,
              },
            ]}
            onPress={moverObjetivo}
          >
            <Text style={styles.objetivoTexto}>
              🎯
            </Text>
          </TouchableOpacity>

        ) : (

          <View style={styles.inicio}>

            <Text style={styles.mensaje}>
              Toca el objetivo tantas veces como puedas
            </Text>

            <TouchableOpacity
              style={styles.boton}
              onPress={iniciarJuego}
            >
              <Text style={styles.textoBoton}>
                JUGAR
              </Text>
            </TouchableOpacity>

          </View>

        )}

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#111827',
    alignItems: 'center',
    paddingTop: 30,
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
  },

  estadisticas: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  puntaje: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#22C55E',
  },

  tiempo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FACC15',
  },

  areaJuego: {
    width: '95%',
    height: 500,
    backgroundColor: '#1F2937',
    borderRadius: 20,
    position: 'relative',
    overflow: 'hidden',
  },

  objetivo: {
    position: 'absolute',
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },

  objetivoTexto: {
    fontSize: 55,
  },

  inicio: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },

  mensaje: {
    color: '#D1D5DB',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
  },

  boton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 50,
    paddingVertical: 16,
    borderRadius: 12,
  },

  textoBoton: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },

});