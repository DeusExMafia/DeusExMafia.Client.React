import { Component, ReactNode } from "react";
import { GoogleLogout } from "react-google-login";
import AppData from "../../../AppData.json";
import DeusExMafiaClient from "../../../DeusExMafiaClient";
import MainMenuScreen from "../../screen/MainMenuScreen";

interface Props {
    client: DeusExMafiaClient;
}

export default class GoogleLogoutButton extends Component<Props> {
    public render(): ReactNode {
        return (
            <div>
                <GoogleLogout
                    clientId={AppData.auth.google.clientId}
                    buttonText={"Log Out"}
                    onLogoutSuccess={this.loggedOut.bind(this)}
                />
            </div>
        );
    }

    private loggedOut(): void {
        this.props.client.screenHandler.screen = () => <MainMenuScreen client={this.props.client} />
    }
}
