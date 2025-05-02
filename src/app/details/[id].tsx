import { View, Text, StyleSheet, Platform, Pressable, Image, Modal, Button, ScrollView } from 'react-native';
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
            .then((data) => { setJugador(data) })
            .catch((err) => { console.log(err); setJugador(null) });
    }, []);

    if (jugador == null)
        return <Cargando />;
    else
        return <DetalleComponent jugador={jugador} />
}

function DetalleComponent({ jugador }: { jugador: Jugador }) {
    const router = useRouter();
    const imageUrl = jugador.Image ? jugador.Image : defaultJugadorImage;
    const [borrarModalVisible, setBorrarModalVisible] = useState<boolean>(false);

    const verVideoPress = () => {
        router.navigate({
            pathname: `/multimedia/${encodeURIComponent(jugador.Video ? jugador.Video : "novideo")}`,
            params: { nombre: jugador.Nombre }
        });
    };

    const imagePress = () => {
        router.navigate(`./image/${encodeURIComponent(imageUrl)}`);
    }

    const borrarJugador = () => {
        if (!jugador?.id)
            return;
        firestoreBorrarJugador(Platform.OS, jugador.id)
            .then(() => router.back())
            .catch((err) => console.error("Error deleting document: ", err));
    }

    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={borrarModalVisible}
                onRequestClose={() => { setBorrarModalVisible(!borrarModalVisible); }}
                style={{ backgroundColor: "black" }}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <View style={{ padding: 20, backgroundColor: 'white', borderRadius: 10 }}>
                        <Text>¿Desea eliminar este jugador?</Text>
                        <Button title="Aceptar" onPress={() => { borrarJugador() }} />
                        <Button title="Cancelar" onPress={() => { setBorrarModalVisible(false) }} />
                    </View>
                </View>
            </Modal>

            <Pressable onPress={() => imagePress()}>
                <Image
                    style={styles.logo}
                    source={{ uri: imageUrl }}
                />
            </Pressable>

            <ScrollView contentContainerStyle={styles.infoContainer}>
                <Text style={styles.infoText}><Text style={styles.infoLabel}>Nombre: </Text>{jugador.Nombre}</Text>
                <Text style={styles.infoText}><Text style={styles.infoLabel}>Dorsal: </Text>{jugador.Dorsal}</Text>
                <Text style={styles.infoText}><Text style={styles.infoLabel}>Posicion: </Text>{jugador.Posicion}</Text>
                <Text style={styles.infoText}><Text style={styles.infoLabel}>Edad: </Text>{jugador.Edad}</Text>
                <Text style={styles.infoText}><Text style={styles.infoLabel}>Altura: </Text>{jugador.Altura} m</Text>
                <Text style={styles.infoText}><Text style={styles.infoLabel}>Nacionalidad: </Text>{jugador.Nacionalidad}</Text>
                <Text style={styles.infoText}><Text style={styles.infoLabel}>Descripcion: </Text>{jugador.Descripcion}</Text>
            </ScrollView>

            <View style={styles.buttonsContainer}>
                <Button title="Borrar" onPress={() => setBorrarModalVisible(true)} />
            </View>
            <View style={styles.buttonsContainer}>
                <Button title="Editar" onPress={() => { router.navigate(`./editar/${jugador.id}`) }} />
            </View>
            <View style={styles.buttonsContainer}>
                <Button title="Ver video" onPress={verVideoPress} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    logo: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    infoContainer: {
        width: '100%',
        padding: 10,
        marginBottom: 30,
    },
    infoText: {
        fontSize: 16,
        marginVertical: 5,
        color: '#333',
    },
    infoLabel: {
        fontWeight: 'bold',
        color: '#1e90ff',
    },
    buttonsContainer: {
        width: '80%',
        marginVertical: 10,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
});
