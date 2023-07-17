import { Pipe, PipeTransform } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Pipe({
  name: 'fireSeen'
})
export class FireSeenPipe implements PipeTransform {

  constructor(private socket: Socket) { }
  transform(value: any, args: any): unknown {
    if (args.currentUserId != value.sender && !value.is_seen) {
      value.seen_at = new Date();
      console.log("notseen", value);
      this.socket.emit("msgSeen", { msg: value, groupName: args.groupName });
    }
    return null;
  }

}
