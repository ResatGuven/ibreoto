import { create } from 'zustand';

export interface CartItem {
  id: string | number;
  name: string;
  price: any; // Can be string like "₺120" or number
  qty: number;
  image?: string;
  slug?: string;
  [key: string]: any;
}

export interface FavoriteItem {
  id: string | number;
  name: string;
  price: any;
  image?: string;
  slug?: string;
  [key: string]: any;
}

interface CartStore {
  cart: CartItem[];
  favorites: FavoriteItem[];
  isHydrated: boolean;
  
  // Actions
  initialize: () => void;
  addToCart: (product: any, qty?: number) => void;
  removeFromCart: (id: string | number) => void;
  updateCartQty: (id: string | number, qty: number) => void;
  clearCart: () => void;
  
  toggleFavorite: (product: any) => void;
  addToFavorites: (product: any) => void;
  removeFromFavorites: (id: string | number) => void;
  isFavorite: (id: string | number) => boolean;
}

export const useCartStore = create<CartStore>((set, get) => {
  // Helper helper to safe-set local storage and dispatch event
  const saveCart = (newCart: CartItem[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(newCart));
      window.dispatchEvent(new Event('cartUpdated'));
    }
  };

  const saveFavorites = (newFavs: FavoriteItem[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('favorites', JSON.stringify(newFavs));
      window.dispatchEvent(new Event('favoritesUpdated'));
    }
  };

  return {
    cart: [],
    favorites: [],
    isHydrated: false,

    initialize: () => {
      if (typeof window !== 'undefined') {
        const savedCart = localStorage.getItem('cart');
        const savedFavs = localStorage.getItem('favorites');
        set({
          cart: savedCart ? JSON.parse(savedCart) : [],
          favorites: savedFavs ? JSON.parse(savedFavs) : [],
          isHydrated: true,
        });
      }
    },

    addToCart: (product: any, qty = 1) => {
      const { cart } = get();
      const existing = cart.find((item) => String(item.id) === String(product.id));
      let newCart: CartItem[];

      // Format price if it's not starting with currency
      let formattedPrice = product.price;
      if (typeof formattedPrice === 'number') {
        formattedPrice = `₺${formattedPrice}`;
      } else if (typeof formattedPrice === 'string' && !formattedPrice.startsWith('₺')) {
        formattedPrice = `₺${formattedPrice}`;
      }

      if (existing) {
        newCart = cart.map((item) =>
          String(item.id) === String(product.id) ? { ...item, qty: item.qty + qty } : item
        );
      } else {
        newCart = [...cart, { ...product, qty, price: formattedPrice }];
      }

      set({ cart: newCart });
      saveCart(newCart);
    },

    removeFromCart: (id: string | number) => {
      const { cart } = get();
      const newCart = cart.filter((item) => String(item.id) !== String(id));
      set({ cart: newCart });
      saveCart(newCart);
    },

    updateCartQty: (id: string | number, qty: number) => {
      if (qty < 1) return;
      const { cart } = get();
      const newCart = cart.map((item) =>
        String(item.id) === String(id) ? { ...item, qty } : item
      );
      set({ cart: newCart });
      saveCart(newCart);
    },

    clearCart: () => {
      set({ cart: [] });
      saveCart([]);
    },

    toggleFavorite: (product: any) => {
      const { favorites } = get();
      const isFav = favorites.some((item) => String(item.id) === String(product.id));
      let newFavs: FavoriteItem[];

      if (isFav) {
        newFavs = favorites.filter((item) => String(item.id) !== String(product.id));
      } else {
        newFavs = [...favorites, product];
      }

      set({ favorites: newFavs });
      saveFavorites(newFavs);
    },

    addToFavorites: (product: any) => {
      const { favorites } = get();
      const isFav = favorites.some((item) => String(item.id) === String(product.id));
      if (!isFav) {
        const newFavs = [...favorites, product];
        set({ favorites: newFavs });
        saveFavorites(newFavs);
      }
    },

    removeFromFavorites: (id: string | number) => {
      const { favorites } = get();
      const newFavs = favorites.filter((item) => String(item.id) !== String(id));
      set({ favorites: newFavs });
      saveFavorites(newFavs);
    },

    isFavorite: (id: string | number) => {
      const { favorites } = get();
      return favorites.some((item) => String(item.id) === String(id));
    },
  };
});
