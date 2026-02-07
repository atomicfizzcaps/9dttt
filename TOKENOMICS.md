# FIZZ Token Tokenomics - Fixed Supply Treasury Model

## 🪙 Token Overview

**Token Name**: FIZZ Token (Atomic Fizz Caps)  
**Total Supply**: 10,000,000 FIZZ (FIXED - pre-minted at launch)  
**Decimals**: 6  
**Distribution Model**: Treasury-Based (NO MINTING)  
**Chains**: XRP Ledger, Solana, Ethereum

---

## 🏦 Treasury Distribution Model

### Core Principle
**All 10 million FIZZ tokens are pre-minted at launch and held in a treasury wallet.**

NO additional tokens will EVER be created. The treasury DISTRIBUTES tokens to players - it does NOT mint new ones.

### How It Works

```
Total Supply = 10,000,000 FIZZ (fixed forever)
Treasury Wallet = Holds all tokens
Distribution = Treasury SENDS tokens to players
```

**NOT burn-and-mint!** Instead:
1. **Treasury Holds**: All tokens pre-minted and secured
2. **Players Earn**: In-game rewards (virtual CAPS)
3. **Redemption**: Players claim real FIZZ from treasury
4. **Multi-Chain**: Treasury distributes on each chain

---

## 📊 Initial Distribution Strategy

### Total Supply: 10,000,000 FIZZ (Fixed)

```
Treasury Reserve:      4,000,000 FIZZ (40%)
├─ Gaming Rewards Pool
├─ Airdrop Campaigns
├─ Community Events
└─ Future Distribution

Gaming Rewards:        2,000,000 FIZZ (20%)
├─ Crypto Quest rewards
├─ Pong rewards
├─ Backgammon rewards
└─ All other games

Liquidity Pools:       1,500,000 FIZZ (15%)
├─ DEX liquidity
├─ Bridge liquidity
└─ Market making

Community/Marketing:   1,000,000 FIZZ (10%)
├─ Airdrops
├─ Promotions
└─ Partnerships

Team & Development:    1,000,000 FIZZ (10%)
├─ Core team (vested)
├─ Advisors
└─ Development fund

Early Supporters:        500,000 FIZZ (5%)
├─ Beta testers
├─ Early backers
└─ Initial liquidity
```

---

## 🎮 Two-Tier System

### 1. IN-GAME CAPS (Virtual Currency)

**What they are:**
- Server-side bookkeeping
- Virtual game currency
- NOT blockchain tokens
- Track gameplay progress

**How players earn:**
- Complete quests → Earn CAPS
- Win battles → Earn CAPS
- Discover locations → Earn CAPS
- Trade with NPCs → Earn CAPS

**Redis storage:**
```javascript
player:wallet:profile → { caps: 5000, ... }
```

### 2. REAL FIZZ TOKENS (Blockchain Assets)

**What they are:**
- Actual SPL tokens on Solana
- Real cryptocurrency
- Blockchain verified
- Can be traded/sold

**How players get them:**
- Redeem in-game CAPS for FIZZ
- Treasury sends tokens to player wallet
- Airdrop campaigns
- Special events

**Redemption example:**
```javascript
// Player has 1000 in-game CAPS
// Redeems for FIZZ tokens
Treasury sends: 100 FIZZ → Player wallet
In-game CAPS: 1000 → 0 (consumed)
```

---

## 🌉 Multi-Chain Distribution

### Lock-and-Unlock Bridge (NOT Burn-and-Mint!)

**XRP Treasury:** Holds X FIZZ  
**Solana Treasury:** Holds Y FIZZ  
**Ethereum Treasury:** Holds Z FIZZ  

**Total:** X + Y + Z = 10,000,000 FIZZ ✅

### Bridge Operations

**User bridges 100 FIZZ from Solana to Ethereum:**

1. **Lock** on Solana:
   - User sends 100 FIZZ to Solana treasury
   - Tokens LOCKED (not burned)
   - Solana treasury: Y + 100

2. **Unlock** on Ethereum:
   - Ethereum treasury sends 100 FIZZ to user
   - Tokens UNLOCKED (not minted)
   - Ethereum treasury: Z - 100

3. **Result:**
   - Total supply: Still 10M ✅
   - User has tokens on Ethereum
   - Treasuries balanced

**Example Flow:**
```
Initial State:
├─ XRP Treasury:      5,000,000 FIZZ
├─ Solana Treasury:   3,000,000 FIZZ
├─ Ethereum Treasury: 2,000,000 FIZZ
└─ Total:            10,000,000 FIZZ ✅

User bridges 500K from Solana to XRP:
├─ XRP Treasury:      5,500,000 FIZZ (+500K)
├─ Solana Treasury:   2,500,000 FIZZ (-500K)
├─ Ethereum Treasury: 2,000,000 FIZZ (unchanged)
└─ Total:            10,000,000 FIZZ ✅
```

---

## 💰 Bridge Fees & Treasury

**Fee Structure**: 1% per bridge transfer

**Fee Collection:**
- User bridges 1,000 FIZZ
- Fee: 10 FIZZ (1%)
- User receives: 990 FIZZ
- **Fee goes to treasury** (not burned!)

**Treasury grows from:**
- Bridge fees
- Trading fees (from Fizz.fun)
- Unclaimed redemptions
- Expired reward pools

---

## 🎮 Gaming Integration

### Reward Distribution

**Players earn IN-GAME CAPS** for gameplay:

**Crypto Quest:**
- 100 points = 1 in-game CAP
- Max 100 CAPS per game
- Redeem 10 CAPS = 1 FIZZ from treasury

**Pong:**
- 50 points = 1 in-game CAP
- Max 50 CAPS per game
- Redeem 10 CAPS = 1 FIZZ from treasury

**Backgammon:**
- 75 points = 1 in-game CAP
- Max 75 CAPS per game
- Redeem 10 CAPS = 1 FIZZ from treasury

### Redemption Process

```javascript
// Player gameplay
Play Crypto Quest → Score 1000 points
Earn → 10 in-game CAPS

// Player redemption
Request: Redeem 10 CAPS for FIZZ
Backend: Verify CAPS balance
Treasury: Send 1 FIZZ to player wallet
Update: Player CAPS - 10, FIZZ balance + 1
```

---

## 🔒 Security & Supply Verification

### Supply Monitoring

All treasuries monitored:
```javascript
const totalSupply = 
    await getXRPTreasuryBalance() + 
    await getSolanaTreasuryBalance() + 
    await getEthereumTreasuryBalance();

// Should always equal initial mint
assert(totalSupply === 10_000_000, 'Supply mismatch!');
```

### Audit Trail

Every distribution recorded:
- Treasury transaction hash
- Recipient address
- Amount sent
- Timestamp
- Reason (redemption, airdrop, reward)

### Treasury Security

**Multi-Sig Wallet:**
- Requires 3 of 5 signatures
- Time-locked withdrawals
- Rate limits on distributions
- Emergency pause functionality

---

## 📈 Supply Tracking Dashboard

### Real-Time Monitoring

Track distribution at:
```
https://atomicfizzcaps.xyz/supply
```

**Displays:**
```
XRP Treasury:       5,000,000 FIZZ (50%)
Solana Treasury:    3,000,000 FIZZ (30%)
Ethereum Treasury:  2,000,000 FIZZ (20%)
──────────────────────────────────────
Total Supply:      10,000,000 FIZZ ✅

Distributed:        3,500,000 FIZZ (35%)
In Treasuries:      6,500,000 FIZZ (65%)
```

### API Endpoints

```javascript
// Get total supply (always 10M)
GET /api/token/total-supply
Response: { 
  total: "10000000",
  distributed: "3500000",
  inTreasury: "6500000"
}

// Get treasury balances per chain
GET /api/token/treasuries
Response: {
  xrp: "5000000",
  solana: "3000000", 
  ethereum: "2000000"
}

// Get user balance (all chains)
GET /api/token/balance/:address
Response: {
  inGameCaps: "100",
  fizzTokens: {
    xrp: "50",
    solana: "30",
    ethereum: "20"
  }
}
```

---

## 🚀 Deployment Checklist

### XRP Testnet Token
- [x] Deploy FIZZ token with 10M supply
- [x] Set up treasury wallet
- [x] Lock entire supply in treasury
- [x] Test distribution mechanics

### Solana Devnet Token
- [ ] Deploy SPL token (10M supply)
- [ ] Set up treasury wallet
- [ ] Disable minting authority
- [ ] Test distribution

### Ethereum Sepolia Token
- [ ] Deploy ERC20 (10M supply)
- [ ] Set up treasury wallet
- [ ] Revoke minter role
- [ ] Verify on Etherscan

### Bridge Infrastructure
- [ ] Deploy lock/unlock contracts
- [ ] Set up treasury on each chain
- [ ] Test cross-chain transfers
- [ ] Enable supply monitoring

---

## 📝 Technical Specifications

### XRP Ledger
```json
{
  "currency": "FIZZ",
  "issuer": "rXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "totalSupply": "10000000",
  "decimals": 6,
  "mintingDisabled": true
}
```

### Solana SPL Token
```rust
pub struct FizzToken {
    pub mint: Pubkey,
    pub decimals: u8,         // 6
    pub supply: u64,          // 10_000_000 * 10^6
    pub mint_authority: None, // Disabled after initial mint
}
```

### Ethereum ERC20
```solidity
contract FizzToken is ERC20, Ownable {
    uint256 public constant TOTAL_SUPPLY = 10_000_000 * 10**6;
    
    constructor() ERC20("Fizz Token", "FIZZ") {
        _mint(msg.sender, TOTAL_SUPPLY);
        // Renounce ownership to prevent future minting
        renounceOwnership();
    }
    
    // No mint function - supply is fixed forever
}
```

---

## ⚠️ Important Notes

1. **No Inflation**: Total supply capped at 10M forever
2. **No Minting**: After initial creation, no new tokens can be made
3. **Treasury Model**: All tokens held in secure wallets
4. **Distribution Only**: Treasury sends existing tokens
5. **Multi-Chain**: Same total supply, distributed across chains
6. **Verifiable**: All distributions are on-chain and auditable
7. **Two-Tier**: In-game CAPS (virtual) vs FIZZ (real blockchain tokens)

---

## 🔗 Resources

- **AFC Repository**: https://github.com/Unwrenchable/ATOMIC-FIZZ-CAPS-VAULT-77-WASTELAND-GPS
- **XRP Testnet Explorer**: https://testnet.xrpl.org/
- **Solana Devnet Explorer**: https://explorer.solana.com/?cluster=devnet
- **Ethereum Sepolia Explorer**: https://sepolia.etherscan.io/
- **Documentation**: See TESTNET_BRIDGE_SETUP.md
- **Bridge Status**: See BRIDGE_STATUS.md

---

**AtomicFizz Ecosystem** - atomicfizzcaps.xyz  
**Total Supply**: 10,000,000 FIZZ (fixed forever)  
**Distribution Model**: Treasury-Based (NO MINTING)  
**Updated**: 2026-02-07
