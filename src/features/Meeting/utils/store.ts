import { atom } from "recoil";
import { Meeting, MeetingsFetchParams } from "./type";

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
