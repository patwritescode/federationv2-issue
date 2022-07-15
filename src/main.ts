import { buildSubgraphSchema } from "@apollo/subgraph";
import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
    extend schema @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key", "@shareable", "@extends", "@external"])
    directive @key(fields: _FieldSet!) repeatable on OBJECT | INTERFACE
    type Query {
        example: Example
    }
    type Example {
        name: String
    }
`;
const resolvers = {
    Query: {
        example() {
            return { name: "Hello World" };
        }
    }
}
async function main() {
    const schema = buildSubgraphSchema([{ typeDefs, resolvers}]);
    const server = new ApolloServer({
        schema,
    });
    server.listen().then(({ url }) => {
        console.log(`Server ready at ${url}`);
    })
}

main();