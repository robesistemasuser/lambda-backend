 
export interface Log {
  id: string; // O el tipo correcto de `id` en tu base de datos (usualmente `string` para MongoDB)
  message: string;
  level: string;
  timestamp: Date;
}
