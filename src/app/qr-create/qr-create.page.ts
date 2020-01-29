import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
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

  constructor(private barcodeScanner: BarcodeScanner, private base64ToGallery: Base64ToGallery,
              private toastCtrl: ToastController) { }

  ngOnInit() {
  }

  scanCode() {
    this.barcodeScanner.scan().then(
      barcodeData => {
        this.scannedCode = barcodeData;
      }
    );
  }

  downloadQR() {
    const canvas = document.querySelector('canvas') as HTMLCanvasElement;
    const imageData = canvas.toDataURL('image/jpg').toString();
    console.log('data:', imageData);

    const data = imageData.split(',')[1];

    this.base64ToGallery.base64ToGallery(data,
      {prefix: '_img', mediaScanner: true })
      .then(async res => {
        const toast = await this.toastCtrl.create({
          header: 'QR Code saved in your Photolibrary'
        });
      }, err => console.log('err:', err)
      );
  }

}
