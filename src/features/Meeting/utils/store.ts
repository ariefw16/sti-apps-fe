import { atom } from "recoil";
import { Meeting, MeetingApproval, MeetingCancel, MeetingDelete, MeetingsFetchParams } from "./type";

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

export const meetingApprovalState = atom<MeetingApproval>({
  key: 'meetingApprovalState',
  default: {
    showModal: false,
    data: {}
  }
})

export const meetingCancelState = atom<MeetingCancel>({
  key: 'meetingCancelState',
  default: {
    showModal: false,
    data: {}
  }
})

export const meetingDetailState = atom<Meeting>({
  key: 'meetingDetailState',
  default: {}
})

export const meetingUpdateLoadingState = atom({
  key: 'meetingUpdateLoadingState',
  default: false
})
