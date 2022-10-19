<template>
  <div class="wrapper">
    <div class="title">
      <h2>Currency Converter</h2>
      <small>{{ timeStamp }}</small>
    </div>
    <div class="currency">
      <div class="currency__select">
        <span>From</span>
        <select v-model="baseCountryCurrency" disabled>
          <option value="RUB" selected>
            RUB - Ruble
          </option>
        </select>

        <div class="currency__rate exchangeable">
          <p>RUB</p>
          <input type="number" v-model="exchangeable" placeholder="Amount">
        </div>
      </div>

      <div class="currency__exchange">
        <button @click="exchange">
          <img src="../assets/exchange.svg" alt="exchange">
        </button>
      </div>

      <div class="currency__select" :class="{'error': errorMessage}">

        <div class="currency__error">
          <span>To</span>
          <span v-if="errorMessage" class="error-message">Select Country</span>
        </div>

        <select v-model="calculateCountryCurrency" @change="changeCalculationCurrency($event)">
          <option selected disabled hidden>Select Currency</option>
          <option v-for="currency in currencies" :key="currency.ID" :value="currency.Value"
            :data-country="currency.Name" :data-charcode="currency.CharCode">
            {{ currency.Name }}
          </option>
        </select>

        <div class="currency__rate">
          <p>{{chardCode}}</p>

          <input type="number" v-model="exchangeableResult">
        </div>
      </div>
    </div>
  </div>
</template>

<script src="../script/ExchangeCurrency.js"></script>
<style src="../css/style.css">

</style>

