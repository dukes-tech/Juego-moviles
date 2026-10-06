import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { onValue, ref } from 'firebase/database';
import { auth, db } from '../firebase/config';

type Jugador = {
  id: string;
  username: string;
  mejorPuntaje: number;
  partidas: number;
};

export default function ListaScreen() {

  const [jugadores, setJugadores] = useState<Jugador[]>([]);

  useEffect(() => {

    const usuariosRef = ref(db, 'users');

    const unsubscribe = onValue(usuariosRef, (snapshot) => {

      const data = snapshot.val();

      if (!data) {
        setJugadores([]);
        return;
      }

      const lista: Jugador[] = Object.keys(data).map((id) => ({
        id,
        username: data[id].username || 'Jugador',
        mejorPuntaje: Number(data[id].mejorPuntaje) || 0,
        partidas: Number(data[id].partidas) || 0,
      }));

      lista.sort((a, b) => b.mejorPuntaje - a.mejorPuntaje);

      setJugadores(lista);
    });

    return () => unsubscribe();

  }, []);

  function posicion(index: number) {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';

    return `${index + 1}.`;
  }

  return (
    <View style={styles.container}>

      <View style={styles.encabezado}>

        <Text style={styles.trofeo}>
          🏆
        </Text>

        <Text style={styles.titulo}>
          RANKING
        </Text>

        <Text style={styles.subtitulo}>
          Mejores jugadores de Target Rush
        </Text>

      </View>

      <View style={styles.cabeceraTabla}>

        <Text style={styles.posCabecera}>
          POS.
        </Text>

        <Text style={styles.jugadorCabecera}>
          JUGADOR
        </Text>

        <Text style={styles.puntosCabecera}>
          PUNTOS
        </Text>

      </View>

      <FlatList
        data={jugadores}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.lista}

        renderItem={({ item, index }) => {

          const soyYo =
            item.id === auth.currentUser?.uid;

          return (

            <View
              style={[
                styles.card,
                soyYo && styles.cardActual,
              ]}
            >

              <Text style={styles.posicion}>
                {posicion(index)}
              </Text>

              <View style={styles.info}>

                <View style={styles.nombreFila}>

                  <Text style={styles.nombre}>
                    {item.username}
                  </Text>

                  {soyYo && (

                    <View style={styles.badge}>

                      <Text style={styles.badgeTexto}>
                        TÚ
                      </Text>

                    </View>

                  )}

                </View>

                <Text style={styles.partidas}>
                  🎮 {item.partidas}{' '}
                  {item.partidas === 1
                    ? 'partida'
                    : 'partidas'}
                </Text>

              </View>

              <View style={styles.puntajeContainer}>

                <Text style={styles.puntaje}>
                  {item.mejorPuntaje}
                </Text>

                <Text style={styles.pts}>
                  pts
                </Text>

              </View>

            </View>

          );
        }}

        ListEmptyComponent={

          <View style={styles.vacio}>

            <Text style={styles.vacioIcono}>
              🎮
            </Text>

            <Text style={styles.vacioTexto}>
              Aún no hay jugadores
            </Text>

          </View>

        }

      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#0B1120',
    paddingHorizontal: 20,
    paddingTop: 65,
  },

  encabezado: {
    alignItems: 'center',
    marginBottom: 30,
  },

  trofeo: {
    fontSize: 45,
  },

  titulo: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '900',
    letterSpacing: 2,
    marginTop: 5,
  },

  subtitulo: {
    color: '#94A3B8',
    fontSize: 14,
    marginTop: 5,
  },

  cabeceraTabla: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginBottom: 10,
  },

  posCabecera: {
    width: 55,
    color: '#64748B',
    fontSize: 10,
    fontWeight: '800',
  },

  jugadorCabecera: {
    flex: 1,
    color: '#64748B',
    fontSize: 10,
    fontWeight: '800',
  },

  puntosCabecera: {
    width: 75,
    color: '#64748B',
    fontSize: 10,
    fontWeight: '800',
    textAlign: 'right',
  },

  lista: {
    paddingBottom: 30,
  },

  card: {
    minHeight: 85,
    backgroundColor: '#111827',
    borderRadius: 16,
    paddingHorizontal: 16,
    marginBottom: 12,

    flexDirection: 'row',
    alignItems: 'center',

    borderWidth: 1,
    borderColor: '#1F2937',
  },

  cardActual: {
    borderColor: '#2563EB',
    backgroundColor: '#111D35',
  },

  posicion: {
    width: 55,
    fontSize: 27,
    color: '#94A3B8',
    fontWeight: '900',
  },

  info: {
    flex: 1,
  },

  nombreFila: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  nombre: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },

  badge: {
    backgroundColor: '#2563EB',
    borderRadius: 5,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 8,
  },

  badgeTexto: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '900',
  },

  partidas: {
    color: '#64748B',
    fontSize: 11,
    marginTop: 5,
  },

  puntajeContainer: {
    width: 75,
    alignItems: 'flex-end',
  },

  puntaje: {
    color: '#22C55E',
    fontSize: 24,
    fontWeight: '900',
  },

  pts: {
    color: '#64748B',
    fontSize: 10,
  },

  vacio: {
    alignItems: 'center',
    marginTop: 60,
  },

  vacioIcono: {
    fontSize: 50,
  },

  vacioTexto: {
    color: '#94A3B8',
    fontSize: 16,
    marginTop: 10,
  },

});