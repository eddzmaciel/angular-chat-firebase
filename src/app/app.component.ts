import { Component } from '@angular/core';

//servicios
import { ChatService } from './providers/chat.service';

// importaciones para angularfire
// import { AngularFirestore } from '@angular/fire/firestore';
// import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // chats: Observable<any[]>;
  constructor(/*firestore: AngularFirestore*/ public chatService: ChatService) {
    // this.chats = firestore.collection('chats').valueChanges();
    // console.log('this.chats: ', this.chats);
  }
}
