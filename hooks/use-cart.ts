import {Product} from '@prisma/client';
import {create} from 'zustand';

interface ItemsStripe {
  id: string;
  cantidad: number;
}
interface Item {
  id: string;
  name: string;
}

interface CartState {
  //Añadir la imagen
  increment: (id: string, name: string) => void;
  decrement: (id: string) => void;
  removeItems: () => void;
  itemsStripe: ItemsStripe[];
  items: Item[];
}

const useCart = create<CartState>((set, get) => ({
  itemsStripe: [],
  items: [],
  //state estado actual
  //Añadir la imagen
  increment: (id: string, name: string) =>
    set((state) => {
      const exist = state.itemsStripe.find((item) => item.id == id);
      if (exist) {
        const updateItem = state.itemsStripe.map((item) =>
          item.id === id ? {...item, cantidad: item.cantidad + 1} : item
        );

        return {itemsStripe: updateItem};
      } else {
        // itemsStripe es un nuevo objeto, [...state.itemsStripe] estado ya existente y ,{id, cantidad: 1} lo nuevo
        return {
          itemsStripe: [...state.itemsStripe, {id, cantidad: 1}],
          //Añadir la imagen
          items: [...state.items, {id, name}],
        };
      }
    }),

  decrement: (id: string) =>
    set((state) => {
      //si el objeto es igual le resta uno

      const updateItem = state.itemsStripe.map((item) =>
        item.id === id ? {...item, cantidad: item.cantidad - 1} : item
      );

      //los itemsStripe toman el valor de updateItem
      return {itemsStripe: updateItem};
    }),

  removeItems: () => set({itemsStripe: [], items: []}),
}));
export default useCart;
