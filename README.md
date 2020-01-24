# verifica

[Check out the documentation!](https://radoslaw-medryk.gitbook.io/verifica/getting-started/installation)

## What is that?

Verifica is a validation library for JavaScript. It uses modern language features to make your experience as a developer as seamless as possible, and keep your code clean and nice.

## Why do I need it?

There is fair choice of validation libraries out there already, so why do you need a new one? Verifica focuses on making the developer experience as good as possible, keeping the code clean. It promotes another approach to validation - rules as functions - composable, but not constraining.

## How is it better?

There are a few decisions that makes Verifica developer friendly, allowing to write clean code. The biggest difference is made however by the smart way in which verifica remembers the path of the property you are validation, and decorates the possible error message with information which property exactly failed which exact rule. To show an example:

```typescript
// (...)

getErrors(request.params.userId, isString);
// [{ type: "isString", path: ["request", "params", "userId"] }]
```

How is it useful? You can have an API that returns specific errors describing what went wrong and which exact field failed the validation, no matter how deeply nested. And without writing any additional line of code!

## Where do I start?

[Check out the documentation!](https://radoslaw-medryk.gitbook.io/verifica/getting-started/installation)
