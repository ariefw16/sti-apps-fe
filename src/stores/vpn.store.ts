import { atom } from "recoil";
import { CreateVPN, VPN, VPNFetchParams } from "../types/vpn.type";

export const vpnListState = atom<VPN[]>({
  key: "vpnListState",
  default: [],
});

export const vpnListFilterState = atom<VPNFetchParams>({
  key: "vpnListFilterState",
  default: {},
});

export const vpnListRowCountState = atom({
  key: "vpnListRowCountState",
  default: 0,
});

export const vpnCreateState = atom<CreateVPN>({
  key: "vpnCreateState",
  default: {
    showModal: false,
    data: {},
  },
});
