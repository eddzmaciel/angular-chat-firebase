
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators'

//autentifacion con firebase
import { AngularFireAuth } from '@angular/fire/auth';

import { auth } from 'firebase/app';
import 'firebase/auth';

//interfaces
import { IMensaje } from './../interface/mensaje.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<IMensaje>;
  public chats: IMensaje[] = [];
  public usuario: any = {};

  constructor(
    private afs: AngularFirestore,
    public afAuth: AngularFireAuth) {
    //con este estamos obteniendo el estado del usuario
    this.afAuth.authState.subscribe((user) => {
      console.log('estado del usuario: ', user);
      if (!user) {
        return;
      }
      this.usuario.nombre = user.displayName;
      this.usuario.email = user.email;
      this.usuario.uid = user.uid;
      this.usuario.urLfoto = user.photoURL;
    });
  }

  //vamos a importar el componente para la autenticacion de firebase para  Twitter y Google
  login(provedor: string) {
    if (provedor === 'google') {
      this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
    } else {
      this.afAuth.signInWithPopup(new auth.TwitterAuthProvider());
    }
  }

  logout() {
    this.usuario = {};
    this.afAuth.signOut();
  }

  cargarMensajes() {
    /* aqui vamos a cargar los datos de la collection haciendo referencia a este observable 
      vamos a mandar un query */
    this.itemsCollection = this.afs.collection<IMensaje>('chats',
      ref => ref.orderBy('fecha', 'desc')
        .limit(5)
    );
    /* para estar pendiente a los cambios que se hagan a esta collection
      vamos a hacer lo siguiente observable
      nota: identificas que es observable cuando este utiliza .subscribe()  */
    //este es el objeto que yo quiero regresar por que queremos subscribirnos a el
    return this.itemsCollection.valueChanges().pipe(
      //este es el map pero de angular
      map((mensajes: IMensaje[]) => {
        console.log(' service --> cargarMensajes: ', mensajes);
        this.chats = [];
        /* este es el map de javascript, de preferencia usar para arrays pequeños no tan extensos
          mensajes.map((item) => this.chats.unshift(item));
          o se puede hacer con un for, es bueno para arrays grandes */
        for (let mensaje of mensajes) {
          this.chats.unshift(mensaje);
        }
        return this.chats;
      })
    );
  }

  agregarMensaje(texto: string) {
    //creamos el objeto de tipo IMensaje (como la interfaz)
    //y vamos a insertarlo en Firebase
    let mensaje: IMensaje = {
      nombre: this.usuario.nombre,
      mensaje: texto,
      fecha: new Date().getTime(),
      uid: this.usuario.uid
    }
    /* aqui vamos a insertar en la collection de firebase
      para verificar que es una promesa, vamos a poner . despues de add() y si aparece: then, catch, 
      es por que estamos llamando a una promesa que nos va a retornar algo */
    return this.itemsCollection.add(mensaje);
  }



}
