각 단원, 특정 페이지별로 중요하다고 생각한 부분 필기 + 나중에 복습할 때 이 부분 꼭 보면 좋겠다 싶은 것

~5단원까지는 1판 (2018)으로 공부. 이후엔 2판 (2020)로 공부.
그런데도 outdated/deprecated 된 것들이 많음. 저자 Github repo issue 보면서 걸러보기.

NodeJS Documentation
https://nodejs.org/api/http.html

## Rules

코드 보다가 생긴 문제점들 issue에 기록
ex) `[4.3] Serving requested files on GET request`
Problem : ~
Code : ~
Solution : ~

커밋 규칙 - https://overcome-the-limits.tistory.com/6?category=923736

**Emoji**
⭐️ : 중요하다고 생각
📚 : 복습하면 좋을 듯
❓ : 읽다가 궁금했던 점

## Todo

- [x] (13Jan21) set **ESLint**, **Prettier**

- [x] (13Jan21) set **nodemon**, so that contents are updated whenever there is any modifications
      (Does it work on whole folder? I have to create many individual js files...)
      → Can watch specific folder, but need to specify which js file to run (Need to manually change this whenever I study other chapters)

---

## Ch 1. 노드 시작하기

노드의 핵심 개념들 (정리 굿), 노드가 사용되는 곳 등

### 1-1. (⭐️x3) 노드 핵심 개념 📚

서버, 자바스크립트 런타임, 이벤트 기반 (event loop, task queue, background), 논블로킹 I/O, 싱글 쓰레드,

p.32 쓰레드 vs 프로세스 (면접 단골 문제)

❓ Q. 노드에서 '프로세스'? 보통 '싱글 쓰레드'라고 하지 않나
→ 한 프로세스, 여러 쓰레드 가지고 있지만 실제로 프로그래머가 제어 가능한 쓰레드는 하나라서 '싱글 쓰레드' (15Jan21)
https://stackoverflow.com/questions/62093281/process-vs-worker-vs-thread-vs-task-vs-pool-in-node-js

컴퓨터 논리 코어 개수만큼 쓰레드 생성해서 작업 병렬 처리 가능 (`cluster`, `pm2`)

### 1-2. 서버로서의 노드 (다른 언어 서버들에 대한 장단점) 📚

p.34 Node가 무조건 능사는 아니다! (성능 performance issue) → ⭐️ 면접에서 각 서버별 장단점 말하면 점수 좀 딸 듯

노드 특 : 개수는 많지만 (✅ 이벤트 기반, 논블로킹) 크기는 작은 (✅ 싱글 쓰레드) 데이터 실시간 처리하는데 유리
→ 네트워크, 데이터베이스, 디스크 작업 ex) 실시간 채팅 앱, 주식 차트, JSON 데이터 제공하는 API 서버

- Go - 비동기?
  Go도 서버 만들 수 있나? 튜토리얼 같은거 본 것 같긴 한데
- nginx - static 파일 제공, 로드 밸런싱 기능
  nginx가 apache 같은 상용 서버 프로그램인가
- Tomcat → 웹 애플리케이션 서버 (WAS)
- 이외 다양한 언어에서 서버 구현 가능 (내가 알고 있는 것들)
  Python - Django, Flask
  Java - Springboot
  C# - .NET
  Ruby - Ruby on rails

### 1-3. 서버 외의 노드

노드 → 자바스크립트 런타임; 서버 구현 이외에도 충분히 쓰임

웹 FE : Angular, React, Vue, Meteor
모바일 : React Native, Ionic Framework (Angular)
데스트톱 : Electron

❓ 이게 다 Node 기반이었다고? ㄷㄷㄷ

---

## Ch 2. 알아두어야 할 자바스크립트

❓ Q. ES2022 최신 문법 사용할 수 있나? Babel 있으면 가능?

### 2-1. ES2015+ (ES6)

- const, let → Hoisting 📚

- template literal

- object literal

- arrow function

  p.60 arrow → this 바인드 방식 📚

  ❓ Q. (예제) 함수 스코프 내에서 this 변경? window로 바뀐다는 건가

- Array/Object destructuring

- promise

  p.63 then 리턴값 = another promise

  pending promise

- async-await

  p.66 async-await 에서 에러처리 → await 코드를 try~catch로 감싸기

  p.67 arrow function async

  ⭐️훈련 방법 : 중첩 콜백 (callback hell) → promise → async/await 으로 고쳐보는 훈련

Date() vs new Date() - 전자는 함수, 후자는 생성자

### 2-2. 프론트엔드 자바스크립트

- AJAX 요청 → ~~jQuery~~, ~~XHR~~, **axios**, **fetch**
- FormData
- encodeURLComponent, decodeURLComponent (한글 주소)
- ⭐️ data attribute, dataset (사용자 지정 데이터)

---

## Ch 3. 노드 기능 알아보기

NodeJS = 자바스크립트 런타임 → js 파일 실행 가능 `node helloworld.js`

### 3-3. 모듈

모듈 : 특정한 기능을 하는 함수나 변수들의 집합 (ex. 수학 함수들의 모음 [참고](https://www.youtube.com/watch?v=2j7dqE3qaLM&ab_channel=GrowingCoders)) - 다른 프로그램에서 <u>재사용</u> 가능

2018판에선 CommonJS 모듈 소개 (require, module.exports), 하지만 ECMAScript modules (import, export) 쓰기!

### 3-4. 노드 내장 객체

import 없이 바로 사용

global, console, 타이머, \_\_filename & \_\_dirname, process

p.91 process.nextTick과 Promise = **마이크로태스크 (microtask)** = 다른 콜백 함수들 (setImmediate나 setTimeout) 보다 우선적으로 처리

### 3-5. 노드 내장 모듈

import 해서 사용

- os

- path

  ⭐️ path 중요! Windows vs POSIX 경로 다름

- (deprecated) url & querystring

- crypto

  p.103 단방향/양방향 암호화; 고객 비밀번호 암호화

### 3-6. 파일 시스템 접근하기

- fs (readFile, writeFile)

p.110 '버퍼' 등장

p.112 ⭐️ 동기 vs 비동기, 블로킹 vs 논블로킹 - Fig 3-10 📚

| 동기                                            | 비동기      |
| ----------------------------------------------- | ----------- |
| 바로 return X (백그라운드 작업 완료돼야 return) | 바로 return |

| Blocking                            | Non-blocking                                                 |
| ----------------------------------- | ------------------------------------------------------------ |
| 백그라운드 작업 완료 여부 계속 체크 | 백그라운드 신경 안씀; 나중에 백그라운드가 완료 알림 주면 그때 체크 |

동기메소드 (ex. readFileSync, writeFileSync) → 이전 작업 완료돼야 다음 작업 처리; <u>백그라운드 작업 완료시까지 메인 쓰레드는 대기</u>
=> 잘 안씀! 여러 요청 받는 웹 환경에서는 비효율적이라

- ⭐️ 버퍼 & 스트림

  p.115 버퍼링, 스트리밍

  버퍼 : 읽은 파일 데이터 저장하는 메모리 공간

  p.117 스트림 : 작은 크기의 버퍼를 사용해서, 큰 파일을 쪼개 여러 번 전송

  파이핑 : 스트림끼리 연결 ex) readMe.txt → writeMe.txt

- 기타 파일/폴더 생성 삭제

### 3-7. ⭐️ 이벤트

이벤트에 대한 이해
on (= addListener), emit
once, removeAllListeners, removeListener (= off), listenerCount

### 3-8. 예외 처리

p.127 노드는 쓰레드 한 개 = 에러로 멈추면 망함

try~catch

---

## Ch 4. http 모듈로 웹 서버 만들기

요청 처리해서 응답 보내는 서버, 쿠키와 세션 처리, 라우팅 공부

### 4-1. 요청과 응답 이해하기

p.135 req, res 그림 4-3 + 포트에 대해 (포트가 생략된 url ex. www.naver.com → 보통 HTTP 80번 포트 or HTTPS 443 포트 사용)

❓ (호기심) Q. 주소에 www 안 붙여도 되나?
→ 안 붙여도 됨. 해당 URL이 웹사이트임을 explicit하게 나타내기 위해서 붙일 수도 있음.
즉, www를 붙이는게 standard 혹은 특정한 규칙으로 정해져있는게 아님.
보통 www를 붙인 도메인 혹은 안붙은 도메인을 DNS 서버에 등록하고, 클라이언트가 다른 한쪽으로 접속하면 DNS에 등록된 도메인으로 redirect 시킴.
ex) 네이버는 www.naver.com 로 접속해도 naver.com로 redirec
참고 : https://wpengine.com/resources/http-vs-www-urls-for-seo/

### 4-2. 쿠키와 세션

p.138 클라 첫 요청 → 서버가 쿠키 보내줌 → 이후 클라는 요청 시 쿠키 동봉 → 서버는 쿠키 인식해서 사용자 맞춤 응답

p.139 쿠키 → req res의 헤더에; `req.headers.cookie`

p.141 HTTP 상태코드 (❗ FE개발 노드 수업 참고), 헤더와 바디 그림

p.148 ⭐️세션 : DB에 유저정보 저장하고, 세션ID 값만 주고받기
`쿠키 ⊂ 세션` 개념이 아니라, 전혀 다른 '인증' 방식

### 4.3 REST API 서버 및 라우팅

실전에선 Express 써서 서버 만들꺼라, 서버가 어떻게 작동하는지 궁금해져서 이 부분을 좀 구체적으로 공부함
Github issue : https://github.com/hy2850/NodeJS_study/issues/1

GET 요청, 서로 다른 주소 → 주소마다 다른 작업 진행; **라우팅**

서버의 'users' object 에 데이터 저장
→ 서버 끄면 데이터 날라감 → Store data on database

### 4.4 https와 http2

http2는 (21가을) FE개발 수업에서 배운 것 같은데? 중간 이후 후반부 수업이었던 것 같음

### 4.5 cluster

컴퓨터 코어 개수만큼 서버를 병렬로 실행해서 요청 분산 처리 가능.
장) 코어 하나만 사용할 때보단 빠름
단) 세션 공유 못함, ...
→ ❓ Redis 등의 서버 도입해서 해결?

실무에서는 `pm2`로 cluster 기능 사용.

---

## Ch 5. 패키지 매니저 NPM

### 5.2 Package.json으로 패키지 관리

p.217 전역(global) 설치 

npm이 설치된 컴퓨터 로컬 폴더 (C:\Users\사용자이름\AppData\Roaming\npm)에 패키지 설치.
보통 이 폴더의 경로는 환경변수에 등록되어 있어서, 전역 설치한 패키지는 콘솔 명령어로 사용 가능.

vs 로컬 설치

`npm install`는 현재 폴더의 node_modules 폴더에 패키지 설치함.
→ 콘솔로 바로 사용 불가; script에 써서 사용 가능



전역 설치 - package.json에 기록 안돼서, 나중에 필요할 때 `npm install`로 자동 설치 불가 
→ devDependency에 기록해두고 

```
npm install --save-dev {패키지}
npx {패키지} {명령어}
```



### 5.3 패키지 버전 이해

p.218 SemVer

minor, patch : 호환 가능한 버전 → Caret(^)으로 minor/patch 정도만 업데이트 받도록 `npm i express@^1.1.1`

@latest = @x : stable latest

@next : latest, not necessarily stable (alpha or beta version)

`npm i express@next`



### 5.4 기타 npm 명령어

### 5.5 패키지 배포하기

진짜 기타 npm 명령어들



---

## Ch 6. 익스프레스 웹 서버 만들기

### 6.1 익스프레스 프로젝트 시작하기

`app.set(키, 값)` - `app.get(키)`

`app.METHOD(주소, 라우터)` (METHOD = 요청의 HTTP 메소드 : get, put, post, delete, ...)

`res.send`, `res.sendFile`

`app.listen(포트, 실행할 콜백)`



### 6.2 미들웨어

p.232 라우터, 에러 핸들러도 미들웨어
`app.use(미들웨어)`



⚡️ 에러 - ERR_HTTP_HEADERS_SENT

res.send 다음에 res.status로 헤더 바꾸면 에러남

```Javascript
app.get(
  '/',
  (req, res, next) => {
    res.send('GET / 요청에서만 실행'); // 🔥
    next();
  },
  (req, res) => { // ⭐️하나의 app.use에 미들웨어 여러 개 연결 가능!
    throw new Error('에러는 에러 처리 미들웨어로 감');
  },
);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send(err.message); // 🔥 Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
});
```

https://stackoverflow.com/questions/7042340/error-cant-set-headers-after-they-are-sent-to-the-client
위 링크를 보면, 서버는 response를 header-body-finished 순으로 써내려가는데, body/finished 상태에 왔는데 header를 수정하려고 하면 ERR_HTTP_HEADERS_SENT 에러가 나타난다는 것.

https://www.codementor.io/@oparaprosper79/understanding-node-error-err_http_headers_sent-117mpk82z8
→ 한글 요약 : https://velog.io/@yhe228/ERRHTTPHEADERSSENT-Cannot-set-headers-after-they-are-sent-to-the-client



p.233
🤔 Q. Middleware 는 req, res, next 무조건 모두 가지고 있어야 하나?
A. ~~next 빼먹으면 안됨~~
(18Jan22) next 안쓸거면 (declare) 안해도 됨
https://stackoverflow.com/questions/42426768/node-js-express-middleware-function-without-next

Express API ref도 보면, `app.use`, `app.get` 같은 함수들 2번째 인자로 'middleware'를 받는다는 걸 알 수 있음. `app.get('/', (req, res)=>{})`에서, 2번째 arrow function도 middleware라는 것.



#### ⭐️ p.235 자주 쓰는 미들웨어 소개

* morgan (🚨 설치 필요) - 디버깅용 미들웨어 (HTTP req 로그 출력) 
  `app.use(morgan('dev'))`

* static - 정적인 파일 제공하는 라우터 역할; 실제 서버 경로를 외부에서 보지 못하게 가려주는 효과 (public 폴더 용도)

```javascript
app.use('요청 경로', express.static('실제 경로'))
app.use('/', express.static(path.join(__dirname, 'public'))) 
// 클라이언트에서 <script src="/mongoose.js"></script> 로 요청 주면, 실제 서버 'public' 폴더의 mongoose.js를 serve
```

* body-parser - req body를 해석해서 req.body에 넣어줌

```javascript
app.use(express.json());
app.use(express.urlencoded(...));
app.use(bodyParser.raw()); // 설치 필요 : npm i body-parser 
app.use(bodyParser.text());
```

* cookie-parser (🚨 설치 필요) - 쿠키 해석해서 req.cookies에
  `app.use(cookieParser(비밀키));`

* express-session (🚨 설치 필요) - 세션 관리 (로그인용 세션 구현, 특정 사용자를 위한 데이터 임시 저장 등)

  `app.use(session(옵션));`

  * DB에 세션 저장? Redis 활용?

    

🤔 Q. 매 request마다 위의 많은 middleware가 매번 실행되나?
→ ㅇㅇ 매 request마다 호출됨. iddleware에서 next 호출하면 다음 middleware로 넘어가는 식으로.
https://stackoverflow.com/questions/41862923/does-express-app-use-execute-every-time-a-path-is-heard-on-server-js



⭐️ p.242 미들웨어 흐름 (그림 6-6)

p.245 (공부안함) multer - 멀티 파드 데이터 (이미지, 동영상, 파일) 처리 



### 6.3 Router 객체로 라우팅 분리하기

p.251 Node http 모듈 라우팅 : if문으로 endpoint 체크 → inconvenient, hard to read
vs Express routing : easily separable routes



#### ⭐️특수 패턴 (route parameters) - req.params

p.253 특수 패턴(라우트 매개변수) 쓰는 라우터는 일반 라우터보다 뒤 에 위치시키기
`:id → req.params.id`, `:type → req.params.type`
[Express - Routing - Route parameters](https://expressjs.com/en/guide/routing.html)



p.254 router.route(path) : path에 여러 HTTP method handler 추가할 때 유용 (path는 추가로 확장 불가)
예제) https://expressjs.com/en/4x/api.html#router.route



### 6.4 req, res 객체 살펴보기

p.255 Express의 res, req는 Node http 모듈의 res, req 객체를 확장한 것
→ `res.writeHead`, `res.end` 같은 http 모듈 메소드 사용 가능하나, Express 메소드가 편해서 잘 안씀

Express 공홈 API reference req, res 문서 찾아보기 (진짜 잘 나와있음)



### 6.5 템플릿 엔진 사용하기

`res.render(view파일, 넣어줄 변수)` 로 호출하면 템플릿 엔진이 html파일 빠진 부분 데이터 넣어서 채워줌 (렌더링); 그걸 클라이언트에 전달

Pug(Jade), Nunjacks 문법 설명. 그냥 쭉 흝어보기만 한 챕터. 필요할때 와서 보자

p.257 템플릿 엔진 : JS 써서 HTML 렌더링; ex) Pug (Jade - Express 기본 엔진), Nunjucks

p.260 `res.locals.{변수이름}` 템플릿 엔진에 변수 전달하는 방법 (`res.render` 메소드의 두 번째 인수로 넣는 대신 쓸 수 있는 방법; <u>모든 템플릿 엔진에서 공통으로 접근 가능</u>하다는 차이)

Q. Is template engine still used? Do I have to learn this?
→ server side rendering 공부, FE 없을때 간단히 BE 테스트할때

- https://dev.to/rzeczuchy/are-template-engines-still-relevant-in-2020-1hkk
- https://stackoverflow.com/questions/51947023/is-there-any-need-of-learning-views-and-template-engines-in-express-when-we-have



---

## Ch 7. MySQL

### 🔥 도전 : Docker로 실습환경 구축

→ Notion 'Docker' 페이지에 정리 
https://www.notion.so/Docker-7f1a38d1358847bb92695bf467a4d014#ebc5009f2ca84233b099cd2119be9321



### 7.4 ~ 7.5 MySQL 기초

p.294 mySQL 기초~

p.298 자료형 및 옵션들

P.299 Primary key (기본 키)

p.303 ForeignKey




### 7.6 시퀄라이즈 (Sequelize) - ORM

참고) TypeORM (FE개발 때 사용; Documentation 굿)

ORM : 자바스크립트 → SQL 로 바꿔주는 역할

`npm i express morgan nunjucks sequelize sequelize-cli mysql2` (맨 뒤 3개가 Sequelize 사용에 필요; 🚨 mysql2 는 MySQL - Sequelize 이어주는 드라이버임 DB 프로그램 아님!)

`npm i -D nodemon`



`npx sequelize init`

`model/index.js ` 정리, `app.js` 생성해서 DB와 서버 연결, `config/config.json` 으로 DB 설정 (MySQL listening PORT 값도 여기서 넣어줘야)



#### 7.6.2 모델 정의하기

대응됨 : Sequelize 모델 ~ MySQL에서 정의한 테이블 

시퀄라이즈 : 모델과 MySQL의 테이블 연결해주는 역할

💡 참고) 모델 정의할 때 테이블 이름 따로 지정안해주면, model 이름 pluralize 해서 table 이름으로 씀 - https://sequelize.org/master/manual/model-basics.html#:~:text=1%20%7D)%3B%0Auser.id%3B%20//%201-,Table%20name%20inference,-Observe%20that%2C%20in



p.321 id 자동생성함; 알아서 id를 기본 키(Primary key)로 연결하므로 id 컬럼은 적어줄 필요X
`static init`, `static associate`, Sequelize 자료형 및 옵션

p.324
init → MySQL 테이블이 Sequelize 모델로 연결 
associate → 다른 테이블과의 관계 연결



#### 7.6.3 관계 정의 ⭐️

테이블 간의 관계; MySQL은 JOIN 써서 여러 테이블 연결해서 결과 도출

* 1:N

  User 하나가 여러 Comment 가짐

  foreignKey 생성되는 테이블쪽이 belongsTo

  → Comment 테이블에 'commenter'라는 이름으로 foreignKey 생성 (이름 입력 안하면 default name 모델명 + 기본 키  ex. 'UserId')

  

  + comment.getUser, comment.addUser 같은 관계 메서드 생성 (아래의 lazy loading 참고)

```javascript
db.User.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id' });
db.Comment.belongsTo(db.User, { foreignKey: 'commenter', targetKey: 'id' });
```



* 1:1

  User 하나당 한 Info

  belongsTo 어디 쓸지 주의 : Info 모델에 UserId 컬럼이 추가됨

```javascript
db.User.hasOne(db.Info, { foreignKey: 'UserId', sourceKey: 'id' });
db.Info.belongsTo(db.User, { foreignKey: 'UserId', targetKey: 'id' });
```



* N:M

  Post 1개에 여러 Hashtag 가능 + Hashtag 하나에 여러 Post 가능

  <u>두 테이블의 ID를 연결하는 새로운 테이블</u> 생성해서 연결함 (아래 'PostHashTag')

  Post에는 hashtagId, Hashtag에는 postId라는 foreignKey 생성 + post.getHashtags, post.addHashtags, hashtags.getPosts 같은 기본 관계 메서드 생성 (아래의 lazy loading 참고)

```javascript
db.Post.belongsToMany(db.Hashtag, { through: 'PostHashTag' });
db.Hashtag.belongsToMany(db.Post, { through: 'PostHashTag' });
db.sequelize.models.PostHashtag // 자동으로 만들어진 모델 access
```



#### 7.6.4 Sequelize 쿼리

p.332 관계 쿼리 ⭐️ - MySQL의 Join

- find에 `include` 옵션 주는 경우 - <span style="color:green">Eager loading</span>; 테이블 Join해서 한꺼번에 바로 데이터 불러옴
  Documentation : https://sequelize.org/master/manual/eager-loading.html

- `include` 옵션 안주고 나중에 `get{테이블명}` 같은 함수로 불러오는 경우 - <span style="color:blue">Lazy loading</span>

  https://sequelize.org/master/manual/assocs.html#basics-of-queries-involving-associations

  

  👉🏻 Association (`hasOne`, `belongsTo`, `hasMany`, `belongsToMany`) 형성 시 Lazy loading을 위해 Sequelize가 model instance에 자동으로 추가하는 '관계 메소드' 함수들 정리 (ex. getComments, setCommnets, ...) : 
  https://sequelize.org/master/manual/assocs.html#special-methods-mixins-added-to-instances



p.328~ 굉장히 잘 설명

Q. `User`는 우리가 만든 class인데, `User.create`, `User.findAll` 같은 메소드 쓸 수 있네?
→ 아마 `extends Sequelize.Model` 해서 그런듯 (https://sequelize.org/master/manual/model-basics.html)



#### 7.6.5 실습

SSR 체험!



##### Initial flow

유저 입장 
→ 클라이언트는 서버에 페이지 렌더링에 필요한 resource 요청 ('/' 로) 
→ indexRouter가 DB에서 정보 받아서 res.render로 넘겨줌 
→ nunjucks 템플릿 엔진이 HTML 렌더링해서 클라이언트로 respond 

그래서 morgan에 아래처럼 뜨는군 (`GET /sequelize.js`는 렌더링 된 페이지가 script태그에 있던 sequelize.js 요청하는거)

```text
GET / 200 10.647 ms - 2084
GET /sequelize.js 304 1.183 ms - -
```



##### 유저 event시 flow

유저가 특정 조작을 하면 (event; 버튼 클릭, 유저 혹은 댓글 추가 등) 
→ 클라이언트 (`sequelize.js`)가 Ajax request를 서버에 보내고
→ 라우팅을 거쳐 알맞은 HTTP method를 처리하고 
→ Sequelize query를 통해 DB를 변경 
→ 결과를 res.json, res.send 형태로 클라이언트에 결과 전송



Q. console.log vs res.json

console.log는 말 그대로 콘솔에 출력, res.json은 서버가 클라에 데이터 전송하는 것 (둘이 완전 다름)

>  클라이언트 axios.METHOD ↔️ 서버 res.json, res.send

주의) sequelize.js:15 console.log는 실행 시 브라우저 console에 찍히고, 라우터(아무거나)에서 실행한 console.log는 로컬 터미널에 찍힘

(Node) Server side에서 console.log outputs to the terminal (https://stackoverflow.com/questions/8364790/node-js-console-log-not-logging-anything). sequelize.js는 HTML view에서 script태그를 통해 실행되므로 브라우저 console에 찍히는 듯.



---

## Ch 8. MongoDB

JS 사용하는 NoSQL

### NoSQL

테이블, 로우, 컬럼 :left_right_arrow: 컬렉션, 다큐먼트, 필드

* 고정된 테이블 (컬럼 규칙) 따로 없음 - 자유로운 데이터 삽입 (→ p.377 mongoose 스키마로 rule 설정 가능)
* 컬렉션간 Join 미지원 (가능한 경우도 있)
* 확장성(Scalability), 가용성(Availability)
  데이터 일관성 보장이 약한 대신, 여러 데이터 빠르고 쉽게 넣을 수 있고 쉽게 여러 서버에 데이터 분산 가능

⭐️상황에 따라 맞는 DB 선택
ex) 항공사 예약 시스템 → 남은 표 정보, 누가 어떤 표를 예약했는지 등 일관성 중요; RDBMS 사용
빅데이터, 채팅 메시지, 세션 관리 → 확장성, 가용성 중요; NoSQL 사용 



p.367~ CRUD 노션에 대충 정리

p.369 id 자동생성 (_id 라는 이름으로 ObjectId 자동 생성)



### 8.6 몽구스 (Mongoose)

ODM(Object Document Mapping) - MongoDB에 없어서 불편한 기능들 보완

* Schema - 다큐먼트에 rule 설정 (MongoDB에 데이터 넣기 전에, 서버 단에서 데이터 필터링)
* populate - JOIN 기능
* Promise 기반 쿼리 빌더

Q. Sequelize는 '자바스크립트 → SQL' 변환해주는 역할이었고, MongoDB는 이미 JS 기반인데 이런 변환이 필요 있나?
→ 변환보다는, MongoDB를 보완하는 기능들 + 서버에서 DB 사용 쉽게 abstraction 제공



참고) Mongoose document - get started
https://mongoosejs.com/docs/index.html



p.381 Mongoose schema 정의 - 자동으로 _id를 PK로 생성하므로 적어줄 필요X



populate → Join 같은 것; replaces field with 'ref' path with corresponding document
https://mongoosejs.com/docs/populate.html#populate



* 참고) Model.update()

  **only update** - 'overwrite' option default false라서. true면 전체 replace ([참고](https://mongoosejs.com/docs/api/model.html#:~:text=This%20helps%20prevent%20accidentally%20overwriting%20all%20documents%20in%20your%20collection%20with%20%7B%20name%3A%20%27jason%20bourne%27%20%7D.))

  update → deprecated; overwrite가 무조건 false인 updateOne이나 updateMany 대신 사용



### 서버 파일 구조

├─ public - (Frontend) 클릭 시 특정 endpoint로 req 보내고 res 받아서 서버 반응 처리 (axios)
├─ routes - 특정 endpoint에 대한 request 받아서 처리
├─ schemas - Mongoose 모델 정의 및 connect
├─ views - Frontend; template engine HTML 코드
└─ app.js - 서버 돌리는 Express 메인 코드



---

## Ch 9. 익스프레스로 SNS 서비스 만들기



### 9.1 프로젝트 구조 갖추기 (셋팅)

⭐️ 어떤 데이터베이스 쓸 것인지 (SQL vs NoSQL)
→ SNS는 사용자와 게시물 간, 게시물과 해시태그 간의 관계가 중요하므로 relational database인 MySQL 선택

참고) Fireship - 7 Database Paradigms (어떤 DB를 써야 할까?)
https://www.youtube.com/watch?v=W2Z7fbCLSTw&ab_channel=Fireship



p.398 전역 설치 (`npm i -g`) 피하려면 `npx`
``npx sequelize init`

이후 폴더 생성 : views (템플릿 파일), routes (라우터), public (정적 파일)
파일 생성 : app.js (Express 서버 코드), .env (설정값)

프로젝트는 일반적으로 이 구조 따르지만, 서비스가 성장하고 규모가 커질수록 폴더 구조 복잡해짐. 서비스에 맞는 구조 적용하기! 



p.400 DB password가 하드코딩된 Sequelize 셋팅 config.json → JSON에선 변수 (process.env) 사용 불가; JS로 바꿀 수 있을까?



### 9.2  데이터베이스 세팅하기

#### p.414 같은 테이블 간 N:M 관계⭐️

ex) 팔로잉 기능 : User 한 명이 팔로워 여러 명 가지는 경우 && 한 사람이 여러 명 팔로잉 하는 경우
→ User 모델과 User 모델 간에 N:M 관계 존재

- db.<모델>.belongsToMany에서 `as` 옵션으로 이름 지정 필요 (Followers, Followings) + `foreignKey` 는 as랑 반대되는 개념으로 지정 (followingId, followerId)
- as에 이름 지정 → 관계 메서드 user.getFollowers, user.getFollowings 로 생성됨 + include (eager loading) 때도 as에 지정한 이름으로



p.417 `npx sequelize init` 으로 config 파일 만들고 아래 치면 DB 자동으로 생성해주는 듯

`npx sequelize db:create`



p.418 필요한 model 만들고, app.js에서 DB랑 연결시켜준 뒤 `npm start` 하면 알아서 연결되면서 필요한 테이블 생성 (CREATE TABLE IF NOT EXISTS)



✨ mySQL에서 직접 테이블 안 만들었는데도, Sequelize에서 모델 정의하면 알아서 생성해준다! 





### 9.3  Passport 모듈로 로그인 구현하기

- Passport NPM repo (기본 개념 설명)
  https://www.npmjs.com/package/passport

- 👍 Passport 공식 Document가 매우 부실해서 어떤 유저가 대신 만든 manual
  https://github.com/jwalton/passport-api-docs#passportsessionoptions

- serialize, deserialize 궁금하면 볼만한 질문
  https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize



⭐️ p.421~422 serialize, deserialize 개념 + 전체 과정

- Serialize : 세션(req.session)에 key 저장(ex. user.id), req.login이 호출 (로그인 할 때 한번만)
- Deserialize : 세션에 저장된 정보를 바탕으로 DB에서 유저 정보 끌어와서 req.user에 저장(다른 미들웨어들이 사용할 수 있게), passport.session() 미들웨어에 의해 매 요청마다 호출
- Strategy = 로그인 시의 동작; 로그인 과정을 어떻게 처리할지 설명하는 파일



#### Passport process flow

로그인 요청 <u><span style="color:green">한 번만</span></u> (POST /auth/login)
→ 라우터에서 passport.authenticate 호출
→ local strategy 수행 : 입력받은 email, password 값으로 DB에서 유저 정보 fetch
→ authenticate 함수 콜백 : strategy로부터 넘겨받은 user 객체 받아서 req.login 실행
→ req.login 메소드 : <span style="color:yellow">serializeUser</span>에 user 객체 넘겨주면서 호출
→ serializeUser : req.session에 user.id만 저장 (key처럼 써서 DB에서 해당 유저 정보 fetch해오려고; 유저 정보 다 저장하면 부담되니까)
→ 로그인 완료

로그인 이후 <u><span style="color:red">매 요청마다</span></u>
passport.session 
→ passport.<span style="color:yellow">deserializeUser </span>
→ req.session에 저장된 user.id 써서 DB에서 유저 정보 조회 
→ req.user에 저장 
→ 이후 라우터에서 req.user 객체 사용



---

#### Passport 공부 - abstraction 까보기

- passport.initialize() 미들웨어 : req객체에 passport 설정 삽입 (req._passport)

- passport.session() 미들웨어
  : req.user 생성 (req.session에 저장된 정보로 DB에서 유저 정보 fetch해서)

  Built-in session-strategy임 `app.use(passport.session());` = `app.use(passport.authenticate('session'));` ([참고](https://github.com/jwalton/passport-api-docs#:~:text=which%20is%20using%20the%20built%2Din%20%22session%20strategy%22.))

- passport.authenticate(...)
  Strategy 실행





Q1. passport.initialize? 매번 실행? passport.session도 매 req마다 실행? → ㅇㅇ 미들웨어니까 (6.2 질문 보기)

Q2. 둘이 딱 붙여놓은 이유?
→ 매번 새로운 req 들어옴 => req.passport 만들어야 할거 아녀 (initialize)
passport.session는 사실 built-in 'session strategy'로서, session에 저장된 key 가지고 DB에서 유저 정보 가져와서 req.user에 담아주는 역할 ([ref](https://github.com/jwalton/passport-api-docs#:~:text=which%20is%20using%20the%20built%2Din%20%22session%20strategy%22.)) 

Q3. 로그인 유지는 어떡함? 매번 다시 해야하나? 세션 활용?
→ 아마 로그인 한번 하면 serializeUser 함수에 의해 req.session에 key 저장되서 유지되는 듯. (logout 함수에서 session.destroy() 함수 호출해야 세션 없어지는 것 처럼, 그냥은 안 없어져 + <u>p.241 서버 메모리에 세션 저장 vs DB에 세션 저장</u>)

⚡️ <span style="color:red">세션 공부 필요!</span>

Q4. 매 request 마다 deserialize하면, 매번 DB에 유저 정보 요청? 그럼 새로고침을 엄청 빠르게 spam해서 서버 마비시킬 수도 있지 않나
→ negligible
https://stackoverflow.com/questions/31119162/deserialize-on-each-request-is-this-not-needless-db-reads
💡 p.442 Note부분에선 잘 바뀌지 않는 사용자 정보는 캐싱 하는게 좋다고 하네. 실제 서비스에선 **Redis** 같은 DB에 사용자 정보 캐싱한대



Passport 코드 Debug 결과) app.use는 listener 등록하는 것 처럼 맨 처음에만 실행되고, 이후엔 해당 endpoint에 맞는 요청 들어올때마다 callback으로 준 middleware가 실행되는  구조인 듯. 정확한건 코드를 봐야 알 것 같다

Passport 옛날 모듈이라 prototype을 쓰네. 요즘은 syntactic sugar로 class를 쓰지.



로그인 안한 상태라면, req.passport empty
로그인 됐다면 passport.session에 의해 deserializeUser 될테고, req.passport.session.user 객체가 있을 것



참고) Passport 구현 코드를 보고 싶다면 - https://github.com/jaredhanson/passport/tree/a892b9dc54dce34b7170ad5d73d8ccfba87f4fcf/lib/passport

- [lib/passport/middleware](https://github.com/jaredhanson/passport/tree/a892b9dc54dce34b7170ad5d73d8ccfba87f4fcf/lib/passport/middleware) 에 `initialize()`, `authenticate()` 함수 구현 

  Passport authenticate() 함수가 `req` object에 추가하는 함수들 구현 :  `login()`, `logIn()`, `logout()`, `logOut()`, `isAuthenticated()`, and `isUnauthenticated()` (최근에 업데이트 된 내용 - [관련 issue](https://github.com/jwalton/passport-api-docs/issues/8))

- [lib/passport/http/request.js](https://github.com/jaredhanson/passport/blob/a892b9dc54dce34b7170ad5d73d8ccfba87f4fcf/lib/passport/http/request.js)
  req object에 추가되는 함수들 구현체 ([참고할만한 질문 - How is req.isAuthenticated() in Passport JS implemented?](https://stackoverflow.com/questions/38820251/how-is-req-isauthenticated-in-passport-js-implemented))

Q. req.logIn 함수 보면, `this`를 겁나 쓰는데, `req`를 지칭하는게 맞나?
→ ㅇㅇ. req는 object고, req.login = function(){...} 형태로 object method를 만들어주는 것. [Object method 내부에서 this는 object를 지칭](https://www.w3schools.com/js/js_this.asp#:~:text=it%20is%20used%3A-,In%20an%20object%20method%2C%20this%20refers%20to%20the%20object.,-Alone%2C%20this%20refers)



👏 abstraction의 장막을 들춰서 작동 원리를 파악하는 행위, 기계 뚜껑을 열어서 어떻게 기계가 동작하는지 알아보는 행위

---



Kakao Strategy

🤔 Q. 왜 strategy 2번 실행? passport-kakao 쪽 코드를 봐야 하나? (auth.js)



내 서비스에서 로그아웃 해도, 카카오에선 로그아웃X;
카카오 로그아웃 구현 
https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api#logout





🚨 디버깅 Todo

로그인 안한 상태라면, req._passport empty
로그인 됐다면 passport.session에 의해 deserializeUser 될테고, req.user 객체가 있을 것

logIn 함수에 breakpoint 찍고 this 출력해보기





### 9.4 multer 패키지로 이미지 업로드 구현

\<input> 태그로 이미지 선택해서 업로드 진행
→ multer 패키지 이용해서, 서버 디스크 (서버 root의 uploads 폴더)에 이미지 저장
→ 클라이언트에게 이미지 주소 respond



p.439
✨ 실제 서버 운영 시: 서버에 이미지 저장하면 간단하나, 서버 날라가면 이미지도 같이 날라감.
AWS S3 같은 Cloud storage 같은 ''정적 파일 제공 서비스' 사용해서 이미지를 따로 저장하고 제공하는게 좋음
→ multer-s3나 multer-google-storage 참고 + 16장 참고



p.438 (👍 아름답다) map과 Promise.all 활용



### 9.5 프로젝트 마무리 - 팔로워, 팔로잉 관계

p.442 deserializeUser 캐싱하기 - Redis DB 활용



Q. 태그 검색 빈칸으로 하면 모든 태그 검색됨
→ req URL이 '/' 로 찍혀서 모든 포스트 출력

Q. 이미지 어떻게 표시? 
→ 'posts' 테이블에 저장된 이미지 경로 저장; 
main.html view 템플릿의 \<img src="{{twit.img}}" alt="섬네일"> 으로 경로 넘겨서 표시
(✨express.static 덕에 클라이언트가 /img 폴더 access 하면, 실제론 서버 /uploads 폴더 엑세스 하는거랑 같음)

Q. user.js에서 팔로우 기능 구현할 때, user.addFollowing 이 아니라 addFollowings가 맞지 않냐? 근데 잘 되는거보니 아닌 것 같기도
→ 그건 여럿 추가할 때! addFollowing은 하나 추가할 때.
참고) https://sequelize.org/master/manual/assocs.html#:~:text=task%20%3D%3E%20task.title)%3B-,Foo.belongsToMany(Bar%2C%20%7B%20through%3A%20Baz%20%7D),-The%20same%20ones



---

## Ch 10. 웹 API 서버 만들기

Node - JS 사용하므로, 웹 API에서 데이터 전달할 떄 사용하는 JSON 100% 활용 가능

**JWT 토큰** - 모바일 앱과 노드 서버간에 사용자 인증을 구현할 때 자주 사용



### 10.1 API 서버 이해하기

**API (Application Programming Interface)** : 다른 애플리케이션에서 현재 프로그램의 기능을 사용할 수 있게 허용하는 접점

* 제공하고 싶은 특정 기능 혹은 정보만 API를 통해 '인증된' 다른 사용자들에게 open
* 사용량 제한 둘 수도 있고

**크롤링** : 웹사이트에서 정보를 얻고싶은데, 자체 제공하는 API가 없을 경우 사용하는 정보 수집 방법. 표면적으로 들어나는 정보를 주기적으로 수집해 가공함
→ 크롤링은 웹 서버 트래픽 증가시켜서 서버에 무리가 감. 공개해도 되는 정보들은 API로 만들어 다른 사용자들이 활용할 수 있게 만드는게 좋다 



### 10.2 프로젝트 구조 갖추기

Nodebird API : 게시글, 해시태그, 사용자 정보를 JSON 형식으로 제공

**CORS** : 다른 도메인에서 함부로 현재 서버에 접근하는 것을 막는 조치 (Security). req 보낸 클라이언트 도메인과 응답하는 곳의 도메인이 다르면 blocked by CORS

Q. 서버 → 서버 요청은 CORS 문제 발생X?



### 10.3 JWT 토큰으로 인증하기

인증 과정

**JWT (JSON Web Token)** : JSON 형식의 데이터를 저장하는 토큰; 인증된 정보 주고받는 용도

Header (토큰 종류, 해시 알고리즘 정보), Payload (내가 전달하고 싶은 내용물), Signature (토큰 변조 여부 확인)

특징 : 내용 다 보임 (don't send sensitive info like password), 변조 불가능 (JWT 비밀키로 signature 만들어서 위조 방지), (단점) 용량 큼  

`npm i jsonwebtoken`



v1.js

라우터 JSON 응답들 = 정해진 format 따름

ex) code (성공 - 200, 에러 - 400번대 중 상황에 맞는 코드), message (에러 시), payload



### 10.4 호출 서버 만들기 (API 사용할 다른 클라이언트)

클라이언트 측에서 헤더에 jwt 넣어서 보내줌 (axios.get req에서 `headers: { authorization: req.session.jwt }`)



API 서버에서 에러 코드와 에러 메시지 상세하게 보내줘야 클라이언트 측에서 무슨 일이 일어났는지 알 수 있음



만료된 토큰 → 갱신하는 코드



🤔 Q. Can you catch 400 error with try~catch? What is considered an error? Are responses without status 200 all errors?
https://stackoverflow.com/questions/54502376/what-is-try-catch-really-catching

```js
// nodebird-client/routes/index.js
/* 
Q. client : axios 요청 보냄
API server : res.status(419), res.status(401) 같은걸로 응답하는 경우
⚡️ client 쪽에서 catch(error)로 잡히네??
*/

try {
    const tokenResult = await axios.post('http://localhost:8002/v1/token', ...);
	...
    const result = await axios.get('http://localhost:8002/v1/test', ...);
} catch (error) {
    console.error(error);
}
```

👉🏻 Axios 특징인 듯? 서버에서 받은 status가 200 이외면 모조리 reject
https://pipedream.com/community/t/faq-how-do-i-stop-axios-from-throwing-an-error-on-4xx-5xx-requests/923

default response status, validateStatus 없거나, validateStatus 만족하면 resolve / 아니면 reject with error
https://github.com/axios/axios/blob/d99d5faac29899eba68ce671e6b3cbc9832e9ad8/lib/core/settle.js

💡 windows.fetch는 400 reject 안함
https://stackoverflow.com/questions/40248231/how-to-handle-http-code-4xx-responses-in-fetch-api
[공식 문서](https://developer.mozilla.org/en-US/docs/Web/API/fetch#:~:text=A%20fetch()%20promise%20only%20rejects%20when%20a%20network%20error%20is%20encountered%20(which%20is%20usually%20when%20there%E2%80%99s%20a%20permissions%20issue%20or%20similar).%20A%20fetch()%20promise%20does%20not%20reject%20on%20HTTP%20errors%20(404%2C%20etc.).%20Instead%2C%20a%20then()%20handler%20must%20check%20the%20Response.ok%20and/or%20Response.status%20properties.)



### 10.5 SNS API 서버 만들기

#### JWT 활용하는 인증 Flow 정리

클라이언트
토큰 발급(도메인 등록하고 받은 client secret key req.body에 넣어서 보내줌); 발급받은 토큰은 req.session.jwt에 저장 
→ API서버에 req 보낼 때 header authorization에 JWT 넣어서 보냄
→ 토큰 괜찮으면 정상적인 router response / 토큰 만료 시 재발급 / 이외 에러는 `return error.response` (Q. 이게 try~catch에서 잡혀?)

서버
'/token' 에서 토큰 발급, 비밀 키 `process.env.JWT_SECRET` 사용
→ 클라에서 요청 들어올 때마다 verifyToken; 클라에게 받은 JWT (req.headers.authorization)를 비밀 키 가지고 jwt.verify
→ 문제 없으면 요청 처리 / 문제 있으면 에러 객체 반환 `res.status(에러코드).json({ code, message })`

에러 처리가 매우 delicate 한 듯.

Q. JWT 어디에 넣어서 보낼지는 내가 맘대로 정해도 되는건가? 클라이언트와 잘 약속하고 documentation만 잘 써놓으면..



### 10.6 사용량 제한 구현

apiLimiter, deprecated → middleware로 구현해서 reuse

HTTP 응답 코드 documentation 하자
ex) 200 (JSON 데이터), 401 (Invalid token), 410 (New version is out), 419 (Token expired), 429 (Max 1 req per min)

💡 예전 버전을 사용하고 있는 클라이언트가 있을 수도 있음 → API 업데이트 했다고 옛날 버전 지원 끊지 말기; deprecated 여부를 클라이언트에게 알려주고 시간차를 두고 닫기 (노드 LTS 방식)



### 10.7 CORS 이해하기 ⭐️

'클라이언트(웹 브라우저) → 서버' 요청 보낼 때, 도메인 다르면 요청 차단

ex) nodebird-client 프론트 localhost:4000 → nodebird-api 서버 localhost:8002



CORS란?

Same origin policy (XHR, Fetch default 설정) 서버와 다른 도메인을 가진 클라이언트에서 실행된 스크립트가 서버에 resource 요청하면 블락하는 기능

CORS : 지정한 도메인에 대해선 req 받아주게끔 하는 설정.
클라이언트는 req 보내기 전, OPTIONS method 형태로 preflight req 보내서 서버가 허용하는 req 정보 파악
response header의 Access-Control-Allow-Headers에 허용 도메인 정보 담아서 클라이언트에게 알려줌.
https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS



Preflight OPTION 메소드로 패킷 보내서, req 보내도 되는지 체크함

Request Headers의 Origin을 보고 허용할지 말지 결정

서버가 보내주는 Response Headers에 'Access-Control-Allow-Headers' 

cors - 서버가 보내주는 response의 header에 'Access-Control-Allow-Headers' 쉽게 심어주는 abstraction
(`res.set` 혹은 `res.header`로 직접 header 심어도 됨)



p.489 프록시 서버 - 클라에서 다른 도메인 서버로 요청 보낼때 CORS에 막히면, 일단 중간에 같은 도메인 서버 (프록시 서버) 거쳐서 보내는 방법도 있음
참고 모듈) http-proxy-middleware (Express와 프록시 서버 연동해주는 모듈)





## Ch 11. 노드 서비스 테스트하기

만든 서비스가 잘 동작하는지 테스트 - 기능이 많으면 일일히 하기 힘드니, 테스트 프로그램을 짜서 내가 만든 프로그램을 테스트하도록 

배울 테스트 기법 : 유닛 / 통합 / 부하 테스트 + 테스트 커버리지 체크



👍 커밋들 하나씩 따라가면서 코드 및 주석 보기!



### 11.1. 테스트 준비

`npm i -D jest`

스크립트 `"test": "jest"`

p.495 테스트용 파일 : 파일명에 test나 spec 넣기 (이러면 jest가 알아서 찾아서 실행함)



### 11.2. 유닛 테스트 (unit test)

p.501 작은 단위의 함수나 모듈이 의도된 대로 정확히 작동하는지 테스트



`test(테스트에 대한 설명, 테스트 내용 담은 함수)` - 단일 테스트

`describe(테스트 그룹에 대한 설명, 여러 test를 담은 함수)` - 테스트를 그룹화

`expect(val or func to test)` + `toEqual(expected matching value)` / `toBeCalledTimes(함수가 몇 번 호출되었는지)` / `toBeCalledWith(호출 시 받아야 하는 인수)`

* `toHaveBeenCalledWith`, `toHaveBeenCalledTimes`는 다른 이름의 같은 함수임 (alias)



p.499 isLoggedIn, isNotLoggedIn 테스팅 → req, res, next 객체 **mocking** (가짜로 만들어서 넣어줌)

```js
const res = {
    status: jest.fn(() => res),
    send: jest.fn(),
};
const next = jest.fn();
```



테스트 방법 => test 함수 내부에서 테스트하고자 하는 함수 호출한 뒤, expect로 원하는 내용 실행됬는지 체크



p.502 **컨트롤러** = 라우터에서 응답을 보내는 미들웨어 (addFollowing)



p.507 User DB 모델 mocking → `jest.mock`에 모듈 경로 넣기 + 바로 그 모듈 import

`mockReturnValue`로 해당 모델이 어떤 값 반환하는지 정해주기; 적절히 바꿔서 모든 if branch test



p.508 이건 addFollowing 함수 단위 테스트이므로, 실제 DB가 잘 작동하는지 테스트는 안함; DB에 값 저장하거나 할때 오류나는 경우는 테스트X → 통합 테스트, 시스템 테스트 (11.4)



### 11.3. 테스트 커버리지

코드의 어느 정도 테스트했나, 안한 부분은 어디인가 한 눈에 보기 가능

`jest --coverage`

스크립트 `"coverage": "jest --coverage"`

명시적으로 테스트하거나 import한 파일만 체크 → 100% 떠도 실제로 프로젝트의 모든 코드를 테스트한게 아님!



### 11.4. 통합 테스트 (integration test)

DB와 연결해서 서버 테스트

`npm i -D supertest`

Sequelize config/config.json test 부분 수정 후, `npx sequelize db:create --env test` 로 테스트용 DB 생성



🤔 Q. 어떻게 자동으로 config의 'test' 데이터베이스 사용하는거지? .env에 아무 설정도 안했는데

→ jest로 실행 시, default로 process.env.NODE_ENV를 'test'로 셋팅 ([docs](https://jestjs.io/docs/environment-variables))



* 테스트를 위한 값이나 외부 환경 (ex. DB) 셋팅 시 활용하는 함수들 : 
  `beforeAll`, `afterAll` : 모든 테스트 전/후
  `beforeEach`, `afterEach` : 각 테스트 전/후

* supertest의 함수 `request(app)`으로 우리 서버 특정 라우터에 REST API 요청 보냄.
  (supertest가 app의 라우터 알아서 실행 (abstraction 엄청 심하네)

* expect에 예상되는 응답의 결과 넣어서 체크; 테스트 마무리 시에는 두 번째 인수에 `done` 넣어주기



auth.js 커버 못한 부분

25~27 /join error

외 엄청 많음 (`npm run coverage`로 체크)



### 11.5. 부하 테스트 (load test)

서버가 얼마만큼의 요청을 견딜 수 있는지 (또는 수용할 수 있는지) 테스트

* 코드의 문법적, 논리적 문제 → 유닛 테스트와 통합 테스트로 어느정도 커버
* 서버 수용량, 하드웨어 제약 (메모리 양; Out of Memory 문제) → load test 필요⭐️



`npm i -D artillery`

`npx artillery quick --count 100 -n 50 http://localhost:8001`
100명의 가상 사용자 (virtual user)가 50번씩 요청 보냄 - 총 5,000번 요청이 서버로 전달

결과

* 받은 응답 코드 (http.code)
* 초당 처리한 요청 횟수 (http.request_rate)
* 요청 처리하는데 걸린 시간 ms (http.response_time) → min/max/median/p95 p99 (하위 95/99%값)



실제 사용자의 행동 (ex. 회원가입 -> 로그인 -> 태그 클릭) 스크립트로 써서 테스트 가능

`npx artillery run loadtest.json`

duration 60s, arrivalRate 30명/s - 1,800명이 접속
각 유저는 4번의 요청을 서버로 보내서, 총 7,200번 요청 전송 (커밋의 loadtest.json 파일 참고)



p.526 서버가 load test 감당 못하고 느려질 때

* 서버 사양 업그레이드, 여러 개로 늘리거나, 코드를 효율적으로 개선 (ex. 노드 = 싱글 코어니까, 클러스터링으로 서버를 여러 개 실행)
* 요청-응답 시 DB에 접근할 때 가장 많은 시간 소요; 반복적으로 가져오는 데이터는 <span style="color:red">caching</span>하든지 해서 DB 접근 줄이기
* arrivalRate 줄이거나 늘려서 여러 번 테스트 반복해서 평균 내보기. 내 서버가 어느정도까지 감당할 수 있나!



### 기타 안 다룬 테스트들

* 시스템 테스트 - 회사 QA들이 테스트 목록 두고 체크해나가며 진행
* 인수 테스트 - 알파/베타 테스트처럼 특정 사용자 집단이 실제 서비스를 사용하는 것처럼 진행

⭐️ 테스트의 중요성 - 에러 사전에 잡아내는 것 외에도, 테스트를 작성하면 <u>나중에 코드에 변경 사항이 생겼을 때, 어떤 부분에 영향을 미치는지</u> 쉽게 파악 가능. 하지만 모든 코드에 대한 테스트를 작성하기 어려우므로, 우선순위가 높은 기능부터 테스트 범위 정하기





<실제 개발 시>

어떤 기능이 필요한지

route 결정 (어떤 endpoint, URL로 해당 기능을 처리할건지)

Express로 구현





FE개발 라우팅 어떻게 했는지 궁금하네. 
React router로 endpoint URL 정하고, 서버에서 해당 endpoint에 알맞게 라우팅 페이지 공급한 것 같은데



생활코딩 - Nodejs로 만들어진 Web app을 리눅스에서 구동하는 방법 (PM2 + EC2)
https://www.notion.so/Node-ec0ffd61884e4189adfec36e14d4db25#5cf9b2a85ff2469d9a172f131fdd17de