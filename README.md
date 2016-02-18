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

### Static

#### fromRandom()

Generates key pair from random number

#### fromString(string password)

Generates key pair from string (brainwallet, not safe). Uses double sha256.

#### fromHex(string hex)

Generates key pair from hex string (string must contain hex chars only and be 64 chars length)

### Instance

#### getPrivateKeyBuffer(): Buffer

Returns buffer with your generated private key

#### getPrivateKeyWif(): string

Returns string with your private key in WIF format

#### getPublicKeyBuffer(): Buffer

Returns buffer with your generated public key

#### getAddress(): string

Returns your generated bitcoin address
