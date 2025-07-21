import mongoose from 'mongoose';
import Cart from '../models/cart';

interface CartItemDTO {
  product: string;
  quantity: number;
}

export const getUserCart = async (userId: string) => {
  return await Cart.findOne({ user: userId }).populate('items.product', 'name price');
};

export const addItemToCart = async (userId: string, item: CartItemDTO) => {
  const cart = await Cart.findOne({ user: userId });

  const productId = new mongoose.Types.ObjectId(item.product);

  if (cart) {
    const existingItem = cart.items.find(i => i.product.toString() === productId.toString());

    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      cart.items.push({ product: productId, quantity: item.quantity });
    }

    return await cart.save();
  } else {
    const newCart = new Cart({
      user: new mongoose.Types.ObjectId(userId),
      items: [{ product: productId, quantity: item.quantity }],
    });

    return await newCart.save();
  }
};

export const removeItemFromCart = async (userId: string, productId: string) => {
  const cart = await Cart.findOne({ user: userId });

  if (!cart) throw new Error('Cart not found');

  cart.items = cart.items.filter(item => item.product.toString() !== productId);
  return await cart.save();
};

export const clearCart = async (userId: string) => {
  const cart = await Cart.findOne({ user: userId });
  if (!cart) throw new Error('Cart not found');

  cart.items = [];
  return await cart.save();
};
