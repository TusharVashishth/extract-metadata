# extract-metadata
This npm package allows you to extract metadata from any URL available on the internet

## To install this package

```js

npm install extract-metadata
```
**After installing the package you have to change the type to module in your package.json file**

```js

{
  .......
  "type": "module",
  .......
}
```

## All Set now you can ready to use this package 😊🎉


```js

import { getMetaData } from "extract-metadata";

const metdata = await getMetaData(
  "https://www.npmjs.com/package/extract-metadata"
);

console.log("The metadata is", metdata);

```

**That's it 🙌🙌**

**Don't forget to leave a star on this Repo**
