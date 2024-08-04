// productModel.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column('decimal')
  price!: number;

  @CreateDateColumn()
  createdAt!: Date; // Establecido automáticamente por TypeORM

  @UpdateDateColumn()
  updatedAt!: Date; // Establecido automáticamente por TypeORM
}
