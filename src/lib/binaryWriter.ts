import { BinaryReader } from './binaryReader';

export class BinaryWriter {
    private buf: ArrayBuffer;
    private dv: DataView;
    private array: Uint8Array;

    public size = 0;
    private _offset = 0;

    constructor(public cap: number) {
        this.buf = new ArrayBuffer(cap);
        this.dv = new DataView(this.buf);
        this.array = new Uint8Array(this.buf);
    }

    get offset() {
        return this._offset;
    }

    set offset(val) {
        this._offset = val;

        if (val > this.size) {
            this.size = val;
        }
    }

    get bytes() {
        return this.buf.slice(0, this.size);
    }

    write(num: number) {
        this.dv.setUint8(this.offset++, num);
    }

    writeBytes(array: ArrayLike<number> | ArrayBuffer) {
        let arr: ArrayLike<number> | null =
            array instanceof ArrayBuffer ? new Uint8Array(array) : array;

        this.array.set(arr, this.offset);
        this.offset += arr.length;

        arr = null;
    }

    writeInt32(num: number) {
        this.dv.setInt32(this.offset, num, true);
        this.offset += Int32Array.BYTES_PER_ELEMENT;
    }

    writeInt16(num: number) {
        this.dv.setInt16(this.offset, num, true);
        this.offset += Int16Array.BYTES_PER_ELEMENT;
    }

    writeFrom(r: BinaryReader, offset: number, count: number) {
        this.writeBytes(r.buf.slice(offset, offset + count));
    }

    toBlob() {
        return new Blob([this.bytes]);
    }
}
