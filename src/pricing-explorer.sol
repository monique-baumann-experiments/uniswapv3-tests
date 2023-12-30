// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/v4.9.4/contracts/utils/math/Math.sol";
import "https://github.com/Uniswap/v3-core/blob/v1.0.0/contracts/libraries/FixedPoint96.sol";
import "https://github.com/Uniswap/v3-core/blob/v1.0.0/contracts/interfaces/IUniswapV3Pool.sol";
import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/v4.9.4/contracts/token/ERC20/ERC20.sol";
import "https://github.com/Uniswap/v3-core/blob/v1.0.0/contracts/interfaces/IUniswapV3Factory.sol";


contract UniswapPricingExplorer {

    function getAmount0(uint256 liquidity, uint256 sqrtPriceX96, uint256 t0Decimals, uint256 t1Decimals ) public  pure returns(uint256) {
        return Math.mulDiv(liquidity, FixedPoint96.Q96, sqrtPriceX96);
    }    

    function getAmount1(uint256 liquidity, uint256 sqrtPriceX96, uint256 t0Decimals, uint256 t1Decimals) public pure returns(uint256) {
        return Math.mulDiv(liquidity, sqrtPriceX96, FixedPoint96.Q96);
    }    

    function getPriceFromAmounts(uint256 t0Decimals, uint256 t1Decimals, address t0, uint256 amount0, uint256 amount1, address asset) public pure returns(uint256) {
        if (t0 == asset) {
            return Math.mulDiv(amount1, 10**t0Decimals, amount0);
        } else {
            return Math.mulDiv(amount0, 10**t1Decimals, amount1);
        }
    }

    function getLiquidityFromPool(address token0, address token1, uint24 fee) public view returns(uint256) {
        address factory   = 0x1F98431c8aD98523631AE4a59f267346ea31F984;
        IUniswapV3Pool pool = IUniswapV3Pool(IUniswapV3Factory(factory).getPool(token0, token1, fee));
        return pool.liquidity();
    }

    function getSqrtPriceX96FromPool(address token0, address token1, uint24 fee) public view returns(uint256) {
        address factory   = 0x1F98431c8aD98523631AE4a59f267346ea31F984;
        IUniswapV3Pool pool = IUniswapV3Pool(IUniswapV3Factory(factory).getPool(token0, token1, fee));
        (uint160 sqrtPriceX96, , , , , , ) = pool.slot0();
        return sqrtPriceX96;
    }

}