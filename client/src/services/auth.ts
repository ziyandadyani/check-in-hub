import { supabase } from '../utils/supabaseClient';
import type { User } from '@shared/types';

export const signInWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data.user;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

// Get currently logged-in user
export const getCurrentUser = async (): Promise<User | null> => {
  const { data, error } = await supabase.auth.getSession();
  if (error || !data.session) return null;

  const sessionUser = data.session.user;

  return {
    id: sessionUser.id,
    name: sessionUser.user_metadata.name || sessionUser.email!,
    email: sessionUser.email!,
    role: sessionUser.user_metadata.role || 'learner',
  };
};