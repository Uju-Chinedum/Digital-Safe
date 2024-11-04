import { redisClient } from "../config";

const blacklistToken = async (token: string, exp: number) => {
  const expirationTime = exp ? exp - Math.floor(Date.now() / 1000) : 0;

  // Check if expirationTime is a positive number, otherwise set a default
  const ttl = expirationTime > 0 ? expirationTime : 3600; // 1 hour fallback if no valid expiration time

  await redisClient.set(token, "blacklisted", {
    EX: ttl,
  });
};

export default blacklistToken;
