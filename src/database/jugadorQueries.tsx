import { getFirestore, doc, getDoc, deleteDoc, addDoc, collection, setDoc } from 'firebase/firestore';
import firestore from '@react-native-firebase/firestore';
import { Jugador } from '../jugador';

export async function firestoreGetJugador(platform: string, id: string): Promise<Jugador | null>
{
    let j: any;

    if (platform === "web")
        j = await getDoc(doc(getFirestore(), 'jugadores', id));
    else
        j = await firestore().collection('jugadores').doc(id).get();
    if (!j.exists())
        return null;

    const jugador = j.data()
    jugador.id = id;
    return jugador as Jugador;
}

export async function firestoreBorrarJugador(platform: string, id: string): Promise<boolean> {
    try {
        if (platform === "web") {
            await deleteDoc(doc(getFirestore(), "jugadores", id));
        } else {
            await firestore().collection("jugadores").doc(id).delete();
        }
        return true;
    } catch (error) {
        return false;
    }
}

export async function firestoreAgregarJugador(platform: string, jugador: Jugador): Promise<boolean> {
    try {
        if (platform === "web")
            await addDoc(collection(getFirestore(), "jugadores"), jugador)
        else 
            await firestore().collection('jugadores').add(jugador)
        return true;
    } catch (err){
        return false;
    }
}



export async function firestoreActualizarJugador(platform: string, jugador: Jugador): Promise<boolean> {
    if (!jugador.id) return false;

    try {
        if (platform === "web") {
            await setDoc(doc(getFirestore(), "jugadores", jugador.id), jugador);
        } else {
            await firestore().collection("jugadores").doc(jugador.id).set(jugador);
        }
        return true;
    } catch (err) {
        return false;
    }
}