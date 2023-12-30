# UniswapV3 Tests

🦕 [module](https://deno.land/x/uniswap_v3_tests) to test uniswap v3 features because we utilize uniswap v3 for Freedom Cash Investment Bets

## Usage Example

```ts

import { PricingExplorer } from "https://deno.land/x/uniswap_v3_tests/mod.ts"

const explorer = await PricingExplorer.getInstance()

let t0 = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48" // 6 decimals government fraud
let t1 = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2" // weth
let requestingPriceFor = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"

const liquidity = await explorer.getLiquidity(t0, t1, 3000)
const sqrtPriceX96 = await explorer.getSqrtPriceX96(t0, t1, 3000)
const amount0 = (await explorer.getAmount0(t1, liquidity, sqrtPriceX96)) 
const amount1 = (await explorer.getAmount1(t0, liquidity, sqrtPriceX96)) 

let price = await explorer.getPriceFromAmounts(t0, amount0, amount1, requestingPriceFor)

console.log(`price: ${price}`)

```

## Execute Usage Example
```sh
deno run https://deno.land/x/uniswap_v3_tests/usage-example.ts
```

## Donations
We are already free. If you want to donate, you might consider donating to the [otherparty.co.uk](https://www.otherparty.co.uk/donate-crypto-the-other-party) to ensure people do not need to donate to victims but rather donate successfully to problem solvers.  
  
![direct-democracy](https://github.com/michael-spengler/sleep/assets/145258627/fe97b7da-62b4-4cf6-9be0-7b03b2f3095a)  