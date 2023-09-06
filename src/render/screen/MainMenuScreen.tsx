import { Component, ReactNode } from "react";
import DeusExMafiaClient from "../../DeusExMafiaClient";
import TestScreen from "./TestScreen";

interface Props {
    client: DeusExMafiaClient;
}

export default class MainMenuScreen extends Component<Props> {
    public render(): ReactNode {
        return (
            <div>
                <p>Main Menu</p>
                <button onClick={() => this.goToTestScreen()}>Go to test screen</button>
            </div>
        );
    }

    private goToTestScreen(): void {
        this.props.client.screenHandler.screen = <TestScreen />;
    }
}
