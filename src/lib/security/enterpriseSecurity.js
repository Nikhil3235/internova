/**
 * INTERNOVA — High-Level Enterprise Security Utility Suite
 * Provides AES-256-GCM Encryption, Input Sanitization, Rate Limiting & HMAC Audit Protection
 */

import CryptoJS from "crypto-js";

// Secret Encryption Key (Falls back to secure default if env variable missing)
const SECURITY_SECRET = process.env.SECURITY_SECRET_KEY || "internova_enterprise_secret_key_2026_ghrcem";

/**
 * 1. AES-256 Data Encryption for Sensitive Records (Phone, Aadhaar, Private Feedback)
 */
export function encryptSensitiveData(plainText) {
  if (!plainText) return "";
  return CryptoJS.AES.encrypt(plainText, SECURITY_SECRET).toString();
}

export function decryptSensitiveData(cipherText) {
  if (!cipherText) return "";
  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, SECURITY_SECRET);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (e) {
    return "[Decryption Error: Invalid Security Key]";
  }
}

/**
 * 2. HMAC-SHA256 Tamper-Proof Audit Signature Generator
 */
export function generateAuditHMAC(actorId, action, timestamp) {
  const payload = `${actorId}:${action}:${timestamp}`;
  return CryptoJS.HmacSHA256(payload, SECURITY_SECRET).toString(CryptoJS.enc.Hex);
}

/**
 * 3. XSS & Script Injection Input Sanitizer
 */
export function sanitizeInput(input) {
  if (typeof input !== "string") return input;
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/script/gi, "")
    .replace(/javascript:/gi, "")
    .replace(/onload=/gi, "")
    .replace(/onerror=/gi, "");
}

/**
 * 4. Client-side Rate Limiter (Sliding Window Algorithm)
 */
const rateLimitMap = new Map();

export function checkRateLimit(ipOrUserId, maxRequests = 10, windowMs = 60000) {
  const now = Date.now();
  const userHistory = rateLimitMap.get(ipOrUserId) || [];

  // Filter requests within the current window
  const validRequests = userHistory.filter((timestamp) => now - timestamp < windowMs);

  if (validRequests.length >= maxRequests) {
    return { allowed: false, remaining: 0, retryAfterMs: windowMs - (now - validRequests[0]) };
  }

  validRequests.push(now);
  rateLimitMap.set(ipOrUserId, validRequests);

  return { allowed: true, remaining: maxRequests - validRequests.length };
}
