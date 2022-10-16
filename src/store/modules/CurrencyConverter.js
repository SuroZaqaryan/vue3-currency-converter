export default {
    state: {
        currencies: [], // get all currencies
        timeStamp: "", // get and show timestamp
        exchangeable: "",  // currency value
        calculateCountryCurrency: "Select Currency", // country selection
        exchangeableResult: "333", // end result display
    },

    getters: {
        getCurrencies(state) {
            return state.currencies
        },

        getTimestamp(state) {
            return state.timeStamp
        },

        // exchangeableResult(state) {
        //     return state.exchangeableResult
        // },
    },

    actions: {
        async fetchCurrencies({commit}) {
            fetch('https://www.cbr-xml-daily.ru/daily_json.js').then(res => {
                return res.json()
            }).then(data => {
                commit('SET_TIMESTAMP', data.Timestamp)
                commit('SET_CURRENCIES', data.Valute)
            })
        }
    },

    mutations: {
        // Getting countries
        SET_CURRENCIES(state, currencies) {
            state.currencies = currencies
        },

        // Getting timestamp
        SET_TIMESTAMP(state, Timestamp) {
            state.timeStamp = Timestamp;
        },

        // Currency input fields
        UPDATE_EXCHANGEABLE(state, value) {
            // this.commit("CALCULATE", value, state.calculateCountryCurrency)
            this.commit("CALCULATE", value)
        },

        // Select country
        UPDATE_CALCULATE_COUNTRY_CURRENCY(state, value) {
            state.calculateCountryCurrency = value;
        },

        CALCULATE(state, exchangeable) {

            console.log('exchangeable', exchangeable);
            console.log('calculateCountryCurrency', state.calculateCountryCurrency);

            state.exchangeableResult = (exchangeable / state.calculateCountryCurrency).toFixed(2);

            console.log('4444', state.exchangeableResult)
        }
    }
}