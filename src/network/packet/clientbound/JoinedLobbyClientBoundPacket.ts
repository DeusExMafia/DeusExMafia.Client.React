import Player from "../../../player/Player";
import LoginNetworkHandler from "../../handler/LoginNetworkHandler";
import PacketBinaryReader from "../../io/PacketBinaryReader";
import ClientBoundPacket from "../ClientBoundPacket";

export default class JoinedLobbyClientBoundPacket implements ClientBoundPacket<LoginNetworkHandler> {
    private readonly _players: Player[];

    public constructor(reader: PacketBinaryReader) {
        this._players = reader.readCollection(reader => reader.readPlayer());
    }

    public get players() {
        return this._players;
    }
    
    public apply(listener: LoginNetworkHandler): void {
        listener.onJoinedLobby(this);
    }
}
