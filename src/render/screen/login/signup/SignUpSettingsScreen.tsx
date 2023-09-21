import { Component, FormEvent, ReactNode } from "react";
import AppData from "../../../../AppData.json";
import "./SignUpSettingsScreen.css";
import DeusExMafiaClient from "../../../../DeusExMafiaClient";
import MainMenuScreen from "../../MainMenuScreen";

interface Props {
    token: string;
    client: DeusExMafiaClient;
}

interface State {
    username: string;
}

export default class SignUpSettingsScreen extends Component<Props, State> {
    public render(): ReactNode {
        return (
            <div className="signup-settings-box">
                <form action={AppData.accountServerAddress} method="post" onSubmit={e => this.signUp(e)}>
                    <table className="signup-settings-input">
                        <tbody>
                            <tr>
                                <th>E-mail</th>
                                <td>whatever@gmail.com</td>
                            </tr>
                            <tr>
                                <th>
                                    <label htmlFor="Username">Username</label>
                                </th>
                                <td>
                                    <input name="Username" id="username" type="text" pattern="[a-zA-Z0-9_]{3,16}" required title="Enter an alphanumeric (a-z, A-Z, 0-9, _) username of at least 3 and at most 16 characters." />
                                    <div className="signup-settings-error"></div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    {/* <input ref={e => this.input = e} type="text" onChange={e => this.setState({
                        username: e.target.value
                    })} pattern="[a-zA-Z0-9_]{3,16}" onInvalid={e => {
                        console.log("INVAAAALID", e);
                    }} /> */}
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        );
    }

    private async signUp(e: FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();
        let url: URL = new URL(this.props.token, AppData.accountServerAddress);
        let formData: FormData = new FormData(e.currentTarget);
        let response: Response = await fetch(url, {
            body: formData,
            method: "post"
        });

        if (response.ok) {
            this.props.client.screenHandler.screen = () => <MainMenuScreen client={this.props.client} />;
            return;
        }
        console.log("lol u were wrong: " + response.status + ": " + await response.text());
    }
}
