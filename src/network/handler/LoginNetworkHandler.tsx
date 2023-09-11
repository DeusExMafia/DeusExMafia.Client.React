import DeusExMafiaClient from "../../DeusExMafiaClient";
import Lobby from "../../lobby/Lobby";
import Player from "../../player/Player";
import LobbyScreen from "../../render/screen/LobbyScreen";
import NetworkState from "../NetworkState";
import JoinedLobbyClientBoundPacket from "../packet/clientbound/JoinedLobbyClientBoundPacket";
import LobbyNetworkHandler from "./LobbyNetworkHandler";
import NetworkHandler from "./NetworkHandler";

export default class LoginNetworkHandler extends NetworkHandler<LoginNetworkHandler> {
    public constructor(webSocket: WebSocket, client: DeusExMafiaClient) {
        super(client, webSocket, NetworkState.LOGIN);
    }

    public onJoinedLobby(packet: JoinedLobbyClientBoundPacket): void {
        let players: Player[] = packet.players;
        let player: Player = players[players.length - 1];

        let lobby: Lobby = new Lobby();
        lobby.addPlayers(players);
        this.client.player = player;
        this.client.clientConnection?.upgrade(new LobbyNetworkHandler(this.webSocket, this.client, lobby));
        this.client.screenHandler.screen = () => <LobbyScreen client={this.client} lobby={lobby} player={player} />;
    }
}
