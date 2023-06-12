import { create } from 'zustand';

type User = { email: string; password: string };

type UserState = {
  // Store state
  user?: User;
};

type UserActions = {
  // Actions to update the state in store
  setUser: (user: User) => void;
};

const initialUserState: UserState = {
  // Define initial state of store
  user: undefined,
};

/**
 * Create a store with Zustand that contains the user state and actions to update the state.
 * @example
 * How to use the store in a component/page:
 * ```
 * const user = useUserStore((state) => state.user);
 * const setUser = useUserStore((state) => state.setUser);
 * // or
 * const { user, setUser } = useUserStore(
 *  (state) => ({ user: state.user, setUser: state.setUser }),
 *  shallow,
 * );
 * ```
 */
const useUserStore = create<UserState & UserActions>((set) => ({
  ...initialUserState,
  setUser: (user) => set({ user }),
}));

export default useUserStore;
