import { Component, ReactNode } from "react";
import DeusExMafiaClient from "../../DeusExMafiaClient";
import "./DisconnectedScreen.css";
import MainMenuScreen from "./MainMenuScreen";

interface Props {
    client: DeusExMafiaClient;
    reason: string;
}

export default class DisconnectedScreen extends Component<Props> {
    public render(): ReactNode {
        return (
            <div className="disconnected-container">
                <p>Disconnected from Server</p>
                <p>Reason: {this.props.reason}</p>
                <button onClick={() => this.returnToMainMenu()}>Return to Main Menu</button>
            </div>
        );
    }

    private returnToMainMenu(): void {
        this.props.client.screenHandler.screen = () => <MainMenuScreen client={this.props.client} />
    }
}
