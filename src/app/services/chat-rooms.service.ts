import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ChatRoomsService {

  constructor(
    private db: AngularFirestore
  ) { }

  // chat_roomsのコレクションを作成する
  public addChatRooms(status: number, userIds: any[], adminUserIds: string[]) {
    console.log(userIds, adminUserIds);
    return this.db.collection('chat_rooms').add({
      status, // 0: 未承認,  1: 承認済み。user_chat_roomsの全Statusが1になったときに、こちらも1にする
      userIds, // chatRoomに所属するUserIdがある。承認、非承認問わない。
      adminUserIds, // chatRoomに所属するadminのUserIdがある。承認、非承認問わない。
      updated: new Date(), // 更新日
      created: new Date(), // 作成日
    });
  }
}
