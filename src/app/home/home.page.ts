import { Component, Injectable } from '@angular/core';
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

  constructor() {
    PushRegistration.onMessageReceived((notification: any) => {
      this.messages.push({
        date: new Date(),
        type: 'notification',
        message: notification.message
      });
      console.log('Received a notification', notification.message);
    });
  }

  register() {
    new PushRegistration(new ConfigurationService(config))
    .register({
      alias: 'Passos',
      categories: ['ionic', 'cordova']
    })
    .then(() => {
      this.messages.push({
        date: new Date(),
        type: 'registration',
        message: 'Device registered on UnifiedPush Server'
      });
      this.registered = true;
      console.log('Device registered on UnifiedPush Server');
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
