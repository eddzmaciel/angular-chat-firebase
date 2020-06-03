import { Component } from '@angular/core';

// importaciones para angularfire
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  chats: Observable<any[]>;
  constructor(firestore: AngularFirestore) {
    this.chats = firestore.collection('chats').valueChanges();
    console.log('this.chats: ', this.chats);
  }
}
