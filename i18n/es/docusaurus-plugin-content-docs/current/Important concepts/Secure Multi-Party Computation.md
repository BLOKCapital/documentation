# Secure Multi-Party Computation (MPC)

**Secure Multi-Party Computation (MPC)** is a subfield of cryptography that enables multiple parties to jointly compute a function over their inputs while keeping those inputs private. This means participants can collaborate to achieve a common computational goal without revealing their individual data to each other or any third party. 

## Key Properties of MPC

1. **Input Privacy**: No information about the private data held by the parties can be inferred from the messages sent during the execution of the protocol. The only information that can be inferred about the private data is whatever could be inferred from seeing the output of the function alone.

2. **Correctness**: Any proper subset of adversarial colluding parties willing to share information or deviate from the instructions during the protocol execution should not be able to force honest parties to output an incorrect result. This correctness goal comes in two flavors: either the honest parties are guaranteed to compute the correct output (a "robust" protocol), or they abort if they find an error (an MPC protocol "with abort").

## Applications of MPC
MPC has a wide range of practical applications, including:

1. **Electronic Voting**: Ensuring that votes are tallied correctly without revealing individual votes.
2. **Private Set Intersection**: Allowing two parties to compute the intersection of their datasets without revealing any other information.
3. **Privacy-Preserving Data Mining**: Enabling organizations to collaboratively analyze data without exposing sensitive information.

## Simple Example
Imagine three friends—Alice, Bob, and Charlie—who want to determine the highest salary among them without disclosing their actual earnings. Using MPC, they can compute the maximum salary without any of them learning the specific amounts that the others earn. 

## Applications in Cryptocurrency Wallets
In the context of cryptocurrency wallets, MPC enhances security by distributing the control of private keys among multiple parties. This means that no single entity possesses the complete private key, reducing the risk of theft or loss. For instance, an MPC wallet might split the private key into several parts, requiring a predefined number of these parts to authorize a transaction. This approach ensures that even if one part is compromised, unauthorized transactions cannot occur without the necessary threshold of key shares. 

By leveraging MPC, cryptocurrency wallets can offer enhanced security features, making them more resilient against hacks and unauthorized access.
