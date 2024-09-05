import { HexString } from "@gear-js/api";

// const ADDRESS = {
//   NODE: import.meta.env.VITE_NODE_ADDRESS as string,
// };

const ADDRESS = {
  NODE: 'wss://testnet.vara.network',
};

const LOCAL_STORAGE = {
  ACCOUNT: 'account',
  WALLET: 'wallet',
};

const PROGRAMS = {
  DAO_ID: "0xeba5483ab35106551aba7f35ae2b8a2d132bbc76e5a90055c79cc3ae7e35102d" as HexString,
};

export { ADDRESS, LOCAL_STORAGE, PROGRAMS};
