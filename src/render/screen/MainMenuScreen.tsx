import { Component, ReactNode } from "react";
import DeusExMafiaClient from "../../DeusExMafiaClient";
import GoogleLoginButton from "../component/auth/GoogleLoginButton";
import "./MainMenuScreen.css";
import SignUpScreen from "./login/signup/SignUpScreen";
import { GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";
import GoogleLogoutButton from "../component/auth/GoogleLogoutButton";

interface Props {
    client: DeusExMafiaClient;
}

export default class MainMenuScreen extends Component<Props> {
    public render(): ReactNode {
        return (
            <div className="main-menu-box">
                <div className="main-menu-title">Main Menu</div>
                <div className="main-menu-buttons">
                    <GoogleLoginButton client={this.props.client} text="Log In with Google" onSuccess={response => this.login(response)} />
                    <GoogleLogoutButton client={this.props.client} />
                    <button onClick={() => this.goToCreateAccountPage()}>Create Account</button>
                </div>
            </div>
        );
    }
    
    private async login(response: GoogleLoginResponse | GoogleLoginResponseOffline): Promise<void> {
        if ("tokenId" in response) {
            this.props.client.connect(response.tokenId);
        }
    }

    private goToCreateAccountPage(): void {
        this.props.client.screenHandler.screen = () => <SignUpScreen client={this.props.client} />
    }
}
