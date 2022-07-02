import { FetchParams } from "../../../types/fetch.type"
import { Unit } from "../../Unit/utils/type"

export interface ZoomAccount {
  id?: number
  name?: string
  email?: string
  accessToken?: string
  secretKey?: string
  lastCheck?: Date
  active?: boolean
  ownerUnit?: Unit
}

export interface ZoomAccountFetchParams extends FetchParams {
  active?: string | null
  unitId?: string | null
}
