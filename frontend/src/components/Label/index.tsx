import { ReactNode } from 'react';

type LabelProps = {
  children: JSX.Element[] | ReactNode;
  title: string;
};

export default function Label({ children, title }: LabelProps) {
  return (
    <div className="join mr-2">
      <div className="indicator">
        <h4
          className="no-animation btn btn-active
        btn-warning join-item text-black "
        >
          {title}
        </h4>
        {children}
      </div>
    </div>

  );
}
