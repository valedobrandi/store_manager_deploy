import { ReactNode } from 'react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import SuccessAlert from '../SuccessAlert';
import ErrorAlert from '../ErrorAlert';
import useConditionalRendering from '../../Hooks/useConditionalRendering';
import TransitionEvent from '../Transition';

type AlertProps = {
  children: JSX.Element[] | ReactNode | string | boolean;
  isSuccess: boolean;
  isError: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
  message: object | string;
};

export default function Alerts(
  { children, isSuccess, isError, error, message }: AlertProps,
) {
  const { isAlert } = useConditionalRendering();

  return (
    <div className="flex items-center flex-wrap">
      {children}
      <TransitionEvent display={ isAlert } time={ 0 }>
        {isSuccess && <SuccessAlert message={ message } />}
        {isError && <ErrorAlert message={ error } />}
      </TransitionEvent>
    </div>
  );
}
