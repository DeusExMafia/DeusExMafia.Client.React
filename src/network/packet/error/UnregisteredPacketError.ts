import NetworkState from "../../NetworkState";
import NetworkHandler from "../../handler/NetworkHandler";
import PacketError from "./PacketError";

export default class UnregisteredPacketError<T extends NetworkHandler<T>> extends PacketError<T> {
    public constructor(name: string, state: NetworkState<T>) {
        super(state, `Unregistered packet ${name} in state ${state.name}`);
    }
}
