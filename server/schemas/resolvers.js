//lesson 21.1.5 to 21.1.6
// import auth
// import components
//create resolvers variable with queries inside
//import apollo server for use
//export resolvers for use elsewhere
//Define the query and mutation functionality to work with the Mongoose models.
const {Book,User} = require('../models')

// import sign token function from auth
const { signToken } = require('../utils/auth');
const resolvers ={
//search username
Query: {
    //me: Which returns a User type.
    me: async (parent, args, context) => {
        if (context.user) {
            const usersData = 
            await User.findOne({ _id: context.user._id })

            .select('-__v -password')
            return usersData;
        }
        throw new AuthenticationError('Log in is required');
    },
    
},
//Create, Update and Delete mutation
//for book or (user)?
//Mutations
Mutation:{
    //add and remove books
    saveBook: async (parent, { book }, context) => {
        if (context.user) {
            const userUpdate = 
            await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: {savedBooks: book} },
                { new: true }
            )

            return userUpdate;
        }
        throw new AuthenticationError('Logg in is required')
    },
    //remove and update context for state
    removeBook: async (parent, { bookId }, context) => {
        if (context.user) {
            const userUpdate = 
            await User.findOneAndUpdate(
                {_id: context.user._id},
                { $pull: { savedBooks: { bookId: bookId } } },
                { new: true }
            )
            return userUpdate;
        }

},
//if new user 
addUser: async (parent, args) => {
    const user = await User.create(args);
    const token = signToken(user)

    return { token, user };
},
//referenced shop-shop lesson resolvers
login: async (parent, { email, password }) => {
    const user = await User.findOne( { email });
    if (!user) {
        throw new AuthenticationError('Something is wrong, please try again')
    }
    const ifCorrectPass = await user.isCorrectPassword(password);
    if(!ifCorrectPass) {
        throw new AuthenticationError('Something is wrong, please try again')
    }
    const token = signToken(user);
    return { token, user };
},
}
};
module.exports = resolvers;




//reference 
// get all users
// users: async () => {
//     return User.find()
//       .select('-__v -password')
//       .populate('friends')
//       .populate('thoughts');
//   },
//   // get a user by username
//   user: async (parent, { username }) => {
//     return User.findOne({ username })
//       .select('-__v -password')
//       .populate('friends')
//       .populate('thoughts');
//   },