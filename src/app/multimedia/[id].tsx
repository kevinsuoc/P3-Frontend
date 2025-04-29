import { View, Text, StyleSheet } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { useLocalSearchParams } from 'expo-router';

export default function multimedia() {
    const { id } = useLocalSearchParams<{ id: string }>();

    if (id === "novideo")
        return (
            <View style={styles.container}>
                <Text>El jugador no tiene video</Text>
            </View>
    )
  
  return (
    <View style={styles.container}>
      <Text>Video: </Text>
      <Video
        source={{ uri: id }}
        volume={1.0}
        isMuted={false}
        shouldPlay={false}
        useNativeControls={true}
        isLooping={false}
        resizeMode={ResizeMode.COVER}
        style={{ width: 800, height: 600 }}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
