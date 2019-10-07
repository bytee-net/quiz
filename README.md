# Vue Quiz

Simple Quiz app powered by Vue.js and Spectre.css.

[Demo Quiz](https://bytee.net/quiz/lpic-1-exam-102#/)

#### Features

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

#### Quiz server

Instead of simple JSON files for the questions, you can also use the nodejs powered [quiz server](https://github.com/bytee-net/quiz-server).

## Project setup

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

## Question JSON markup

Questions use simple JSON format, the Suggest question view can generate the markup for you.

Check the demo quiz supplied in /public for more examples.

```json
[
  {
    "title": "Question text.",
    // Type of the question
    "kind": "single|multiple|text",
    // Shown below the question if any
    "code_block": "",
    // Which answer is correct (index, starts with zero)
    "resolution": [
      3
    ],
    // Simple rating (1 easy to 10 hard), used in stats
    "difficulty": "3",
    // Answers (if you use randomize, they are shuffled)
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
