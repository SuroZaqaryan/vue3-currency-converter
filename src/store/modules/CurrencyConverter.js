export default {
    state: {
        currencies: [], // get all currencies
        timeStamp: "", // get and show timestamp
        exchangeable: "",  // currency value
        calculateCountryCurrency: "Select Currency", // country selection
        exchangeableResult: "", // end result display
        errorMessage: false,
    },

    getters: {
        getCurrencies(state) {
            return state.currencies
        },

        getTimestamp(state) {
            return state.timeStamp
        },

        exchangeableResult(state) {
            return state.exchangeableResult
        },

        errorMessage(state) {
            return state.errorMessage
        }
    },

    actions: {
        fetchCurrencies({commit}) {
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
            this.commit("CALCULATE", value)
        },

        // Select country
        UPDATE_CALCULATE_COUNTRY_CURRENCY(state, value) {
            state.calculateCountryCurrency = value;
        },

        // Currency conversion
        CALCULATE(state, exchangeable) {
            state.exchangeableResult = (exchangeable / state.calculateCountryCurrency).toFixed(2);
        },

        VALIDATE_CURRENCY(state) {
            state.errorMessage = state.calculateCountryCurrency === "Select Currency";
        }
    }
}