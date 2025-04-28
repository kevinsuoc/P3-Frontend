import { View, Text, StyleSheet } from 'react-native';
import { Jugador } from '../jugador';
import { useRouter } from 'expo-router';
import { Pressable } from 'react-native';

export default function DetailsScreen() {
    const router = useRouter();
  
    const handlePress = () => {
      router.navigate('/multimedia');
    }
  
  return (
    <View style={styles.container}>
      <Text>Details</Text>
      <Pressable onPress={() => handlePress()}>
        <View>
          <Text>Ver multimedia</Text>
        </View>
      </Pressable>
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
