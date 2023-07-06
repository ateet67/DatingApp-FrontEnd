import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Socket } from 'ngx-socket-io';  
import { User } from 'src/app/shared/interfaces/user.type';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  CurrentUser!:User;
  constructor(private socket: Socket,private store:Store<any>) {
    
   }
  ConnectSocket() {
    this.store.select('user').subscribe(user=>this.CurrentUser=user)
    console.log(this.CurrentUser.id);
    
    if (this.CurrentUser.id) {
      this.socket.ioSocket["auth"] = { user_id: this.CurrentUser?.id }
      this.socket.connect()
    }
  }
  ProfileSwipe(user_id: number,swipeType:boolean){
    const ProfileSwipeInfo ={
      swiped_by:this.CurrentUser?.id ,
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
