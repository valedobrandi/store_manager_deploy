import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { store } from '../../src/redux/store';

export function renderWithRedux(
  component: JSX.Element,
) {
  return ({
    ...render(
      <Provider store={ store }>
        {component}
      </Provider>,
    ),
  }
  );
}
