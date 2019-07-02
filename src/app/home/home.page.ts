import { Component, Injectable } from '@angular/core';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';
import { ConfigurationService } from '@aerogear/core';
import { PushRegistration } from '@aerogear/push';

declare var require: any;
const config = require('./mobile-services.json');

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
  registered = false;

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

    new PushRegistration(new ConfigurationService(config))
    .register('Passos', ['ionic', 'playground'])
    .then(() => {
      this.messages.push({
        date: new Date(),
        type: 'registration',
        message: 'Device registered on UnifiedPush Server'
      });
      console.log('Device registered on UnifiedPush Server');
    }).catch(err => {
      console.error('Error on device registration', err);
    });

    pushObject
    .on('notification')
    .subscribe((notification: any) => {
      this.messages.push({
        date: new Date(),
        type: 'notification',
        message: notification.message
      });
      console.log('Received a notification', notification);
    });

  }

  private register() {

  }

}
