import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import useConditionalRendering from '../../Hooks/useConditionalRendering';

type ErrorAlertProps = {
  message: FetchBaseQueryError | SerializedError | undefined
};

export default function ErrorAlert({ message }: ErrorAlertProps) {
  const { data } = message as { data: { message: string } };
  const { dispatchDisplayAlert } = useConditionalRendering();

  const errorMessage = data.message.toUpperCase() || '';

  return (
    <div
      role="alert"
      className="alert bg-transparent border-none
     ml-4 w-fit font-Poppins text-red-700"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <div>
        <span>{errorMessage}</span>
      </div>
      <button
        className="btn btn-xs"
        onClick={ () => dispatchDisplayAlert(true) }
      >
        X
      </button>
    </div>
  );
}
