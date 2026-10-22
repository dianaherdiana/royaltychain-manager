import { describe, expect, it } from "vitest";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { DEVNET_ENDPOINT, explorerUrl, parseSolAmount, validateBalance, validateRecipient } from "./solana-transfer";

describe("Solana Devnet transfer rules", () => {
  it("uses only the Devnet endpoint", () => {
    expect(clusterApiUrl(WalletAdapterNetwork.Devnet)).toBe(DEVNET_ENDPOINT);
  });
  it("links transactions to Explorer Devnet", () => {
    expect(explorerUrl("abc123")).toBe("https://explorer.solana.com/tx/abc123?cluster=devnet");
  });
  it("converts SOL to exact integer lamports", () => {
    expect(parseSolAmount("0.01")).toBe(10_000_000);
    expect(parseSolAmount("0.000000001")).toBe(1);
  });
  it("rejects nonpositive and invalid amounts", () => {
    for (const amount of ["0", "-1", "NaN", "1e9", "0.0000000001", "999999999999999"]) expect(() => parseSolAmount(amount)).toThrow();
  });
  it("rejects sending more than the balance including fees", () => {
    expect(() => validateBalance(1_000_000_000, 5000, 1_000_000_000)).toThrow();
    expect(() => validateBalance(999_995_000, 5000, 1_000_000_000)).not.toThrow();
  });
  it("does not send when the fee cannot be read", () => {
    expect(() => validateBalance(1, null, 1_000_000_000)).toThrow();
  });
  it("requires a valid Solana recipient", () => {
    expect(() => validateRecipient("invalid", "sender")).toThrow();
    expect(validateRecipient("11111111111111111111111111111111", "sender").toBase58()).toBe("11111111111111111111111111111111");
  });
  it("rejects sending to the connected wallet itself", () => {
    expect(() => validateRecipient("11111111111111111111111111111111", "11111111111111111111111111111111")).toThrow();
  });
});