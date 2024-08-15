import { useDateFormat } from "@vueuse/core";

const formatter = new Intl.NumberFormat("ja-JP", {
  style: "currency",
  currency: "JPY",
});

export const apiUrl = import.meta.env.VITE_API_BASE_URL;

export const xApiKey = import.meta.env.VITE_X_API_KEY;

export const toCurrency = (value: number) => formatter.format(value);

export const formatDate = (date: Date, formatStr?: string) => {
  return useDateFormat(date, formatStr || "dddd YYYY-MM-DD HH:mm:ss", {
    locales: "ja-JP",
  });
};
