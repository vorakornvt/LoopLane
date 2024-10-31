import { gql } from "@apollo/client";

// Fetch all items
export const GET_ITEMS = gql`
  query Items {
    items {
      id
      itemName
      itemDescription
      itemPrice
      itemPicture
      itemCondition
      itemCategory
      createdAt
      updatedAt
      user
    }
  }
`;

// Fetch a single item by ID
export const GET_ITEM = gql`
  query Item($itemId: ID!) {
    item(id: $itemId) {
      id
      itemName
      itemDescription
      itemPrice
      itemPicture
      itemCondition
      itemCategory
    }
  }
`;
