// To understand https://medium.com/@bgskinner3/uniswap-v3s-brooklyn-blend-bridging-the-gap-between-swap-math-and-tech-e8aff317cb9c

import { ethers, Logger } from '../deps.ts';
import { Helper } from './helper.ts';

export class PricingExplorer {

    public static contractAddress = "0xAA8211aCDa6DCd655FBf2Ec98a0230aC60142749"
    public static instance: PricingExplorer

    public static async getInstance(): Promise<PricingExplorer> {

        if (PricingExplorer.instance === undefined) {
            const abi = JSON.parse(Deno.readTextFileSync(`${Deno.cwd()}/src/uniswap-v3-pricing-explorer-abi.json`))
            const provider = new ethers.JsonRpcProvider(Helper.getProviderURL())
            const contract = new ethers.Contract(PricingExplorer.contractAddress, abi, await provider.getSigner())
            PricingExplorer.instance = new PricingExplorer(await Helper.getLogger(), provider, contract)
        }

        return PricingExplorer.instance
    }

    private logger: Logger
    private provider: any
    private contract: any

    public constructor(logger: Logger, provider: any, contract: any) {
        this.logger = logger
        this.provider = provider
        this.contract = contract
    }

    public async getLiquidity(token0: string, token1: string, fee: number) {
        const liquidity = await this.contract.getLiquidityFromPool(token0, token1, fee)
        this.logger.debug(`the liquidity for ${token0}/${token1} with fee ${fee} is ${liquidity}`)
        return liquidity
    }

    public async getSqrtPriceX96(token0: string, token1: string, fee: number) {
        const sqrtPriceX96 = await this.contract.getSqrtPriceX96FromPool(token0, token1, fee)
        this.logger.debug(`the sqrtPriceX96 for ${token0}/${token1} with fee ${fee} is ${sqrtPriceX96}`)
        return sqrtPriceX96
    }

    public async getAmount0(t1: string, liquidity: number, sqrtPriceX96: number) {
        let decimalst1 = await this.getDecimalsForAsset(t1)

        const amount0 = await this.contract.getAmount0(liquidity, sqrtPriceX96, decimalst1)
        this.logger.debug(`${decimalst1}, amount0 is ${amount0}`)
        return amount0
    }

    public async getAmount1(t0: string, liquidity: number, sqrtPriceX96: number) {
        let decimalst0 = await this.getDecimalsForAsset(t0)

        const amount1 = await this.contract.getAmount1(liquidity, sqrtPriceX96, decimalst0)
        this.logger.debug(`${decimalst0}, amount1 is ${amount1}`)
        return amount1
    }

    public async getPriceFromAmounts(t0: string, amount0: BigInt, amount1: BigInt, asset: string) {
        const price = await this.contract.getPriceFromAmounts(t0, amount0, amount1, asset)
        this.logger.debug(`the price for ${asset} is ${price}`)
        return price
    }

    public async getDecimalsForAsset(asset: string): Promise<number> {
        const erc20ABI = JSON.parse(Deno.readTextFileSync(`${Deno.cwd()}/src/simple-erc20-abi.json`))
        const simpleERC20Contract = new ethers.Contract(asset, erc20ABI, await this.provider.getSigner())
        return simpleERC20Contract.decimals()

    }
}
