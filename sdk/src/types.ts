import type { Transaction } from "@stellar/stellar-sdk";

export type SignalInput = string | number | bigint;
export type Bytes32Input = string | Uint8Array;
export type BinaryInput = string | Uint8Array;

export interface CircuitArtifactPaths {
  wasmPath: string;
  zkeyPath: string;
}

export interface MerkleProofGeneratorConfig {
  inclusion: CircuitArtifactPaths;
  nonInclusion: CircuitArtifactPaths;
}

export interface InclusionInput {
  username: SignalInput[];
  pathElements: SignalInput[];
  pathIndices: SignalInput[];
  root: SignalInput;
  [key: string]: SignalInput | SignalInput[];
}

export interface NonInclusionInput {
  username: SignalInput[];
  leaf_before: SignalInput;
  leaf_after: SignalInput;
  merklePathBeforeSiblings: SignalInput[];
  merklePathBeforeIndices: SignalInput[];
  merklePathAfterSiblings: SignalInput[];
  merklePathAfterIndices: SignalInput[];
  root: SignalInput;
  [key: string]: SignalInput | SignalInput[];
}

export interface Groth16Proof {
  pi_a: string[];
  pi_b: string[][];
  pi_c: string[];
  protocol: string;
  curve: string;
}

export type InclusionPublicSignals = [root: string, outRoot: string];
export type NonInclusionPublicSignals = [root: string, outRoot: string, isAvailable: string];

export interface InclusionProofResult {
  proof: Groth16Proof;
  publicSignals: InclusionPublicSignals;
}

export interface NonInclusionProofResult {
  proof: Groth16Proof;
  publicSignals: NonInclusionPublicSignals;
}

export interface StellarTxBuilderConfig {
  rpcUrl: string;
  networkPassphrase: string;
  contractAddress: string;
  allowHttp?: boolean;
  defaultFee?: string;
  timeoutInSeconds?: number;
  defaultSource?: string;
}

export interface TxBuildOptions {
  fee?: string;
  timeoutInSeconds?: number;
  source?: string;
}

export interface RegisterParams extends TxBuildOptions {
  caller: string;
  commitment: Bytes32Input;
}

export interface PublicSignalsInput {
  oldRoot: Bytes32Input;
  newRoot: Bytes32Input;
}

export interface RegisterResolverParams extends TxBuildOptions {
  caller: string;
  commitment: Bytes32Input;
  proof: BinaryInput;
  publicSignals: PublicSignalsInput;
}

export interface AddStellarAddressParams extends TxBuildOptions {
  caller: string;
  usernameHash: Bytes32Input;
  stellarAddress: string;
}

export interface ResolveParams extends TxBuildOptions {
  usernameHash: Bytes32Input;
}

export interface BuiltTransaction {
  transaction: Transaction;
  xdr: string;
  method: "register" | "register_resolver" | "add_stellar_address" | "resolve_stellar";
  source: string;
}

export interface SubmitTransactionOptions {
  pollUntilSuccess?: boolean;
}
