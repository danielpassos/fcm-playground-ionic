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
  }

  register() {
    new PushRegistration(new ConfigurationService(config))
    .register({alias: 'Passos', categories: ['ionic', 'cordova']})
    .then(() => {
      this.messages.push({
        date: new Date(),
        type: 'registration',
        message: 'Device registered on UnifiedPush Server'
      });
      this.registered = true;
      console.log('Device registered on UnifiedPush Server');

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
      .on('notification')
      .subscribe((notification: any) => {
        this.messages.push({
          date: new Date(),
          type: 'notification',
          message: notification.message
        });
        console.log('Received a notification', notification);
      });
    }).catch(err => {
      this.registered = false;
      console.error('Error on device registration', err);
    });
  }

  unregister() {
    new PushRegistration(new ConfigurationService(config))
    .unregister()
    .then(() => {
      this.messages.push({
        date: new Date(),
        type: 'registration',
        message: 'Device unregistered on UnifiedPush Server'
      });
      this.registered = false;
      console.log('Device unregistered on UnifiedPush Server');
    }).catch(err => {
      this.registered = true;
      console.error('Error on device registration', err);
    });
  }

}
