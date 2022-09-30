import { defineStore } from "pinia";
export const useIndexStore = defineStore("index", {
  state: () => {
    return { count: 0 };
  },
});
