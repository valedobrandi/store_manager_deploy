import { ReactNode } from 'react';
import useTransitionEvent from '../../Hooks/useTransitionEvent';

type TransitionEventProps = {
  display: boolean | undefined | null | never[];
  children: ReactNode | boolean;
  time: number;
};

export default function TransitionEvent(
  { display, children, time }: TransitionEventProps,
) {
  const { applyOpacity, render } = useTransitionEvent(display, time);

  return (
    <div
      style={ applyOpacity }
    >
      {render && children }
    </div>

  );
}
