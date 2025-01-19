const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");
const { UserInputError } = require("apollo-server");
const { PubSub } = require("graphql-subscriptions");
const jwt = require("jsonwebtoken");
const pubsub = new PubSub();
require("dotenv").config();
const JWT_SECRET = process.env.SECRET;

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        return Book.find({}).populate("author");
      } else if (args.author && !args.genre) {
        const author = await Author.findOne({ name: args.author });
        return Book.find({ author: { $in: [author.id] } }).populate("author");
      } else if (!args.author && args.genre) {
        return Book.find({ genres: { $in: [args.genre] } }).populate("author");
      } else {
        const author = await Author.findOne({ name: args.author });
        return Book.find({
          $and: [{ author: author.id }, { genres: { $in: [args.genre] } }],
        }).populate("author");
      }
    },
    allAuthors: async () => {
      return Author.find({}).populate("bookCount", "name");
    },
    me: (root, args, context) => {
      return context.currentUser;
    },
    allGenres: async () => {
      const books = await Book.find({});
      const genres = books.map((book) => book.genres);
      const flattened = [].concat.apply([], genres);
      const uniqueGenres = [...new Set(flattened)];
      return uniqueGenres;
    },
  },

  Author: {
    bookCount: async (root) => {
      return Book.find({ author: root.id }).countDocuments();
    },
  },

  Book: {
    author: async (root) => {
      const author = await Author.findById(root.author);
      return {
        name: author.name,
        id: author.id,
        born: author.born,
      };
    },
  },

  Mutation: {
    addBook: async (root, args, context) => {
      let book;
      let author = await Author.findOne({ name: args.author });
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new UserInputError("Not logged in");
      }

      try {
        if (!author) {
          author = await new Author({ name: args.author }).save();

          book = new Book({ ...args, author: author.id });
          await book.save();
        }
      } catch {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      pubsub.publish("BOOK_ADDED", { bookAdded: book });

      return book;
    },
    editAuthor: async (root, args, context) => {
      const author = await Author.findOne({ name: args.name });
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new UserInputError("Not logged in");
      }

      if (!author) {
        return null;
      }
      author.born = args.setBornTo;
      try {
        await author.save();
      } catch {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      return author;
    },
    createUser: async (root, args) => {
      const user = new User({ ...args });

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new UserInputError("wrong credentials");
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };
      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"]),
    },
  },
};

module.exports = resolvers;
