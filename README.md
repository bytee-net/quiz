# Vue Quiz

Simple Quiz app powered by Vue.js and Spectre.css.

[Demo](https://bytee.net/quiz/lpic-1-exam-102#/)

### Features

* Easy to use and fast integration into websites.
* Single-Choice, Multiple-Choice and Fill-the-blank question support.
* Simple JSON endpoints
* Option to use JSON files, instead of an full blown API server.
* Timer and Question counter
* Randomize Questions and answers
* Explanations for answers
* Score based results
* Suggest question form
* Report question form

### Quiz server

Instead of simple JSON files for the questions, you can also use the nodejs powered [quiz server](https://github.com/bytee-net/quiz-server).

### Setup

Install the dependencies first with npm or yarn.

```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

#### Question JSON markup

Questions follow a simple JSON format, the "Suggest question" view can generate the correct markup for you.

Check the [demo quiz json file](https://github.com/bytee-net/quiz/blob/master/public/sample-questions-lpic101.json) in the /public folder for more examples.

```javascript
[
  {
    "title": "Question text?",
    "kind": "single|multiple|text",
    "code_block": "",
    "resolution": [
      3
    ],
    "difficulty": "5",
    "answers": [
      {
        "content": "-h",
        "explanation": "ls -lh shows the size values in **h**uman readable format."
      },
      {
        "content": "-l",
        "explanation": "ls -l is the list view."
      },
      {
        "content": "-r",
        "explanation": "ls -r reversely orders the output (DESC)."
      },
      {
        "content": "-a",
        "explanation": "ls -a shows hidden files starting with a dot."
      }
    ]
  }
]
```
