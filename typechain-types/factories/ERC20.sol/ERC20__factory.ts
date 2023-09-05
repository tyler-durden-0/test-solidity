/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type {
  Signer,
  BigNumberish,
  AddressLike,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../../common";
import type { ERC20, ERC20Interface } from "../../ERC20.sol/ERC20";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name_",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol_",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "initialSupply",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "shop",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Approve",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_from",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "shop",
        type: "address",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040516200193d3803806200193d833981810160405281019062000037919062000475565b836004908162000048919062000766565b5082600590816200005a919062000766565b5033600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550620000ae8282620000b860201b60201c565b5050505062000968565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146200014b576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016200014290620008ae565b60405180910390fd5b6200015f600082846200023d60201b60201c565b81600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254620001b09190620008ff565b9250508190555081600080828254620001ca9190620008ff565b925050819055508073ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040516200023191906200094b565b60405180910390a35050565b505050565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b620002ab8262000260565b810181811067ffffffffffffffff82111715620002cd57620002cc62000271565b5b80604052505050565b6000620002e262000242565b9050620002f08282620002a0565b919050565b600067ffffffffffffffff82111562000313576200031262000271565b5b6200031e8262000260565b9050602081019050919050565b60005b838110156200034b5780820151818401526020810190506200032e565b60008484015250505050565b60006200036e6200036884620002f5565b620002d6565b9050828152602081018484840111156200038d576200038c6200025b565b5b6200039a8482856200032b565b509392505050565b600082601f830112620003ba57620003b962000256565b5b8151620003cc84826020860162000357565b91505092915050565b6000819050919050565b620003ea81620003d5565b8114620003f657600080fd5b50565b6000815190506200040a81620003df565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006200043d8262000410565b9050919050565b6200044f8162000430565b81146200045b57600080fd5b50565b6000815190506200046f8162000444565b92915050565b600080600080608085870312156200049257620004916200024c565b5b600085015167ffffffffffffffff811115620004b357620004b262000251565b5b620004c187828801620003a2565b945050602085015167ffffffffffffffff811115620004e557620004e462000251565b5b620004f387828801620003a2565b93505060406200050687828801620003f9565b925050606062000519878288016200045e565b91505092959194509250565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806200057857607f821691505b6020821081036200058e576200058d62000530565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302620005f87fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82620005b9565b620006048683620005b9565b95508019841693508086168417925050509392505050565b6000819050919050565b600062000647620006416200063b84620003d5565b6200061c565b620003d5565b9050919050565b6000819050919050565b620006638362000626565b6200067b62000672826200064e565b848454620005c6565b825550505050565b600090565b6200069262000683565b6200069f81848462000658565b505050565b5b81811015620006c757620006bb60008262000688565b600181019050620006a5565b5050565b601f8211156200071657620006e08162000594565b620006eb84620005a9565b81016020851015620006fb578190505b620007136200070a85620005a9565b830182620006a4565b50505b505050565b600082821c905092915050565b60006200073b600019846008026200071b565b1980831691505092915050565b600062000756838362000728565b9150826002028217905092915050565b620007718262000525565b67ffffffffffffffff8111156200078d576200078c62000271565b5b6200079982546200055f565b620007a6828285620006cb565b600060209050601f831160018114620007de5760008415620007c9578287015190505b620007d5858262000748565b86555062000845565b601f198416620007ee8662000594565b60005b828110156200081857848901518255600182019150602085019450602081019050620007f1565b8683101562000838578489015162000834601f89168262000728565b8355505b6001600288020188555050505b505050505050565b600082825260208201905092915050565b7f6e6f7420616e206f776e65720000000000000000000000000000000000000000600082015250565b600062000896600c836200084d565b9150620008a3826200085e565b602082019050919050565b60006020820190508181036000830152620008c98162000887565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006200090c82620003d5565b91506200091983620003d5565b9250828201905080821115620009345762000933620008d0565b5b92915050565b6200094581620003d5565b82525050565b60006020820190506200096260008301846200093a565b92915050565b610fc580620009786000396000f3fe608060405234801561001057600080fd5b50600436106100a95760003560e01c806370a082311161007157806370a082311461014057806394bf804d1461017057806395d89b411461018c5780639dc29fac146101aa578063a9059cbb146101c6578063dd62ed3e146101e2576100a9565b806306fdde03146100ae578063095ea7b3146100cc57806318160ddd146100e857806323b872dd14610106578063313ce56714610122575b600080fd5b6100b6610212565b6040516100c39190610b9b565b60405180910390f35b6100e660048036038101906100e19190610c56565b6102a4565b005b6100f06102b3565b6040516100fd9190610ca5565b60405180910390f35b610120600480360381019061011b9190610cc0565b6102bc565b005b61012a6104bf565b6040516101379190610ca5565b60405180910390f35b61015a60048036038101906101559190610d13565b6104c8565b6040516101679190610ca5565b60405180910390f35b61018a60048036038101906101859190610d40565b610511565b005b610194610685565b6040516101a19190610b9b565b60405180910390f35b6101c460048036038101906101bf9190610c56565b610717565b005b6101e060048036038101906101db9190610c56565b610825565b005b6101fc60048036038101906101f79190610d80565b610994565b6040516102099190610ca5565b60405180910390f35b60606004805461022190610def565b80601f016020809104026020016040519081016040528092919081815260200182805461024d90610def565b801561029a5780601f1061026f5761010080835404028352916020019161029a565b820191906000526020600020905b81548152906001019060200180831161027d57829003601f168201915b5050505050905090565b6102af338383610a1b565b5050565b60008054905090565b8281806102c8836104c8565b1015610309576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161030090610e6c565b60405180910390fd5b610314858585610b06565b82600360008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546103a09190610ebb565b9250508190555082600260008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546103f69190610ebb565b9250508190555082600260008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461044c9190610eef565b925050819055508373ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef856040516104b09190610ca5565b60405180910390a35050505050565b60006012905090565b6000600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146105a1576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161059890610f6f565b60405180910390fd5b6105ad60008284610b06565b81600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546105fc9190610eef565b92505081905550816000808282546106149190610eef565b925050819055508073ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040516106799190610ca5565b60405180910390a35050565b60606005805461069490610def565b80601f01602080910402602001604051908101604052809291908181526020018280546106c090610def565b801561070d5780601f106106e25761010080835404028352916020019161070d565b820191906000526020600020905b8154815290600101906020018083116106f057829003601f168201915b5050505050905090565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146107a7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161079e90610f6f565b60405180910390fd5b6107b382600083610b06565b80600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546108029190610ebb565b925050819055508060008082825461081a9190610ebb565b925050819055505050565b338180610831836104c8565b1015610872576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161086990610e6c565b60405180910390fd5b61087d338585610b06565b82600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546108cc9190610ebb565b9250508190555082600260008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546109229190610eef565b925050819055508373ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef856040516109869190610ca5565b60405180910390a350505050565b6000600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b80600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f6e11fb1b7f119e3f2fa29896ef5fdf8b8a2d0d4df6fe90ba8668e7d8b2ffa25e83604051610af99190610ca5565b60405180910390a3505050565b505050565b600081519050919050565b600082825260208201905092915050565b60005b83811015610b45578082015181840152602081019050610b2a565b60008484015250505050565b6000601f19601f8301169050919050565b6000610b6d82610b0b565b610b778185610b16565b9350610b87818560208601610b27565b610b9081610b51565b840191505092915050565b60006020820190508181036000830152610bb58184610b62565b905092915050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610bed82610bc2565b9050919050565b610bfd81610be2565b8114610c0857600080fd5b50565b600081359050610c1a81610bf4565b92915050565b6000819050919050565b610c3381610c20565b8114610c3e57600080fd5b50565b600081359050610c5081610c2a565b92915050565b60008060408385031215610c6d57610c6c610bbd565b5b6000610c7b85828601610c0b565b9250506020610c8c85828601610c41565b9150509250929050565b610c9f81610c20565b82525050565b6000602082019050610cba6000830184610c96565b92915050565b600080600060608486031215610cd957610cd8610bbd565b5b6000610ce786828701610c0b565b9350506020610cf886828701610c0b565b9250506040610d0986828701610c41565b9150509250925092565b600060208284031215610d2957610d28610bbd565b5b6000610d3784828501610c0b565b91505092915050565b60008060408385031215610d5757610d56610bbd565b5b6000610d6585828601610c41565b9250506020610d7685828601610c0b565b9150509250929050565b60008060408385031215610d9757610d96610bbd565b5b6000610da585828601610c0b565b9250506020610db685828601610c0b565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680610e0757607f821691505b602082108103610e1a57610e19610dc0565b5b50919050565b7f6e6f7420656e6f75676820746f6b656e73000000000000000000000000000000600082015250565b6000610e56601183610b16565b9150610e6182610e20565b602082019050919050565b60006020820190508181036000830152610e8581610e49565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610ec682610c20565b9150610ed183610c20565b9250828203905081811115610ee957610ee8610e8c565b5b92915050565b6000610efa82610c20565b9150610f0583610c20565b9250828201905080821115610f1d57610f1c610e8c565b5b92915050565b7f6e6f7420616e206f776e65720000000000000000000000000000000000000000600082015250565b6000610f59600c83610b16565b9150610f6482610f23565b602082019050919050565b60006020820190508181036000830152610f8881610f4c565b905091905056fea2646970667358221220c8f9cf739d0f6478b9cdfd3fb146751bcdee6ec8acec12d51116e091bab7021564736f6c63430008130033";

type ERC20ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC20ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC20__factory extends ContractFactory {
  constructor(...args: ERC20ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    name_: string,
    symbol_: string,
    initialSupply: BigNumberish,
    shop: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(
      name_,
      symbol_,
      initialSupply,
      shop,
      overrides || {}
    );
  }
  override deploy(
    name_: string,
    symbol_: string,
    initialSupply: BigNumberish,
    shop: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(
      name_,
      symbol_,
      initialSupply,
      shop,
      overrides || {}
    ) as Promise<
      ERC20 & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): ERC20__factory {
    return super.connect(runner) as ERC20__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC20Interface {
    return new Interface(_abi) as ERC20Interface;
  }
  static connect(address: string, runner?: ContractRunner | null): ERC20 {
    return new Contract(address, _abi, runner) as unknown as ERC20;
  }
}
