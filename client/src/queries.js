//all referenced from shop shop queries.js in lesson 22
import gql from "graphql-tag";
//instruction
//queries.js: This will hold the query GET_ME, which will execute the me query set up using Apollo Server.

//get all props query

export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        description
        title
        link
        image
      }
    }
  }
`;

//for reference
// query {
//     # query all thoughts
//     thoughts {
//       _id
//       username
//       thoughtText
//       reactions {
//         _id
//         createdAt
//         username
//         reactionBody
//       }
//     }
