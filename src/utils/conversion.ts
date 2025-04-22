export const convertUsdToPhp = (usdAmount: number, exchangeRate = 56): string => {
  console.log("USD: ", usdAmount);

  // Apply /100 to convert cents to dollars before converting to PHP
  const fixedUsdAmount: number = parseFloat((usdAmount / 100).toFixed(2));

  const phpAmount = fixedUsdAmount * exchangeRate;

  console.log("PHP: ", phpAmount);

  return `₱${phpAmount.toFixed(2)}`;
};
