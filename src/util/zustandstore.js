import { create } from 'zustand'

const useStore = create(set => ({
    data : [],
    setData: (value) => set({data: value}),
  }));

  export default useStore;