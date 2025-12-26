// User mutations for JSONPlaceholder API
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/api/client';
import { API_ENDPOINTS } from '@/api/endpoints';
import { userKeys } from '@/api/queries/useUsers';
import type {
  JSONPlaceholderUser,
  CreateJSONPlaceholderUser,
  UpdateJSONPlaceholderUser,
} from '@/types';

// Create user mutation
export const useCreateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData: CreateJSONPlaceholderUser): Promise<JSONPlaceholderUser> => {
      const { data } = await apiClient.post<JSONPlaceholderUser>(
        API_ENDPOINTS.USERS.BASE,
        userData,
      );
      return data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
};

// Update user mutation
export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      ...userData
    }: UpdateJSONPlaceholderUser): Promise<JSONPlaceholderUser> => {
      const { data } = await apiClient.put<JSONPlaceholderUser>(
        API_ENDPOINTS.USERS.BY_ID(id),
        userData,
      );
      return data;
    },
    onSuccess: data => {
      void queryClient.invalidateQueries({ queryKey: userKeys.detail(data.id) });
      void queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
};

// Patch user mutation (partial update)
export const usePatchUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      ...userData
    }: UpdateJSONPlaceholderUser): Promise<JSONPlaceholderUser> => {
      const { data } = await apiClient.patch<JSONPlaceholderUser>(
        API_ENDPOINTS.USERS.BY_ID(id),
        userData,
      );
      return data;
    },
    onSuccess: data => {
      void queryClient.invalidateQueries({ queryKey: userKeys.detail(data.id) });
      void queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
};

// Delete user mutation
export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number): Promise<number> => {
      await apiClient.delete(API_ENDPOINTS.USERS.BY_ID(id));
      return id;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
};
