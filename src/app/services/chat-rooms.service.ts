import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatRoomsService {

  constructor(
    private db: AngularFirestore
  ) { }

  // チャットルーム関連の処理

  // chat_roomsのコレクションを作成する
  public addChatRooms(status: number, userRefs: any[], adminUserRefs: string[], userImages: string[]) {
    console.log(userRefs, adminUserRefs);
    return this.db.collection('chat_rooms').add({
      status, // 0: 未承認,  1: 承認済み。user_chat_roomsの全Statusが1になったときに、こちらも1にする
      userRefs, // chatRoomに所属するUserIdがある。承認、非承認問わない。
      adminUserRefs, // chatRoomに所属するadminのUserIdがある。承認、非承認問わない。
      userImages, // お互いのユーザのトップ画像
      updated: new Date(), // 更新日
      created: new Date(), // 作成日
    });
  }

  public addUserChatRooms(uid: string, userId: string, userRef: any, status: number) {
    this.db.collection(`chat_rooms/${uid}/user_chat_rooms/`).doc(userId)
      .set({
        user: {ref: userRef},
        status
      });
  }

  // userRefがchat_roomsのadminuserRefsのrefに一致しかつステータスが0（未承認）のchat_roomsを取得する

  public getApplovalList(userRef) {
    return this.db.collection('chat_rooms', ref => ref
      .where('adminUserRefs', 'array-contains', userRef)
      .where('status', '==', 0)
      )
      .valueChanges({idField: 'id'})
      .pipe(map(actions => actions.map(action => {
        return action;
      })));
  }

  /**
   * ユーザ側でマッチ中のリスト一覧取得
   */
  public getApprovalListForUser(userRef) {
    return this.db.collection('chat_rooms', ref => ref
    .where('userRefs', 'array-contains', userRef)
    .where('status', '==', 1)
    )
    .valueChanges({idField: 'id'})
    .pipe(map(actions => actions.map(action => {
      console.log(action);
      return action;
    })));
  }

  /**
   * トークルームの取得
   * createdAtの日時順に並べる
   */
  public getTalks(chatRoomId: string) {
    return this.db.collection(`chat_rooms/${chatRoomId}/talks`, ref =>
      ref.orderBy('createdAt', 'desc').limit(50)) // .limit(50)で最新の情報を50件取得する
      .valueChanges({idField: 'id'})
      .pipe(map(actions => actions.reverse()));
      // reverseで取得した情報を並び替えます
  }

  /**
   * ガーディアンのステータスの変更
   */
  public guardianStatusChange(uid: string, guardianUserId: string) {
    this.db.collection(`chat_rooms/${uid}/user_chat_rooms/`).doc(guardianUserId)
      .update({
        status: 1
      });
  }

  /**
   * チャットルームのステータスチェック
   */
  public statusCheck(uid: string) {
    let flag = true;
    this.db.collection(`chat_rooms/${uid}/user_chat_rooms/`)
    .valueChanges()
    .pipe(map(actions => actions.map((action: any) => {
      if (action.status === 0) {
        flag = false;
      }
    })))
    .subscribe(() => {
      if (flag) {
        this.db.collection('chat_rooms').doc(uid)
        .update({
          status: 1
        });
      }
    });
  }
}
