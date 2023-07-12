import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Socket } from 'ngx-socket-io';  
import { User } from 'src/app/shared/interfaces/user.type';
import { AuthService } from '../auth.service';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  constructor(private socket: Socket,private store:Store<any>,private auth:AuthService) {
   }
   currentUser:any;
  ConnectSocket() {
    // this.store.select('user').subscribe(user=>this.CurrentUser=user)
     this.currentUser  = this.auth.getuser()
    console.log(this.currentUser.id);
    
    if (this.currentUser.id) {
      this.socket.ioSocket["auth"] = { user_id: this.currentUser.id }
      this.socket.connect()
    }
  }
  DisConnectSocket(){
    this.socket.disconnect()
  }
  ProfileSwipe(user_id: number,swipeType:boolean){
    const ProfileSwipeInfo ={
      swiped_by:this.currentUser.id ,
      user_id,
      swipe_type:swipeType?"Right":"Left"
    }
    this.socket.emit('profileSwipe', ProfileSwipeInfo);
  }
  Notify(){
    this.socket.on('notify', (data:any)=>{
        alert(JSON.stringify(data))
    });
  }
}
