export function TransactionErrorMessage({ message, dismiss }: {message: any, dismiss: any}) {
    return (
      <div>
        TX error: {message}
        <button type="button" onClick={dismiss}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    )
}