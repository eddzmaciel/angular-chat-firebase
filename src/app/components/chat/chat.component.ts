import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../providers/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit {

  mensaje: string = '';
  //este vamos a apuntarlo al elemento en el Html
  elemento: any;

  constructor(public chatService: ChatService) {
    this.chatService.cargarMensajes().subscribe(() => {
      //quiero que cuando reciba los nuevos mensajes
      //mover el contenedor con el scroll hasta al final
      //esto a vecs lo hace antes que de angular reciba la informacion
      setTimeout(() => {
        //por eso estamos poniendo un timeOut
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 30);
    });
  }

  ngOnInit() {
    //aqui tenemos la referencia al elemento hml
    this.elemento = document.getElementById('app-mensajes');
  }

  enviarMensaje() {
    console.log(this.mensaje);
    if (this.mensaje.length === 0) {
      return;
    }
    this.chatService.agregarMensaje(this.mensaje)
      .then(() => {
        this.mensaje = '';
      })
      .catch((err) => console.error('error al enviar! ', err))
  }

}
