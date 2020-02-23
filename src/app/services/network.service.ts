import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore
  ) { }

  // 写真をアップロードする
  public async uploadPhoto(img: string, filename: string, userId: string) {
    // 画像がない場合は処理を終了します
    if (!img) {
      throw new Error('写真がありません');
    } else {
      const filePath = 'photos/' + userId + '/' + filename;
      const ref = this.storage.ref(filePath);
      const task = ref.putString(img, 'data_url');

      return task.then((snapshot) => {
        console.log('Uploaded', snapshot.totalBytes, 'bytes.');
        console.log('File metadata:', snapshot.metadata);
        return snapshot.ref.getDownloadURL().then((url) => {
          return this.addPhotoInfo(url, filename, userId);
        });
      });
    }
  }

  // DBにアップロードされた写真を追加する
  private addPhotoInfo(imgPath: string, photoname: string, userId: string) {
    return this.db.collection(`users/${userId}/images`).add({
      name: photoname,
      url: imgPath,
      createdAt: new Date()
    });
  }

  // 写真リストを取得する
  public getPhotos(userId) {
    return this.db.collection<{createdAt: Date, name: string, url: string}>(`users/${userId}/images`, ref => {
      return ref.orderBy('createdAt', 'desc');
    }).valueChanges({idField: 'id'})
      .pipe(map(actions => actions.map(action => {
        return action;
      })));
  }

  public deletePhoto(photoId: string, userId: string) {
    return this.db.collection(`users/${userId}/images`).doc(photoId).delete().then();
  }
}
