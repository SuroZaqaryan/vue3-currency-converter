import { ref, onMounted, watch } from 'vue'

export default {
    setup() {
        let exchangeable = ref('')
        let exchangeableResult = ref('')
        let baseCountryCurrency = ref("RUB")
        let chardCode = ref('')
        let calculateCountryCurrency = ref("Select Currency")
        let calculateCountryCurrencyValue = ref("")
        const currencies = ref([])
        let timeStamp = ref("")
        const errorMessage = ref(false)

        onMounted(() => {
            getCurrencies()
        })

        watch(exchangeable, () => {
            currencyValidate();
            calculate(exchangeable.value, calculateCountryCurrency.value);
        })

        function exchange() {
            currencyValidate();
            exchangeable.value = exchangeableResult.value;
            exchangeableResult.value = exchangeable.value;
        }

        function changeCalculationCurrency(e) {
            currencyValidate();
            calculateCountryCurrency.value = e.target.value;
            //console.log(e.target.options[e.target.options.selectedIndex].dataset.country)
            chardCode.value = e.target.options[e.target.options.selectedIndex].dataset.charcode;
            calculate(exchangeable.value, calculateCountryCurrency.value);
        }

        function getCurrencies() {
            fetch("https://www.cbr-xml-daily.ru/daily_json.js")
                .then((res) => {
                    return res.json();
                }).then((data) => {
                    console.log(data);
                    currencies.value = data.Valute;
                    timeStamp.value = data.Timestamp;
                });
        }

        function currencyValidate() {
            errorMessage.value = calculateCountryCurrency.value === 'Select Currency';
        }

        function calculate(exchangeable, countryCurrency) {
            exchangeableResult.value = (exchangeable / countryCurrency).toFixed((2))
        }

        return {
            changeCalculationCurrency,
            exchange,
            chardCode,
            errorMessage,
            timeStamp,
            exchangeable,
            currencies,
            baseCountryCurrency,
            calculateCountryCurrency,
            calculateCountryCurrencyValue,
            exchangeableResult
        }
    },
};