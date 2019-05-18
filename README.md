# Vue Quiz

Simple quiz powered by Vue.js and spectre.css.

#### Features

* Simple JSON endpoints
* Option to only use JSON based question files.
* Single-Choice, Multiple-Choice and Fill-the-blank question support.
* Timer & Question counter
* Randomize Questions and answers
* Explanations for answers
* Score based results
* Suggest question form
* Report question form

## Project setup

Install dependencies first.

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
```
