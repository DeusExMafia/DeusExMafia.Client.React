import { Component, ReactNode } from "react";
import DeusExMafiaClient from "../../DeusExMafiaClient";
import "./MainMenuScreen.css";

interface Props {
    client: DeusExMafiaClient;
}

export default class MainMenuScreen extends Component<Props> {
    public render(): ReactNode {
        return (
            <div className="main-menu-box">
                <div className="main-menu-title">Main Menu</div>
                <div className="main-menu-buttons">
                    <button onClick={() => this.props.client.connect()}>Connect</button>
                </div>
            </div>
        );
    }
}
