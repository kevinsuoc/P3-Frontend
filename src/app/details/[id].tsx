import { View, Text, StyleSheet, Platform, Pressable, Image, Modal, Button } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Jugador } from '@/src/jugador';
import { useState, useEffect } from 'react';
import Cargando from '@/src/componentes/Cargando';
import { defaultJugadorImage } from '@/src/app.config';
import { firestoreGetJugador, firestoreBorrarJugador } from '@/src/database/jugadorQueries';

export default function Detalle() {
    const [jugador, setJugador] = useState<Jugador | null>(null);
    const { id } = useLocalSearchParams<{ id: string }>();

    useEffect(() => {
        firestoreGetJugador(Platform.OS, id)
        .then((data) => {setJugador(data)})
        .catch((err) => {console.log(err); setJugador(null)});
    }, []);
    
    if (jugador == null)
        return  <Cargando />;
    else
        return <DetalleComponent jugador={jugador} />
}

function DetalleComponent({jugador}: {jugador: Jugador}){
    const router = useRouter();
    const imageUrl = jugador.Image ? jugador.Image : defaultJugadorImage;
    const [borrarModalVisible, setBorrarModalVisible] = useState<boolean>(false);

    const verVideoPress = () => {
        router.navigate(`./multimedia/${encodeURIComponent(jugador.Video ? jugador.Video : "novideo")}`);
    };

    const imagePress = () => {
        router.navigate(`./image/${encodeURIComponent(imageUrl)}`);
    }

    const borrarJugador = () => {
        if (!jugador?.id)
            return
        firestoreBorrarJugador(Platform.OS, jugador.id)
        .then(() => router.back())
        .catch((err) => console.error("Error deleting document: ", err));   
    }

    return  (
    <View style={styles.container}>
        <Modal
            animationType="slide"
            transparent={true}
            visible={borrarModalVisible}
            onRequestClose={() => {setBorrarModalVisible(!borrarModalVisible);}}
            style={{backgroundColor: "black"}}
        >
            <View style={{ flex:1, justifyContent:'center', alignItems:'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <View style={{ padding:20, backgroundColor: 'white', borderRadius: 10 }}>
                    <Text>"Desea eliminar este jugador?"</Text>
                    <Button title="Aceptar" onPress={() => {borrarJugador()}} />
                    <Button title="Cancelar" onPress={() => {setBorrarModalVisible(false)}} />
                </View>
            </View>
        </Modal>

        <Pressable onPress={() => imagePress()}>
            <Image 
                style={styles.logo}
                source={{uri: imageUrl}}
            />
        </Pressable>
        <Text>Nombre: {jugador.Nombre}</Text>
        <Text>Dorsal: {jugador.Dorsal}</Text>
        <Text>Posicion: {jugador.Posicion}</Text>
        <Text>Edad: {jugador.Edad}</Text>
        <Text>Altura: {jugador.Altura}</Text>
        <Text>Nacionalidad: {jugador.Nacionalidad}</Text>
        <Text>Descripcion: {jugador.Descripcion}</Text>
        <Button title="Borrar" onPress={() => setBorrarModalVisible(true)} />
        <Button title="Editar" onPress={() => {router.navigate(`./editar/${jugador.id}`)}} />
        <Button title="Ver video"  onPress={() => verVideoPress()} />
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    logo: {
      width: 200, 
      height: 200,
      resizeMode: 'contain',
    },
  });