import { DataToDelete } from "../../../types/common";
import { FetchParams } from "../../../types/fetch.type";
import { User } from "../../Users/utils/type";
import { ZoomAccount } from "../../Zoom/utils/type";

export interface Meeting {
  id?: number;
  zoomAccount?: ZoomAccount;
  name?: string;
  startDate?: Date;
  duration?: number;
  password?: string;
  audio?: string;
  autoRecording?: string;
  enableBreakout?: boolean;
  hostVideo?: boolean;
  joinBeforeHost?: boolean;
  jbhTime?: number;
  muteUponEntry?: boolean;
  participantVideo?: boolean;
  waitingRoom?: boolean;
  timezone?: string;
  type?: number;
  uuidMeeting?: string;
  createdBy?: User;
  status?: number;
  approvedBy?: User;
  joinUrl?: string;
  zoomAccountId?: number;
  createdById?: number;
  approvadById?: number;
  expectedParticipant?: number;
  requestorName?: string;
  requestorEmail?: string;
  idMeeting?: string;
  apiAccount?: boolean;
}

export interface MeetingsFetchParams extends FetchParams {
  zoomAccountId?: string | null;
  status?: string | null;
  meetingDate?: string;
}

export interface MeetingDelete {
  showModal: boolean;
  data: DataToDelete;
}

export interface MeetingCreate {
  name?: string;
  startDate?: Date;
  startDateTime?: Date;
  duration?: number;
  password?: string;
  audio?: string;
  autoRecording?: string;
  enableBreakout?: boolean;
  hostVideo?: boolean;
  joinBeforeHost?: boolean;
  jbhTime?: string;
  muteUponEntry?: boolean;
  participantVideo?: boolean;
  waitingRoom?: boolean;
  expectedParticipant?: number;
  requestorName?: string;
  requestorEmail?: string;
}

export interface MeetingApproval {
  showModal: boolean;
  data: {
    name?: string;
    id?: number;
    zoomAccountId?: string | null;
    startDate?: Date;
    duration?: number;
    expectedParticipant?: number;
    requestorName?: string;
    requestorEmail?: string;
    apiAccount?: boolean;
  };
}

export interface MeetingCancel {
  showModal: boolean;
  data: {
    name?: string;
    id?: number;
  };
}

export interface MeetingUpdate extends Meeting {
  jbhTimeString?: string | null;
  startDateTime?: Date;
}
