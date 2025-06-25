export async function encryptByKeyV2(text:string, keyBase64:any) {
        // Decode base64 key to Uint8Array
        const keyBytes = Uint8Array.from(atob(keyBase64), char => char.charCodeAt(0));
        if (keyBytes.length !== 32) {
            throw new Error('Invalid key length: must be 256 bits (32 bytes)');
        }

        // Generate a random 16-byte IV
        const iv = crypto.getRandomValues(new Uint8Array(16));

        // Import the raw key into the Web Crypto API
        const key = await crypto.subtle.importKey(
            'raw',
            keyBytes,
            { name: 'AES-CBC' },
            false,
            ['encrypt']
        );

        // Encode the text to Uint8Array
        const encoder = new TextEncoder();
        const data = encoder.encode(text);

        // Encrypt the data using AES-CBC
        const encryptedBuffer = await crypto.subtle.encrypt(
            {
                name: 'AES-CBC',
                iv,
            },
            key,
            data
        );

        // Convert encrypted buffer and IV to base64 strings
        const encryptedBytes = new Uint8Array(encryptedBuffer);
        const encryptedBase64 = btoa(String.fromCharCode(...encryptedBytes));
        const ivBase64 = btoa(String.fromCharCode(...iv));

        // Return in the format "IV:EncryptedData"
        return `${ ivBase64 }:${ encryptedBase64 }`;
    }