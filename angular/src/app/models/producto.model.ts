export interface Producto{
  id?: string;
  name?: string;
  category?: {
    name?: string;
  };
  brand?: {
    name?: string;
  };
  slug?: string;
  createdAt?: Date;
  status?: boolean;
}
