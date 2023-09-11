export default class BinaryWriter {
    private static readonly ENCODER: TextEncoder = new TextEncoder();
    
    private readonly dataView: DataView;
    private position: number = 0;

    public constructor() {
        this.dataView = new DataView(new ArrayBuffer(1024 * 4));
    }

    public get buffer(): ArrayBuffer {
        return this.dataView.buffer;
    }

    public writeBoolean(value: boolean): void {
        this.writeByte(value ? 1 : 0);
    }

    public writeByte(value: number): void {
        this.dataView.setInt8(this.position++, value);
    }

    public writeUnsignedByte(value: number): void {
        this.dataView.setUint8(this.position++, value);
    }

    public writeShort(value: number): void {
        this.dataView.setInt16(this.position, value);
        this.position += 2;
    }

    public writeUnsignedShort(value: number): void {
        this.dataView.setUint16(this.position, value);
        this.position += 2;
    }

    public writeInteger(value: number): void {
        this.dataView.setInt32(this.position, value);
        this.position += 4;
    }

    public writeUnsignedInteger(value: number): void {
        this.dataView.setUint32(this.position, value);
        this.position += 4;
    }

    public writeLong(value: bigint): void {
        this.dataView.setBigInt64(this.position, value);
        this.position += 8;
    }

    public writeUnsignedLong(value: bigint): void {
        this.dataView.setBigUint64(this.position, value);
        this.position += 8;
    }

    public writeFloat(value: number): void {
        this.dataView.setFloat32(this.position, value);
        this.position += 4;
    }

    public writeDouble(value: number): void {
        this.dataView.setFloat64(this.position, value);
        this.position += 8;
    }

    public writeString(value: string): void {
        let buffer: Uint8Array = BinaryWriter.ENCODER.encode(value);
        let length: number = buffer.length;
        if (length > 65535) {
            throw new Error(`String size was too large (${length} bytes, should be at most 65535 bytes)`);
        }
        this.writeUnsignedShort(buffer.length);
        for (let i: number = 0; i < length; i++) {
            this.writeUnsignedByte(buffer[i]);
        }
    }
}
