# fcm-playground-ionic
An Ionic playground app for testing Firebase Cloud Messaging

## How to use it

1. Clone the project

   ```shell
   git clone git@github.com:danielpassos/fcm-playground-ionic.git
   cd fcm-playground-ionic/
   ```
   
1. Create a project on [Firebase](http://console.firebase.google.com/)
1. Add and Android app using the **Android package name** `me.passos.playground.fcm.ionic`    
1. Download the **google-services.json** file to the root folder
1. Add the **Android** platform

   ```shell
   ionic cordova platform add android
   ```
   
1. Run the app in the Android device

   ```shell
   ionic cordova run android
   ``` 
