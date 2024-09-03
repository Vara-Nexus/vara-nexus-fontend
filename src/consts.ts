import { HexString } from "@gear-js/api";

const ADDRESS = {
  NODE: import.meta.env.VITE_NODE_ADDRESS as string,
};

const LOCAL_STORAGE = {
  ACCOUNT: 'account',
  WALLET: 'wallet',
};

const PROGRAMS = {
  DAO_ID: "0xf05bcaa7f4aec4205685aec7d6833d10a14d1716610c8cd2d8308c5ae1330abc" as HexString,
};

export { ADDRESS, LOCAL_STORAGE, PROGRAMS};
