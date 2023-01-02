import { i18n } from "i18next";
import { inject } from "vue";
import { i18nextKey } from "./key";

export const useI18next = (): i18n => {
  return inject(i18nextKey)!;
};
