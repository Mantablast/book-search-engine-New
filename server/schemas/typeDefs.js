//lesson 21 info
// import the gql tagged template function
const { gql } = require("apollo-server-express");
//similar to writing constraints in mysql
//authors and saved books to be arrays to save multiple inputs
// create our typeDefs
//Book reference from models/book.js
//User reference from models/user.js
//Challenge wants

//me returns user type
//mutation: login, adduser, savebook including user (Look into creating what's known as an input type to handle all of these parameters!)
//removebook to accept book id as parameter and returning a user type


//User
//Book
//Auth  (validate token . if token present)

//Hint Use the functionality in the user-controller.js as a guide.
//referenced from https://www.apollographql.com/docs/tutorial/schema/
const typeDefs = gql`
  type Book {
    _id: ID!
    bookId: String
    authors: [String]
    # authors: String
    description: String
    image: String
    link: String
    title: String
  }
  type User {
    _id: ID!
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }
  type Query {
    me: User
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    removeBook(bookId: ID!): User
    saveBook(input: savedBook!): User
  }
  input savedBook {
    description: String
    title: String
    bookId: String
    image: String
    link: String
    authors: [String]
  }
  type Auth {
    token: ID!
    user: User
  }
`;

// export the typeDefs to be used elsewhere
module.exports = typeDefs;
