import { Component, ReactNode } from "react";
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";
import AppData from "../../../AppData.json";
import DeusExMafiaClient from "../../../DeusExMafiaClient";

interface SuccessfulGoogleLoginCallback {
    (response: GoogleLoginResponse | GoogleLoginResponseOffline): Promise<void>
}

interface Props {
    client: DeusExMafiaClient;
    text: string;
    onSuccess: SuccessfulGoogleLoginCallback;
}

export default class GoogleLoginButton extends Component<Props> {
    public render(): ReactNode {
        return (
            <div>
                <GoogleLogin
                    clientId={AppData.auth.google.clientId}
                    buttonText={this.props.text}
                    onSuccess={this.props.onSuccess}
                    onFailure={this.onFailure.bind(this)}
                    cookiePolicy="single_host_origin"
                    isSignedIn={true}
                />
            </div>
        );
    }

    private onFailure(error: any): void {
        console.log("log in failed: ", error);
    }
}
