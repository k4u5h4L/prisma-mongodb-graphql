const { PrismaClient } = require("@prisma/client");
const { ApolloServer, gql } = require("apollo-server");

const prisma = new PrismaClient({ log: ["query"] });

const typeDefs = gql`
    type Recipe {
        id: String
        cuisine: String
        name: String
        rating: Int
        cook: String
    }

    type Query {
        """
        Query all the recipes
        """
        recipes: [Recipe]

        """
        Query specific recipe by it's ID
        """
        recipe(recipeId: ID!): Recipe
    }
    type Mutation {
        """
        Create a new Recipe providing its cusine, name, rating, cook
        """
        createRecipe(
            cuisine: String!
            name: String!
            rating: Int!
            cook: String!
        ): Recipe
    }
`;

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        recipes: async (_root, _args, _ctx) => {
            const recipes = await prisma.recipe.findMany({});

            return recipes;
        },
        recipe: async (_root, args, _ctx) => {
            const recipe = await prisma.recipe.findUnique({
                where: {
                    id: args.recipeId,
                },
            });

            return recipe;
        },
    },

    Mutation: {
        createRecipe: async (_root, args, _ctx) => {
            // const res = await prisma.recipe.create({
            //     cuisine: args.cuisine,
            //     name: args.name,
            //     rating: args.rating,
            //     cook: args.cook,
            // });

            console.log(args);

            await prisma.recipe.create({
                data: args,
            });

            const res = {
                cuisine: "indian",
                name: "paneer",
                rating: 5,
                cook: "me",
            };
            return res;

            // const res = await prisma.recipe.findUnique()
        },
    },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen(8000).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});

prisma.$connect().then((res) => console.log("prisma connected"));
