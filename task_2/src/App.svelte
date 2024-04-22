<script>
    import { onMount } from 'svelte';
    let currencies = [];
    let fromCurrency = '';
    let toCurrency = '';
    let amount = '';
    let result = '';

    onMount(async () => {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await response.json();
        currencies = Object.keys(data.rates);
        fromCurrency = currencies[0];
        toCurrency = currencies[1];
    });

    async function convertCurrency() {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        const data = await response.json();
        const exchangeRate = data.rates[toCurrency];
        result = (parseFloat(amount) * exchangeRate).toFixed(2);
    }

    function handleAmountInput(event) {
        amount = event.target.value;
        convertCurrency();
    }

    function handleFromCurrencyChange(event) {
        fromCurrency = event.target.value;
        convertCurrency();
    }

    function handleToCurrencyChange(event) {
        toCurrency = event.target.value;
        convertCurrency();
    }
</script>

<main>
    <h1>Currency Converter</h1>
    <input type="number" bind:value={amount} on:input={handleAmountInput} placeholder="Amount">
    <select bind:value={fromCurrency} on:change={handleFromCurrencyChange}>
        {#each currencies as currency}
            <option value={currency}>{currency}</option>
        {/each}
    </select>
    <select bind:value={toCurrency} on:change={handleToCurrencyChange}>
        {#each currencies as currency}
            <option value={currency}>{currency}</option>
        {/each}
    </select>
    <button on:click={convertCurrency}>Convert</button>
    {#if result}
        <p>{amount} {fromCurrency} = {result} {toCurrency}</p>
    {/if}
</main>

<style>
    main {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }

    input, select, button {
        margin-bottom: 10px;
        width: 100%;
        padding: 8px;
    }

    button {
        background-color: #4CAF50;
        color: white;
        border: none;
        cursor: pointer;
    }

    button:hover {
        opacity: 0.8;
    }
</style>
