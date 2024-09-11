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
  DAO_ID: "0x64353d1100684813f2c4e9f7d5c952ac3a9c66b335b41e993a69d2c0fdce26d4" as HexString,
};

export { ADDRESS, LOCAL_STORAGE, PROGRAMS};
