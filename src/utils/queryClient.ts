// src/utils/queryClient.ts
import { QueryClient } from "@tanstack/react-query";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import localforage from "localforage";

// Create the QueryClient
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
    },
  },
});

// Persist the cache in localforage
persistQueryClient({
  queryClient,
  persister: {
    persistClient: async (client) => {
      await localforage.setItem("REACT_QUERY_OFFLINE_CACHE", client);
    },
    restoreClient: async () => {
      const data = await localforage.getItem("REACT_QUERY_OFFLINE_CACHE");
      return data as unknown as any;
    },
    removeClient: async () => {
      await localforage.removeItem("REACT_QUERY_OFFLINE_CACHE");
    },
  },
});
