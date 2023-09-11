import LobbyNetworkHandler from "../../handler/LobbyNetworkHandler";
import PacketBinaryReader from "../../io/PacketBinaryReader";
import ClientBoundPacket from "../ClientBoundPacket";

export default class PlayerLeftLobbyClientBoundPacket implements ClientBoundPacket<LobbyNetworkHandler> {
    private readonly _name: string;

    public constructor(reader: PacketBinaryReader) {
        this._name = reader.readString();
    }

    public get name() {
        return this._name;
    }

    public apply(listener: LobbyNetworkHandler): void {
        listener.onPlayerLeftLobby(this);
    }
}
