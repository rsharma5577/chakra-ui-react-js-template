// User mutations
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/api/client';
import { API_ENDPOINTS } from '@/api/endpoints';
import type { User, UpdateProfileData } from '@/types';

// Update profile mutation
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profileData: UpdateProfileData): Promise<User> => {
      const { data } = await apiClient.put<User>(API_ENDPOINTS.USERS.UPDATE_PROFILE, profileData);
      return data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['users', 'profile'] });
    },
  });
};

// Change password mutation
export const useChangePassword = () => {
  return useMutation({
    mutationFn: async ({
      currentPassword,
      newPassword,
    }: {
      currentPassword: string;
      newPassword: string;
    }): Promise<{ message: string }> => {
      const { data } = await apiClient.post<{ message: string }>(
        API_ENDPOINTS.USERS.CHANGE_PASSWORD,
        {
          currentPassword,
          newPassword,
        },
      );
      return data;
    },
  });
};

// Delete account mutation
export const useDeleteAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (): Promise<void> => {
      await apiClient.delete(API_ENDPOINTS.USERS.PROFILE);
    },
    onSuccess: () => {
      queryClient.clear();
    },
  });
};
