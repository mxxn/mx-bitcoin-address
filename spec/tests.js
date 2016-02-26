var generator = require('../index');

describe('A bitcoin address generator', function() {
    it('generates from string', function() {
        var keys = generator.fromString('some test string');

        expect(keys.getPrivateKeyBuffer().toString('hex')).toBe('422d0091597ce6ec34f4f6c4c0d3db4a0dec70f2d57cd08858403dc4c5600efa');
        expect(keys.getPrivateKeyWif()).toBe('5JKRxEyFT9JHSwckH4NRCtHbJvo3mthVVB291YsX6bdu41kZF5k');
        expect(keys.getPublicKeyBuffer().toString('hex')).toBe('047ae683fb3b5004f2229aa62887356a83020870c9a9cd3d3c933aede88c145d78d082e4a4eba76cb51dfe3fb45e4d290120bba24b466f8885d47cd06243608f4b');
        expect(keys.getCompressedPublicKeyBuffer().toString('hex')).toBe('037ae683fb3b5004f2229aa62887356a83020870c9a9cd3d3c933aede88c145d78');
        expect(keys.getAddress()).toBe('1KFHDgryDKC5ebnoRa2zhVL51JhQwEQK48');
    });

    it('generates from hex', function() {
        var keys = generator.fromHex('422d0091597ce6ec34f4f6c4c0d3db4a0dec70f2d57cd08858403dc4c5600efa');

        expect(keys.getPrivateKeyBuffer().toString('hex')).toBe('422d0091597ce6ec34f4f6c4c0d3db4a0dec70f2d57cd08858403dc4c5600efa');
        expect(keys.getPrivateKeyWif()).toBe('5JKRxEyFT9JHSwckH4NRCtHbJvo3mthVVB291YsX6bdu41kZF5k');
        expect(keys.getPublicKeyBuffer().toString('hex')).toBe('047ae683fb3b5004f2229aa62887356a83020870c9a9cd3d3c933aede88c145d78d082e4a4eba76cb51dfe3fb45e4d290120bba24b466f8885d47cd06243608f4b');
        expect(keys.getCompressedPublicKeyBuffer().toString('hex')).toBe('037ae683fb3b5004f2229aa62887356a83020870c9a9cd3d3c933aede88c145d78');
        expect(keys.getAddress()).toBe('1KFHDgryDKC5ebnoRa2zhVL51JhQwEQK48');
    });

    it('generates from buffer', function () {
        var keys = generator.fromBuffer(new Buffer('422d0091597ce6ec34f4f6c4c0d3db4a0dec70f2d57cd08858403dc4c5600efa', 'hex'));

        expect(keys.getPrivateKeyBuffer().toString('hex')).toBe('422d0091597ce6ec34f4f6c4c0d3db4a0dec70f2d57cd08858403dc4c5600efa');
        expect(keys.getPrivateKeyWif()).toBe('5JKRxEyFT9JHSwckH4NRCtHbJvo3mthVVB291YsX6bdu41kZF5k');
        expect(keys.getPublicKeyBuffer().toString('hex')).toBe('047ae683fb3b5004f2229aa62887356a83020870c9a9cd3d3c933aede88c145d78d082e4a4eba76cb51dfe3fb45e4d290120bba24b466f8885d47cd06243608f4b');
        expect(keys.getCompressedPublicKeyBuffer().toString('hex')).toBe('037ae683fb3b5004f2229aa62887356a83020870c9a9cd3d3c933aede88c145d78');
        expect(keys.getAddress()).toBe('1KFHDgryDKC5ebnoRa2zhVL51JhQwEQK48');
    });

    it('generates from random', function () {
        var keys = generator.fromRandom({randomBytes: function(){ return new Buffer('422d0091597ce6ec34f4f6c4c0d3db4a0dec70f2d57cd08858403dc4c5600efa', 'hex')}});

        expect(keys.getPrivateKeyBuffer().toString('hex')).toBe('422d0091597ce6ec34f4f6c4c0d3db4a0dec70f2d57cd08858403dc4c5600efa');
        expect(keys.getPrivateKeyWif()).toBe('5JKRxEyFT9JHSwckH4NRCtHbJvo3mthVVB291YsX6bdu41kZF5k');
        expect(keys.getPublicKeyBuffer().toString('hex')).toBe('047ae683fb3b5004f2229aa62887356a83020870c9a9cd3d3c933aede88c145d78d082e4a4eba76cb51dfe3fb45e4d290120bba24b466f8885d47cd06243608f4b');
        expect(keys.getCompressedPublicKeyBuffer().toString('hex')).toBe('037ae683fb3b5004f2229aa62887356a83020870c9a9cd3d3c933aede88c145d78');
        expect(keys.getAddress()).toBe('1KFHDgryDKC5ebnoRa2zhVL51JhQwEQK48');
    });

    it('should throw PrivKeyGreaterZeroError if private key number less than 0', function () {
        expect(
            generator.fromBuffer.bind(null, new Buffer('0000000000000000000000000000000000000000000000000000000000000000', 'hex'))
        ).toThrowError(generator.PrivKeyGreaterZeroError);
    });

    it('should throw PrivKeyLessCurveError if private key number larger than fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364140', function () {
        expect(
            generator.fromBuffer.bind(null, new Buffer('fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141', 'hex'))
        ).toThrowError(generator.PrivKeyLessCurveError);
    });

    it('should throw PasswordMustBeStringError if fromString() method argument type is wrong', function () {
        expect(generator.fromString.bind(null, 1)).toThrowError(generator.PasswordMustBeStringError);
        expect(generator.fromString.bind(null, null)).toThrowError(generator.PasswordMustBeStringError);
        expect(generator.fromString.bind(null, true)).toThrowError(generator.PasswordMustBeStringError);
        expect(generator.fromString.bind(null, false)).toThrowError(generator.PasswordMustBeStringError);
        expect(generator.fromString.bind(null, {})).toThrowError(generator.PasswordMustBeStringError);
        expect(generator.fromString.bind(null, undefined)).toThrowError(generator.PasswordMustBeStringError);
        expect(generator.fromString.bind(null, function(){})).toThrowError(generator.PasswordMustBeStringError);
    });

    it('should throw PasswordIsEmptyError if fromString() method argument length is 0', function () {
        expect(generator.fromString.bind(null, '')).toThrowError(generator.PasswordIsEmptyError);
    });

    it('should throw InvalidHexStringError if fromHex() method argument is wrong hex string', function () {
        expect(generator.fromHex.bind(null, '')).toThrowError(generator.InvalidHexStringError);
        expect(generator.fromHex.bind(null, 'fafafafafafafafa')).toThrowError(generator.InvalidHexStringError);
        expect(generator.fromHex.bind(null, 'G22d0091597ce6ec34f4f6c4c0d3db4a0dec70f2d57cd08858403dc4c5600efa')).toThrowError(generator.InvalidHexStringError);
        expect(generator.fromHex.bind(null, null)).toThrowError(generator.InvalidHexStringError);
        expect(generator.fromHex.bind(null, true)).toThrowError(generator.InvalidHexStringError);
        expect(generator.fromHex.bind(null, false)).toThrowError(generator.InvalidHexStringError);
        expect(generator.fromHex.bind(null, {})).toThrowError(generator.InvalidHexStringError);
        expect(generator.fromHex.bind(null, undefined)).toThrowError(generator.InvalidHexStringError);
        expect(generator.fromHex.bind(null, function(){})).toThrowError(generator.InvalidHexStringError);
    });

    it('should throw WrongBufferLengthError if fromBuffer() method argument wrong length', function () {
        expect(generator.fromBuffer.bind(null, new Buffer('ffff', 'hex'))).toThrowError(generator.WrongBufferLengthError);
    });
});