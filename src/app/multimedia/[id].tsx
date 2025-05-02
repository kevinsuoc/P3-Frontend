import { View, Text, StyleSheet } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { useLocalSearchParams } from 'expo-router';

export default function Multimedia() {
    const { id, nombre } = useLocalSearchParams<{ id: string; nombre?: string }>();

    if (id === "novideo") return <NoVideoComponent nombre={nombre} />;

    return <VideoComponent id={id} nombre={nombre} />;
}

function VideoComponent({ id, nombre }: { id: string; nombre?: string }) {
    return (
        <View style={styles.container}>
            {nombre && <Text style={styles.title}>Highlights de {nombre}</Text>}
            <Video
                source={{ uri: id }}
                volume={1.0}
                isMuted={false}
                shouldPlay={false}
                useNativeControls={true}
                isLooping={false}
                resizeMode={ResizeMode.CONTAIN}
                style={styles.video}
            />
        </View>
    );
}

function NoVideoComponent({ nombre }: { nombre?: string }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Highlights de {nombre || "este jugador"}</Text>
            <Text style={styles.noVideoText}>Este jugador no tiene video disponible.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: 20,
        backgroundColor: '#f8f9fa',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#1e90ff',
        textAlign: 'left',
    },
    video: {
        width: '51%',
        height: 350,
        backgroundColor: '#000',
    },
    noVideoText: {
        fontSize: 16,
        marginTop: 10,
        color: '#555',
    },
});
