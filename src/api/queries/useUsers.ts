// React Query hooks for JSONPlaceholder users
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/api/client';
import type {
  JSONPlaceholderUser,
  CreateJSONPlaceholderUser,
  UpdateJSONPlaceholderUser,
} from '@/types';

// Query keys
export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (filters: string) => [...userKeys.lists(), { filters }] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: number) => [...userKeys.details(), id] as const,
};

// Fetch all users from JSONPlaceholder
export const useUsers = () => {
  return useQuery({
    queryKey: userKeys.lists(),
    queryFn: async () => {
      const response = await apiClient.get<JSONPlaceholderUser[]>('/users');
      return response.data;
    },
  });
};

// Fetch single user by ID
export const useUser = (id: number) => {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: async () => {
      const response = await apiClient.get<JSONPlaceholderUser>(`/users/${String(id)}`);
      return response.data;
    },
    enabled: Number.isFinite(id), // Only run if id is valid
  });
};

// Create user mutation
export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData: CreateJSONPlaceholderUser) => {
      const response = await apiClient.post<JSONPlaceholderUser>('/users', userData);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch users list
      void queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
};

// Update user mutation
export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...userData }: UpdateJSONPlaceholderUser) => {
      const response = await apiClient.put<JSONPlaceholderUser>(`/users/${String(id)}`, userData);
      return response.data;
    },
    onSuccess: data => {
      // Update specific user cache
      void queryClient.invalidateQueries({ queryKey: userKeys.detail(data.id) });
      // Update users list
      void queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
};

// Delete user mutation
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await apiClient.delete(`/users/${String(id)}`);
      return id;
    },
    onSuccess: () => {
      // Invalidate users list
      void queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
};
