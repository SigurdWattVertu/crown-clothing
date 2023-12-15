import { CART_ACTION_TYPES } from "./cart.types.ts";
import { createAction } from "../../utils/reducer/reducer.utils.ts";

export const setIsCartOpen = (boolean) =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);

const addCartItem = (cartItems, productToAdd) => {
  // Find if cart contains product to add
  const productToAddInBasket = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );
  // If found increment quantity - return a brand new array
  if (productToAddInBasket) {
    // NB - Map without curleys.......
    return cartItems.map((cartItem) =>
      cartItem.id === productToAddInBasket.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  // If the user has added a NEW item, the add this to array and return that.
  // Return new array of objects with original cart items + the new cart item (spread in with a default quantity of 1)
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, productToTakeOffOne) => {
  // Check if the quantity is equal to 1, if it is, then remove from basket.
  const updatedCartItems = cartItems.map((cartItem) =>
    cartItem.id === productToTakeOffOne.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
  return updatedCartItems;
};

const clearCartItem = (cartItems, itemToClearFromCart) => {
  // NB: This removes the item COMPLETELY from the cart
  let updatedCartItems = [];
  cartItems.forEach((cartItem) => {
    if (cartItem.id != itemToClearFromCart.id) {
      updatedCartItems.push(cartItem);
    }
  });
  return updatedCartItems;
};

// This will be triggered every time the user clicks AddToCart
export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const clearItemFromCart = (cartItems, itemToClearFromCart) => {
  const newCartItems = clearCartItem(cartItems, itemToClearFromCart);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, productToTakeOffOne) => {
  const newCartItems = removeCartItem(cartItems, productToTakeOffOne);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
