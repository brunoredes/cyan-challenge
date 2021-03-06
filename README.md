# Cyan Farm

## technical test to [Cyan AgroAnalytics](https://cyan-agro.com/);


### Tech

Cyan farm uses the following techs:

* [Nodejs](https://nodejs.org) - As an asynchronous event-driven JavaScript runtime, Node.js is designed to build scalable network applications.
* [PostGIS](https://postgis.net) - PostGIS provides spatial objects for the PostgreSQL database, allowing storage and query of information about location and mapping.
* [React](https://pt-br.reactjs.org/) - A JavaScript library for building user interfaces.
* BRModelo - Database modeling software
* [Express](https://expressjs.com/pt-br/) - fast node.js network app framework [@tjholowaychuk]
* [Sentry](https://sentry.io/welcome) - Sentry's application monitoring platform helps every developer diagnose, fix, and optimize the performance of their code.
* [Jest](https://jestjs.io/) - Jest is a delightful JavaScript Testing Framework with a focus on simplicity.
* [Supertest](https://www.npmjs.com/package/supertest) - The motivation with this module is to provide a high-level abstraction for testing HTTP, while still allowing you to drop down to the lower-level API provided by superagent.
* [Socket.io](https://socket.io/) - Socket.IO enables real-time, bidirectional and event-based communication.
It works on every platform, browser or device, focusing equally on reliability and speed.


## Data model
![image](https://user-images.githubusercontent.com/42386513/92314607-738b1a00-efb0-11ea-854e-5363a2b027de.png)

## Design Pattern: Singleton
![singleton-3x](https://user-images.githubusercontent.com/42386513/92611300-07016b00-f28f-11ea-989c-fb9a36bc9229.png)



## Architeture: REST API: MVC
![image](https://user-images.githubusercontent.com/42386513/92738794-a0458580-f352-11ea-97b9-d7da60d6e335.png)
![image](https://user-images.githubusercontent.com/42386513/92611532-4760e900-f28f-11ea-98d8-e276c6c69142.png)



### Installation and start
- with Yarn
```bash
$ cd backend
$ yarn
$ yarn start
```

- with NPM
```bash
$ cd backend
$ npm i
$ npm start
```


### How to test:
- with Yarn
```bash
$ cd backend
$ yarn test
```

- with NPM
```bash
$ cd backend
$ npm test
```


### After Install
Run the following command: 

```bash
docker run --name cyan-mills -e POSTGRES_PASSWORD=docker POSTGRES_DB=cyan-challenge -p 5432:5432 -d postgis/postgis
```


or


```bash
$ yarn manual
```
After docker run, please, create the migrations with the following command:

```bash
$ yarn migrate
```
