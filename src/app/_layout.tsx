import React from 'react';
import { Stack } from "expo-router";
import { Button, View, Platform, Linking } from 'react-native';
import { useRouter } from "expo-router";
import { getApps, initializeApp } from '@react-native-firebase/app';
import { firebaseConfig } from '../app.config';

if (Platform.OS === "web") {
    if (getApps().length === 0)
        initializeApp(firebaseConfig);
}

function HomeButton() {
    const router = useRouter();

    const handleHomeButton = () => {
        router.dismissTo('/')
    };

    return <Button onPress={handleHomeButton} title="Inicio" />;
}

function GitHubButton() {
    const handleGitHubButton = () => {
        Linking.openURL('https://github.com/kevinsuoc/P3-Frontend');
    };

    return (
        <View style={{ marginRight: 10 }}>
            <Button onPress={handleGitHubButton} title="GitHub" />
        </View>
    );
}

function HeaderButtons() {
    return (
        <View style={{ flexDirection: 'row', gap: 10 }}>
            <HomeButton />
            <GitHubButton />
        </View>
    );
}

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: 'FrontMobi', headerRight: () => <HeaderButtons /> }} />
            <Stack.Screen name="details/[id]" options={{ title: 'Detalle', headerRight: () => <HeaderButtons /> }} />
            <Stack.Screen name="multimedia/[id]" options={{ title: 'Multimedia', headerRight: () => <HeaderButtons /> }} />
            <Stack.Screen name="details/image/[url]" options={{ title: 'Imagen de perfil', headerRight: () => <HeaderButtons /> }} />
            <Stack.Screen name="(agregar)/agregar" options={{ title: 'Añadir jugador', headerRight: () => <HeaderButtons /> }} />
            <Stack.Screen name="details/editar/[id]" options={{ title: 'Editar jugador', headerRight: () => <HeaderButtons /> }} />
        </Stack>
    );
}
