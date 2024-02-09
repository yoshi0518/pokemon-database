import { changeLanguage } from 'i18next';
import { create } from 'zustand';

import { getStorageItem, setStorageItem } from '@/utils/localStorage';

import { appLng } from '@/config';

export type i18nStoreType = {
  lng: string;
  changeLng: (lng: string) => void;
};

/** localStrageから前回実行時の言語を取得 */
const getLng = () => {
  const lng = getStorageItem('lng');
  // localStrageに存在しない場合
  if (!lng) setStorageItem('lng', appLng);
  return lng || appLng;
};

export const useI18nStore = create<i18nStoreType>((set) => ({
  lng: getLng(),
  changeLng: (lng) => {
    set({ lng });
    setStorageItem('lng', lng);
    changeLanguage(lng);
  },
}));
