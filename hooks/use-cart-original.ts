import {create} from 'zustand';
import {persist} from 'zustand/middleware';

interface ItemsStripe {
  id: string;
  cantidad: number;
}
interface Item {
  id: string;
  name: string;
  image: string;
  cantidad: number;
}

interface CartState {
  //Añadir la imagen
  increment: (id: string, name: string, image: string) => void;
  decrement: (id: string) => void;
  incremetCantidad: (id: string) => void;
  removeItems: () => void;
  itemsStripe: ItemsStripe[];
  items: Item[];
}

const useCart = create<CartState>((set, get) => ({
  itemsStripe: [],
  items: [],
  //state estado actual
  //Añadir la imagen
  increment: (id: string, name: string, image: string) =>
    set((state) => {
      const exist = state.itemsStripe.find((item) => item.id == id);
      if (exist) {
        const updateItemStripe = state.itemsStripe.map((item) =>
          item.id === id ? {...item, cantidad: item.cantidad + 1} : item
        );
        const updateItem = state.items.map((item) =>
          item.id === id ? {...item, cantidad: item.cantidad + 1} : item
        );

        return {itemsStripe: updateItemStripe, items: updateItem};
      } else {
        // itemsStripe es un nuevo objeto, [...state.itemsStripe] estado ya existente y ,{id, cantidad: 1} lo nuevo
        return {
          itemsStripe: [...state.itemsStripe, {id, cantidad: 1}],
          //Añadir la imagen
          items: [...state.items, {id, name, cantidad: 1, image}],
        };
      }
    }),

  decrement: (id: string) =>
    set((state) => {
      //si el objeto es igual le resta uno

      const updateItemStripe = state.itemsStripe.map((item) =>
        item.id === id ? {...item, cantidad: item.cantidad - 1} : item
      );

      const updateItem = state.items.map((item) =>
        item.id === id ? {...item, cantidad: item.cantidad - 1} : item
      );

      const filteredUpdateItemStripe = updateItemStripe.filter(
        (item) => item.cantidad > 0
      );
      const filteredUpdateItem = updateItem.filter((item) => item.cantidad > 0);

      //los itemsStripe toman el valor de updateItem
      return {
        itemsStripe: filteredUpdateItemStripe,
        items: filteredUpdateItem,
      };
    }),

  incremetCantidad: (id: string) =>
    set((state) => {
      const updateItemStripe = state.itemsStripe.map((item) =>
        item.id === id ? {...item, cantidad: item.cantidad + 1} : item
      );

      const updateItem = state.items.map((item) =>
        item.id === id ? {...item, cantidad: item.cantidad + 1} : item
      );

      return {itemsStripe: updateItemStripe, items: updateItem};
    }),

  removeItems: () => set({itemsStripe: [], items: []}),
}));

export default useCart;
