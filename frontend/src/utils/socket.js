import { io } from "socket.io-client";
import getEndpoint from "../utils/endpoint.js";
const ENDPOINT = getEndpoint();

const socket = io(ENDPOINT, { transports: ["websocket"] });
export default socket;
