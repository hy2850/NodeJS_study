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

| Blocking                            | Non-blocking                                                       |
| ----------------------------------- | ------------------------------------------------------------------ |
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
  (req, res) => {
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



p.235 자주 쓰는 미들웨어 소개

* morgan - 디버깅용 미들웨어 (HTTP req 로그 출력) 
  `app.use(morgan('dev'))`

* static - 정적인 파일 제공하는 라우터 역할; 서버 경로를 외부에서 보지 못하게 가려주는 효과 (public 폴더)

```javascript
app.use('요청 경로', express.static('실제 경로'))
app.use('/', express.static(path.join(__dirname, 'public')))
```

* body-parser - req body를 해석해서 req.body에 넣어줌

```javascript
app.use(express.json());
app.use(express.urlencoded(...));
app.use(bodyParser.raw()); // 설치 필요 : npm i body-parser 
app.use(bodyParser.text());
```

* cookie-parser - 쿠키 해석해서 req.cookies에
  `app.use(cookieParser(비밀키));`

* express-session - 세션 관리 (로그인용 세션 구현, 특정 사용자를 위한 데이터 임시 저장 등)

  `app.use(session(옵션));`

  * DB에 세션 저장? Redis 활용?

    

⭐️ p.242 미들웨어 흐름 (그림 6-6)

p.245 (공부안함) multer - 멀티 파드 데이터 (이미지, 동영상, 파일) 처리 



### 6.3 Router 객체로 라우팅 분리하기

p.251 Node http 모듈 라우팅 : if문으로 endpoint 체크 → inconvenient, hard to read
vs Express routing : easily separable routes

p.253 특수 패턴(라우트 매개변수) 쓰는 라우터는 일반 라우터보다 뒤에 위치시키기
`:id → req.params.id`, `:type → req.params.type`
[Express - Routing - Route parameters](https://expressjs.com/en/guide/routing.html)

p.254 router.route(path) : path에 여러 HTTP method handler 추가할 때 유용 (path는 추가로 확장 불가)
예제) https://expressjs.com/en/4x/api.html#router.route



### 6.4 req, res 객체 살펴보기

p.255 Express의 res, req는 Node http 모듈의 res, req 객체를 확장한 것
→ `res.writeHead`, `res.end` 같은 http 모듈 메소드 사용 가능하나, Express 메소드가 편해서 잘 안씀

Express 공홈 API reference req, res 문서 찾아보기 (진짜 잘 나와있음)



### 6.5 템플릿 엔진 사용하기

Pug(Jade), Nunjacks 문법 설명. 그냥 쭉 흝어보기만 한 챕터. 필요할때 와서 보자

p.257 템플릿 엔진 : JS 써서 HTML 렌더링; ex) Pug (Jade - Express 기본 엔진), Nunjucks

Q. Is template engine still used? Do I have to learn this?
→ server side rendering 공부, FE 없을때 간단히 BE 테스트할때

- https://dev.to/rzeczuchy/are-template-engines-still-relevant-in-2020-1hkk
- https://stackoverflow.com/questions/51947023/is-there-any-need-of-learning-views-and-template-engines-in-express-when-we-have



---

## Ch 7. MySQL

🔥 도전 : Docker로 실습환경 구축
→ Notion 'Docker' 페이지에 정리 
https://www.notion.so/Docker-7f1a38d1358847bb92695bf467a4d014#ebc5009f2ca84233b099cd2119be9321

p.294 mySQL 기초~



### 7.6 시퀄라이즈 (Sequelize) - ORM

참고) TypeORM (FE개발 때 사용; Documentation 굿)

ORM : 자바스크립트 → SQL 로 바꿔줌

`npm i express morgan nunjucks sequelize sequelize-cli mysql2`

`npm i -D nodemon`



`npx sequelize init`



7.6.2 모델 정의하기

대응됨 : Sequelize 모델 ~ MySQL에서 정의한 테이블 

시퀄라이즈 : 모델과 MySQL의 테이블 연결해주는 역할

