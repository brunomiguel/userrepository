import { App, Plugin } from "vue";
import { i18n } from "i18next";
import { i18nextKey } from "./key";

const parseValue = (value: any) => {
  if (typeof value === "string") {
    return { key: value };
  } else if (typeof value === "object") {
    if (!value.key && value.path) {
      value.key = value.path;
      delete value.path;
    }
    if (!value.key) {
      throw new Error("no key in value");
    }
    return value;
  } else {
    throw new Error();
  }
};

export const createI18n = (i18next: i18n): Plugin => ({
  install(app: App<any>, options: any = {}) {
    options.bindI18n = options.bindI18n || "languageChanged loaded";
    options.bindStore = options.bindStore || "added removed";

    app.mixin({
      created() {
        if (options.bindI18n) {
          i18next.on(options.bindI18n, () => this.$forceUpdate());
        }
        if (options.bindStore && i18next.store) {
          i18next.store.on(options.bindStore, () => this.$forceUpdate());
        }
      },
    });

    app.config.globalProperties.$i18n = i18next;
    app.config.globalProperties.$t = (...args: any) =>
      i18next.t.apply(i18next, args);

    const bind = (el: any, { value }: any) => {
      const parsedValue = parseValue(value);
      el.textContent = i18next.t(parsedValue.key, parsedValue);
    };
    app.directive("t", {
      beforeMount: bind,
      beforeUpdate: bind,
    });

    app.provide(i18nextKey, i18next);
  },
});
