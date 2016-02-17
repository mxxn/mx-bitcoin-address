var crypto = require('crypto');
var secp256k1 = require('ecurve').getCurveByName('secp256k1');
var bigi = require('bigi');

function sha256(token) {
    return crypto.createHash('sha256').update(token).digest();
}

function ripemd160(token) {
    return crypto.createHash('ripemd160').update(token).digest();
}

function Generator(buf) {
    if (buf.length !== 32) throw new Error('Private key buffer length must be 32 bytes');

    this.privateKey = {
        buffer: buf,
        bigi: bigi.fromBuffer(buf)
    };

    if (this.privateKey.bigi.signum() <= 0) throw new Error('Private key must be greater than 0');
    if (this.privateKey.bigi.compareTo(secp256k1.n) >= 0) throw new Error('Private key must be less than the curve order');

    this.publicKey = {
        buffer: null,
        bigi: null
    }
}

Generator.fromString = function(s) {
    if (!s || typeof s !== 'string') throw new Error('Passphrase must be string');

    return new Generator(sha256(sha256(s)));
};

Generator.fromRandom = function() {
    return new Generator(crypto.randomBytes(32));
};

Generator.prototype.getPrivateKeyBuffer = function() {
    return this.privateKey.buffer;
};

Generator.prototype.getPrivateKeyBigi = function() {
    return this.privateKey.bigi;
};

Generator.prototype.getPublicKeyBuffer = function() {
    if (this.publicKey.buffer !== null) return this.publicKey.buffer;

    var curvePt = secp256k1.G.multiply(this.privateKey.bigi);
    var x = curvePt.affineX.toBuffer(32);
    var y = curvePt.affineY.toBuffer(32);

    this.publicKey.buffer = Buffer.concat([new Buffer([0x04]), x, y]);
    return this.publicKey.buffer;
};

Generator.prototype.getPublicKeyBigi = function () {
    if (this.publicKey.bigi !== null) return this.privateKey.bigi;

    this.privateKey.bigi = bigi.fromBuffer(this.getPublicKeyBuffer());
    return this.privateKey.bigi;
};

module.exports = Generator;