// I buy and sell https://FreedomCash.org 
// import { PricingExplorer } from "./mod.ts"

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