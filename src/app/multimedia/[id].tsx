import { View, Text, StyleSheet } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { useLocalSearchParams } from 'expo-router';

export default function Multimedia() {
  const { id } = useLocalSearchParams<{ id: string }>();

  if (id === "novideo")
      return <NoVideoComponent />
  
  return <VideoComponent id={id} />;
}

function VideoComponent({id}: {id: string}) {
  return (
    <View style={styles.container}>
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
  )
}

function NoVideoComponent(){
  return (
    <View style={styles.container}>
        <Text>El jugador no tiene video</Text>
    </View>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
    overflow: 'hidden',
  },
  video: {
    width: '70%',
    aspectRatio: 16 / 9,
    justifyContent: 'center',
    alignItems: 'center', 
  },
});
