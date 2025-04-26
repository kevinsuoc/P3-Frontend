import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';

export default function PlayersScreen() {
  const [players, setPlayers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'players'));
        const playersList = querySnapshot.docs.map(doc => doc.data());
        setPlayers(playersList);
      } catch (error) {
        console.error('Error obteniendo jugadores:', error);
      } finally {
        setTimeout(() => setLoading(false), 1500);
      }
    };

    fetchPlayers();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando jugadores...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={players}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.item}
          onPress={() => router.push({
            pathname: `/detail/[id]` as const,
            params: {
              id: item.id,
              nombre: item.nombre,
              dorsal: item.dorsal,
              posicion: item.posicion,
              altura: item.altura,
              nacionalidad: item.nacionalidad,
              edad: item.edad,
              descripcion: item.descripcion,
            }
          })}
        >
          <Text style={styles.name}>{item.nombre}</Text>
          <Text>{item.posicion} - {item.nacionalidad}</Text>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  item: { padding: 20, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  name: { fontSize: 18, fontWeight: 'bold' },
});
