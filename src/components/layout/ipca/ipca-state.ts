import { atom, getDefaultStore } from "jotai";

export type IpcaValues = {
  ano: number;
  valor: number;
};

export type Ipca = {
  enabled: boolean;
  loading: boolean;
  values: IpcaValues[];
};

const ipcaPromise = new Promise<Ipca>((resolve) => {
  setTimeout(() => {
    resolve({
      enabled: false,
      loading: false,
      values: [
        {
          ano: 2009,
          valor: 4.31203,
        },
        {
          ano: 2010,
          valor: 5.90907,
        },
        {
          ano: 2011,
          valor: 6.50311,
        },
        {
          ano: 2012,
          valor: 5.83857,
        },
        {
          ano: 2013,
          valor: 5.91082,
        },
        {
          ano: 2014,
          valor: 6.40762,
        },
        {
          ano: 2015,
          valor: 10.6735,
        },
        {
          ano: 2016,
          valor: 6.28806,
        },
        {
          ano: 2017,
          valor: 2.94735,
        },
        {
          ano: 2018,
          valor: 3.74548,
        },
        {
          ano: 2019,
          valor: 4.30604,
        },
        {
          ano: 2020,
          valor: 4.51734,
        },
        {
          ano: 2021,
          valor: 10.06105,
        },
        {
          ano: 2022,
          valor: 5.78484,
        },
      ],
    });
  }, 1500);
});

export function atomWithToggle() {
  const ipca = atom(
    {
      enabled: false,
      loading: true,
      values: [],
    },
    (get, set, newValue?: Ipca) => {
      const currentIpca = get(ipca);
      set(
        ipca,
        newValue ?? {
          enabled: !currentIpca.enabled,
          loading: currentIpca.loading,
          values: currentIpca.values,
        }
      );
    }
  );
  return ipca;
}

export const ipcaState = atomWithToggle();
export const ipcaLoading = atom((get) => get(ipcaState).loading);

const defaultStore = getDefaultStore();

ipcaPromise.then((ipca) => {
  defaultStore.set(ipcaState, ipca);
});
