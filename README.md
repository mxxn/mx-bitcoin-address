# mx-bitcoin-address
Bitcoin addresses generator


## Installation

    npm i --save mx-bitcoin-address
    
## Usage
    
```js
var generator = require('mx-bitcoin-address');

var keys = generator.fromRandom();
//var keys = generator.fromString('your long password phrase here');
//var keys = generator.fromHex('0C28FCA386C7A227600B2FE50B7CAE11EC86D3BF1FBE471BE89827E19D72AA1D');

console.log(keys.getPrivateKeyBuffer());
console.log(keys.getPrivateKeyWif());
console.log(keys.getPublicKeyBuffer());
console.log(keys.getAddress());
```
    
## API
Note: generator throws error if generated private key larger then  
FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364140

### Static

#### fromRandom()

Generates key pair from random number

#### fromString(string password)

Generates key pair from string (brainwallet, not safe). Uses double sha256.  
Throws errors if password wrong type or 0 length

#### fromHex(string hex)

Generates key pair from hex string (string must contain hex chars only and be 64 chars length)  
Throws error if hex string wrong format

#### fromBuffer(buffer)

Generates key pair from buffer (buffer must be 32 bytes length)
Throws error if buffer is not 32 bytes length

### Instance

#### getPrivateKeyBuffer(): Buffer

Returns buffer with your generated private key

#### getPrivateKeyWif(): string

Returns string with your private key in WIF format

#### getPublicKeyBuffer(): Buffer

Returns buffer with your generated public key

#### getAddress(): string

Returns your generated bitcoin address
