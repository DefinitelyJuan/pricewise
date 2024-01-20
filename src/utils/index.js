import { SHA256 } from 'crypto-js';

export const fromTexttoSha256 = (text) => SHA256(text).toString();
