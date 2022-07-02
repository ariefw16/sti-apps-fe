import { ZoomAccount, ZoomAccountFetchParams } from './type'
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
  default: {}
})
