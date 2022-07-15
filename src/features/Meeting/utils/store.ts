import { atom } from "recoil";
import { Meeting, MeetingDelete, MeetingsFetchParams } from "./type";

export const meetingListState = atom<Meeting[]>({
  key: 'meetingListState',
  default: []
})

export const meetingListCountState = atom({
  key: 'meetingListCountState',
  default: 0
})

export const meetingListFilterState = atom<MeetingsFetchParams>({
  key: 'meetingListFilterState',
  default: {
    page: 1,
    limit: 15
  }
})

export const meetingDeleteState = atom<MeetingDelete>({
  key: 'meetingDeleteState',
  default: {
    showModal: false,
    data: { id: 0, name: "" }
  }
})

export const meetingCreateLoadingState = atom({
  key: 'meetingCreateLoadingState',
  default: false
})
