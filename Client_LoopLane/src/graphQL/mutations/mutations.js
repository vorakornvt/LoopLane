import { gql } from "@apollo/client";

export const DELETE_ITEM = gql`
  mutation DeleteItem($deleteItemId: ID!) {
    deleteItem(id: $deleteItemId) {
      id
      itemName
      itemDescription
      itemPrice
      itemPicture
      itemCondition
      itemCategory
      user
    }
  }
`;

export const CREATE_ITEM = gql`
  mutation CreateItem($input: ItemInput!) {
    createItem(input: $input) {
      id
      itemName
      itemDescription
      itemPrice
      itemPicture
      itemCondition
      itemCategory
      user
    }
  }
`;

export const UPDATE_ITEM = gql`
  mutation UpdateItem($updateItemId: ID!, $input: ItemInput!) {
    updateItem(id: $updateItemId, input: $input) {
      id
      itemName
      itemDescription
      itemPrice
      itemPicture
      itemCondition
      itemCategory
      user
    }
  }
`;

export const LOGIN_USER = gql`
  mutation Login($input: LoginInput!) {
    loginUser(input: $input) {
      createdAt
      email
      id
      token
      username
    }
  }
`;
export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      username
      email
      createdAt
      token
    }
  }
`;
