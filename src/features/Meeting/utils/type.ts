import { DataToDelete } from "../../../types/common"
import { FetchParams } from "../../../types/fetch.type"
import { User } from "../../Users/utils/type"
import { ZoomAccount } from "../../Zoom/utils/type"

export interface Meeting {
  id?: number
  zoomAccount?: ZoomAccount
  name?: string
  startDate?: Date
  duration?: number
  password?: string
  audio?: string
  autoRecording?: string
  enableBreakout?: boolean
  hostVideo?: boolean
  joinBeforeHost?: boolean
  jbhTime?: number
  muteUponEntry?: boolean
  participantVideo?: boolean
  waitingRoom?: boolean
  timezone?: string
  type?: number
  uuidMeeting?: string
  createdBy?: User
  status?: number
  approvedBy?: User
  joinUrl?: string
  zoomAccountId?: number
  createdById?: number
  approvadById?: number
}

export interface MeetingsFetchParams extends FetchParams {
  zoomAccountId?: string | null
  status?: string | null
}

export interface MeetingDelete {
  showModal: boolean
  data: DataToDelete
}

export interface MeetingCreate {
  name?: string
  startDate?: Date
  duration?: number
  password?: string
  audio?: string
  autoRecording?: string
  enableBreakout?: boolean
  hostVideo?: boolean
  joinBeforeHost?: boolean
  jbhTime?: string
  muteUponEntry?: boolean
  participantVideo?: boolean
  waitingRoom?: boolean
}

export interface MeetingApproval {
  showModal: boolean
  data: {
    name?: string
    id?: number
    zoomAccountId?: string | null
    startDate?: Date
    duration?: number
  }
}

export interface MeetingCancel {
  showModal: boolean,
  data: {
    name?: string,
    id?: number
  }
}

export interface MeetingUpdate extends Meeting {
  jbhTimeString?: string | null
}
