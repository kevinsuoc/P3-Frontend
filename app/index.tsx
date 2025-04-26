import { useRouter } from 'expo-router';
import { View, Text, Button } from 'react-native';
import React from 'react';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen</Text>
      <Button title="Ir a Players" onPress={() => router.push('/players')} />
      <Button title="Ir a Details" onPress={() => router.push('/detail')} />
    </View>
  );
}
