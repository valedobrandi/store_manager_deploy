import { ReactNode } from 'react';
import EndPoints from '../EndPoints';
import HTTPMethods from '../HTTPMethods';

type WindowPropsType = {
  children: JSX.Element[] | ReactNode | string | boolean;
};

export default function Window({ children }: WindowPropsType) {
  return (
    <div
      className="mockup-window border bg-base-300
    h-[90vh] max-w-[1440px] mx-auto p-10"
    >
      <h1 className="text-black text-5xl font-VT323 text-left m-4">Data Base Manager</h1>
      <EndPoints />
      <HTTPMethods />
      <div
        className="flex-col justify-center
       border-t border-base-300 overflow-auto"
      >
        {children}
      </div>
    </div>
  );
}
