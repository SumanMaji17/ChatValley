export const HOST = process.env.REACT_APP_API || "http://localhost:3005";

const AUTH_ROUTES = `${HOST}/api/auth`;
const MESSAGES_ROUTE = `${HOST}/api/messages`;

export const CHECK_USER_ROUTE = `${AUTH_ROUTES}/check-user`;

export const ONBOARD_USER_ROUTE = `${AUTH_ROUTES}/onboard-user`;

export const GET_ALL_CONTACTS = `${AUTH_ROUTES}/get-contacts`;

export const ADD_MESSAGE_ROUTE = `${MESSAGES_ROUTE}/add-message`;

export const GET_MESSAGES_ROUTE = `${MESSAGES_ROUTE}/get-messages`;

export const ADD_IMAGE_MESSAGE_ROUTE = `${MESSAGES_ROUTE}/add-image-message`;

export const ADD_AUDIO_MESSAGE_ROUTE = `${MESSAGES_ROUTE}/add-audio-message`;

export const GET_INITIAL_CONTACTS_ROUTE = `${MESSAGES_ROUTE}/get-initial-contacts`

export const GET_CALL_TOKEN = `${AUTH_ROUTES}/generate-token`