import { Component, Injectable } from '@angular/core';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';

export interface Message {
  date: Date;
  type: string;
  message: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
@Injectable()
export class HomePage {

  messages = [] as Message[];

  constructor(private push: Push) {
    const options: PushOptions = {
      android: {},
      ios: {
        alert: 'true',
        badge: true,
        sound: 'false'
      }
    };

    const pushObject: PushObject = this.push.init(options);

    pushObject
    .on('registration')
    .subscribe((registration: any) => {
      this.messages.push({
          date: new Date(),
          type: 'registration',
          message: 'Device registered'
        });
      console.log('Device registered', registration);
    });

    pushObject
    .on('notification')
    .subscribe((notification: any) => {
      this.messages.push({
        date: new Date(),
        type: 'notification',
        message: notification.title
      });
      console.log('Received a notification', notification);
    });

    pushObject
    .on('error')
    .subscribe(error => {
      this.messages.push({
        date: new Date(),
        type: 'error',
        message: 'Error with Push plugin'
      });
      console.error('Error with Push plugin', error);
    });

  }

}
