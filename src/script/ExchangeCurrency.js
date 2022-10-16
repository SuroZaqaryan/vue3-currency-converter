import {useStore} from "vuex";
import {ref, onMounted,  computed} from "vue";

export default {
    setup() {
        const store = useStore();

        let baseCountryCurrency = ref("RUB");
        let chardCode = ref("");
        let calculateCountryCurrencyValue = ref("");

        // ------Store-------

        const getCurrencies = computed(() => {
            return store.getters.getCurrencies
        })

        const getTimestamp = computed(() => {
            return store.getters.getTimestamp
        })

        const errorMessage = computed(() => {
            return store.getters.errorMessage
        })

        const exchangeableResult = computed(() => {
            return store.getters.exchangeableResult
        })

        const exchangeable = computed({
            get() {
                return store.state.exchangeable
            },
            set(value) {
                store.commit('UPDATE_EXCHANGEABLE', value)
                store.commit("VALIDATE_CURRENCY")
            },
        });

        const calculateCountryCurrency = computed({
            get() {
                return store.state.calculateCountryCurrency
            },
            set(value) {
                store.commit('UPDATE_CALCULATE_COUNTRY_CURRENCY', value)
            },
        });

        onMounted(() => {
            store.dispatch("fetchCurrencies");
        });

        function exchange() {
            store.commit("VALIDATE_CURRENCY")

            exchangeable.value = exchangeableResult.value;
            exchangeableResult.value = exchangeable.value;
        }

        function changeCalculationCurrency(e) {
            store.commit("VALIDATE_CURRENCY")

            calculateCountryCurrency.value = e.target.value;
            chardCode.value =
                e.target.options[e.target.options.selectedIndex].dataset.charcode;
            //calculate(exchangeable.value, calculateCountryCurrency.value);
        }

        // function currencyValidate() {
        //     errorMessage.value = calculateCountryCurrency.value === "Select Currency";
        // }

        return {
            changeCalculationCurrency,
            exchange,
            getCurrencies,
            getTimestamp,
            chardCode,
            errorMessage,
            exchangeable,
            baseCountryCurrency,
            calculateCountryCurrency,
            calculateCountryCurrencyValue,
            exchangeableResult,
        };
    },
};