import { Component, ReactNode } from "react";
import { GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";
import DeusExMafiaClient from "../../../../DeusExMafiaClient";
import GoogleLoginButton from "../../../component/auth/GoogleLoginButton";
import "./SignUpScreen.css";
import SignUpSettingsScreen from "./SignUpSettingsScreen";

interface Props {
    client: DeusExMafiaClient;
}

interface State {
    token?: string;
}

export default class SignUpScreen extends Component<Props, State> {
    public constructor(props: Props) {
        super(props);
        this.state = {};
    }
    public render(): ReactNode {
        return (
            <div className="signup-box">
                <div className="signup-title">Sign Up</div>
                <div className="signup-body">
                    <GoogleLoginButton client={this.props.client} text="Sign Up with Google" onSuccess={response => this.signUp(response)} />
                    <div className="signup-settings-body">
                        {this.state.token != null &&
                            <SignUpSettingsScreen client={this.props.client} token={this.state.token} />
                        }
                    </div>
                </div>
            </div>
        );
    }

    private async signUp(response: GoogleLoginResponse | GoogleLoginResponseOffline): Promise<void> {
        if (!("tokenId" in response)) {
            return;
        }
        this.setState({
            token: response.tokenId
        });
        // this.props.client.screenHandler.screen = () => <SignUpSettingsScreen token={response.tokenId} />;
    }
}
