// Stockage de connexion utilisateur ou non 
import { create } from "zustand";
import { persist , createJSONStorage } from "zustand/middleware";

type UserState = {
  isLoggetIn: boolean;
  HaveCreateAccount: boolean; // si il n'est pas connecter soit il cree un compte
  logIn: () => void;
  logOut: () => void;
};


// systeme de gestion d'Etat de memoire 

export const useAuthStore = create<UserState>((set) => ({
  isLoggetIn: false,
  HaveCreateAccount: false,

  logIn: () => {
    set((state) => ({
      ...state,
      isLoggetIn: true,
    }));
  },

  logOut: () => {
    set((state) => ({
      ...state,
      isLoggetIn: false,
    }));
  },
}));
