import { Text, View, FlatList } from "react-native";
import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";

export interface Jugador {
  id: string;
  Nombre: string;
  Dorsal: number;
  Posicion: string;
  Edad: number;
  Altura: number;
  Nacionalidad: string;
  Descripcion: string;
  Image?: string;
  Video?: string;
}

export async function getJugadores(): Promise<Jugador[]> {
  const snapshot = await firestore().collection("jugadores").get();

  const jugadores = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Jugador[];

  return jugadores;
}

export default function Index() {
  const [jugadores, setJugadores] = useState<Jugador[]>([]);

  useEffect(() => {
    async function cargarJugadores() {
      const data = await getJugadores();
      setJugadores(data);
    }

    cargarJugadores();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <FlatList
        data={jugadores}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={{ fontSize: 18, marginVertical: 5 }}>{item.Nombre}</Text>
        )}
        ListEmptyComponent={<Text>Cargando jugadores...</Text>}
      />
    </View>
  );
}
