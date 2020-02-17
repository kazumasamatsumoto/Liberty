import { Injectable } from '@angular/core';

interface User {
    status: number; // 0: 未連携（ユーザーと保護者の紐付けが完了していない）
                    // 1: 連携済み（ユーザーと保護者の紐付けが完了している）
    is_guardian: boolean; // false: ユーザー、 true: ガーディアン
    guardian: {
      ref: any;
    };
    top_image: {
      path: string;  // イメージのパス(Firebase Storageにおいた)
      ref: any;
    };
  }

@Injectable({
  providedIn: 'root'
})
export class AdminUserServiceService {
  // 管理しているユーザの取得
  // そのユーザのトップイメージの設定
  // 画像の追加
  public currentUser: User;

  constructor() { }

}
