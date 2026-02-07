# FIZZ Token Tokenomics - 10 Million Supply

## 🪙 Token Overview

**Token Name**: FIZZ Token  
**Total Supply**: 10,000,000 FIZZ (fixed, never changes)  
**Decimals**: 6  
**Bridge Type**: Burn-and-Mint  
**Chains**: XRP Ledger, Solana, Ethereum

---

## 🔥 Burn-and-Mint Bridge Mechanism

### Core Principle
The total circulating supply **NEVER exceeds 10 million** across all chains combined.

### How It Works

```
Total Supply = XRP Supply + Solana Supply + Ethereum Supply = 10,000,000 FIZZ
```

When bridging tokens between chains:
1. **Source Chain**: Tokens are **BURNED** (destroyed)
2. **Target Chain**: Equivalent tokens are **MINTED** (created)
3. **Net Effect**: Total supply remains constant

### Example Flow

**Initial State:**
- XRP: 10,000,000 FIZZ (all supply starts here)
- Solana: 0 FIZZ
- Ethereum: 0 FIZZ
- **Total**: 10,000,000 ✅

**User bridges 100,000 FIZZ from XRP to Solana:**
- XRP: 9,900,000 FIZZ (100k locked/burned)
- Solana: 100,000 FIZZ (100k minted)
- Ethereum: 0 FIZZ
- **Total**: 10,000,000 ✅

**Another user bridges 50,000 FIZZ from Solana to Ethereum:**
- XRP: 9,900,000 FIZZ
- Solana: 50,000 FIZZ (50k burned)
- Ethereum: 50,000 FIZZ (50k minted)
- **Total**: 10,000,000 ✅

---

## 📊 Initial Distribution Strategy

### Phase 1: XRP Testnet Launch
```
XRP Issuer Account:    10,000,000 FIZZ (locked for bridge)
XRP Distributor:       For initial airdrops/testing
Solana Mint:           0 FIZZ (program will mint as needed)
Ethereum Contract:     0 FIZZ (contract will mint as needed)
```

### Bridge Reserve Allocation
```
Gaming Rewards Pool:   3,000,000 FIZZ (30%)
Liquidity Incentives:  2,000,000 FIZZ (20%)
Community Airdrops:    1,000,000 FIZZ (10%)
Bridge Operations:       500,000 FIZZ (5%)
Team & Development:    1,500,000 FIZZ (15%)
Ecosystem Reserve:     2,000,000 FIZZ (20%)
```

---

## 🌉 Bridge Operations

### Lock-and-Mint (XRP → Solana/Ethereum)

1. User sends FIZZ to XRP bridge address
2. XRP bridge **locks** tokens (holds in escrow)
3. Bridge relayer verifies transaction
4. Bridge **mints** equivalent FIZZ on target chain
5. User receives FIZZ on target chain

**Technical Implementation:**
```javascript
// XRP: Lock tokens
await xrplClient.payment({
    from: userAddress,
    to: bridgeLockAddress,
    amount: { currency: 'FIZZ', value: '1000', issuer: issuerAddress }
});

// Solana: Mint tokens
await solanaProgram.mintTo({
    amount: 1000 * 10**6, // 1000 FIZZ with 6 decimals
    destination: userTokenAccount
});
```

### Burn-and-Unlock (Solana → XRP)

1. User burns FIZZ on Solana (tokens destroyed)
2. Bridge relayer verifies burn transaction
3. Bridge **unlocks** equivalent FIZZ on XRP
4. User receives FIZZ on XRP

**Technical Implementation:**
```javascript
// Solana: Burn tokens
await solanaProgram.burn({
    amount: 1000 * 10**6,
    source: userTokenAccount
});

// XRP: Unlock tokens
await xrplClient.payment({
    from: bridgeLockAddress,
    to: userAddress,
    amount: { currency: 'FIZZ', value: '1000', issuer: issuerAddress }
});
```

### Burn-and-Mint (Solana ↔ Ethereum)

1. User burns FIZZ on source chain
2. Bridge verifies burn
3. Bridge mints FIZZ on target chain
4. User receives tokens

---

## 💰 Bridge Fees

**Fee Structure**: 1% per bridge transfer

**Fee Distribution:**
- 0.5% → Bridge operations & maintenance
- 0.3% → Liquidity providers
- 0.2% → Protocol treasury

**Example:**
- User bridges 1,000 FIZZ
- Fee: 10 FIZZ (1%)
- User receives: 990 FIZZ on target chain
- Fee goes to bridge operations

---

## 🎮 Gaming Integration

### Token Rewards

Players earn FIZZ tokens by playing games:

**Crypto Quest:**
- 1 FIZZ per 100 points
- Max 100 FIZZ per game

**Pong:**
- 1 FIZZ per 50 points
- Max 50 FIZZ per game

**Backgammon:**
- 1 FIZZ per 75 points
- Max 75 FIZZ per game

### Reward Distribution

All game rewards are distributed on **XRP Ledger** by default (lowest fees).

Players can then bridge to Solana/Ethereum if desired.

---

## 🔒 Security & Supply Verification

### Supply Monitoring

Bridge relayer constantly monitors:
```javascript
const totalSupply = 
    await getXRPSupply() + 
    await getSolanaSupply() + 
    await getEthereumSupply();

assert(totalSupply <= 10000000, 'Total supply exceeded!');
```

### Audit Trail

Every bridge transaction is recorded:
- Source chain transaction hash
- Destination chain transaction hash
- Amount transferred
- Timestamp
- User addresses
- Bridge fee collected

### Emergency Circuit Breaker

If total supply exceeds 10M:
1. Bridge operations halt immediately
2. Alert sent to operators
3. Investigation initiated
4. Manual resolution required

---

## 📈 Supply Tracking

### Real-Time Dashboard

Track supply distribution at:
```
https://atomicfizzcaps.xyz/supply
```

**Displays:**
- XRP Ledger: X,XXX,XXX FIZZ (XX%)
- Solana: X,XXX,XXX FIZZ (XX%)
- Ethereum: X,XXX,XXX FIZZ (XX%)
- **Total**: 10,000,000 FIZZ ✅

### API Endpoints

```javascript
// Get total supply across all chains
GET /api/token/total-supply
Response: { total: "10000000", chains: {...} }

// Get supply on specific chain
GET /api/token/supply?chain=xrp
Response: { chain: "xrp", supply: "9500000" }

// Get user balance across all chains
GET /api/token/balance/:address
Response: { xrp: "100", solana: "50", ethereum: "0" }
```

---

## 🚀 Deployment Checklist

### XRP Testnet Token
- [x] Deploy FIZZ token with 10M supply
- [x] Set up issuer account
- [x] Create distributor account
- [x] Lock initial supply in bridge reserve
- [x] Document tokenomics

### Solana Devnet Token
- [ ] Deploy SPL token program
- [ ] Set mint authority to bridge program
- [ ] Set up burn functionality
- [ ] Test mint/burn operations

### Ethereum Sepolia Token
- [ ] Deploy ERC20 contract
- [ ] Set minter role to bridge contract
- [ ] Set burner functionality
- [ ] Verify on Etherscan

### Bridge Infrastructure
- [ ] Deploy bridge smart contracts
- [ ] Set up relayer service
- [ ] Implement supply monitoring
- [ ] Test cross-chain transfers
- [ ] Enable circuit breaker

---

## 📝 Technical Specifications

### XRP Ledger
```json
{
  "currency": "FIZZ",
  "issuer": "rXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "value": "10000000",
  "decimals": 6
}
```

### Solana SPL Token
```rust
pub struct FizzToken {
    pub mint: Pubkey,
    pub decimals: u8,  // 6
    pub supply: u64,   // Variable (0 to 10M)
    pub mint_authority: Pubkey,  // Bridge program
}
```

### Ethereum ERC20
```solidity
contract FizzToken is ERC20Burnable, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    uint256 public constant MAX_SUPPLY = 10_000_000 * 10**6;
    
    function mint(address to, uint256 amount) 
        external 
        onlyRole(MINTER_ROLE) 
    {
        require(totalSupply() + amount <= MAX_SUPPLY);
        _mint(to, amount);
    }
}
```

---

## ⚠️ Important Notes

1. **No Inflation**: Total supply is capped at 10M forever
2. **No Duplication**: Tokens cannot exist on multiple chains simultaneously
3. **Atomic Swaps**: Bridge transfers are atomic (succeed or fail completely)
4. **Verifiable**: All supply changes are on-chain and auditable
5. **Testnet First**: All testing on testnets before mainnet deployment

---

## 🔗 Resources

- **XRP Testnet Explorer**: https://testnet.xrpl.org/
- **Solana Devnet Explorer**: https://explorer.solana.com/?cluster=devnet
- **Ethereum Sepolia Explorer**: https://sepolia.etherscan.io/
- **Documentation**: See TESTNET_BRIDGE_SETUP.md
- **Bridge Status**: See BRIDGE_STATUS.md

---

**AtomicFizz Ecosystem** - atomicfizzcaps.xyz  
**Total Supply**: 10,000,000 FIZZ (forever)  
**Updated**: 2026-02-07
