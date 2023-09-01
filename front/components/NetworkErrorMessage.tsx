export function NetworkErrorMessage({ message, dismiss }: any) {
    return (
      <div>
        {message}
        <button type="button" onClick={dismiss}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    )
  }