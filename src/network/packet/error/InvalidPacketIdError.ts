import NetworkState from "../../NetworkState";
import NetworkHandler from "../../handler/NetworkHandler";
import PacketError from "./PacketError";

export default class InvalidPacketIdError<T extends NetworkHandler<T>> extends PacketError<T> {
    private readonly _id: number;

    public constructor(id: number, state: NetworkState<T>) {
        super(state, `Invalid packet id ${id} in state ${state.name}`);
        this._id = id;
    }

    public get id(): number {
        return this._id;
    }
}
