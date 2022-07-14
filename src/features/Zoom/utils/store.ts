import { ZoomAccount, ZoomAccountDelete, ZoomAccountFetchParams, ZoomAccountTestConnection } from './type'
import { atom } from 'recoil'

export const zoomListState = atom<ZoomAccount[]>({
  key: 'zoomListState',
  default: []
})

export const zoomListCountState = atom({
  key: 'zoomListCountState',
  default: 0
})

export const zoomListFilterState = atom<ZoomAccountFetchParams>({
  key: 'zoomListFilterState',
  default: {
    page: 1,
    limit: 15
  }
})

export const zoomAccountDeleteState = atom<ZoomAccountDelete>({
  key: 'zoomAccountDeleteState',
  default: {
    data: { id: 0, name: "" },
    showModal: false
  }
})

export const zoomAccountCreateLoadingState = atom({
  key: 'zoomAccountCreateLoadingState',
  default: false
})

export const zoomAccountDetailState = atom<ZoomAccount>({
  key: 'zoomAccountDetailState',
  default: {}
})

export const zoomAccountTestConnectState = atom<ZoomAccountTestConnection>({
  key: 'zoomAccountTestConnectState',
  default: {
    showModal: false,
    id: 0
  }
})
