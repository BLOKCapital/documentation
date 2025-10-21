**Introduction:**

Adapting multichain concept for greater accessibilty and scalability is essential for users to understand the actual User Experience the DAO is trying to provide. We at Blok Captial, essentially try to cater a vision of DAO that supports entire ecosystem of gardeners and their gardens across multiple blockchains featuring best possible and secure, nurturing environment with greater adaptability. Blok Capital envisions this with help of cross chain messaging protocol from Chainlink. Chainlink-CCIP provides Institutional grade security and Risk Management including superior developer friendly toolset.

**Chainlink CCIP Integration and Architecture Overview:  *(In progress…)***  

We have always thought of keeping the primary architecture minimal yet efficient and each primary component DAO accessible limiting the ownership. Ofcourse the ownership and decision making has been planned using vote parameters, promoting transparency and clarity from the protocol’s side. 

Diving into the ccip integration (only upto certain part of DAO architecture for now), we aimed at bringing the two primary registries: *FacetRegistry* and *PoolRegistry* multichain using ccip custom made broadcaster and receiver smart contracts that are solely responsible for cross chain updation and wired in a way (think of it as a wrapper against those registries) such that registry performs actions in correspondece to those updates.

We are limiting ccip usage in the main architecture upto Registries for now, getting our hands dirty while integrating stuff around it. (but we also aim to extend it in many ways for future work)

**Whiteboard (Canvas reference):**

<image-card alt="Blok Capital Whiteboard Architecture Diagram" src="images/whiteboard-canvas.png" ></image-card>
*Note: Remember, the DAO and broadcaster logic sits on Arbitrum Mainnet (this is the parent chain for pure orchestration whereas there is Base as sidechain as of now. Future integrations may include other networks like Avalanche and OP Mainnet).* 

**Overview (Canvas):**

The coupled contracts (broadcaster & receiver) are DAO owned (using ownable from openzeppelin official contracts). Receiver contract is a wrapper around both primary registries. It just executes actions based on message payload from the broadcaster.

On the other hand, broadcaster does not contain business logic whereas it only helps select chain using Chain selector argument that is passed in one of the core function for broadcasting.

DAO being deployed on the Arbitrum Mainnet, it certainly becomes the parent or main chain. Since there are multiple custom hooks that derive logic and cater to the DAO, it is not feasible to deploy the DAO as a singular entity on multiple blockchains. To solve this complex issue, we aim to utilize this broadcaster-receiver correspondence from CCIP and integrate within our core registries to see if we can actually implement Multichain User Experience.

**Some illustration or code snippets are mentioned below that may come handy for new developers building around Chainlink and CCIP:**

(This part covers both broadcaster and receiver general built in components like Client library for instance)

The entire architecture for multichain is based on some core and simple Chainlink-CCIP components like for instance Client Library with certain structs like EVM2AnyMessage and Any2EVMMessage, utilities like extra args encoding and all low level logic abstraction. This extra args covers a lot of gas optimization and gas limit part on its own. This very library provides the IRouterClient contract too. 

```solidity
library Client {
    struct EVMTokenAmount {
        address token;
        uint256 amount;
    }

    struct Any2EVMMessage {
        bytes32 messageId;
        uint64 sourceChainSelector;
        bytes sender;
        bytes data;
        EVMTokenAmount[] destTokenAmounts;
    }

    struct EVM2AnyMessage {
        bytes receiver;
        bytes data;
        EVMTokenAmount[] tokenAmounts;
        address feeToken;
        bytes extraArgs;
    }

    struct EVMExtraArgsV1 {
        uint256 gasLimit;
    }
```

The broadcaster contract carries the ccip fees regulation (we aim for native ETH and not  LINK as router fees, this is eventually swapped to wETH eventually). The contract has a mention of address(0) by default meaning usage of native ETH as medium of chain router fees.

```solidity
Client.EVM2AnyMessage memory message = Client.EVM2AnyMessage({
            receiver: abi.encode(_receiver),
            data: data,
            tokenAmounts: new Client.EVMTokenAmount[](0),
            extraArgs: extraArgs,
            feeToken: address(0) // Native ETH
        });
```

**If you plan to build a broadcaster contract from scratch, it is always essential to know about encoding part for your message or arbitrary data that is to-be payload (receiver side data). Note that there comes a common and widely accepted concept of gas limit that is to be handled around this payload complexity.

Below is illustration of data encoding for facet details and wrapping it ready for receiver to decode:

 `*bytes memory data = abi.encode(uint8(1), abi.encode(facet, selectors, action));`*

In the original broadcaster contract of Blok Capital, to tackle the gas limit issue, we have introduced a custom hook or logic or function named setGasLimit that enables user input limit against a standard 500k gas limit. (200k being default, should work in many cases)

Such hooks are important as not every payload is simple and might cause an issue in actual pipeline execution at certain point of time.

Lets move to the most fundamental broadcaster component that actually sends the update/ message/ payload to other chain (uses IRouterClient function like ccipSend):

```solidity
interface IRouterClient {
    function ccipSend(uint64 destinationChainSelector, Client.EVM2AnyMessage calldata message)
        external
        payable
        returns (bytes32);

    function getFee(uint64 destinationChainSelector, Client.EVM2AnyMessage calldata message)
        external
        view
        returns (uint256 fee);
}
```

        `ccipRouter.ccipSend{value: fee}(destinationChainSelector, message);`

Some illustration about the build around these core components or how can we actually shape these components in the broadcaster contract is shown below, this being our broadcaster logic in very abstract form:

```solidity
function broadcastFacetUpdate(address facet, bytes4[] memory selectors, FacetAction action) public onlyOwner whenNotPaused {
        
        ///@notice Receiver must be configured
        address _receiver = receiver; 
        if (_receiver == address(0)) revert ReceiverNotSet();
        
        // typeTag 1 = Facet
        bytes memory data = abi.encode(uint8(1), abi.encode(facet, selectors, action));

        bytes memory extraArgs = Client._argsToBytes(
            Client.EVMExtraArgsV1({ gasLimit: gasLimit })
        );
				// using EVM2AnyMessage struct essentially 
        Client.EVM2AnyMessage memory message = Client.EVM2AnyMessage({
            receiver: abi.encode(_receiver),
            data: data,
            tokenAmounts: new Client.EVMTokenAmount[](0),
            extraArgs: extraArgs,
            feeToken: address(0) // Native ETH
        });

```

For receiver architecture this snippet from client can be useful: (this may give us a better understanding of receiver core components and its workaround logic eventually)

```solidity
abstract contract CCIPReceiver is IAny2EVMMessageReceiver {
    address internal immutable i_ccipRouter;

    error InvalidRouter(address router);

    modifier onlyRouter() {
        if (msg.sender != getRouter()) revert InvalidRouter(msg.sender);
        _;
    }

    constructor(address router) {
        if (router == address(0)) revert InvalidRouter(address(0));
        i_ccipRouter = router;
    }

    function ccipReceive(Client.Any2EVMMessage calldata message) external virtual override onlyRouter {
        _ccipReceive(message);
    }

    function _ccipReceive(Client.Any2EVMMessage memory message) internal virtual;

    function getRouter() public view virtual returns (address) {
        return address(i_ccipRouter);
    }

    function supportsInterface(bytes4 interfaceId) public pure virtual returns (bool) {
        return interfaceId == type(IAny2EVMMessageReceiver).interfaceId;
    }
}
```

Some illustrations about what we have done on the reciever side like facet registry payload/ received data decoding, feeding that decoded payload to handleFacetUpdate state function:

```solidity
function _ccipReceive(Client.Any2EVMMessage memory any2EvmMessage) internal override {
        // Emit debug event for all received messages
        emit CCIPMessageReceived(any2EvmMessage.messageId, abi.decode(any2EvmMessage.sender, (address)), any2EvmMessage.data);
        
        (uint8 typeTag, bytes memory payload) = abi.decode(any2EvmMessage.data, (uint8, bytes));
				
				//here typeTag == 1 denotes facet registry management 
        if (typeTag == 1) {
            (address facet, bytes4[] memory selectors, FacetAction action) = abi.decode(payload, (address, bytes4[], FacetAction));
            
            //@dev RITICAL FIX: Add validation 
            if (facet == address(0)) {
                revert InvalidFacetAddress(facet);
            }
            

            //@dev Validate action enum (an index for actions)
       
            
            emit CCIPDebugInfo(any2EvmMessage.messageId, any2EvmMessage.sourceChainSelector, 
                abi.decode(any2EvmMessage.sender, (address)), typeTag, facet, selectors, actionValue);
            // this is the state function for handling the action logic carefully
            _handleFacetUpdate(facet, selectors, action);
            emit FacetUpdateReceived(facet, selectors, action);
            return;
        }
```

*(Note: Functions like _handleFacetUpdate are crucial for actual management and not disclosed here since we need to keep things abstract and readable for new developers for seamless onboarding)*  

**About Ownership and Transparency**

At Blok Capital, we aim to keep things transparent from the very root. And building on arbitrum and other EVM based projects enabled us with all possible logs and emits that we try to create as much as onchain footprints as possible for greater traceability and transperency. First thing that crossed our mind while starting out with multichain integration was elevated user experience but secure in various ways. This broadened our perspective with DAO centric control over both the registries from the very beginning.

This is done using openzeppelin’s ownable contract and its acting modifier on every core function within the contract. The DAO will be the initial and only user for registry as well as pool management. 

```solidity
 constructor(address initialOwner, address _ccipRouter, uint64 _destinationChainSelector) Ownable(initialOwner) {
        require(_ccipRouter != address(0), "Invalid router address");
        require(_destinationChainSelector != 0, "Invalid chain selector");
        }
```

Conclusion:

Blok Capital’s adoption of Chainlink CCIP enables a streamlined multichain ecosystem, enhancing user experience with secure and scalable cross-chain interactions. By integrating CCIP into our FacetRegistry and PoolRegistry, managed through DAO-owned broadcaster and receiver contracts on Arbitrum Mainnet and Base, we ensure transparent, secure, and efficient registry updates. This architecture, designed for future expansion to networks like Avalanche and OP Mainnet, prioritizes user-centric accessibility and DAO-driven governance, laying a robust foundation for a decentralized, interoperable future while maintaining institutional-grade security and transparency.

Just Chainlink Everything..!!