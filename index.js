var crypto = require('crypto');
var ecurve = require('ecurve').getCurveByName('secp256k1');
var bigi = require('bigi');

function sha256(token) {
    return crypto.createHash('sha256').update(token).digest();
}

function Generator(s) {
    if (s) {
        if (typeof s !== 'string') throw new Error('Passphrase must be string');
        this.privateKey = sha256(sha256(s));
    } else {
        this.privateKey = crypto.randomBytes(32);
    }

    this.publicKey = null;
}

Generator.prototype.getPrivateKey = function() {
    return this.privateKey;
};

Generator.prototype.getPublicKey = function() {
    if (this.publicKey !== null) return this.publicKey;

    var curvePt = ecurve.G.multiply(bigi.fromBuffer(this.privateKey));
    var x = curvePt.affineX.toBuffer(32);
    var y = curvePt.affineY.toBuffer(32);

    return Buffer.concat([new Buffer([0x04]), x, y]);
};

module.exports = Generator;