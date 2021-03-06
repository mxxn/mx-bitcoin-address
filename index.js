var crypto = require('crypto');
var secp256k1 = require('ecurve').getCurveByName('secp256k1');
var bigi = require('bigi');
var bs58 = require('bs58');
var errors = require('./errors');

var KEY_SIZE = 32;
var hexKeyReqexp = new RegExp('^[0-9a-f]{' + KEY_SIZE * 2 + '}$', 'i');

function sha256(token) {
    return crypto.createHash('sha256').update(token).digest();
}

function ripemd160(token) {
    return crypto.createHash('ripemd160').update(token).digest();
}

function getCoordinates(privateKey) {
    var curvePt = secp256k1.G.multiply(privateKey);
    return {x: curvePt.affineX.toBuffer(32), y: curvePt.affineY.toBuffer(32)};
}

function Generator(buf) {
    this.privateKey = {
        buffer: buf,
        bigi: bigi.fromBuffer(buf),
        wif: null
    };

    this.coordinates = null;

    if (this.privateKey.bigi.signum() <= 0)
        throw new errors.PrivKeyGreaterZeroError();

    if (this.privateKey.bigi.compareTo(secp256k1.n) >= 0)
        throw new errors.PrivKeyLessCurveError();

    this.publicKey = {
        buffer: null,
        address: null,
        compressed: null
    }
}

Generator.fromString = function(s) {
    if (typeof s !== 'string') throw new errors.PasswordMustBeStringError();
    if (s.length === 0) throw new errors.PasswordIsEmptyError();

    return new Generator(sha256(sha256(s)));
};

Generator.fromRandom = function(randomizer) {
    randomizer = randomizer || crypto;
    return new Generator(randomizer.randomBytes(KEY_SIZE));
};

Generator.fromHex = function(hex) {
    if (!hexKeyReqexp.test(hex)) throw new errors.InvalidHexStringError();

    return new Generator(Buffer(hex, 'hex'));
};

Generator.fromBuffer = function(buf) {
    if (buf.length !== KEY_SIZE) throw new errors.WrongBufferLengthError(KEY_SIZE);

    return new Generator(buf);
};

Generator.prototype.getPrivateKeyBuffer = function() {
    return this.privateKey.buffer;
};

Generator.prototype.getPrivateKeyWif = function() {
    if (this.privateKey.wif === null) {
        var ext = Buffer.concat([new Buffer([0x80]), this.getPrivateKeyBuffer()]);
        this.privateKey.wif = bs58.encode(Buffer.concat([ext, sha256(sha256(ext)).slice(0, 4)]));
    }

    return this.privateKey.wif;
};

Generator.prototype.getPublicKeyBuffer = function() {
    if (this.publicKey.buffer === null) {
        this.coordinates = this.coordinates || getCoordinates(this.privateKey.bigi);

        this.publicKey.buffer = Buffer.concat([
            new Buffer([0x04]),
            this.coordinates.x,
            this.coordinates.y
        ]);
    }

    return this.publicKey.buffer;
};

Generator.prototype.getCompressedPublicKeyBuffer = function () {
    if (this.publicKey.compressed === null) {
        this.coordinates = this.coordinates || getCoordinates(this.privateKey.bigi);

        this.publicKey.compressed = Buffer.concat([
            new Buffer([this.coordinates.y.readUInt8(this.coordinates.y.length - 1) % 2 === 0 ? 0x02 : 0x03]),
            this.coordinates.x
        ]);
    }

    return this.publicKey.compressed;
};

Generator.prototype.getAddress = function() {
    if (this.publicKey.address === null) {
        var ripemd = Buffer.concat([new Buffer([0x00]), ripemd160(sha256(this.getPublicKeyBuffer()))]);
        this.publicKey.address = bs58.encode(Buffer.concat([ripemd, sha256(sha256(ripemd)).slice(0, 4)]));
    }

    return this.publicKey.address;
};

module.exports = {
    fromString: Generator.fromString,
    fromRandom: Generator.fromRandom,
    fromHex: Generator.fromHex,
    fromBuffer: Generator.fromBuffer,
    PrivKeyGreaterZeroError: errors.PrivKeyGreaterZeroError,
    PrivKeyLessCurveError: errors.PrivKeyLessCurveError,
    PasswordMustBeStringError: errors.PasswordMustBeStringError,
    PasswordIsEmptyError: errors.PasswordIsEmptyError,
    InvalidHexStringError: errors.InvalidHexStringError,
    WrongBufferLengthError: errors.WrongBufferLengthError
};