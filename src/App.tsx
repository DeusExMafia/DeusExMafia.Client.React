import { gapi } from 'gapi-script';
import { Component, ReactNode } from 'react';
import "./App.css";
import AppData from "./AppData.json";
import DeusExMafiaClient from './DeusExMafiaClient';

export default class App extends Component {
    private readonly client: DeusExMafiaClient;

    public constructor(props: any) {
        super(props);
        this.client = new DeusExMafiaClient(() => {
            this.setState({});
        });
        gapi.load("client:auth2", () => {
            gapi.client.init({
                clientId: AppData.auth.google.clientId,
                scope: ""
            });
        });
    }

    public render(): ReactNode {
        return this.client.screenHandler.screen();
    }
}
