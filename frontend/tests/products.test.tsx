import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';
import App from '../src/App';
import { renderWithRedux } from './helpers/renderWithRedux';
import { handlers } from './mocks/handlers';

const server = setupServer(...handlers);

describe('PRODUCTS FUNCTION - TEST', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('Search by "ID"', async () => {
    renderWithRedux(<App />);

    await userEvent.click(screen.getByRole('button', { name: 'id' }));
    await userEvent.type(screen.getByRole('textbox'), '1');
    await userEvent.click(screen.getByRole('button', { name: 'SEARCH' }));

    expect(await screen.findByRole('row', { name: '10 Teste 10' })).toBeInTheDocument();
    expect(await screen.findByText(/success/i)).toBeInTheDocument();
  });

  it('Search by "NAME"', async () => {
    renderWithRedux(<App />);

    expect(screen.getByRole('button', { name: 'name' })).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'name' }));
    await userEvent.type(screen.getByRole('textbox'), 'Espada');
    await userEvent.click(screen.getByRole('button', { name: 'SEARCH' }));

    expect(await screen.findByRole('row', { name: '20 Espada Teste 10' })).toBeInTheDocument();
    expect(await screen.findByText(/success/i)).toBeInTheDocument();
  });

  it('Register a new product', async () => {
    renderWithRedux(<App />);

    expect(screen.getByRole('button', { name: 'register' })).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'register' }));
    expect(await screen.findByRole('textbox')).toBeInTheDocument();
    await userEvent.type(screen.getByRole('textbox'), 'Register Test');
    await userEvent.click(screen.getByRole('button', { name: 'REGISTER' }));

    const ALERT = await screen.findByRole('alert');
    expect(ALERT).toBeInTheDocument();
    expect(await screen.findByText('ID: 0 NAME: Register Test')).toBeInTheDocument();
    const BTN_CLOSE = await screen.findByRole('button', { name: /close/i });
    await userEvent.click(BTN_CLOSE);
    expect(ALERT).not.toBeInTheDocument();
  });
});
