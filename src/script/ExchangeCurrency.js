import {useStore} from "vuex";
import {ref, onMounted, watch, computed} from "vue";

export default {
    setup() {
        const store = useStore();

        let baseCountryCurrency = ref("RUB");
        let chardCode = ref("");
        let calculateCountryCurrencyValue = ref("");
        let timeStamp = ref("");
        const errorMessage = ref(false);


        // ------Store-------

        const exchangeableResult = computed(() => {
            return store.state.exchangeableResult
        })

        const getCurrencies = computed(() => {
            return store.getters.getCurrencies
        })

        const getTimestamp = computed(() => {
            return store.getters.getTimestamp
        })

        const exchangeable = computed({
            get() {
                return store.state.exchangeable
            },
            set(value) {
                store.commit('UPDATE_EXCHANGEABLE', value)
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


        // const exchangeableResult = computed({
        //     get() {
        //         return store.state.exchangeableResult
        //     },
        //     set(value) {
        //         store.commit('UPDATE_EXCHANGEABLE_RESULT', value)
        //     },
        // });

        // --------------------

        onMounted(() => {
            store.dispatch("fetchCurrencies");
        });

        watch(exchangeable, () => {
            currencyValidate();
            //calculate(exchangeable.value, calculateCountryCurrency.value);
        });

        function exchange() {
            console.log('fff', exchangeableResult)
            currencyValidate();
            exchangeable.value = exchangeableResult.value;
            exchangeableResult.value = exchangeable.value;
        }

        function changeCalculationCurrency(e) {
            currencyValidate();
            calculateCountryCurrency.value = e.target.value;
            chardCode.value =
                e.target.options[e.target.options.selectedIndex].dataset.charcode;


            // store.commit('CALCULATE', exchangeable, calculateCountryCurrency)

            //calculate(exchangeable.value, calculateCountryCurrency.value);
        }

        function currencyValidate() {
            errorMessage.value = calculateCountryCurrency.value === "Select Currency";
        }

        // function calculate(exchangeable, countryCurrency) {
        //     exchangeableResult.value = (exchangeable / countryCurrency).toFixed(2);
        // }

        return {
            changeCalculationCurrency,
            exchange,
            getCurrencies,
            getTimestamp,
            chardCode,
            errorMessage,
            timeStamp,
            exchangeable,
            baseCountryCurrency,
            calculateCountryCurrency,
            calculateCountryCurrencyValue,
            exchangeableResult,
        };
    },
};

// import {ref, onMounted, watch} from 'vue'

// export default {
//     setup() {
//         let exchangeable = ref('')
//         let exchangeableResult = ref('')
//         let baseCountryCurrency = ref("RUB")
//         let chardCode = ref('')
//         let calculateCountryCurrency = ref("Select Currency")
//         let calculateCountryCurrencyValue = ref("")
//         const currencies = ref([])
//         let timeStamp = ref("")
//         const errorMessage = ref(false)

//         onMounted(() => {
//             getCurrencies()
//         })

//         watch(exchangeable, () => {
//             currencyValidate();
//             calculate(exchangeable.value, calculateCountryCurrency.value);
//         })

//         function exchange() {
//             currencyValidate();
//             exchangeable.value = exchangeableResult.value;
//             exchangeableResult.value = exchangeable.value;
//         }

//         function changeCalculationCurrency(e) {
//             currencyValidate();
//             calculateCountryCurrency.value = e.target.value;
//             //console.log(e.target.options[e.target.options.selectedIndex].dataset.country)
//             chardCode.value = e.target.options[e.target.options.selectedIndex].dataset.charcode;
//             calculate(exchangeable.value, calculateCountryCurrency.value);
//         }

//         function getCurrencies() {
//             fetch("https://www.cbr-xml-daily.ru/daily_json.js")
//                 .then((res) => {
//                     return res.json();
//                 }).then((data) => {
//                 currencies.value = data.Valute;
//                 timeStamp.value = data.Timestamp;
//                 console.log(currencies.value)
//             });
//         }

//         function currencyValidate() {
//             errorMessage.value = calculateCountryCurrency.value === 'Select Currency';
//         }

//         function calculate(exchangeable, countryCurrency) {
//             exchangeableResult.value = (exchangeable / countryCurrency).toFixed((2))
//         }

//         return {
//             changeCalculationCurrency,
//             exchange,
//             chardCode,
//             errorMessage,
//             timeStamp,
//             exchangeable,
//             currencies,
//             baseCountryCurrency,
//             calculateCountryCurrency,
//             calculateCountryCurrencyValue,
//             exchangeableResult
//         }
//     },
// };
