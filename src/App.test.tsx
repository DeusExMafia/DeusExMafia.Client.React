import { render, screen } from '@testing-library/react';
import App from './App';
import DeusExMafiaClient from './DeusExMafiaClient';
import MainMenuScreen from './render/screen/MainMenuScreen';

test('Renders Main Menu Screen from App', () => {
    render(<App />);
    const element = screen.getByText(/Main Menu/i);
    expect(element).toBeInTheDocument();
});

test('Renders Main Menu Screen', () => {
    let client: DeusExMafiaClient = new DeusExMafiaClient(() => {});
    render(<MainMenuScreen client={client} />);
    const element = screen.getByText(/Main Menu/i);
    expect(element).toBeInTheDocument();
});
