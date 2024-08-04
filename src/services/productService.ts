// src/services/productService.ts
import { MasterDataSource } from '../config/db'; // Asegúrate de que MasterDataSource esté correctamente configurado
import { Product } from '../models/productModel';

export class ProductService {
  [x: string]: any;
  private productRepository = MasterDataSource.getRepository(Product);

  // Método para crear un nuevo producto
  async createProduct(product: Product, price?: any, description?: any): Promise<Product> {
    // Crear un nuevo producto
    const newProduct = this.productRepository.create(product);
    // Guardar el nuevo producto en la base de datos
    return await this.productRepository.save(newProduct);
  }

  // Método para obtener todos los productos
  async getAllProducts(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  // Otros métodos relacionados con productos...
}
