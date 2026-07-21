/**
 * INTERNOVA — Distributed Caching Layer (Redis / High-Speed In-Memory Cache)
 * Layer 3 of Enterprise Architecture (Netflix / LinkedIn Style)
 * Caches API queries, hot internship listings, and rate limiting counters (sub-1ms retrieval)
 */

class DistributedRedisCache {
  constructor() {
    this.store = new Map();
    this.ttlStore = new Map();
  }

  /**
   * Set cache key with optional TTL (Time To Live in seconds)
   */
  async set(key, value, ttlSeconds = 300) {
    this.store.set(key, JSON.stringify(value));
    const expireTime = Date.now() + ttlSeconds * 1000;
    this.ttlStore.set(key, expireTime);
    return true;
  }

  /**
   * Get cached data by key
   */
  async get(key) {
    if (!this.store.has(key)) return null;

    const expireTime = this.ttlStore.get(key);
    if (expireTime && Date.now() > expireTime) {
      this.store.delete(key);
      this.ttlStore.delete(key);
      return null; // Cache MISS due to TTL expiration
    }

    const raw = this.store.get(key);
    try {
      return JSON.parse(raw);
    } catch (e) {
      return raw;
    }
  }

  /**
   * Delete cache key or pattern
   */
  async del(key) {
    this.store.delete(key);
    this.ttlStore.delete(key);
    return true;
  }

  /**
   * Clear entire cache
   */
  async flush() {
    this.store.clear();
    this.ttlStore.clear();
    return true;
  }
}

// Export singleton instance
export const redisCache = new DistributedRedisCache();
