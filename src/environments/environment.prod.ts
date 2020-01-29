import {
  IS_APIKEY,
  IS_AUTHDOMAIN,
  IS_DATABASEURL,
  IS_STORAGEBUCKET,
  IS_MESSAGINGSENDERID,
  IS_PROJECTID,
  IS_APPID,
  IS_MEASUREMENTID
  } from '../config-test';


export const environment = {
  production: true,
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
