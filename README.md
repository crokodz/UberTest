# Uber Test

Node.js | Express.js | MongoDB

## MongoDB Installation
https://docs.mongodb.com/manual/mongo/

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:3000
npm start

```

```
|app.js
|package.json
|controllers
|   |--admin.js
|   |--error.js
|models
|   |--category.js
|   |--offer.js
|   |--product.js
|routes
|   |--admin.js
```
+ Folder naming can be singular or plural, but should be standardized
### Root folders:
+ *app* - holds the whole express code structure
+ *public* - holds the static file. Best if server using a CDN.
+ *views* - contains the static html views

### App folder contains the following:
+ *views* - contains the static html views
+ *models* - contains the schema for the models and database
+ *routes* - contains the express js routes
+ *controller* - triggered by command to handle a specific requests
+ *util* - a.k.a. useful utils

### Deciding factor for the app architecture
+ how reusable is it from the scale of 1 to 10?
+ how granular should the files be? preferable 150 loc (line of codes) per file
+ each file does only one thing best
+ reusable codes are extracted out