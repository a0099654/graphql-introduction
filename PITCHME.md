What is GraphQL?

+++

- Data query language developed internally by Facebook in 2012

- Released publicly in 2015                                       |

- Alternative to REST API                                         |

- Connect to multiple DB in single query                          |

+++

- Strongly Typed Runtime      

- Queries and Mutation        |

- GET and POST                |

+++

It supports multiple languages

- Java
- JavaScript |
- Python     |
- Go         |
- Scala      |
- Erlang     |
- PHP        |
- Clojure    |
- Ruby       |

---

Demo


+++

Dependencies 
- NodeJS                    
- ExpressJS               | 
- Express-graphql         |
- GraphQL                 |
- Mongoose (ODM)          |
- Babel (Transpiler)      |
- Nodemon                 |
- MongoDB (Database)      |
- Yarn (Package Manager)  |

---

package.json

```json
  "scripts":{
    "start": "nodemon index.js --exec babel-node --presets es2015,stage-2"
  },
  "author": "Stella Widyasari",
  "license": "MIT",
  "dependencies": {
    "express": "^4.16.2",
    "express-graphql": "^0.6.11",
    "graphql": "^0.11.7",
    "mongoose": "^4.12.5"
  },
  "devDependencies": {
    "babel-cli": "^6.26.0",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-stage-2": "^6.24.1",
    "nodemon": "^1.12.1"
  }
}
```
@[1-2]
@[6-16]

---

index.js 

```js
mongoose.connect('mongodb://localhost/test');
const db = mongoose.connection;

db.on('error', () => console.log('Failed to connect to database'))
    .once('open', () => console.log('Connected to DB.'));

app.use('/graphql', graphqlHTTP(() => ({
    schema,
    graphiql: true,
    pretty: true
})));
```
@[1-2]
@[7-11]

+++

Queries and Mutations (Entry)

```js
export default new GraphQLSchema({
    query: new GraphQLObjectType({
        name : 'Query',
        fields: queries
    }),
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: mutations
    })
})
```
@[1-5]
@[6-9]

---

GraphQL Types

To allow query and mutation to be constructed

```js
export const postType = new GraphQLObjectType({
    name: 'Post',
    description: 'This is Post API',
    fields: () => ({
        _id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        uid: {
            type: GraphQLString
        },
        title: {
            type: GraphQLString
        },
        content: {
            type: GraphQLString
        }
    })
});
```
@[1-4]
@[5-16]

+++

Mongoose Model

To insert to MongoDB 

```js
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const postSchema = new Schema({
    uid: {
        type: String,
        required: true
    },
    title: {
        type: String,
    },
    content: {
        type: String,
    }
}, { collection: 'post', timestamps: true });

export default mongoose.model('post', postSchema);
```
@[1-3]
@[5-15]
@[16]

+++

Query 

To get data from MongoDB 

```js
import {
    GraphQLNonNull,
    GraphQLID
} from 'graphql';

import UserModel from '../../../models/user';
import { userType } from '../../types/user';

export default {
    type: userType,
    args : {
        id : {
            name: 'ID',
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    resolve(root,params){
        return UserModel.findById(params.id).exec();
    }
}
```
@[1-4]
@[10-16]
@[17-20]

---

```js
import {
    GraphQLNonNull,
    GraphQLID
} from 'graphql';

import { userType } from '../../types/user';
import UserModel from '../../../models/user';

export default {
    type: userType,
    args: {
        id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    resolve(root, params) {
        const removedUser = UserModel.findByIdAndRemove(params.id).exec();
    
        if (!removedUser) {
            throw new Error('Error adding user');
        }
        return removedUser;
    }
}
```
@[1-7]
@[10-16]
@[17-24]

---

What's next ?
- Testing (JEST)
- Interface        |
- Fragment         |

+++

Questions?

Alternative: Falcor by NetFlix

https://netflix.github.io/falcor/starter/what-is-falcor.html



