// src/services/fetchProducts.js
import { productsData } from '../data/products';

export const fetchProductsByCategory = async (category) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(productsData[category] || []); // Resuelve con los productos de la categoría
    }, 1000); // Simula un retraso en la carga
  });
};
