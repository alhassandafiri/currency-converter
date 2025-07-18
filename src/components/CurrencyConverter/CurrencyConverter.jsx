import { useEffect, useState } from 'react';

import { fetchMockConversion } from '../../api/mockApi';
import ConversionResult from "../ConversionResult/ConversionResult";
import CurrencyInput from "../CurrencyInput/CurrencyInput";
import SwapButton from "../SwapButton/SwapButton";
import styles from './CurrencyConverter.module.css';

const currenciesList = ['USD', 'GBP', 'EUR', 'CAD', 'AUD', 'JPY'];

function CurrencyConverter() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency]  = useState('USD');
  const [toCurrency, setToCurrency] = useState('GBP');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);

    setAmount(convertedAmount);
    setConvertedAmount(amount);
  }

  useEffect(() => {
    if (fromCurrency === toCurrency) {
      setConvertedAmount(amount);
      setExchangeRate(1);
      return;
    }

    const fetchConversion = async () => {
      if (!amount) {
        setConvertedAmount(0);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetchMockConversion(fromCurrency, toCurrency);

        if (response.success) {
          const rate = response.rate;
          setExchangeRate(rate);
          setConvertedAmount((amount * rate).toFixed(4));
        } else {
          console.error(response.error);
          setConvertedAmount(null);
        }


      } catch (error) {
        console.error('Error fetching mock conversion rate:', error);
        setConvertedAmount(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchConversion();
  }, [amount, fromCurrency, toCurrency]);


  return(
    <div className={styles.converterContainer}>
      <main className={styles.converterBody}>
        <div className={styles.inputsRow}>
          <CurrencyInput 
          label='Amount'
          currencies={currenciesList}
          selectedCurrency={fromCurrency}
          onCurrencyChange={setFromCurrency}
          amount={amount}
          onAmountChange={e => setAmount(e.target.value)}
          />

          <SwapButton 
          onClick={handleSwapCurrencies}
          />

          <CurrencyInput 
          label='Converted to'
          currencies={currenciesList}
          selectedCurrency={toCurrency}
          onCurrencyChange={setToCurrency}
          amount={convertedAmount === null ? '' : convertedAmount}
          onAmountChange={() => {}}
          isAmountDisabled={true}
          />
        </div>

        <ConversionResult 
        isLoading={isLoading}
        amount={amount}
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
        convertedAmount={convertedAmount}
        exchangeRate={exchangeRate}
        />
      </main>
    </div>
  );
}



export default CurrencyConverter;