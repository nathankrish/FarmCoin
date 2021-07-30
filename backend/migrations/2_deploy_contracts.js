const MockUSDC = artifacts.require('MockUSDC')
const LiquidityPool = artifacts.requre('LiquidityPool')

module.exports = async function(deployer, network, accounts) {
  // Deploy fake USDC token for testing
  await deployer.deploy(MockUSDC)
  const mockUSDC = await MockUSDC.deployed()

  // Deploy Liquidity Pool
  await deployer.deploy(LiquidityPool)
  const liquidityPool = await LiquidityPool.deployed()

}