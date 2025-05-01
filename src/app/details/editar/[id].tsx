import { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { Jugador } from "@/src/jugador";
import { Platform, View, Modal, Text, Button, TextInput } from "react-native";
import { firestoreGetJugador, firestoreActualizarJugador } from "@/src/database/jugadorQueries";
import Cargando from "@/src/componentes/Cargando";
import { Picker } from "@react-native-picker/picker";
import { validarJugador } from "@/src/validar/validarJugador";

export default function Editar() {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalText, setModalText] = useState<string>('');
    const [jugador, setJugador] = useState<Jugador | null>(null);
    const { id } = useLocalSearchParams<{ id: string }>();
    
    const [nombreField, setNombreField] = useState<string>('');
    const [posicionField, setPosicionField] = useState<string>('');
    const [dorsalField, setDorsalField] = useState<string>('');
    const [edadField, setEdadField] = useState<string>('');
    const [nacionalidadField, setNacionalidadField] = useState<string>('');
    const [descripcionField, setDescripcionField] = useState<string>('');
    const [alturaField, setAlturaField] = useState<string>('');
    

    useEffect(() => {
            firestoreGetJugador(Platform.OS, id)
            .then((data) => {
                if (!data)
                    throw {error: "Jugador no encontrado"};
                setNombreField(data.Nombre);
                setPosicionField(data.Posicion);
                setDorsalField(String(data.Dorsal));
                setEdadField(String(data.Edad));
                setNacionalidadField(data.Nacionalidad);
                setDescripcionField(data.Descripcion);
                setAlturaField(data.Altura);
                setJugador(data);
            })
            .catch((err) => {console.log(err); setJugador(null)});
    }, []);

    const actualizarJugador = () => {
        const j: Jugador = {
            id: jugador!.id,
            Nombre:nombreField,
            Dorsal:Number(dorsalField),
            Descripcion:descripcionField,
            Nacionalidad:nacionalidadField,
            Altura:alturaField,
            Posicion:posicionField,
            Edad:Number(edadField),
        }

        const errores: string[] = validarJugador(j);

        if (errores.length > 0)
        {
            setModalText(errores.join('\n'));
            setModalVisible(true);
            return ;
        }

        setModalText("Actualizando jugador...")
        setModalVisible(true)

        firestoreActualizarJugador(Platform.OS, j)
        .then((data) => {
            if (data)
                setModalText("Jugador actualizado")
            else
                setModalText("No se pudo actualizar")})
        .catch(() => {setModalText("No se pudo actualizar el jugador")})
    }

    if (jugador == null)
        return <Cargando/>

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
                        <Button title="Cerrar" onPress={() => {setModalVisible(false)}} />
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
            <Button onPress={actualizarJugador} title="Actualizar"></Button>
        </View>
    )
}