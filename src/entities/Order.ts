export interface Order {
    id: string;
    userId: string;
    productIds: string[];
    totalAmount: number;
    status: 'pending' | 'completed' | 'cancelled';
    createdAt: Date;
    updatedAt: Date;
  }