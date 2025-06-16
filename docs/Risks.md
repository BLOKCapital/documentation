---
sidebar_position: 5
---

# Risks

### Risk Classification of the Protocol

The protocol is subject to several inherent risks, primarily related to the behavior of smart contracts and participants. These risks include:

1. **Smart Contract Vulnerabilities:**
   Custom-developed smart contracts within the protocol may contain vulnerabilities that could be exploited by malicious actors. This includes potential attacks on the Gardens or individual strategies managed by Gardeners.

2. **Malicious or Rogue Gardener Behavior:**
   A Gardener—once managing a significant amount of capital—may adopt an unexpectedly aggressive investment strategy, deviating from the originally intended risk parameters. Such behavior could lead to substantial financial losses for contributors.

### Risk Mitigation Measures

To address the above risks, the following on-chain solutions are proposed:

* **Smart Contract Auditing and Verification:**
  All protocol contracts and strategy modules must undergo rigorous, transparent, and preferably continuous smart contract audits. Public access to audit results enhances trust and accountability.

* **On-Chain Risk Governance Mechanisms:**
  Enforceable constraints should be embedded within smart contracts to prevent unauthorized or risky actions. For example, a rule could be implemented to restrict swaps or capital deployment unless the portfolio’s risk profile remains within a predefined acceptable range.

These controls aim to ensure that investment strategies align with the intended risk appetite and protect users from both code-level vulnerabilities and misaligned incentives.

