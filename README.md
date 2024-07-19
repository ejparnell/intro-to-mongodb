# An Introduction to MongoDB

This talk is going to assume you have the following installed:

- [Visual Studio Code](https://code.visualstudio.com/)
- [Node.js](https://nodejs.org/en)

This talk uses:

- [MongoDB Atlas](https://www.mongodb.com/products/platform/cloud)

This talk expects you to have a base knowledge of:

- CLI
- JavaScript

## Overview

Okie dokie, artichokes, let's come together and talk about MongoDB. This talk will cover the following:
- [An Introduction to MongoDB](#an-introduction-to-mongodb)
  - [Overview](#overview)
  - [Databases](#databases)
  - [SQL Databases](#sql-databases)
  - [NoSQL Database](#nosql-database)
  - [MongoDB](#mongodb)
    - [Connection to Atlas](#connection-to-atlas)
  - [We do: Databases and Collections](#we-do-databases-and-collections)
    - [You do: Databases and Collections](#you-do-databases-and-collections)
    - [Demo: Documents](#demo-documents)
  - [CRUD](#crud)
    - [We do: Create](#we-do-create)
    - [You Do: Create](#you-do-create)
    - [We do: Read](#we-do-read)
      - [Index](#index)
      - [Show](#show)
    - [You Do: Read](#you-do-read)
    - [We do: Update](#we-do-update)
    - [You Do: Update](#you-do-update)
    - [We do: Delete](#we-do-delete)
    - [You Do: Delete](#you-do-delete)
  - [Wrap up](#wrap-up)
    - [MongoDB Terms to know](#mongodb-terms-to-know)
    - [MongoDB Methods](#mongodb-methods)
  - [Have questions? Or see a mistake?](#have-questions-or-see-a-mistake)


## Databases

Databases are an organized collection of data stored locally or remotely. They are designed to efficiently manage, store, retrieve, and manipulate data for whatever purpose we need. Think of a social media site. A database is a fundamental part of that site. We need to manage, store, and retrieve any posts the user makes.

Characteristics of a database include (but not limited to):

- Data Structure - Data is organized in some format. Database structure will vary between different database solutions.
- Data Relationships - Data can be related to each other somehow. Using the social media example, a User (single database entry) can have a Profile (separate database entry). In this example, the User can have a Profile resulting in a one-to-one relationship.
- Query Language - A way to interact with the database. Functions and methods that allow us to retrieve, insert, update, and delete data entries.

A couple of database types include (but are not limited to):

- Relational Database - MySQL, PostgreSQL, Oracle.
- NoSQL Database - MongoDB.
- NewSQL Database - Google Spanner, CockroachDB.
- In-Memory Database - Redis, Memcached.
- Time-Series Database - InfluxDB, Prometheus.

## SQL Databases

SQL tables are a two-dimensional structure consisting of rows and columns. Each table represents a specific entity, while each row is a separate data entry. Columns in this structure represent a particular attribute of data.

Let's use the social media example again. Users on a social media site can make a profile that contains the user's name and username. The profile would be a table, the user who created a profile would be a single row in the profile table, and the name and username would be individual columns. 

**Profile Table**

| PK | name             | username   |
| -- | ---------------- | ---------- |
| 1  | Jean-Luc Picard  | Captain    |
| 2  | William T. Riker | Number One |
| 3  | Beverly Crusher  | Doctor     |
| 4  | Deanna Troi      | NULL       |

Notice that a column, ' PK, ' was not mentioned. Every data entry to a SQL database will be given a primary key or `PK`. We can use the primary key to interact with a specific data entity; this can take the form of reading, updating, or deleting that data entity.

With the table structure, we are reinforcing that every data entry will have the same keys or fields. In the example above, if we add another row (data entry), that entry would have a name and a username property.

## NoSQL Database

NoSQL databases are database management systems that manage data that doesn't fit neatly into a relational or SQL database. NoSQL databases are known for their flexibility, scalability, and ability to handle unstructured data. The key word here is unstructured. In the above section, we can see an example of a SQL table. Its structure is predefined. Every entry has a `pk`, `name`, and `username`. Those fields might hold `null` values but are still there. NoSQL does not need a predefined structure; any `null` field we might have could be left off. 

There are a couple of data models for NoSQL databases:

- Graph - This type of data representation is ideal for applications with complex relationships or network-like structures.
- Column-family stores - Mimics is almost an SQL structure with data in columns.
- Key-value stores - Data is represented as key/value pairs.
- Documents stores - Data is stored in a semi-structed document. This is either JSON or BSON.

**Profile Collection**

```bson
{
 "_id": "1",
 "name": "Jean-Luc Picard",
 "username": "Captain"
},
{
 "_id": "2",
 "name": "William T. Riker",
 "username": "Number One"
},
{
 "_id": "3",
 "name": "Beverly Crusher",
 "username": "Doctor"
},
{
 "_id": "4",
 "name": "Deanna Troi"
}
```

This structure is what a document-stored NoSQL structure would look like. Instead of a table, we have a collection containing BSON objects. Notice that the last object here is missing the `username` key/value pair. This is okay and intentional. Since we use a NoSQL database, we do not have to follow a predefined structure.

## MongoDB

MongoDB is a document-oriented database (document stores mentioned above). Documents are stored as BSON objects, which are flexible schema-less. These documents are contained within a collection. While the data in the documents might differ, the collection should include documents with a similar or related purpose.


![Social media database](./assets/social-media-database.png)

Let's go back to that social media profile example again. Here is an overview of what this would look like modeled using MongoDB

- `social-media-app-name` - This is the database. All collections are contained in the database and are commonly named after the application you create.
- `profiles` - This is the collection. Collections contain related or semi-related data. Usually, it is lowercase and plural of what you are containing. Since these are profile documents in this collection, the collection name is `profiles`.
- The documents are stored in a collection. These are BSON documents that contain field/value pairs.

### Connection to Atlas

We will use the [mongosh](https://www.mongodb.com/docs/mongodb-shell/) to connect to your MongoDB Atlas Cloud account.

Follow the instructions [here](https://www.mongodb.com/docs/atlas/mongo-shell-connection/) to connect via the shell.

## We do: Databases and Collections

The following exercises will be done using the MongoDB shell, `mongosh`. Use the above instructions to connect to your Atlas Cloud MongoDB account.

A MongoDB database can hold one or more collections. If a database is not provided when entering the shell, your database will be `test` by default.

![Terminal shell on test database](./assets/test-database.png)

Notice above how the shell says `test>`. This indicates that we are connected to the `test` database. This database is a catch-all for MongoDB interactions; if you want to test some collection/document ideas, here is the perfect place to do that before creating another database.

In development, you want to create a new database for each project. Remember that a database can contain many collections. We can write a script or type directly into the shell to create a database. For this lesson, we will do a mix of both.

First, let's create a new database called `starTrek`. Inside of your shell:

```bash
use starTrek
```

- `use` - MongoDB shell command used to use a database. This database can now be referred to in the `db` variable; we will see this soon. If the database is not created, this command will also make it.
- `starTrek` - Name of the database we want to create. The convention is to use camel case when naming databases in MongoDB. Our databases can be named anything; usually, they are named after the application or part of the application this database is used for.

![Star Trek database indicated](./assets/star-trek-database.png)

Notice how the shell is no longer on `test`; it's now on `starTrek`. This indicates that we are connected to the `starTrek` database.

We can view all databases by using the command:

```bash
show dbs
```

- `show` - MongoDB shell command used to show databases and collections.
- `dbs` - Shortened form of databases. You can also use the long form of `databases` -> `show databases`.

We should see at least the `test` and the `starTrek` databases.

Before we create a collection, let us see what no collections look like in a database. Still inside your shell:

```bash
show collections
```

- `show` - MongoDB shell command used to show databases and collections.
- `collections` - What to show. Here, we show all the collections in the `starTrek` database.

Since no collections are in the `starTrek` database, we return an empty line. Let's now create a collection. There are a couple of ways to make a collection. First, we can use the `db.createColleciton()` method to create a collection in the current database. Or we could use a document creation method. Just like with the `use starTrek` command, if a collection does not exist when we add a document to it, MongoDB will create it for us.

- `db.createCollection()` - Used when we want to set various options for a collection.
- Document create method - Used when you just want the default setting for a collection.

Let's create a collection with the `db.createCollection()`. Inside of your shell:

```js
db.createCollection('tng')
```

If this command is successful, we will see:

```js
{okay: 1 }
```

> *Note*: We won't be setting any options for this lesson, so using a document creation method for our purposes would be acceptable and preferable. However, for the flow of this lesson, we will create a collection using the `db.createCollection()` method.

If we run the command `show collections` again, we should see the newly created `tng` collection.

### You do: Databases and Collections

Let's do a rep of the above:

- Create a new database called `gameOfThrones`.
- Inside your newly created database `gameOfThrones`, create a collection called `stark`.

### Demo: Documents

MongoDB stores its data in BSON documents. BSON is a binary representation of JSON, which allows us to store data types that JSON does not allow for. See a complete list of what BSON types we can store [here](https://www.mongodb.com/docs/manual/reference/bson-types/#std-label-bson-types).

Documents are made of field/value pairs. These look incredibly similar to JavaScript objects.

Let's create a document in our `tng` collection. We will be venturing out of our shells and writing scripts for these document interactions. Inside of `bin/create-demo.js`:

```js
db.tng.insertOne({
    name: 'Jean-Luc Picard',
    rank: 'Captain'
})
```

> *Note*: If you are using a linter, your JavaScript files will say that some unexpected keywords or some variables are undefined. This is going to be expected for this code. Even though JavaScript might not know all the commands we are using, that's okay because MongoDB Shell knows these commands.

Now, let's load and run the file. First, inside your shell, ensure you are in the `starTrek` database. If you did the `You do: Databases and Collections`, you must return to the `starTrek` database with `use starTrek`. After you have changed back to the `starTrek` database, load the JavaScript file we just edited:

```js
load('./bin/create-demo.js')
```

> *Note*: Tip when working with scripts. Once you know how to run the script, leave a comment at the top of the script file on how to run it. This saves time if you need to return to this script for any reason.

You should see a `true` in your shell if this was successful.

Let's take a look at what we just created. Inside your terminal, let's run the command `db.tng.find()`; more on this command later. But we should get back something that looks like this:

```js
[
 {
    _id: ObjectId("64ff5e0d7c02aec69ab526c2"),
    name: 'Jean-Luc Picard',
    rank: 'Captain'
 }
]
```

- `_id:` - `_id` is a field created by MongoDB when we ran the `insertOne` method.
- `ObjectId("64ff5e0d7c02aec69ab526c2")` - The BSON Object Id type. This value must be unique and immutable in the collection.

> *Note*: `name: 'Jean-Luc Picard'` and `rank: 'Captain'` from our object we passed into the `insertOne` method.

Since our database can contain documents with the same field/value pairs, we need to be able to distinguish them from each other. Let's rerun the `load` function to rerun the `bin/create-demo.js` file; if successful, we will return a `true`. 

Now run the command `db.tng.find()` inside your terminal again:

```js
[
 {
    _id: ObjectId("64ff5e0d7c02aec69ab526c2"),
    name: 'Jean-Luc Picard',
    rank: 'Captain'
 },
 {
    _id: ObjectId("64ff61037c02aec69ab526c3"),
    name: 'Jean-Luc Picard',
    rank: 'Captain'
 }
]
```

Notice that the two documents have the same `name` and `rank` field/value pairs. However, the `_id` values are different. Even though both documents contain the same data, they are separate documents.

## CRUD

Above, we discussed documents and used `insertOne` to create two documents in our `starTrek` database. In this section, we are going to dive into CRUD operations. CRUD is an acronym for Create, Read, Update, and Delete:

- Create - Creates a single or multiple documents inside a collection.
- Read - Querying or retrieving a single or multiple documents from a collection.
- Update - Modify or update a single or multiple documents in a collection.
- Delete - Removing or deleting a single or multiple documents from a database.

CRUD operations are essential for database interactions and are used as a framework for design when building an application.

### We do: Create

In the demo above, we created a single document using `insertOne`. Two Jean-Luc Picards will hang out in the `tng` collection if you run the script twice.

Let's insert multiple documents by adding more Star Trek: The Next Generation crew members. Inside of `bin/create.js`:

```js
db.tng.insertMany()
```

- `db` - The database we are currently using. Since we are running this with our connected shell, we can change our database using the `use` command. The current database is displayed on the command line in the shell.
- `tng` - The collection into which we want to insert our documents. Since a database can have many collections, you must specify which collection to use. Watch out for spelling errors here! Remember, if a collection does not exist and we run a create document method, it will make the collection for us. So if we had `db.tngs.insertMany({...})`, we would have two collections in this database. One `tng` and another `tngs`.
- `insertMany` - MongoDB collection method used to insert many documents. You can also insert one document if that is all that's in the array when passed.

Now, let's take a look at the documentation for this method. [`db.collection.insertMany()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.insertMany/). 

This method expects one parameter and can take a second one. From the documentation:

```js
db.collection.insertMany(
 [ <document 1> , <document 2>, ... ],
   {
      writeConcern: <document>,
 ordered: <boolean>
 }
)
```

- The first parameter - `[ <document 1> , <document 2>, ... ]` this is representing we can send this method a list of documents. Since we are writing scripts in a JavaScript file, we can translate that to JavaScript and send an array of objects representing what a document has for field/value pairs.
- The second parameter - `{ writeConcern: <document>, ordered: <boolean> }` represents some options we can set values to or turn on in the case of a boolean. This is optional, and we will not need it.

Now that we know what the `inserMany` method is expecting let's use it:

```js
db.tng.insertMany([
 {
        name: 'William T. Riker',
        rank: 'Captain'
 },
 {
        name: 'Beverly Crusher',
        rank: 'Chief Medical Officer'
 },
 {
        name: 'Deanna Troi'
 }
])
```

Now, let's load and run the file. Inside your shell, first make sure you are in the `starTrek` database, then use the below command:

```js
load('./bin/create.js')
```

If successful, we should see a `true` in the terminal.

Since the second param is optional, we can leave it off and pass in an array of objects representing the documents we want to insert. Notice that the last document is missing the `rank` field/value pair. Since MongoDB does not require us to predefine a schema for our documents in a collection, they can differ in field/value pairs.

### You Do: Create

Let's do a rep of the above. Switch back to the `gameOfThrones` collection. Using `db.collections.insertOne()` or `db.collections.insertMany()` insert the following:

Fields:

- name
- isDead
- age

Values:

- Arya Stark, 18, false
- Robb Stark, 16 true
- Sansa Stark, 20 false
- Bran Stark, 17, false
- Jon Snow, 25, false
- Catelyn Stark, 35, true
- Benjen Stark, 36, true
- Rickon Stark, 11, true
- Lyanna Stark, 16, true

Before continuing the talk, change back to the `starTrek` collection.

### We do: Read

Above we created or inserted in two different ways; `db.collections.insertOne()` and `db.collections.insertMany()`. Now that there is something in the collection of `tng`, let's read from it. There are two ways a read action can be taken:

- Index - Reading/retrieving all documents.
- Show - Reading/retrieving a single document.

#### Index

We will start with the index and then move to show. Inside of `bin/index.js`:

```js
console.log(db.tng.find())
```

- `console.log` - Logging to the console what the results are from the `.find()`. Just like if we were to add `2 + 2` in a JavaScript file, to see the outcome of that add action, we would need to throw it into a `console.log`.
- `db` - The database we are currently using. Since we are running this with our connected shell, we can change our database using the `use` command. The current database is displayed on the command line in the shell.
- `tng` - The collection we want to read from. Unlike with a create method, if we make a spelling mistake here, it will not create a misspelled collection; it will just give us an error or no response.
- `find` - The MongoDB Collection method finds all or a subset of documents in a collection.

Again, let's use the documentation to see what this method expects. [db.collections.find()](https://www.mongodb.com/docs/manual/reference/method/db.collection.find/).

This method can have up to three parameters, all of which are optional. We will focus on the first parameter, which is the query. The query will be an object we pass in with key/value pairs representing what we are searching for.

Now that we know what this method expects let's use it. Back in `bin/index.js`:

```js
console.log(db.tng.find({}))
```

- `{}` - The query is the empty object we just added. To find all documents in a collection, we can either pass in an empty object or leave out the object altogether. Both work and are valid options.

Now, let's load and run the file. Inside your shell, first make sure you are in the `starTrek` database, then use the below command:

```js
load('./bin/index.js')
```

If successful, we should see all the documents we have created so far followed by a `true`. The `true` is just feedback the shell gives us when we pass it JavaScript code; it could run without errors.

```js
[
 {
    _id: ObjectId("6501effb4a253ea725645064"),
    name: 'Jean-Luc Picard',
    rank: 'Captain'
 },
 {
    _id: ObjectId("6501effd4a253ea725645065"),
    name: 'Jean-Luc Picard',
    rank: 'Captain'
 },
 {
    _id: ObjectId("6501f0004a253ea725645066"),
    name: 'William T. Riker',
    rank: 'Captain'
 },
 {
    _id: ObjectId("6501f0004a253ea725645067"),
    name: 'Beverly Crusher',
    rank: 'Chief Medical Officer'
 },
 { _id: ObjectId("6501f0004a253ea725645068"), name: 'Deanna Troi' }
]
true
```

> *Note*: We could run straight in the shell for all these commands. Some make more sense to run directly in the shell than others. Our `db.collection.find()` method is a perfect example of a command that is fit to run in the shell. `db.collection.insertMany()` method is an example of one we might want to write a script then load and run it in the shell. What you want to make your main go-to after this talk is up to you.

Let's add key/value pairs to our query object and narrow our index. Back inside of `bin/index.js`:

```js
console.log(db.tng.find({rank: 'Captain'}))
```

- `rank` - Field name we want to search through.
- `Captain` - Value we want to search for. This is case-sensitive, so a `captain` will not return any found documents.

Now, let's load and run the file. Inside your shell, first make sure you are in the `starTrek` database, then use the below command:

```js
load('./bin/index.js')
```

If successful, we should return all the documents with the field/value pair of `rank: 'Captain'` followed by a `true`.

```js
[
 {
    _id: ObjectId("6501effb4a253ea725645064"),
    name: 'Jean-Luc Picard',
    rank: 'Captain'
 },
 {
    _id: ObjectId("6501effd4a253ea725645065"),
    name: 'Jean-Luc Picard',
    rank: 'Captain'
 },
 {
    _id: ObjectId("6501f0004a253ea725645066"),
    name: 'William T. Riker',
    rank: 'Captain'
 }
]
true
```

The method `db.collection.find()` can query anything we want in our database. We also have [Comparison Query Operators](https://www.mongodb.com/docs/manual/reference/operator/query-comparison/) that we can use. 

#### Show

Now that we have an index action working, we can move on to the show action. Inside of `bin/show.js`:

```js
console.log(db.tng.findOne())
```

- `console.log` - Logging to the console what the results are from the `.findOne()`. Just like if we were to add `2 + 2` in a JavaScript file, to see the outcome of that add action, we would need to throw it into a `console.log`.
- `db` - The database we are currently using. Since we are running this with our connected shell, we can change our database using the `use` command. The current database is displayed on the command line in the shell.
- `tng` - The collection we want to read from. Unlike with a create method, if we make a spelling mistake here, it will not create a misspelled collection; it will just give us an error or no response.
- `findOne` - MongoDB Collection method to find one document. If multiple documents are making the query passed, this method will return the first it encounters.

Always use the documentation to see what this method is expecting. [db.collections.findOne()](https://www.mongodb.com/docs/manual/reference/method/db.collection.findOne/).

Like with the `db.collection.find()`, this method has three optional parameters. We will focus on the query parameter, the first one passed in.

Back in `bin/show.js`:

```js
console.log(db.tng.findOne({name: 'Beverly Crusher'}))
```

- `name` - The field we want to search through.
- `Beverly Crusher`- The value we are searching for. This is also case and space-sensitive.

Now, let's load and run the file. Inside your shell, first make sure you are in the `starTrek` database, then use the below command:

```js
load('./bin/show.js')
```

We should see a single document with a field/value pair of `name: 'Beverly Crusher'` followed by `true`.

```js
{
  _id: ObjectId("6501f0004a253ea725645067"),
  name: 'Beverly Crusher',
  rank: 'Chief Medical Officer'
}
true
```

Let's take notice of what is being returned in both the `db.collection.find()` and the `db.collections.findOne()`. The `db.collection.find()` returns an array of documents, while the `db.collections.findOne()` returns just one document. This is an imported difference that might be overlooked. If we are being given back an array of possible documents, we must handle it as such.

### You Do: Read

Let's do a rep of the above. Switch back to the `gameOfThrones` collection. Using `db.collections.find()` or `db.collections.findOne()` search for the following:

- Find all Stark house members above the age of 18.
- Find Arya Stark.
- Find all the living members of House Stark.
- Find all dead members of House Stark.

Before continuing the talk, change back to the `starTrek` collection.

### We do: Update

Now that we can read our documents let's update some of them. There are a couple of ways to edit documents in MongoDB; we will look at just two collection methods for update: `db.collection.updateMany()` and `db.collection.updateOne()`. Inside of `bin/update.js`:

```js
console.log(db.tng.updateMany())
```

- `console.log` - Logging to the console what the results are from the `.updateMany()`. Just like if we were to add `2 + 2` in a JavaScript file, to see the outcome of that add action, we would need to throw it into a `console.log`.
- `db` - The database we are currently using. Since we are running this with our connected shell, we can change our database using the `use` command. The current database is displayed on the command line in the shell.
- `tng` - The collection we want to update in.
- `updateMany` - A collection method used to update multiple documents in a collection.

Let's look at the documentation to see what this method expects. [dv.collection.updateMany](https://www.mongodb.com/docs/manual/reference/method/db.collection.updateMany/).

This method is expecting 3 parameters. The first two are not optional and will need to be provided. The third one is optional; we will not use it during this talk. Taken directly from the MongoDB documentation:

```js
db.collection.updateMany(
   <filter>,
   <update>,
   {
     upsert: <boolean>,
 writeConcern: <document>,
 collation: <document>,
 arrayFilters: [ <filterdocument1>, ... ],
 hint:  <document|string>        // Available starting in MongoDB 4.2.1
 }
)
```

- `<filter>` - Used to find which documents we want to update. Like in the `db.collection.find()` demo, we can pass in a field/value pair to search for.
- `<update>` - What we want to update in the found documents.

Now that we know what `updateMany` expecting let's use it:

```js
console.log(db.tng.updateMany({
    name: 'Jean-Luc Picard'
}, {
    $set: {
        onceBorg: true
 }
}))
```

- `{ name: 'Jean-Luc Picard' }` - We are searching for all documents with the `name` of `Jean-Luc Picard`. Since we have two in our collection, this should match the two documents.
- `{$set: { onceBorg: true }}` - Adding a new field/value pair. Since we are adding to our documents, we need to use `$set` and pass it a new field/value pair to add.

> *Note*: There is a difference between using `$set` to add a new field/value pair and `$set` to update a field/value pair. When we add a new field/value pair, we call the [`$set`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/set/#mongodb-pipeline-pipe.-set) that is an alias for [`$addFields`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/addFields/#mongodb-pipeline-pipe.-addFields). When we are updating an existing field/value pair we are calling the [`$set`](mongodb.com/docs/manual/reference/operator/update/set/#mongodb-update-up.-set) operator that will replace the value of a field/value pair.

Now, let's load and run the file. Inside your shell, first make sure you are in the `starTrek` database, then use the below command:

```js
load('./bin/update.js')
```

If successful, we should return an object with a couple of key/value pairs followed by a `true`.

```js
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 2,
  modifiedCount: 0,
  upsertedCount: 0
}
true
```

- `acknowledged: true` - This tells us that the JavaScript file was loaded without errors. This does not mean our update was successful; it just means the file has no errors.
- `insertedId: null` - In some cases, not this one, we can query the collection to see if there is something to update; if not, we can add a new document with the field/value pairs we want to edit. If this is the case, we will create new documents and return the number of new ones made here. By default, this option is set to false. Expect this key/value pair to be `null` unless you are coding to have this functionality.
- `matchedCount: 2` - The documents we found with the filter we passed in. In our case, we are using the `$set` to add a field/value pair to a document.
- `modifiedCount: 0` - This returns the count of how many documents were modified in the last command. Notice here that it's `0` and not `2`. More on that below.
- `upsertedCount: 0` - To upsert a document, we must update and insert it simultaneously. (inSERT + UPdate = upsert). `0` here because we did not upsert.

> *Note*: The reason why we are getting a `0` for the `modifiedCount` is that we are using the [`$set`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/set/#mongodb-pipeline-pipe.-set) to add a new field. If we were to rerun the command, we would see a `modifiedCount` change to `2`. This is because we are now updating an existing field and are using the update [`$set`](mongodb.com/docs/manual/reference/operator/update/set/#mongodb-update-up.-set) operator.

Before we dive into `db.collection.updateOne()`, let's rerun the index file to see our changes. Inside your terminal, allow's query all the documents in the `tng` collection:

```js
db.tng.find()
```

And we should see the added field/value pair on our `Jean-Luc Picard` documents:

```js
[
 {
    _id: ObjectId("6501effb4a253ea725645064"),
    name: 'Jean-Luc Picard',
    rank: 'Captain',
    onceBorg: true
 },
 {
    _id: ObjectId("6501effd4a253ea725645065"),
    name: 'Jean-Luc Picard',
    rank: 'Captain',
    onceBorg: true
 },
 {
    _id: ObjectId("6501f0004a253ea725645067"),
    name: 'Beverly Crusher',
    rank: 'Chief Medical Officer'
 },
 {
    _id: ObjectId("6501f0004a253ea725645066"),
    name: 'William T. Riker',
    rank: 'Captain'
 },
 { _id: ObjectId("6501f0004a253ea725645068"), name: 'Deanna Troi' }
]
```

Now we can dive into `db.collection.updateOne()`. Back inside of `bin/update.js`, let's comment out the `db.collection.updateMany()` command before we write our new update command:

```js
console.log(db.tng.updateOne())
```

This method can intake 3 params. Like the `db.collection.updateMany()`, we will focus on the first two required. Taken from the documentation:

```js
db.collection.updateOne(
   <filter>,
   <update>,
   {
     upsert: <boolean>,
 writeConcern: <document>,
 collation: <document>,
 arrayFilters: [ <filterdocument1>, ... ],
 hint:  <document|string>        // Available starting in MongoDB 4.2.1
 }
)
```

- `<filter>` - Used to find which documents we want to update. Just like in the `db.collection.find()` demo, we can pass in a field/value pair to search for. If multiple documents match the filter, `updateOne` will update the first one it matches.
- `<update>` - What we want to update in the found document.

Now we know what this method is expecting, let's use it:

```js
console.log(db.tng.updateOne({
    name: 'Jean-Luc Picard'
}, {
    $set: {
        onceBorg: false,
        name: 'Locutus'
 }
}))
```

- `{ name: 'Jean-Luc Picard' }` - We are searching for all documents with the `name` of `Jean-Luc Picard`. Since we have two in our collection, this should match two documents, but it will only update the first one it finds.
- `$set: { onceBorg: false, name: 'Locutus' }` - Updating the found documents `onceBorg` and `name` values.

Now, let's load and run the file. Inside your shell, first make sure you are in the `starTrek` database, then use the below command:

```js
load('./bin/update.js')
```

If this was successful, we should see the following:

```js
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}
true
```

- `acknowledged: true` - This tells us the JavaScript file was loaded without errors. This does not mean our update was successful; it just means the file has no errors.
- `insertedId: null` - In some cases, not this one, we can query the collection to see if there is something to update; if not, we can add a new document with the field/value pairs we want to edit. If this is the case, we will create new documents and return the number of new ones made here. By default, this option is set to false. Expect this key/value pair to be `null` unless you are coding to have this functionality.
- `matchedCount: 1` - The document we found with the filter we passed in.
- `modifiedCount: 1` - This returns the count of how many documents were modified in the last command. Since, in this example, we are modifying an existing field/value pair, we get back a `modifiedCount` value.
- `upsertedCount: 0` - To upsert a document, we must update and insert it simultaneously. (inSERT + UPdate = upsert). `0` here because we did not upsert.

Lastly, for the update, let's see how that last command updated our documents. In your terminal, use the command:

```js
db.tng.find()
```

And we should see the following:

```js
[
 {
    _id: ObjectId("6501effb4a253ea725645064"),
    name: 'Locutus',
    rank: 'Captain',
    onceBorg: false
 },
 {
    _id: ObjectId("6501effd4a253ea725645065"),
    name: 'Jean-Luc Picard',
    rank: 'Captain',
    onceBorg: true
 },
 {
    _id: ObjectId("6501f0004a253ea725645067"),
    name: 'Beverly Crusher',
    rank: 'Chief Medical Officer'
 },
 {
    _id: ObjectId("6501f0004a253ea725645066"),
    name: 'William T. Riker',
    rank: 'Captain'
 },
 { _id: ObjectId("6501f0004a253ea725645068"), name: 'Deanna Troi' }
]
```

### You Do: Update

Let's do a rep of the above. Switch back to the `gameOfThrones` collection. Using `db.collections.updateMany()` or `db.collections.updateOne()` find and edit the following documents:

- Find the document with the `name` value of Sansa Stark. Add the field/value pair of: `wardenOfTheNorth: true`.
- Find the document with the `name` value of Jon Snow. Edit the name value to be `Jon Targaryen`.
- Remove the field/value pair of `age: 17` from the document that has the name value of Bran Stark.

Before continuing the talk, change back to the `starTrek` collection.

### We do: Delete

Lastly, we have come to our last CRUD action, which is to delete. Like with our other CRUD methods, we can either delete a single document or multiple documents. We will use the single delete followed by the multiple delete. 

The first command we will use is `db.collection.deleteOne()`. Inside of our `bin/delete.js`:

```js
console.log(db.tng.deleteOne())
```

- `console.log` - Logging to the console what the results are from the `.deleteOne()`. Just like if we were to add `2 + 2` in a JavaScript file, to see the outcome of that add action, we would need to throw it into a `console.log`
- `db` - The database that we are currently using. Since we are running this with our connected shell, we can change our database using the `use` command. The current database is displayed on the command line in the shell.
- `tng` - The collection we want to update in.
- `deleteOne` - A collection method used to delete a single document from a collection.

Using the documentation, let's see what this method is expecting. Taken from the documentation:

```js
db.collection.deleteOne(
    <filter>,
    {
      writeConcern: <document>,
 collation: <document>,
 hint: <document|string> // Available starting in MongoDB 4.4
 }
)
```

This method can accept 2 parameters. The first is required, and the second is optional. We will not use the second parameter for this talk.

- `<filter>` - Used to find which documents we want to delete. Just like in `db.collection.find()` demo, we can pass in a field/value pair to search for. If multiple documents match the filter, `delete` will remove the first one it matches.

Let's pass the filter so we can remove a single document:

```js
console.log(db.tng.deleteOne({
    name: 'Beverly Crusher'
}))
```

Now, let's load and run the file. Inside your shell, first make sure you are in the `starTrek` database, then use the below command:

```js
load('./bin/delete.js')
```

If this was successful, we should see the following:

```js
{ acknowledged: true, deletedCount: 1 }
true
```

- `acknowledged: true` - This tells us the JavaScript file was loaded without errors. This does not mean our update was successful; it just means the file has no errors.
- `deletedCount: 1` - The count of how many documents were deleted when running this command.

Just like with the update, let's query our collection in the terminal:

```js
db.tng.find()
```

We can see that the document of `Beverly Crusher` is gone:

```js
[
 {
    _id: ObjectId("6501effb4a253ea725645064"),
    name: 'Locutus',
    rank: 'Captain',
    onceBorg: false
 },
 {
    _id: ObjectId("6501effd4a253ea725645065"),
    name: 'Jean-Luc Picard',
    rank: 'Captain',
    onceBorg: true
 },
 {
    _id: ObjectId("6501f0004a253ea725645066"),
    name: 'William T. Riker',
    rank: 'Captain'
 },
 { _id: ObjectId("6501f0004a253ea725645068"), name: 'Deanna Troi' }
]
```

At the end of this talk, let's remove the rest of the documents from our collection using the `db.collection.deleteMany()` method. Back inside of the `bin/delete.js` first comment out the last delete method, and let's add a new delete method:

```js
console.log(db.tng.deleteMany())
```

- `console.log` - Logging to the console what the results are from the `.deleteOne()`. Just like if we were to add `2 + 2` in a JavaScript file, to see the outcome of that add action, we would need to throw it into a `console.log`.
- `db` - The database that we are currently using. Since we are running this with our connected shell, we can change our database using the `use` command. The current database is displayed on the command line in the shell.
- `tng` - The collection we want to update in.
- `deleteMany` - A collection method used to delete multiple documents from a collection.

Before we use this method, let's see what it needs. Taken from the documentation:

```js
db.collection.deleteMany(
   <filter>,
   {
      writeConcern: <document>,
 collation: <document>
 }
)
```

The above method can intake two parameters. The first is mandatory, and we will need to use and the second is optional, and we will not use it in this talk.

- `<filter>` - Used to find which documents we want to delete. Just like in `db.collection.find()` demo, we can pass in a field/value pair to search for.

Now that we know what we need for this method let's use it:

```js
console.log(db.tng.deleteMany({}))
```

- `{}` - An empty filter. When an empty filter is passed in, we will remove all documents from the collection

Now, let's load and run the file. Inside your shell, first make sure you are in the `starTrek` database, then use the below command:

```js
load('./bin/delete.js')
```

If this was successful, we should see the following:

```js
{ acknowledged: true, deletedCount: 4 }
true
```

- `acknowledged: true` - This tells us the JavaScript file was loaded without errors. This does not mean our update was successful; it just means the file has no errors.
- `deletedCount: 4` - The count of how many documents were deleted when running this command.

Lastly, let's query the collection again and see if anything is left. Inside of our shell:

```js
db.tng.find()
```

We can see that nothing has been returned.

### You Do: Delete

Let's do a rep of the above. Switch back to the `gameOfThrones` collection. Using `db.collections.deleteOne()` or `db.collections.deleteMany()` remove the following documents:

- Remove anyone dead from the collection.
- Remove anyone under the age of 19.
- Remove anyone whose last name is not Stark.

## Wrap up

MongoDB is a NoSQL document-orientated database that allows us to store loosely related documents in collections. Interacting with MongoDB through the shell, like in this talk, is not something we would use in an actual world application; it's a must-know for development. As developers, we need to know how to query our databases directly to see how our code manipulates the documents. This helps debug and understand how our application interacts with the database.

### MongoDB Terms to know

Through this talk, we touched on words that were new to us. Here are the main ones we want to take away from this talk:

- **NoSQL** - A type of database that does not use a relational database's traditional rows and columns.
- **Database** - Organized collection of data stored locally or remotely.
- **Collections** - A group of documents stored in a database.
- **Document** - A record in a collection comprising field/value pairs.
- **CRUD** - Create, Read, Update, and Delete database interactions.
- **_id** - A field MongoDB creates when a document is created. This field is unique and immutable.
- **ObjectId** - A BSON data type that is a 12-byte identifier that is unique in the collection.

### MongoDB Methods

Here are the methods we used in this talk:

- **db.collection.insertOne()** - Insert a single document into a collection.
- **db.collections.insertMany()** - Insert multiple documents into a collection.
- **db.collection.find()** - Query a collection for all documents or a subset of documents.
- **db.collection.findOne()** - Query a collection for a single document.
- **db.collection.updateMany()** - Update multiple documents in a collection.
- **db.collection.updateOne()** - Update a single document in a collection.
- **db.collection.deleteOne()** - Delete a single document in a collection.
- **db.collection.deleteMany()** - Delete multiple documents in a collection.


## Have questions? Or see a mistake?

If you have questions or see a mistake in this talk, open an issue on this repository. I would love to hear from you.
