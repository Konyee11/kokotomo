# Kokotomo (ココトモ)

Kokotomoは、MERNスタックを使用して構築されたSNSアプリケーションです。このアプリケーションでは、ユーザー同士がつながり、投稿を共有し、コメントを残し、他の投稿に"いいね"を付けることができます。シンプルかつ直感的なデザインで、誰もが利用しやすいSNSプラットフォームを提供します。

---

## 主な機能

- ユーザー登録およびログイン機能（JWT認証）
- プロフィール編集機能
- 投稿作成、削除、編集
- ユーザー同士のフォロー機能
- タイムラインでの投稿閲覧
- 画像アップロード機能（Multerを使用）
- リアルタイムの状態管理（Context API + Reducer）

---

## 技術スタック

### フロントエンド

- **HTML**: 構造設計
- **SCSS**: スタイルの管理
- **React**: UIライブラリ
- **Vite**: 高速な開発環境

### バックエンド

- **Node.js**: サーバーサイド環境
- **Express**: Webフレームワーク

### データベース

- **MongoDB**: NoSQLデータベース
- **Mongoose**: MongoDBとのスキーマベースなインターフェース

### 状態管理

- **Context API**: アプリ全体のグローバルな状態管理
- **Reducer**: アクションとステート管理のロジック

### その他

- **Multer**: 画像アップロードのハンドリング

---

## セットアップ方法

以下の手順に従って、開発環境を構築してください。

### 必要条件

- Node.js がインストールされていること
- MongoDB がローカルまたはクラウド環境で使用可能であること

### セットアップ

リポジトリをクローンして、必要な依存関係をインストールし、フロントエンドおよびバックエンドを起動します。

```bash
git clone https://github.com/Konyee11/kokotomo.git
cd kokotomo
npm install
npm run dev
```

`.env` ファイルを作成し、以下の環境変数を設定してください:

```
MONGO_URI=your_mongo_db_connection_string
JWT_SECRET=your_jwt_secret_key
```

---

## プロジェクト構成

```
kokotomo/
├── README.md              # プロジェクト概要
├── client/                # フロントエンドコード
│   ├── README.md          # クライアント用README
│   ├── eslint.config.js   # ESLint設定
│   ├── index.html         # アプリのエントリーポイント
│   ├── package.json       # npmパッケージ情報
│   ├── src/               # ソースコード
│   │   ├── App.jsx        # メインアプリケーション
│   │   ├── components/    # 再利用可能なReactコンポーネント
│   │   ├── pages/         # ページコンポーネント
│   │   ├── state/         # 状態管理（Context APIとReducer）
│   │   ├── styles/        # SCSSスタイル
│   │   ├── dummyData.js   # テストデータ
│   │   ├── dispatch.js    # アクションディスパッチ
│   │   ├── main.jsx       # Reactエントリーポイント
│   │   └── index.scss     # グローバルスタイル
│   └── vite.config.js     # Vite設定
├── server/                # バックエンドコード
│   ├── models/            # Mongooseモデル
│   ├── routes/            # APIルート
│   ├── public/            # サーバーの静的ファイル
│   └── server.mjs         # メインサーバーコード
├── .gitignore             # Gitで追跡しないファイル
├── package.json           # npmパッケージ情報
```

---

## 使用方法

1. アカウントを登録し、ログインします。
2. プロフィールを編集して自己紹介を記載します。
3. 新しい投稿を作成して、フォロワーとシェアします。
4. 他のユーザーをフォローしてタイムラインを充実させましょう。

---

## 今後の予定

- リアルタイムチャット機能の実装
- 投稿へのコメント機能の追加
- パフォーマンス最適化

