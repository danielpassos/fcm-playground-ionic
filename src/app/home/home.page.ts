import { Component, Injectable } from '@angular/core';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
@Injectable()
export class HomePage {

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

    pushObject.on('notification')
    .subscribe((notification: any) => console.log('Received a notification',
      notification));

    pushObject.on('registration')
    .subscribe(
      (registration: any) => console.log('Device registered', registration));

    pushObject.on('error')
    .subscribe(error => console.error('Error with Push plugin', error));

  }

}
