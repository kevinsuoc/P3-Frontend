import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { Button, Text, TextInput, View, Modal, Platform } from "react-native";
import { Jugador } from "@/src/jugador";
import { useRouter } from "expo-router";
import { firestoreAgregarJugador } from "@/src/database/jugadorQueries";
import { validarJugador } from "@/src/validar/validarJugador";

export default function Agregar() {
    const router = useRouter();

    const [modalVisible, setModalVisible] = useState(false);
    const [modalText, setModalText] = useState<string>('');
    const [jugadorAgregado, setJugadorAgregado] = useState<boolean>(false);

    const [nombreField, setNombreField] = useState<string>('');
    const [posicionField, setPosicionField] = useState<string>('');
    const [dorsalField, setDorsalField] = useState<string>('');
    const [edadField, setEdadField] = useState<string>('');
    const [nacionalidadField, setNacionalidadField] = useState<string>('');
    const [descripcionField, setDescripcionField] = useState<string>('');
    const [alturaField, setAlturaField] = useState<string>('');

    const agregarJugador = () => {
        const jugador: Jugador = {
            Nombre:nombreField,
            Dorsal:Number(dorsalField),
            Descripcion:descripcionField,
            Nacionalidad:nacionalidadField,
            Altura:alturaField,
            Posicion:posicionField,
            Edad:Number(edadField),
        }
    
        const errores: string[] = validarJugador(jugador);

        if (errores.length > 0)
        {
            setModalText(errores.join('\n'));
            setModalVisible(true);
            return ;
        }

        setModalText("Agregando jugador...")
        setJugadorAgregado(true)
        setModalVisible(true)

        firestoreAgregarJugador(Platform.OS, jugador)
        .then(() => {setModalText("Jugador Agregado")})
        .catch(() => {setModalText("No se pudo agregar el jugador")})
    }

    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {setModalVisible(!modalVisible);}}
                style={{backgroundColor: "black"}}
            >
                <View style={{ flex:1, justifyContent:'center', alignItems:'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <View style={{ padding:20, backgroundColor: 'white', borderRadius: 10 }}>
                        <Text>{modalText}</Text>
                        <Button title="Cerrar" onPress={() => { setModalVisible(false); if (jugadorAgregado) router.back()}} />
                    </View>
                </View>
            </Modal>
            
            <TextInput
                onChangeText={setNombreField}
                value={nombreField}
                placeholder="Nombre"
            />
            <TextInput
                onChangeText={setDorsalField}
                value={dorsalField}
                placeholder="Dorsal"
            />
            <TextInput
                onChangeText={setEdadField}
                value={edadField}
                placeholder="Edad"
            />
            <TextInput
                onChangeText={setNacionalidadField}
                value={nacionalidadField}
                placeholder="Nacionalidad"
            />
            <TextInput
                onChangeText={setDescripcionField}
                value={descripcionField}
                placeholder="Descripción"
            />
            <TextInput
                onChangeText={setAlturaField}
                value={alturaField}
                placeholder="Altura"
            />
            <Picker
                selectedValue={posicionField}
                onValueChange={(val) => setPosicionField(val)}
                placeholder="Posición"
            >
                <Picker.Item label="Elegir posición" value="" />
                <Picker.Item label="Alero" value="Alero" />
                <Picker.Item label="Base" value="Base" />
                <Picker.Item label="Escolta" value="Escolta" />
                <Picker.Item label="Pivot" value="Pivot" />
                <Picker.Item label="Ala-Pivot" value="Ala-Pivot" />
            </Picker>
            <Button onPress={agregarJugador} title="Agregar jugador"></Button>
        </View>
    );
}