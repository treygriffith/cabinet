Cabinet
==============
### Brainless Key/Value storage for MongoDB

`Cabinet` is a tiny module built on top of [Cellar](http://github.com/treygriffith/cellar) (itself built on top of [Mongoose](http://www.mongoosejs.com)) for a simple Key/Value store.

Installation
-------------

Through [NPM](http://www.npmjs.org)
``` bash
$ npm install cabinetkv
```

 or using Git
``` bash
$ git clone git://github.com/treygriffith/cabinet.git node_modules/cabinetkv/
```

API/How to Use
-----------

#### Instantiate Cabinet with a collection name, and mongoDB details or a Mongoose instance

``` javascript
Cabinet = require('cabinetkv');

// with Mongoose instance

var mongoose = require('mongoose');
var mongoUrl = 'mongodb://' + db.user + ':' + db.pass + '@' + db.host + ':' + db.port + '/' + db.name;
mongoose.connect(mongoUrl);

var cabinet = new Cabinet('mykvstore', mongoose, {maxAge:3})


// with mongoDB details (maxAge of -1 stores docs forever)

var cabinet = new Cabinet('mykvstore', {user:db.user, pass:db.pass, host:db.host, port:db.port, name:db.name}, {maxAge:-1});
```

#### Cabinet exposes 2 methods:

1. `set` - Store a value

  ``` javascript
  // Store a value with a specific key
  cabinet.set('mykey', 'myvalue', function(err, key) {
      if(err) {
        console.error(err);
        return;
      }
      console.log(key); // prints 'mykey'
  });

  // Store a value with a randomly generated key
  cabinet.set('myvalue', function(err, key) {
      if(err) {
        console.error(err);
        return;
      }
      console.log(key); // prints a random 16 character string
  });

2. `get` - Retrieve a value

  ``` javascript
  cabinet.get('mykey', function(err, val) {
      if(err) {
        console.error(err);
        return;
      }
      console.log(val); // prints 'myvalue'
  });
