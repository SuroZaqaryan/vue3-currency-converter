import { createStore } from 'vuex'
import CurrencyConverter from "./modules/CurrencyConverter";

export const store = createStore({
  modules: {
    CurrencyConverter
  }
})