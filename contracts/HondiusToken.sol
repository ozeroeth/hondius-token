// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract HondiusToken is ERC20, Ownable {
    uint256 public constant TOTAL_SUPPLY = 69_000_000_000 * 10 ** 18;
    uint256 public constant TOKENS_PER_SLOT = 690_000_000 * 10 ** 18;
    uint256 public constant MINT_PRICE_PER_SLOT = 0.001 ether;
    uint256 public constant MAX_SLOTS_PER_WALLET = 10;

    uint256 public constant DEV_ALLOCATION = 3_450_000_000 * 10 ** 18;
    uint256 public constant LP_RESERVE_ALLOCATION = 33_810_000_000 * 10 ** 18;
    uint256 public constant PUBLIC_MINT_SUPPLY = TOTAL_SUPPLY - DEV_ALLOCATION - LP_RESERVE_ALLOCATION;

    address public constant LP_RESERVE = 0xd3007607d24Ef0a79F9513b41bE293b6CDBb161f;
    address public constant DEV = 0xd3007607d24Ef0a79F9513b41bE293b6CDBb161f;

    uint256 private _totalMinted;
    mapping(address => uint256) private _slotsUsed;

    constructor() ERC20("Hondius", "HONDIUS") Ownable(msg.sender) {
        _mint(DEV, DEV_ALLOCATION);
        _mint(LP_RESERVE, LP_RESERVE_ALLOCATION);
    }

    function mint(uint256 slotCount) external payable {
        require(slotCount > 0, "Must mint at least 1 slot");
        require(
            _slotsUsed[msg.sender] + slotCount <= MAX_SLOTS_PER_WALLET,
            "Exceeds max slots per wallet"
        );
        require(
            _totalMinted + (slotCount * TOKENS_PER_SLOT) <= PUBLIC_MINT_SUPPLY,
            "Exceeds public mint supply"
        );
        require(
            msg.value == slotCount * MINT_PRICE_PER_SLOT,
            "Incorrect ETH amount"
        );

        _slotsUsed[msg.sender] += slotCount;
        _totalMinted += slotCount * TOKENS_PER_SLOT;

        _mint(msg.sender, slotCount * TOKENS_PER_SLOT);

        (bool sent, ) = LP_RESERVE.call{value: msg.value}("");
        require(sent, "ETH transfer failed");
    }

    function totalMinted() external view returns (uint256) {
        return _totalMinted;
    }

    function slotsUsed(address account) external view returns (uint256) {
        return _slotsUsed[account];
    }

    function slotsRemaining(address account) external view returns (uint256) {
        return MAX_SLOTS_PER_WALLET - _slotsUsed[account];
    }

    function publicMintRemaining() external view returns (uint256) {
        return PUBLIC_MINT_SUPPLY - _totalMinted;
    }

    function withdrawETH() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No ETH to withdraw");
        (bool sent, ) = owner().call{value: balance}("");
        require(sent, "ETH transfer failed");
    }
}
