// UI state store using Zustand
import { create } from 'zustand';

interface UIState {
  isSidebarOpen: boolean;
  isModalOpen: boolean;
  modalContent: React.ReactNode | null;
  theme: 'light' | 'dark';

  // Actions
  toggleSidebar: () => void;
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useUIStore = create<UIState>(set => ({
  isSidebarOpen: true,
  isModalOpen: false,
  modalContent: null,
  theme: 'light',

  toggleSidebar: () => {
    set(state => ({ isSidebarOpen: !state.isSidebarOpen }));
  },

  openModal: content => {
    set({ isModalOpen: true, modalContent: content });
  },

  closeModal: () => {
    set({ isModalOpen: false, modalContent: null });
  },

  setTheme: theme => {
    set({ theme });
  },
}));
