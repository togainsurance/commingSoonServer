const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLID,

  GraphQLNonNull
} = graphql;

const Emails = require("../models/Emails");

const EmailType = new GraphQLObjectType({
  name: "Email",
  fields: () => ({
    id: { type: GraphQLID },
    email: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "EmailQuery",
  fields: {
    email: {
      type: EmailType,
      args: { email: { type: GraphQLString } },
      resolve(parent, args) {
        // Code to get data from db/ other source
        return Emails.findOne({ email: args.email });
      }
    },
    emails: {
      type: new GraphQLList(EmailType),
      resolve(parent, args) {
        // return Emails;
        return Emails.find({});
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addEmail: {
      type: EmailType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) }
      },
      async resolve(parent, { email }) {
        const emailExist = await Emails.find({ email });
        if (emailExist) {
          throw new Error("Your email has already been added");
        }
        let newEmail = new Emails({
          email
        });
        return newEmail.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
