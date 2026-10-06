import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function WelcomeScreen({ navigation }: any) {

  return (
    <View style={styles.container}>

      <View style={styles.contenido}>

        <View style={styles.logo}>
          <Text style={styles.logoIcon}>🎯</Text>
        </View>

        <Text style={styles.titulo}>
          TARGET RUSH
        </Text>

        <Text style={styles.eslogan}>
          Velocidad. Precisión. Récord.
        </Text>

        <Text style={styles.descripcion}>
          Tienes 30 segundos para demostrar tu velocidad.
          Atrapa tantos objetivos como puedas y alcanza
          el primer lugar del ranking.
        </Text>

        <View style={styles.caracteristicas}>

          <View style={styles.item}>
            <Text style={styles.itemIcon}>🎯</Text>
            <Text style={styles.itemTexto}>
              Atrapa
            </Text>
          </View>

          <View style={styles.item}>
            <Text style={styles.itemIcon}>⚡</Text>
            <Text style={styles.itemTexto}>
              Compite
            </Text>
          </View>

          <View style={styles.item}>
            <Text style={styles.itemIcon}>🏆</Text>
            <Text style={styles.itemTexto}>
              Domina
            </Text>
          </View>

        </View>

      </View>

      <View style={styles.botones}>

        <TouchableOpacity
          style={styles.botonPrincipal}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.textoPrincipal}>
            INICIAR SESIÓN
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botonSecundario}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.textoSecundario}>
            CREAR CUENTA
          </Text>
        </TouchableOpacity>

     
      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#0B1120',
    paddingHorizontal: 28,
    paddingTop: 70,
    paddingBottom: 40,
    justifyContent: 'space-between',
  },

  contenido: {
    alignItems: 'center',
  },

  logo: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#111827',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#2563EB',
    marginBottom: 25,
  },

  logoIcon: {
    fontSize: 72,
  },

  titulo: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '900',
    letterSpacing: 3,
    textAlign: 'center',
  },

  eslogan: {
    color: '#3B82F6',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 8,
  },

  descripcion: {
    color: '#94A3B8',
    fontSize: 15,
    lineHeight: 23,
    textAlign: 'center',
    marginTop: 25,
    paddingHorizontal: 10,
  },

  caracteristicas: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 35,
  },

  item: {
    width: '30%',
    backgroundColor: '#111827',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1F2937',
  },

  itemIcon: {
    fontSize: 28,
  },

  itemTexto: {
    color: '#CBD5E1',
    fontSize: 13,
    fontWeight: '700',
    marginTop: 8,
  },

  botones: {
    width: '100%',
  },

  botonPrincipal: {
    height: 56,
    backgroundColor: '#2563EB',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  textoPrincipal: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 0.7,
  },

  botonSecundario: {
    height: 56,
    backgroundColor: '#111827',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 14,
    borderWidth: 1,
    borderColor: '#374151',
  },

  textoSecundario: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
  },

  footer: {
    color: '#64748B',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 22,
  },

});