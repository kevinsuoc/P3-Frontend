import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { Button, Text, TextInput, View, Modal } from "react-native";

export default function Agregar() {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalText, setModalText] = useState<string>('');

    const [nombreField, setNombreField] = useState<string>('');
    const [posicionField, setPosicionField] = useState<string>('');
    const [dorsalField, setDorsalField] = useState<string>('');
    const [edadField, setEdadField] = useState<string>('');
    const [nacionalidadField, setNacionalidadField] = useState<string>('');
    const [descripcionField, setDescripcionField] = useState<string>('');
    const [alturaField, setAlturaField] = useState<string>('');

    const validarTexto = (min: number, max: number, texto: string, nombre: string): string | null => {
        if (!texto.length || texto.length < min || texto.length > max)
            return `${nombre} debe tener entre ${min} y ${max} caracteres`;
        return null;
    }

    const validarNumero = (min: number, max: number, texto: string, nombre: string): string | null => {
        const num = parseInt(texto, 10);
        if (isNaN(num) || num < min || num > max)
            return `${nombre} debe estar entre ${min} y ${max}`
        return null;
    }

    const agregarJugador = () => {
        const errores: string[] = [];

        const nombreValido = validarTexto(3, 30, nombreField, "Nombre");
        if (nombreValido) errores.push(nombreValido)

        const posicionValido = validarTexto(3, 10, posicionField, "Posicion");
        if (posicionValido) errores.push(posicionValido)

        const dorsalValido = validarNumero(1, 99, dorsalField, "Dorsal");
        if (dorsalValido) errores.push(dorsalValido)

        const edadValido = validarNumero(1, 70, edadField, "Edad");
        if (edadValido) errores.push(edadValido)

        const nacionalidadValido = validarTexto(3, 30, nacionalidadField, "Nacionalidad");
        if (nacionalidadValido) errores.push(nacionalidadValido)

        const descripcionValido = validarTexto(5, 500, descripcionField, "Descripcion");
        if (descripcionValido) errores.push(descripcionValido)

        const alturaValido = validarTexto(2, 5, alturaField, "Altura");
        if (alturaValido) errores.push(alturaValido)

        if (errores.length > 0)
        {
            setModalText(errores.join('\n'));
            setModalVisible(true);
            return ;
        }

        setModalText("Agregado")
        setModalVisible(true)
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
                        <Button title="Cerrar" onPress={() => setModalVisible(false)} />
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