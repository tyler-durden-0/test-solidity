/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../common";

export interface INNOShopInterface extends Interface {
  getFunction(
    nameOrSignature: "owner" | "sell" | "token" | "tokenBalance"
  ): FunctionFragment;

  getEvent(nameOrSignatureOrTopic: "Bought" | "Sold"): EventFragment;

  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(functionFragment: "sell", values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: "token", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "tokenBalance",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "sell", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "token", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "tokenBalance",
    data: BytesLike
  ): Result;
}

export namespace BoughtEvent {
  export type InputTuple = [_amount: BigNumberish, _buyer: AddressLike];
  export type OutputTuple = [_amount: bigint, _buyer: string];
  export interface OutputObject {
    _amount: bigint;
    _buyer: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace SoldEvent {
  export type InputTuple = [_amount: BigNumberish, _seller: AddressLike];
  export type OutputTuple = [_amount: bigint, _seller: string];
  export interface OutputObject {
    _amount: bigint;
    _seller: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface INNOShop extends BaseContract {
  connect(runner?: ContractRunner | null): INNOShop;
  waitForDeployment(): Promise<this>;

  interface: INNOShopInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  owner: TypedContractMethod<[], [string], "view">;

  sell: TypedContractMethod<
    [_amountToSell: BigNumberish],
    [void],
    "nonpayable"
  >;

  token: TypedContractMethod<[], [string], "view">;

  tokenBalance: TypedContractMethod<[], [bigint], "view">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "owner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "sell"
  ): TypedContractMethod<[_amountToSell: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "token"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "tokenBalance"
  ): TypedContractMethod<[], [bigint], "view">;

  getEvent(
    key: "Bought"
  ): TypedContractEvent<
    BoughtEvent.InputTuple,
    BoughtEvent.OutputTuple,
    BoughtEvent.OutputObject
  >;
  getEvent(
    key: "Sold"
  ): TypedContractEvent<
    SoldEvent.InputTuple,
    SoldEvent.OutputTuple,
    SoldEvent.OutputObject
  >;

  filters: {
    "Bought(uint256,address)": TypedContractEvent<
      BoughtEvent.InputTuple,
      BoughtEvent.OutputTuple,
      BoughtEvent.OutputObject
    >;
    Bought: TypedContractEvent<
      BoughtEvent.InputTuple,
      BoughtEvent.OutputTuple,
      BoughtEvent.OutputObject
    >;

    "Sold(uint256,address)": TypedContractEvent<
      SoldEvent.InputTuple,
      SoldEvent.OutputTuple,
      SoldEvent.OutputObject
    >;
    Sold: TypedContractEvent<
      SoldEvent.InputTuple,
      SoldEvent.OutputTuple,
      SoldEvent.OutputObject
    >;
  };
}