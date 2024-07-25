import { create, State } from "zustand";

type StateProps = {
  selected: number;
  setSelected: (n: number) => void;
};

const useBottomNavSlice = create<StateProps>((set) => ({
  selected: 0,
  setSelected: (newValue: number) => set(() => ({ selected: newValue })),
}));

export { useBottomNavSlice };
