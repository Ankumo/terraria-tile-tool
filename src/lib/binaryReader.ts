import { CSTypes, CSTypesSet } from './types';

const sizes: Record<CSTypes, number> = {
    short: Int16Array.BYTES_PER_ELEMENT,
    sbyte: Int8Array.BYTES_PER_ELEMENT,
    byte: Uint8Array.BYTES_PER_ELEMENT,
    int: Int32Array.BYTES_PER_ELEMENT,
    uint: Uint32Array.BYTES_PER_ELEMENT,
    long: BigInt64Array.BYTES_PER_ELEMENT,
    ulong: BigUint64Array.BYTES_PER_ELEMENT,
    float: Float32Array.BYTES_PER_ELEMENT,
    double: Float64Array.BYTES_PER_ELEMENT,
    ushort: Uint16Array.BYTES_PER_ELEMENT,
    char: Int32Array.BYTES_PER_ELEMENT,
    boolean: 1,
    decimal: 16,
};

export class BinaryReader {
    constructor(public buf: ArrayBuffer, public offset = 0) {}

    get length() {
        return this.buf.byteLength;
    }

    readBytes(count: number | CSTypes) {
        if (typeof count === 'string') {
            count = sizes[count];
        }

        this.offset += count;
        return new Uint8Array(this.buf.slice(this.offset - count, this.offset));
    }

    readInt32() {
        const buf = this.readBytes(4);
        return buf[0] | (buf[1] << 8) | (buf[2] << 16) | (buf[3] << 24);
    }

    readInt16() {
        const buf = this.readBytes(2);
        return buf[0] | (buf[1] << 8);
    }

    readByte() {
        const buf = this.readBytes(1);
        return buf[0];
    }

    read7BitInt() {
        let result = 0;
        let shift = 0;
        let byte: number;

        do {
            if (shift === 35) {
                throw new Error('Bad 7 bit integer');
            }

            byte = this.readByte();
            result |= (byte & 0x7f) << shift;
            shift += 7;
        } while ((byte & 0x80) !== 0);

        return result;
    }

    readString() {
        const len = this.read7BitInt();

        if (len === 0) {
            return '';
        }

        const decoder = new TextDecoder('utf-8');
        return decoder.decode(this.readBytes(len));
    }

    readDouble() {
        const buf = this.readBytes(8);
        const view = new DataView(buf.buffer);

        return view.getFloat64(0, true);
    }

    readBoolean() {
        return !!this.readByte();
    }

    readLong() {
        const r = this.readInt32() >>> 0;
        const l = this.readInt32() >>> 0;

        return BigInt.asIntN(64, (BigInt(l) << 32n) | BigInt(r));
    }

    readDate() {
        try {
            if (!BigInt) {
                console.warn('BigInt is not supported');
                throw '';
            }

            const long = this.readLong();
            let ticks = long & 0x3fffffffffffffffn;

            if (
                (long & -9223372036854775808n) !== 0n &&
                ticks > 4611685154427387904n
            ) {
                ticks -= 4611686018427387904n;
            }

            //c# epoch ticks
            ticks -= 621355968000000000n;

            if (ticks < 0 || ticks > 3155378975999999999n) {
                throw '';
            }

            ticks /= 10000n;

            if (ticks < new Date(2012, 1, 1).getTime() || ticks > Date.now()) {
                throw '';
            }

            return new Date(Number(ticks)).toLocaleDateString('en-UK', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
            });
        } catch {
            //
        }

        return 'Unknown';
    }

    skip(types: CSTypes | Array<CSTypes | CSTypesSet>): void {
        if (Array.isArray(types)) {
            this.offset += types.reduce(
                (sum, t) =>
                    sum + (Array.isArray(t) ? sizes[t[0]] * t[1] : sizes[t]),
                0,
            );
        } else {
            this.offset += sizes[types];
        }
    }

    toBlob(): Blob {
        return new Blob([this.buf]);
    }
}
