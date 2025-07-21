import mongoose from 'mongoose';
import Order from '../models/order';

interface OrderItemDTO {
  product: string;
  quantity: number;
  price: number;
}

interface ShippingAddressDTO {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

interface CreateOrderDTO {
  user: string;
  orderItems: OrderItemDTO[];
  shippingAddress: ShippingAddressDTO;
  paymentMethod: string;
  totalPrice: number;
  paymentStatus?: string;
  orderStatus?: string;
}

interface UpdateOrderDTO {
  shippingAddress?: ShippingAddressDTO;
  paymentMethod?: string;
  paymentStatus?: string;
  orderStatus?: string;
  totalPrice?: number;
  orderItems?: OrderItemDTO[];
}

export const createOrder = async (data: CreateOrderDTO) => {
  const order = new Order({
    user: data.user,
    orderItems: data.orderItems,
    shippingAddress: data.shippingAddress,
    paymentMethod: data.paymentMethod,
    totalPrice: data.totalPrice,
    paymentStatus: data.paymentStatus || 'pending',
    orderStatus: data.orderStatus || 'pending',
  });

  return await order.save();
};

export const getAllOrders = async () => {
  return await Order.find()
    .populate('user', 'name email')
    .populate('orderItems.product', 'name price');
};

export const getOrderById = async (id: string) => {
  return await Order.findById(id)
    .populate('user', 'name email')
    .populate('orderItems.product', 'name price');
};

export const updateOrderById = async (id: string, data: UpdateOrderDTO) => {
  const order = await Order.findById(id);
  if (!order) throw new Error('Order not found');

  // Update only provided fields
  if (data.shippingAddress) order.shippingAddress = data.shippingAddress;
  if (data.paymentMethod) order.paymentMethod = data.paymentMethod;
  if (data.paymentStatus) order.paymentStatus = data.paymentStatus;
  if (data.orderStatus) order.orderStatus = data.orderStatus;
  if (data.totalPrice !== undefined) order.totalPrice = data.totalPrice;

  if (data.orderItems) {
    order.orderItems = data.orderItems.map(item => ({
      product: new mongoose.Types.ObjectId(item.product),
      quantity: item.quantity,
      price: item.price,
    }));
  }

  return await order.save();
};

export const deleteOrderById = async (id: string) => {
  const order = await Order.findByIdAndDelete(id);
  if (!order) throw new Error('Order not found');
  return order;
};
