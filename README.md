# Vue With Typescript

This repo is dedicated to be learning Vue with Typescript and TDD, for building a type-safe app. In the end, we hope to have a fully unit-tested app, that could be used as an example for TDD with VueJS and also help people that are trying to learn the related Stack (I really found harsh migrating "instantly" from JS to TS, because of the syntax mostly [the OOP concepts were fresh, but we still had to ], so we're looking for clarifying that too).

# What's being built:
A small stock app, where you can manage your products. 
The are some basic requirements:
- The user must be able to sign up an account (Just for the sake of the example).
- The user must be able manage products by adding, changing or deleting those.
- The user must be able to see a specific product's info, which must have these info: name, measure, quantity, minimum quantity (optional), description, image (optional).
- The user must be able to view a report that displays all of it's products and their quantities and visualy identify products that are above the minimum quantity (when it has been specified).
- The user must be able to view an exchange report showing an specific report of how the products have been changed over time. 

# Tech Stack:
- VueJS
- Typescript
- Jest
- D3 (For the reports / still not imported).

# NPM Scripts:
## Project setup
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

### Run your unit tests
```
npm run test:unit
```
### Run your unit tests with watch
```
npm run test:unit:watch
```

### Run your unit tests reporting the code coverage 
```
npm run test:unit:coverage
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Lints and fixes files
```
npm run lint
```

# About Pull Requests:
Please be free to submit your pull requests. The only rule is:
- Run Vue's code coverage cli command: 
```     
$   "vue-cli-service test:unit --coverage --watch",
$   "vue-cli-service test:unit --watch",
```
- If it's up to 100% of code coverage, we will be happy to receive your code.
- That's a way to ensure the TDD, but if you think that there's another way of ensuring that, please be free to submit your answer and clarify this point. 
