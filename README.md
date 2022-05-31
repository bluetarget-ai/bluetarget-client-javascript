## Bluetarget for JavaScript

Bluetarget is a platform to help you on the entire process of building machine learning algorithms and predicting outcomes, packed in one single click.

Set up your account and start to build your Machine Learning models at Scale

[Click here](https://bluetarget.ai/)

## ✨ Features

- Thin & **minimal low-level HTTP client** to interact with BlueTarget's API
- Works both on the **browser** and **node.js**
- Built with TypeScript

## 💡 Getting Started

First, install BlueTarget JavaScript API Client via the [npm](https://www.npmjs.com/get-npm) package manager:

```bash
npm install bluetarget
```

Then, make inference over your models:

```js
const bluetarget = require('bluetarget');

const client = new bluetarget.Client('API_KEY', 'API_SECRET');
const model = client.model('MODEL_NAME');

const inputs = [
  {
    ID: 464942,
    Age: 19,
    Work_Experience: 4,
    Family_Size: 4,
    Ever_Married: 'No',
    Gender: 'Male',
    Graduated: 'No',
    Profession: 'Healthcare',
    Spending_Score: 'Low',
    Var_1: 'Cat_4',
  },
];

model
  .predict(inputs)
  .then((output) => {
    console.log(output);
  })
  .catch((err) => {
    console.log(err);
  });
```

Finally, let's actually adding data using the `addItem` method:

```js
const client = new bluetarget.Client('API_KEY', 'API_SECRET');

const datase = aibridge.dataset('DATASET_ID');

datase
  .addItems([
    {
      ID: 464942,
      Age: 19,
      Work_Experience: 4,
      Family_Size: 4,
      Ever_Married: 'No',
      Gender: 'Male',
      Graduated: 'No',
      Profession: 'Healthcare',
      Spending_Score: 'Low',
      Var_1: 'Cat_4',
      Segmentation: 'A',
    },
  ])
  .then((output) => {
    console.log(output);
  })
  .catch((err) => {
    console.log(err);
  });
```

For full documentation, visit the **[online documentation](https://docs.bluetarget.ai)**.

## ❓ Troubleshooting

Encountering an issue? Before reaching out to support, we recommend heading to our [FAQ](https://github.com/bluetarget-ai/bluetarget-client-javascript/issues) where you will find answers for the most common issues and gotchas with the client.

## 📄 License

Bluetarget JavaScript API Client is an open-sourced software licensed under the [MIT license](LICENSE.md).
