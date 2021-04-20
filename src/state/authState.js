import create from 'zustand';
import { auth } from '../firebase';

export const useAuth = create((set) => ({
  currentUser: {},
  authUserRef: {},
  loading: true,
  signup: (email, password) =>
    auth.createUserWithEmailAndPassword(email, password),
  login: (email, password) => auth.signInWithEmailAndPassword(email, password),
  logout: () => auth.signOut(),
  setCurrentUser: (user) => set((state) => ({ ...state, currentUser: user })),
  setAuthUserRef: (ref) => set((state) => ({ ...state, authUserRef: ref })),
  setLoading: () => set((state) => ({ ...state, loading: false })),
}));
