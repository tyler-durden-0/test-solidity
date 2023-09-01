export function WaitingForTransactionMessage({ txHash }: {txHash: any}) {
    return (
      <div>
        Waiting for transaction <strong>{txHash}</strong>
      </div>
    )
}