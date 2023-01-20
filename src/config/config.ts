import * as dotenv from 'dotenv';
dotenv.config();

// App
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const PORT = parseInt(process.env.PORT, 10) || 4000;
export const SERVER_URL = process.env.SERVER_URL;
export const LISTEN_ON = process.env.LISTEN_ON || '0.0.0.0';
export const TIMEZONE = process.env.TIMEZONE || 'Asia/Ho_Chi_Minh';
export const API_PREFIX = process.env.API_PREFIX || 'api';
export const PAGE_SIZE = parseInt(process.env.PAGE_SIZE, 10) || 20;

// BCRYPT_SALT
export const BCRYPT_SALT = parseInt(process.env.BCRYPT_SALT, 10) || 10;

// i18n
export const DEFAULT_LOCALE = process.env.DEFAULT_LOCALE || 'vi';

// JSON Web Token
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

export const JWT_SECRET_REFESH_KEY = process.env.JWT_SECRET_REFESH_KEY;
export const JWT_REFESH_EXPIRES_IN = process.env.JWT_REFESH_EXPIRES_IN;

export const JWT_REFRESH_TOKEN_EXPIRATION =
  process.env.JWT_REFRESH_TOKEN_EXPIRATION;

// DATABASE
export const DATABASE_CONNECTION =
  process.env.DATABASE_CONNECTION || 'postgres';
export const DATABASE_HOST = process.env.DATABASE_HOST || 'localhost';
export const DATABASE_PORT = parseInt(process.env.DATABASE_PORT, 10) || 5432;
export const DATABASE_USERNAME = process.env.DATABASE_USERNAME || 'postgres';
export const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || 'kiendzpro21';
export const DATABASE_DB_NAME = process.env.DATABASE_DB_NAME || 't4_nlt';
// FILE
export const MAX_FILE_SIZE = parseInt(process.env.MAX_FILE_SIZE, 10);
export const UPLOAD_LOCATION = process.env.UPLOAD_LOCATION;

//  REDIS_HOST=redis
export const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
export const REDIS_PORT = parseInt(process.env.REDIS_PORT, 10) || 6379;

//  CONFIG OTP
export const OTP_LENGTH = parseInt(process.env.OTP_LENGTH, 10) || 6;
export const OTP_TTL = parseInt(process.env.OTP_TTL, 10) || 300;
export const OTP_RESEND_TIME = parseInt(process.env.OTP_RESEND_TIME, 10) || 60;

// CLOUDINARY
export const CLOUD_NAME = process.env.CLOUD_NAME;
export const CLOUD_API_KEY = process.env.CLOUD_API_KEY;
export const CLOUD_API_SECRET = process.env.CLOUD_API_SECRET;

// GOOGLE AUTH
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_SECRET = process.env.GOOGLE_SECRET;

// DAILYMOTION
export const DM_CHANNEL_OWNER = process.env.DM_CHANNEL_OWNER;
export const DM_API = process.env.DM_API;

// HTTP
export const HTTP_TIMEOUT = process.env.HTTP_TIMEOUT;
export const HTTP_MAX_REDIRECTS = process.env.HTTP_MAX_REDIRECTS;
