const FakeUSDC = artifacts.require('FakeUSDC')

module.exports = async function(deployer, network, accounts) {
  // Deploy fake USDC token for testing
  await deployer.deploy(FakeUSDC)
  const fakeUSDC = await FakeUSDC.deployed()

  // Deploy Liquidity Pool
  await deployer.deploy(LiquidityPool)
  const liquidityPool = await LiquidityPool.deployed()

}