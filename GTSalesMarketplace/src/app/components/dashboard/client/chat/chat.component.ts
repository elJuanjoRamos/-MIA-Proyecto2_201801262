import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../../../services/chat.service';
import { PersonService } from '../../../../services/person.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  persons:any=[]
  mensajes:any=[]
  iduserChat:any = 0
  iduserLocal:any = Number(localStorage.getItem('id'))
  sendmessage:any = ""
  constructor(private person: PersonService, private chat: ChatService) { 
    this.inicializar()
  }

  ngOnInit(): void {
  }
  inicializar(){
    this.person.getAll().subscribe(data => {
      this.persons = data
    })
  }

  getChat(id:any){
    this.iduserChat = id
    var data = {
      "emisor" : localStorage.getItem('id'),
      "receptor" : this.iduserChat
    }

    this.chat.get(data).subscribe(data => {
      this.mensajes = data
    })
  }

  send() {

    if (this.sendmessage != "") {
      var data = {
        "emisor" : localStorage.getItem('id'),
        "receptor" : this.iduserChat,
        "mensaje" : this.sendmessage,
        "mail"  : localStorage.getItem('mail')
      }
      this.chat.post(data).subscribe(dat => {
        this.getChat(this.iduserChat)
      })

      this.sendmessage = ""
    }
  }
}
