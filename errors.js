var inherits = require('util').inherits;

function PrivKeyGreaterZeroError() {
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = 'Private key must be greater than 0';
}

function PrivKeyLessCurveError() {
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = 'Private key must be less than the curve order';
}

function PasswordMustBeStringError() {
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = 'Password phrase must be string';
}

function PasswordIsEmptyError() {
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = 'Password phrase string is empty';
}

function InvalidHexStringError() {
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = 'Invalid HEX string';
}

function WrongBufferLengthError(length) {
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = 'Buffer length must be ' + length + ' bytes length';
}

inherits(PrivKeyGreaterZeroError, Error);
inherits(PrivKeyLessCurveError, Error);
inherits(PasswordMustBeStringError, Error);
inherits(PasswordIsEmptyError, Error);
inherits(InvalidHexStringError, Error);
inherits(WrongBufferLengthError, Error);

module.exports = {
    PrivKeyGreaterZeroError: PrivKeyGreaterZeroError,
    PrivKeyLessCurveError: PrivKeyLessCurveError,
    PasswordMustBeStringError: PasswordMustBeStringError,
    PasswordIsEmptyError: PasswordIsEmptyError,
    InvalidHexStringError: InvalidHexStringError,
    WrongBufferLengthError: WrongBufferLengthError
};