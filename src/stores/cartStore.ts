import { create } from "zustand";
import type { IProduct } from "../@types";

interface ICart {
  quantity: number;
  product: IProduct;
}

interface ICartStore {
  products: Map<number, ICart>;
  addProduct(product: IProduct): void;
  totalQuantity: () => number;
  removeProduct: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
}

const useCartStore = create<ICartStore>((set, get) => ({
  products: new Map(),

  addProduct: (product) => {
    const updatedProducts = new Map(get().products);
    const existingCartItem = updatedProducts.get(product.id);

    if (existingCartItem) {
      updatedProducts.set(product.id, {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      });
    } else {
      updatedProducts.set(product.id, {
        product,
        quantity: 1,
      });
    }

    set({ products: updatedProducts });
  },

  removeProduct: (productId: number) => {
    const updatedProducts = new Map(get().products);
    updatedProducts.delete(productId);
    set({ products: updatedProducts });
  },
  totalQuantity: () => {
    const products = get().products;
    return Array.from(products.values()).reduce(
      (sum, item) => sum + item.quantity * item.product.preco,
      0
    );
  },
  updateQuantity: (productId: number, quantity: number) => {
    const updatedProducts = new Map(get().products);
    const existingCartItem = updatedProducts.get(productId);

    if (existingCartItem && quantity > 0) {
      updatedProducts.set(productId, {
        ...existingCartItem,
        quantity,
      });
      set({ products: updatedProducts });
    } else if (existingCartItem && quantity <= 0) {
      // Se a quantidade for 0, remover o item
      updatedProducts.delete(productId);
      set({ products: updatedProducts });
    }
  },
}));

export { useCartStore };
