import { atom } from "recoil";
import {
  InspectionTemplate,
  InspectionTemplateDelete,
  InspectionTemplateFetchParams,
} from "./type";

export const inspectionTemplateListState = atom<InspectionTemplate[]>({
  key: "inspectionTemplateListState",
  default: [],
});

export const inspectionTemplateListFilterState =
  atom<InspectionTemplateFetchParams>({
    key: "inspectionTemplateListFilterState",
    default: {
      page: 1,
      limit: 15,
    },
  });

export const inspectionTemplateListCountState = atom({
  key: "inspectionTemplateListCountState",
  default: 0,
});

export const inspectionTemplateDeleteState = atom<InspectionTemplateDelete>({
  key: "inspectionTemplateDeleteState",
  default: {
    showModal: false,
    data: { id: 0, name: "" },
  },
});
