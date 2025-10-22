import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin' | 'owner';
  phone?: string;
  walletBalance: number;
}

interface BookingFilters {
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: Date | null;
  returnDate: Date | null;
  carType: string[];
  priceRange: [number, number];
  seats: string;
  transmission: string[];
  fuelType: string[];
  withDriver: boolean;
}

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  bookingFilters: BookingFilters;
  cart: any[];
  setUser: (user: User | null) => void;
  login: (email: string, password: string, role: string) => Promise<boolean>;
  logout: () => void;
  signup: (userData: any) => Promise<boolean>;
  updateBookingFilters: (filters: Partial<BookingFilters>) => void;
  addToCart: (item: any) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      bookingFilters: {
        pickupLocation: '',
        dropoffLocation: '',
        pickupDate: null,
        returnDate: null,
        carType: [],
        priceRange: [0, 500],
        seats: '',
        transmission: [],
        fuelType: [],
        withDriver: false,
      },
      cart: [],

      setUser: (user) => set({ user, isAuthenticated: !!user }),

      login: async (email: string, _password: string, role: string) => {
        // Mock authentication - replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockUser: User = {
          id: '1',
          name: email.split('@')[0],
          email,
          role: role as any,
          walletBalance: 1500,
        };

        set({ user: mockUser, isAuthenticated: true });
        return true;
      },

      logout: () => {
        set({ user: null, isAuthenticated: false, cart: [] });
      },

      signup: async (userData: any) => {
        // Mock signup - replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const newUser: User = {
          id: Date.now().toString(),
          name: userData.name,
          email: userData.email,
          role: userData.role || 'customer',
          phone: userData.phone,
          walletBalance: 0,
        };

        set({ user: newUser, isAuthenticated: true });
        return true;
      },

      updateBookingFilters: (filters) => {
        set((state) => ({
          bookingFilters: { ...state.bookingFilters, ...filters }
        }));
      },

      addToCart: (item) => {
        set((state) => ({ cart: [...state.cart, item] }));
      },

      removeFromCart: (id) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id)
        }));
      },

      clearCart: () => {
        set({ cart: [] });
      },
    }),
    {
      name: 'monstrac-storage',
    }
  )
);
