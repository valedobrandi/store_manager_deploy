import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';
import App from '../src/App';
import { renderWithRedux } from './helpers/renderWithRedux';
import { handlers } from './mocks/handlers';

const server = setupServer(...handlers);

describe('APP - TEST', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  it('Turn Buttons "HIDE" ON/OFF', async () => {
    renderWithRedux(<App />);

    expect(screen.getByText(/data base manager/i)).toBeInTheDocument();

    expect(await screen.findByRole('row', { name: '1 Martelo de Thor' })).toBeInTheDocument();
    expect(await screen.findByRole('row', { name: '1 2024-07-08T11:42:18.000Z 1 10' })).toBeInTheDocument();
    expect(screen.getAllByRole('row')).toHaveLength(8);

    const BTN_HIDE = screen.getAllByRole('button', { name: /hide/i });
    expect(BTN_HIDE).toHaveLength(2);

    const tbody = window.document.querySelector('tbody');
    expect(tbody).not.toHaveClass('hidden');

    await userEvent.click(BTN_HIDE[0]);
    await userEvent.click(BTN_HIDE[1]);

    expect(tbody).toHaveClass('hidden');
  });
});
