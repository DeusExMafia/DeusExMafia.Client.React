import { Component, ReactNode } from 'react';
import DeusExMafiaClient from './DeusExMafiaClient';

export default class App extends Component {
    private readonly client: DeusExMafiaClient;

    public constructor(props: any) {
        super(props);
        this.client = new DeusExMafiaClient(() => {
            this.setState({});
        });
    }

    public render(): ReactNode {
        return this.client.screenHandler.screen;
    }
}
