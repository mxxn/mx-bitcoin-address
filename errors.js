function PrivKeyGreaterZeroError() {
    this.name = 'PrivKeyGreaterZeroError';
    this.message = 'Private key must be greater than 0';
    this.stack = (new Error()).stack;
}
PrivKeyGreaterZeroError.prototype = Object.create(Error.prototype);
PrivKeyGreaterZeroError.prototype.constructor = PrivKeyGreaterZeroError;

function PrivKeyLessCurveError() {
    this.name = 'PrivKeyLessCurveError';
    this.message = 'Private key must be less than the curve order';
    this.stack = (new Error()).stack;
}
PrivKeyLessCurveError.prototype = Object.create(Error.prototype);
PrivKeyLessCurveError.prototype.constructor = PrivKeyLessCurveError;

function PasswordMustBeStringError() {
    this.name = 'PasswordMustBeStringError';
    this.message = 'Password phrase must be string';
    this.stack = (new Error()).stack;
}
PasswordMustBeStringError.prototype = Object.create(Error.prototype);
PasswordMustBeStringError.prototype.constructor = PasswordMustBeStringError;

function PasswordIsEmptyError() {
    this.name = 'PasswordIsEmptyError';
    this.message = 'Password phrase string is empty';
    this.stack = (new Error()).stack;
}
PasswordIsEmptyError.prototype = Object.create(Error.prototype);
PasswordIsEmptyError.prototype.constructor = PasswordIsEmptyError;

function InvalidHexStringError() {
    this.name = 'InvalidHexStringError';
    this.message = 'Invalid HEX string';
    this.stack = (new Error()).stack;
}
InvalidHexStringError.prototype = Object.create(Error.prototype);
InvalidHexStringError.prototype.constructor = InvalidHexStringError;

module.exports = {
    PrivKeyGreaterZeroError: PrivKeyGreaterZeroError,
    PrivKeyLessCurveError: PrivKeyLessCurveError,
    PasswordMustBeStringError: PasswordMustBeStringError,
    PasswordIsEmptyError: PasswordIsEmptyError,
    InvalidHexStringError: InvalidHexStringError
};