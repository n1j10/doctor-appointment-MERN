const getJwtSecret = () => {
  const secret = process.env.SECRET_KEY || process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT secret is missing. Set SECRET_KEY (or JWT_SECRET) in your .env file.");
  }

  return secret;
};

export default getJwtSecret;
