import create from 'zustand';
import { auth } from '../firebase';

export const useAuth = create((set) => ({
  currentUser: {},
  currentUserRef: {},
  currentFbUser: {},
  loading: true,
  signup: (email, password) =>
    auth.createUserWithEmailAndPassword(email, password),
  login: (email, password) => auth.signInWithEmailAndPassword(email, password),
  logout: () => auth.signOut(),

  setCurrentUser: (user) => set((state) => ({ ...state, currentUser: user })),
  setCurrentUserRef: (ref) =>
    set((state) => ({ ...state, currentUserRef: ref })),
  setCurrentFbUser: (user) =>
    set((state) => ({ ...state, currentFbUser: user })),

  setLoading: () => set((state) => ({ ...state, loading: false })),
}));
