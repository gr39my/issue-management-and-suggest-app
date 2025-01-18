# Issue Management and Suggestion App
## 概要
このアプリケーションは、課題管理システムおよび解決策提案ツールです。
ユーザーは課題を登録し、部門ごとの課題状況を確認したり、OpenAI APIを活用して課題解決のためのツールや技術を提案を受けることができます。

## 主な機能
- 課題の登録
  - 課題のタイトル、説明、対象部門を指定して課題を登録できます。
- 課題解決の提案
  - OpenAI APIを活用し、登録された課題に適したITツールや技術を提案します。
- ダッシュボード
  - 部門ごとの課題数や解決済み課題数を取得し、部門全体の状況を確認できます。

## 使用技術
バックエンド: Flask
データベース: SQLAlchemy（PostgreSQLを使用可能）
AI: OpenAI API (text-davinci-002 エンジン)
その他: Flask-CORS, python-dotenv

## 必要要件
以下が動作環境として必要です：

Python 3.8以上
OpenAI APIキー
データベース（例: PostgreSQL）
## インストール方法
1. リポジトリをクローン

```bash
git clone <リポジトリURL>
cd issue-management-and-suggest-app
```

2. 仮想環境を作成して有効化

```bash
python -m venv venv
source venv/bin/activate  # Windowsの場合: venv\Scripts\activate
```

3. 依存関係をインストール

```bash
pip install -r requirements.txt
```

4. 環境変数を設定 .envファイルを作成し、以下の内容を記載します：

```makefile
OPENAI_API_KEY=あなたのOpenAI_APIキー
DATABASE_URL=postgresql://ユーザー名:パスワード@ホスト名/データベース名
```

5. データベースを初期化 アプリケーションで使用するテーブルを作成します。

6. アプリケーションを起動 アプリケーションをローカルで実行します。

```bash
python app.py
```

デフォルトでは、http://127.0.0.1:5000でアプリケーションが起動します。

## エンドポイント
1. 課題の登録
POST `/api/issues`

- リクエストボディ（JSON形式）

  ```json
  {
    "title": "課題のタイトル",
    "description": "課題の説明",
    "department": "対象部門"
  }
- レスポンス
  ```json
  {
    "message": "Issue created successfully"
  }
  ```
2. 課題解決の提案
POST `/api/suggestions`

- リクエストボディ（JSON形式）
  ```json
  {
    "description": "課題の説明",
    "department": "対象部門"
  }
  ```
- レスポンス（例）
  ```json
  [
    {
      "tool": "Trello",
      "description": "タスク管理を効率化するツール"
    },
    {
      "tool": "Slack",
      "description": "部門間のコミュニケーションを強化するツール"
    }
  ]
  ```
  
3. ダッシュボードデータの取得
GET `/api/dashboard`

- レスポンス（例）
  ```json
  [
    {
      "department": "IT",
      "issueCount": 10,
      "resolvedCount": 7
    },
    {
      "department": "HR",
      "issueCount": 5,
      "resolvedCount": 2
    }
  ]
  ```

## 注意事項
OpenAI APIの利用には料金が発生します。使用量を管理してください。
.envファイルは公開しないようご注意ください。
