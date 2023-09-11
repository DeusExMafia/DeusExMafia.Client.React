import Player from "../../player/Player";
import BinaryReader from "./BinaryReader";

interface ValueReader<T> {
    (reader: PacketBinaryReader): T;
}

export default class PacketBinaryReader extends BinaryReader {
    public constructor(buffer: ArrayBuffer) {
        super(buffer);
    }

    public readPlayer(): Player {
        return new Player(this.readString());
    }

    public readCollection<T>(valueReader: ValueReader<T>): T[] {
        let size: number = this.readInteger();
        let values: T[] = new Array<T>(size);
        for (let i: number = 0; i < size; i++) {
            values[i] = valueReader(this);
        }
        return values;
    } 
}
