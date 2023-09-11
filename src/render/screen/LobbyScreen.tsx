import { Component, ReactNode } from "react";
import DeusExMafiaClient from "../../DeusExMafiaClient";
import Lobby from "../../lobby/Lobby";
import Player from "../../player/Player";
import ChatBoxComponent from "../component/ChatBoxComponent";
import "./LobbyScreen.css";

interface Props {
    client: DeusExMafiaClient;
    lobby: Lobby;
    player: Player;
}

export default class LobbyScreen extends Component<Props> {
    public render(): ReactNode {
        return (
            <div className="lobby-screen-box">
                <div className="lobby-screen-title">Lobby</div>
                <div className="lobby-screen-toolbar">
                    <button onClick={() => this.disconnect()}>Disconnect</button>
                </div>
                <div className="lobby-screen-players">
                    <div className="player-label">Players ({this.props.lobby.playerCount} / 15)</div>
                    <div>
                        {this.props.lobby.players.map((player, index) => <div key={`player${index}`}>{player.name}</div>)}
                    </div>
                </div>
                <ChatBoxComponent client={this.props.client} lobby={this.props.lobby} className="lobby-screen-chat" />
            </div>
        );
    }

    private disconnect(): void {
        this.props.client.disconnect();
    }
}
