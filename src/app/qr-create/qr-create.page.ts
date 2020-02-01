import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-qr-create',
  templateUrl: './qr-create.page.html',
  styleUrls: ['./qr-create.page.scss'],
})
export class QrCreatePage implements OnInit {
  // ここのQRデータをどうするかによるなんのデータを持たせてスキャンするのか？
  qrData = 'https://aws.amazon.com/jp/';
  scannedCode = null;
  elementType: 'url' | 'canvas' | 'img' = 'canvas';

  constructor() { }

  ngOnInit() {
  }

}
