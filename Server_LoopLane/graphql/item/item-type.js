// ItemType.js
const gql = require("graphql-tag");

const ItemType = gql`
  type Item {
    id: ID!
    itemName: String!
    itemDescription: String!
    itemPrice: Float!
    itemPicture: String!
    itemCondition: String!
    itemCategory: String!
    user: ID!
    createdAt: String
    updatedAt: String
  }

  input ItemInput {
    itemName: String!
    itemDescription: String!
    itemPrice: Float!
    itemPicture: String!
    itemCondition: String!
    itemCategory: String!
    user: ID!
  }

  type ItemMutationResponse {
    id: ID!
    itemName: String!
    itemDescription: String!
    itemPrice: Float!
    itemPicture: String!
    itemCondition: String!
    itemCategory: String!
    user: ID!
  }

  type Query {
    items: [Item]
    item(id: ID!): Item
    searchItems(itemName: String!): [Item] # Returns an array of matching items
  }

  type Mutation {
    createItem(input: ItemInput!): Item!
    updateItem(id: ID!, input: ItemInput!): Item!
    deleteItem(id: ID!): ItemMutationResponse!
  }
`;

module.exports = ItemType;
