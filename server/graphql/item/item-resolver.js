const { GraphQLError } = require("graphql");
const { Item, validateItem } = require("../../models/item");

const itemResolver = {
  Query: {
    // Fetch a single item by ID
    item: async (parent, args, context) => {
      try {
        isAuthenticated(context);
        const item = await Item.findById(args.id);
        if (!item) throw new Error("Item not found");
        isAuthorized(item, context);
        return item;
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: { code: "GET_ITEM_ERROR" },
        });
      }
    },

    // Fetch all items belonging to the authenticated user
    items: async (parent, args, context) => {
      try {
        isAuthenticated(context);
        return await Item.find({ user: context.user._id });
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: { code: "GET_ITEMS_ERROR" },
        });
      }
    },

    // Search items by name
    searchItems: async (parent, args) => {
      try {
        return await Item.find({
          itemName: new RegExp("^" + args.name + "$", "i"),
        });
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: { code: "SEARCH_ITEMS_ERROR" },
        });
      }
    },
  },

  Mutation: {
    // Create a new item
    createItem: async (parent, args, context) => {
      try {
        isAuthenticated(context);
        const { error } = validateItem(args.input);
        if (error) throw new Error("Invalid input data");

        const item = new Item({
          itemName: args.input.itemName,
          itemDescription: args.input.itemDescription,
          itemPrice: args.input.itemPrice,
          itemPicture: args.input.itemPicture,
          itemCondition: args.input.itemCondition,
          itemCategory: args.input.itemCategory,
          user: context.user._id,
        });
        await item.save();
        return item;
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: { code: "CREATE_ITEM_ERROR" },
        });
      }
    },

    // Update an existing item
    updateItem: async (parent, args, context) => {
      try {
        isAuthenticated(context);
        let item = await Item.findById(args.id);
        if (!item) {
          throw new Error("Item not found");
        }
        isAuthorized(item, context);

        item.itemName = args.input.itemName;
        item.itemDescription = args.input.itemDescription;
        item.itemPrice = args.input.itemPrice;
        item.itemPicture = args.input.itemPicture;
        item.itemCondition = args.input.itemCondition;
        item.itemCategory = args.input.itemCategory;

        return await item.save();
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: { code: "UPDATE_ITEM_ERROR" },
        });
      }
    },

    // Delete an existing item
    deleteItem: async (parent, args, context) => {
      try {
        isAuthenticated(context);

        // Find the item by its ID
        const item = await Item.findById(args.id);
        if (!item) {
          throw new Error("Item entry not found");
        }

        // Authorization check for item owner
        isAuthorized(item, context);

        // Proceed to delete the item
        await Item.deleteOne({ _id: args.id });

        // Return a response with the deleted item's ID
        return {
          success: true,
          message: "Item deleted successfully",
          id: item._id, // Include the ID of the deleted item
          item, // Include the deleted item object if needed
        };
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: { code: "DELETE_ITEM_ERROR" },
        });
      }
    },
  },
};

// Authentication and Authorization Functions
function isAuthenticated(context) {
  if (!context.user) {
    throw new GraphQLError("User is not authenticated, No token provided", {
      extensions: { code: "UNAUTHENTICATED" },
    });
  }
}

function isAuthorized(item, context) {
  if (item.user.toString() !== context.user._id.toString()) {
    throw new GraphQLError("User is not authorized to perform this action", {
      extensions: { code: "FORBIDDEN", http: { status: 403 } },
    });
  }
}

module.exports = itemResolver;
