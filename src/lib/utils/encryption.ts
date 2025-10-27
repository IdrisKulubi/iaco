import crypto from 'crypto';

// AES-256-GCM encryption helpers
// Derive a 32-byte key from BETTER_AUTH_SECRET (or fallback to NODE_ENV for dev)
function getKey() {
  const secret = process.env.BETTER_AUTH_SECRET || process.env.AUTH_SECRET || 'dev-secret';
  return crypto.createHash('sha256').update(secret).digest(); // 32 bytes
}

export function encrypt(plaintext: string): string {
  const iv = crypto.randomBytes(12); // GCM nonce
  const key = getKey();
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const encrypted = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
  const authTag = cipher.getAuthTag();
  // Store as base64: iv.authTag.ciphertext
  return [iv.toString('base64'), authTag.toString('base64'), encrypted.toString('base64')].join(':');
}

export function decrypt(payload: string): string {
  const [ivB64, tagB64, dataB64] = payload.split(':');
  const iv = Buffer.from(ivB64, 'base64');
  const authTag = Buffer.from(tagB64, 'base64');
  const data = Buffer.from(dataB64, 'base64');
  const key = getKey();
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAuthTag(authTag);
  const decrypted = Buffer.concat([decipher.update(data), decipher.final()]);
  return decrypted.toString('utf8');
}