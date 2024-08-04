// src/services/orderService.ts
import { MasterDataSource } from '../config/db';
import { Order } from '../models/orderModel';

export class OrderService {
  private orderRepository = MasterDataSource.getRepository(Order);

  // Método para obtener una orden por ID
  async getOrderById(orderId: number): Promise<Order | null> {
    return await this.orderRepository.findOneBy({ id: orderId });
  }

  // Método para obtener todas las órdenes
  async getAllOrders(): Promise<Order[]> {
    return await this.orderRepository.find();
  }

  // Método para crear una nueva orden
  async createOrder(order: Order): Promise<Order> {
    const newOrder = this.orderRepository.create(order);
    return this.orderRepository.save(newOrder);
  }

  async updateOrder(orderId: number, updatedOrder: Partial<Order>): Promise<Order | null> {
    await this.orderRepository.update(orderId, updatedOrder);
    return this.getOrderById(orderId);
  }

  async deleteOrder(orderId: number): Promise<void> {
    await this.orderRepository.delete(orderId);
  }
}
