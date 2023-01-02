import { InjectionKey } from "vue";
import { i18n } from "i18next";

export const i18nextKey = Symbol("i18next") as InjectionKey<i18n>;
