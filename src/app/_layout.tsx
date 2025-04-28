import React from 'react';
import { Stack, useNavigation } from "expo-router";
import { Button } from 'react-native';
import { useRouter } from "expo-router";

function HomeButton() {
  const router = useRouter();

  const handleHomeButton = () => {
    let count = 0;
    while (count++ < 20){
      if (router.canGoBack()) {
        router.back();
      }
    }
  };

  return <Button onPress={handleHomeButton} title="Inicio" />;
}

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ title: 'Lista', headerRight: () => <HomeButton /> }} 
      />
      <Stack.Screen 
        name="details" 
        options={{ title: 'Detalle', headerRight: () => <HomeButton /> }} 
      />
      <Stack.Screen 
        name="multimedia" 
        options={{ title: 'Multimedia', headerRight: () => <HomeButton /> }} 
      />
    </Stack>
  );
}