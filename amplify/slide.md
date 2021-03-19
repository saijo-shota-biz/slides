# Amplify が神だった
by [@saijo_shota](https://twitter.com/saijo_shota_biz)


---


## 自己紹介


--


![自己紹介](https://github.com/saijo-shota-biz/slides/blob/master/amplify/introduce.png?raw=true)


---


## アジェンダ

- Amplify is 何？
- Amplify のここが神
- まとめ


--


対象

- フロントエンドエンジニア
- モバイルアプリエンジニア
- ローカルでの開発はだいたいできるようになって、なにかWEBサービス/アプリを作ってみたい人

---


## Amplify is 何？

> AWS Amplify は、ウェブやモバイルのフロントエンドデベロッパーが、安全でスケーラブルなフルスタックアプリケーションを構築するためのサービスです


--


よくわからん。。。


--


![amplify-is](https://github.com/saijo-shota-biz/slides/blob/master/amplify/amplify-is.png?raw=true)


--


### ほかでいうと

- Java でいうところの Spring
- PHP でいうところの Laravel/CakePHP
- Ruby でいうところの Ruby on Rails


--


### 似たようなのは
- Firebase

---


## Amplifyのここが神


--


### 環境構築が楽すぎて神


--


#### 環境構築したいなぁー


--


```bash
amplify init
```

で終わり

--


楽やなぁ


--


#### ログイン機能実装したいなぁー


--


```bash
# 認証機能を追加
amplify add auth
# サーバーに反映
amplify push
```

で終わり

--


楽やなぁ


--

#### データのCRUD操作できるようにしたいなぁー
```
* CRUD操作とは
C ・・・ Create
R ・・・ Read
U ・・・ Update
D ・・・ Delete
のこと
```


--


```bash
amplify add api
# schema.graphql を編集
amplify push
```


--


schema.graphql を編集

```graphql
type Post @model
{
  id: ID!
  content: String!
  owner: String
}
```


--



え？ControllerとかServiceの実装いらんの？


--


楽やなぁ


--


#### 画像とかファイル扱いたいなぁー


--


```bash
amplify add storage
amplify push 
```

で終わり

--


楽やなぁ


--


#### バッチ処理とかしたいなぁー


--


```bash
amplify add function
# 関数を実装
amplify push
```

で終わり


--


楽やなぁ


--


#### デプロイしたいなぁー


--


```
amplify add hosting
amplify publish
```

でデプロイ完了


--



楽やなぁ


--


#### 要するに


--


基本は
```bash
amplify add 〇〇
```
で設定ファイルを追加して
```bash
amplify push
```
でサーバーに反映するだけでサーバーが作れる！


--


楽すぎて**神**


---


## Amplifyのここが神


--

### APIがシンプルすぎて神


--


#### ログイン機能作りたいなぁー


--

ユーザー名とパスワードでログインする場合

```javascript
// ユーザー登録
Auth.signUp({
  username: "", // ユーザーが入力したユーザー名
  password: "", // ユーザーが入力したパスワード
});

// ログイン
Auth.signIn(username, password);

// ログアウト
Auth.signOut();
```

--


Googleでログインする場合
```javascript
Auth.federatedSignIn({ provider: "Google" });
```


--


シンプルやなぁ


--


#### データのCRUDしたいなぁー


--


データの登録
```javascript
API.graphql({
  query: createTask,
  variables: { input: {
    title: "テスト",
    status: TaskStatus.NEW,
    date: new Date().toLocaleDateString(),
  }},
})
```


--


データの取得
```javascript
API.graphql({
  query: listTasks,
})
```


--


データの更新
```javascript
API.graphql({
  query: updateTask,
  variables: { input: {
    id: "testId",
    status: TaskStatus.DONE,
  }},
});
```


--


データの削除
```javascript
API.graphql({
  query: deleteTask,
  variables: { input: {
    id: "testId",
  }},
});

```


--

つまり

```javascript
API.graphql({
  query: // ここでgraqhqlのクエリを指定
  variables: // ここにインプットデータを指定
})
```

graqhqlのクエリは


schema.graphqlから自動生成される！！


--


シンプルやなぁ


--


#### ファイル保存したり取得したりしたいなぁー


--


```javascript
const key = "test.png"
// 保存する時
Storage.put(key, file);

// 取得する時
const fileUrl = await Storage.get(key);
const fileObject = await Storage.get(key, { download: true });

// 削除する時
Storage.remove(key);
```


--


シンプルやなぁ


--


シンプルすぎて**神**


--


**Topic**

ファイルのダウンロードをしたいとき


--


リンクパターン
```jsx
function fileDownloadLink({ fileKey }) {
  const [fileUrl, setFileUrl] = useState(null);
  useEffect(() => {
    async function downloadFile() {
      const url = await Storage.get(fileKey);
      setFileUrl(url);
    }
    downloadFile();
  },[]);
  if(!fileUrl) {
    return null;
  }
  return <a href={fileUrl} target="_blank">ファイルダウンロード</a>
}

```


--


ファイルダウンロードパターン
```jsx
function fileDownloadButton({ fileKey }) {
  async function handleOnDownloadBtnClick () {
    const result = await Storage.get(fileKey, { download: true });
    
    const url = URL.createObjectURL(result.Body);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename || 'download';
    const clickHandler = () => {
      setTimeout(() => {
        URL.revokeObjectURL(url);
        a.removeEventListener('click', clickHandler);
      }, 150);
    };
    a.addEventListener('click', clickHandler, false);
    a.click();
    return a;
  }
  return <button onClick={handleOnDownloadBtnClick}>ダウンロード</button>
}

```


---



## Amplifyのここが神


--


### リアルタイムアプリケーションの実装が楽すぎて神


--


リアルタイムの実装ってかなりめんどい
- ポーリング
- ロングポーリング
- SSE(Server-Sent Events)
- WebSocket
- MQTT
- WebRTC

--


#### データが更新されたときに処理したいなぁー


--


```jsx
function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // タスクが登録されたときにしたい処理を登録する
    const subscription = API.graphql({
      query: onCreateTask,
    }).subscribe(({ value }) => {
      setTasks(prev => [...prev, value.data.onCreateTask])
    });

    return () => {
      subscription.unsubscribe();
    }
  }, []);
}
```


--


要するに

```jsx
API.graphql({
  query: // onCreateXxxx, onUpdateXxx, onDeleteXxxを指定
}).subscribe(({ value }) => {
  // データが更新された時にしたい処理
})
```

onCreateXxxx, onUpdateXxx, onDeleteXxxも

schema.graphqlから自動生成される！！


--


楽すぎて**神**


---


## Amplifyのここが神


--


### 複数環境を作るのが楽すぎて神


--


#### 開発環境と本番環境を分けたいなぁー


--

本番環境を追加したい
```bash
amplify env add prod
amplify push
```

ローカルの接続環境を本番環境に切り替えたい
```bash
amplify env checkout prod
```

本番環境を取り込みたい
```bash
amplify pull --appId xxxxxxxxx --envName prod
```


--


ほかにも
- githubと連携して自動デプロイ
- プルリクエストのプレビュー
- ブランチごとに別の環境


--


楽すぎて神


---


## まとめ

- 環境構築が楽
- 複数環境の構築も楽
- 実装も楽
- デプロイも楽
- コマンドも覚えやすい
  - init, add, push, checkout, status, pull, publish
  - gitのコマンドに似てる


--


つまり


--


# 神


---


使ってみたい人向けチュートリアル

- https://amplify-sns.workshop.aws/ja/
  - Reactでツイッターっぽいアプリを作る
- https://github.com/dabit3/next.js-amplify-workshop
  - Next.jsでQiitaっぽい(記事を投稿したりする)アプリを作る