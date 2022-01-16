각 단원, 특정 페이지별로 중요하다고 생각한 부분 필기.

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

* Go - 비동기?
  Go도 서버 만들 수 있나? 튜토리얼 같은거 본 것 같긴 한데
* nginx - static 파일 제공, 로드 밸런싱 기능
  nginx가 apache 같은 상용 서버 프로그램인가
* Tomcat → 웹 애플리케이션 서버 (WAS)
* 이외 다양한 언어에서 서버 구현 가능 (내가 알고 있는 것들)
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

## Ch2. 알아두어야 할 자바스크립트

❓ Q. ES2022 최신 문법 사용할 수 있나? Babel 있으면 가능?



### 2-1. ES2015+ (ES6)

* const, let → Hoisting 📚

* template literal

* object literal

* arrow function

  p.60 arrow → this 바인드 방식 📚

  ❓ Q. (예제) 함수 스코프 내에서 this 변경? window로 바뀐다는 건가

* Array/Object destructuring

* promise

  p.63 then 리턴값 = another promise

  pending promise

* async-await

  p.66 async-await 에서 에러처리 → await 코드를 try~catch로 감싸기

  p.67 arrow function async

  ⭐️훈련 방법 : 중첩 콜백 (callback hell) → promise → async/await 으로 고쳐보는 훈련



Date() vs new Date() - 전자는 함수, 후자는 생성자



### 2-2. 프론트엔드 자바스크립트

* AJAX 요청 → ~~jQuery~~, ~~XHR~~, **axios**, **fetch**
* FormData
* encodeURLComponent, decodeURLComponent (한글 주소)
* ⭐️ data attribute, dataset (사용자 지정 데이터)



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

* os

* path

  ⭐️ path 중요! Windows vs POSIX 경로 다름

* (deprecated) url & querystring 

* crypto

  p.103 단방향/양방향 암호화; 고객 비밀번호 암호화



### 3-6. 파일 시스템 접근하기

* fs (readFile, writeFile)

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

* ⭐️ 버퍼 & 스트림

  p.115 버퍼링, 스트리밍

  버퍼 : 읽은 파일 데이터 저장하는 메모리 공간

  p.117 스트림 : 작은 크기의 버퍼를 사용해서, 큰 파일을 쪼개 여러 번 전송

  파이핑 : 스트림끼리 연결 ex) readMe.txt → writeMe.txt

* 기타 파일/폴더 생성 삭제



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



### 4-2.  쿠키와 세션

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







