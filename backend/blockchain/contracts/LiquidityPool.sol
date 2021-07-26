pragma solidity ^0.6.11;

import "./MockUSDC.sol";

contract LiquidityPool {
    string public name = "LiquidityPool";
    address public owner;
    MockUSDC public mockUSDC;
    uint256 public totalStakedUSDC; // Total USDC Liquidity tokens locked
    uint256 public monthlyInterest; 

    struct Lender {
        uint256 stakingBalance;
        uint256 interestAccrued;
        bool isStaking;
    }

    mapping(address => Lender) public lenders;
    address[] lendersAddresses;

    function stakeUSDC(uint _amount) public {
        // Require amount greater than 0
        require(_amount > 0, "amount cannot be 0");

        // Transfer MockUSDC tokens to this contract for staking
        mockUSDC.transferFrom(msg.sender, address(this), _amount);

        // Update total liquidity balance
        totalStakedUSDC = totalStakedUSDC + _amount;

        // Update staking balance
        lenders[msg.sender].stakingBalance = lenders[msg.sender].stakingBalance + _amount;
        
        //Update staking status and add address to lendersAddresses
        if (!lenders[msg.sender].isStaking) {
            lenders[msg.sender].isStaking = true;
            lendersAddresses.push[msg.sender]
        }
    }

    // Unstaking USDC (Withdraw)
    function unstakeUSDC(uint _amount) public {
        // Fetch staking balance
        uint256 balance = lenders[msg.sender].stakingBalance;

        // Require amount greater than 0
        require(balance > 0, "staking balance cannot be 0");
        require(_amount <= balance, "unstaking more than your balance");

        // Transfer MockUSDC tokens back to Circle account
        mockUSDC.transfer(msg.sender, _amount);

        // Update total liquidity balance
        totalStakedUSDC = totalStakedUSDC - _amount;

        // Update staking balance
        lenders[msg.sender].stakingBalance = lenders[msg.sender].stakingBalance - _amount;
    }

    // Script issues interest on a monthly basis according to proportion staked compared to pool
    function issueInterest() public {
        // Only the owner can call this function
        require(msg.sender == owner, "caller must be the owner");

        // Issue interest to all lenders
        for (uint i=0; i<lendersAddresses.length; i++) {
            address recipient = lendersAddresses[i];
            uint256 balance = lenders[recipient].stakingBalance;
            uint256 shareOfInterest = balance/totalStakedUSDC;
            uint256 interestOwed = shareOfInterest * monthlyInterest;
            lenders[recipient].stakingBalance = interestOwed + balance;
            lenders[recipient].interestAccrued = interestOwed + lenders[recipient].interestAccrued;
        }
        // Add accrued interest for the month to total pool
        totalStakedUSDC = totalStakedUSDC + monthlyInterest;
        // Reset monthly interest to 0
        monthlyInterest = 0;
    }

    // Issuing USDC Loan
    function issueLoan(address _account, uint _amount) public {
        // Transfer MockUSDC tokens to corresponding Circle account
        mockUSDC.transfer(_account, _amount);

        // Update total liquidity balance
        totalStakedUSDC = totalStakedUSDC - _amount;
    }

    // Recieving payment from borrower
    function recievePayment(address _account, uint _amount) public {
        // Transfer MockUSDC tokens to corresponding Circle account
        mockUSDC.transfer(_account, _amount);

        // Update total liquidity balance
        totalStakedUSDC = totalStakedUSDC - _amount;
    }
}