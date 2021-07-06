pragma solidity ^0.6.11;

import "./MockUSDC.sol";

contract LiquidityPool {
    string public name = "LiquidityPool";
    uint public totalStaked;
    MockUSDC public mockUSDC;

    uint256 public totalStakedUSDC; // Total USDC Liquidity tokens locked

    struct Staker {
        uint256 totalDeposited;
        uint256 totalYield;
        uint256[2][] totalDeposits;                 // A 2d array of total deposits [[pairCode, batchNumber], [[pairCode, batchNumber], ...]]
        uint256[][200] initialDepositAmounts;
        uint256[][200] interestEarnedDeposits;      // A 2d array showing the locked amount of Liquidity tokens in each batch of each Pair Pool
        uint256[][200] totalValue;                  // A 2d array showing the locked amount of Liquidity tokens in each batch of each Pair Pool, adjusted to LP bubbling factor
    }

    mapping(address => Staker) internal stakers;

    function stakeTokens(uint _amount) public {
        // Require amount greater than 0
        require(_amount > 0, "amount cannot be 0");

        // Trasnfer Mock Dai tokens to this contract for staking
        daiToken.transferFrom(msg.sender, address(this), _amount);

        // Update staking balance
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

        // Add user to stakers array *only* if they haven't staked already
        if(!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        // Update staking status
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

    // Unstaking Tokens (Withdraw)
    function unstakeTokens() public {
        // Fetch staking balance
        uint balance = stakingBalance[msg.sender];

        // Require amount greater than 0
        require(balance > 0, "staking balance cannot be 0");

        // Transfer Mock Dai tokens to this contract for staking
        daiToken.transfer(msg.sender, balance);

        // Reset staking balance
        stakingBalance[msg.sender] = 0;

        // Update staking status
        isStaking[msg.sender] = false;
    }

    // Issuing Tokens
    function issueTokens() public {
        // Only owner can call this function
        require(msg.sender == owner, "caller must be the owner");

        // Issue tokens to all stakers
        for (uint i=0; i<stakers.length; i++) {
            address recipient = stakers[i];
            uint balance = stakingBalance[recipient];
            if(balance > 0) {
                dappToken.transfer(recipient, balance);
            }
        }
    }
}