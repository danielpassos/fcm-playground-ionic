# fcm-playground-ionic
An Ionic playground app for testing Firebase Cloud Messaging

## How to use it

1. Clone the project

   ```shell
   git clone git@github.com:danielpassos/fcm-playground-ionic.git
   cd fcm-playground-ionic/
   git checkout aerogear
   ```
   
1. Create a project on [Firebase](http://console.firebase.google.com/)
1. Add and Android app using the **Android package name** `me.passos.playground.fcm.ionic`    
1. Download the **google-services.json** file to the root folder

1. Add a `mobile-services.json` file in the `src/app/home/` folder with the following content

   ```json
   {
     "version": 1,
     "namespace": "playground",
     "clientId": "fcm-playground",
     "services": [
       {
         "id": "push",
         "name": "push",
         "url": "[YOUR_UNIFIEDPUSH_SERVER URL/IP]",
         "type": "push",
         "config": {
           "android": {
             "variantId": "[YOUR_UNIFIEDPUSH_SERVER_VARIANT_ID]",
             "variantSecret": "[YOUR_UNIFIEDPUSH_SERVER_VARIANT_SECRET]",
             "senderId": "[YOUR_FCM_SENDER_ID]"
           }
         }
       }
     ]
   }
   ```  

1. Add the **Android** platform

   ```shell
   ionic cordova platform add android
   ```

1. Run the app in the Android device

   ```shell
   ionic cordova run android
   ``` 

