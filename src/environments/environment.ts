// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {
  IS_APIKEY,
  IS_AUTHDOMAIN,
  IS_DATABASEURL,
  IS_STORAGEBUCKET,
  IS_MESSAGINGSENDERID,
  IS_PROJECTID,
  IS_APPID,
  IS_MEASUREMENTID
  } from '../config';


export const environment = {
  production: false,
  firebase: {
    apiKey: IS_APIKEY,
    authDomain: IS_AUTHDOMAIN,
    databaseURL: IS_DATABASEURL,
    projectId: IS_PROJECTID,
    storageBucket: IS_STORAGEBUCKET,
    messagingSenderId: IS_MESSAGINGSENDERID,
    appId: IS_APPID,
    measurementId: IS_MEASUREMENTID
  }
};



/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
