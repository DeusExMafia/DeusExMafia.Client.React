export default class BinaryReader {
    private static readonly DECODER: TextDecoder = new TextDecoder();

    private readonly dataView: DataView;
    private _position: number = 0;

    public constructor(buffer: ArrayBuffer) {
        this.dataView = new DataView(buffer);
    }

    public get position() {
        return this._position;
    }

    public readBoolean(): boolean {
        return this.readByte() !== 0;
    }

    public readByte(): number {
        return this.dataView.getInt8(this._position++);
    }

    public readUnsignedByte(): number {
        return this.dataView.getUint8(this._position++);
    }

    public readShort(): number {
        let value = this.dataView.getInt16(this._position);
        this._position += 2;
        return value;
    }

    public readUnsignedShort(): number {
        let value = this.dataView.getUint16(this._position);
        this._position += 2;
        return value;
    }

    public readInteger(): number {
        let value = this.dataView.getInt32(this._position);
        this._position += 4;
        return value;
    }

    public readUnsignedInteger(): number {
        let value = this.dataView.getUint32(this._position);
        this._position += 4;
        return value;
    }

    public readLong(): bigint {
        let value = this.dataView.getBigInt64(this._position);
        this._position += 8;
        return value;
    }

    public readUnsignedLong(): bigint {
        let value = this.dataView.getBigUint64(this._position);
        this._position += 8;
        return value;
    }

    public readFloat(): number {
        let value = this.dataView.getFloat32(this._position);
        this._position += 4;
        return value;
    }

    public readDouble(): number {
        let value = this.dataView.getFloat64(this._position);
        this._position += 8;
        return value;
    }

    public readString(): string {
        let length: number = this.readUnsignedShort();
        let buffer: ArrayBuffer = this.readBuffer(length);
        return BinaryReader.DECODER.decode(buffer);
    }

    private readBuffer(length: number): ArrayBuffer {
        let buffer: ArrayBuffer = this.dataView.buffer.slice(this._position, this._position + length);
        this._position += length;
        return buffer;
    }
}
