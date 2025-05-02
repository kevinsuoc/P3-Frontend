import React from 'react';
import { Stack } from "expo-router";
import { Text, TouchableOpacity } from 'react-native';
import { useRouter } from "expo-router";
import { Platform } from 'react-native';
import { getApps, initializeApp } from '@react-native-firebase/app';
import { firebaseConfig } from '../app.config';
import { indexStyles } from '../styles/indexStyles';

if (Platform.OS === "web"){
  if (getApps().length === 0)
    initializeApp(firebaseConfig);
}

function HeaderTitle() {
  return (
    <Text style={{
      fontSize: 26,
      fontWeight: 'bold',
      color: '#1E3A8A',
      marginLeft: 10
    }}>
      🏀 FrontMobi
    </Text>
  );
}

function HomeButton() {
  const router = useRouter();

  const handleHomeButton = () => {
    router.dismissTo('/')
  };

  return <TouchableOpacity onPress={handleHomeButton} style={indexStyles.botonPrincipal}><Text style={indexStyles.textoBoton}>Inicio</Text></TouchableOpacity>;
}

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerTitle: () => <HeaderTitle />, headerRight: () => <HomeButton /> }}
      />

      <Stack.Screen 
        name="details/[id]" 
        options={{ title: 'Detalle', headerRight: () => <HomeButton /> }} 
      />
      <Stack.Screen 
        name="multimedia/[id]" 
        options={{ title: 'Multimedia', headerRight: () => <HomeButton /> }} 
      />
      <Stack.Screen 
        name="details/image/[url]" 
        options={{ title: 'Imagen de perfil', headerRight: () => <HomeButton /> }} 
      />
      <Stack.Screen 
        name="(agregar)/agregar"
        options={{title: 'Añadir jugador', headerRight: () => <HomeButton/>}}
      />
      <Stack.Screen 
        name="details/editar/[id]"
        options={{title: 'Editar jugador', headerRight: () => <HomeButton/>}}
      />
    </Stack>
  );
}