import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../api/supabaseClient';
import { setAccessToken } from '../api/tokenStore';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null); // includes role
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getSession = async () => {
            console.log('Fetching session...');
            const { data: { session } } = await supabase.auth.getSession();
            console.log('Session:', session);
            if (session?.user) {
                setAccessToken(session.access_token); // save token for write operations
                setUser(session.user);
                await fetchProfile(session.user.id);
            }
            setLoading(false);
        };

        getSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            console.log('Auth state changed:', _event, session);
            if (session?.user) {
                setAccessToken(session.access_token); // save token for write operations
                setUser(session.user);
                await fetchProfile(session.user.id);
            } else {
                setAccessToken(null);
                setUser(null);
                setProfile(null);
            }
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

  const fetchProfile = async (userId) => {
  console.log('Fetching profile for:', userId);
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId);
  console.log('Raw query result:', { data, error });
  if (error) {
    console.error('Profile fetch error:', error);
    setProfile(null);
  } else if (data && data.length > 0) {
    setProfile(data[0]);
  } else {
    setProfile(null);
  }
};

    const login = async (email, password) => {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
    };

    const logout = async () => {
  try {
    console.log('Logging out...');
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Logout error:', error);
      throw error;
    }
    console.log('Logout successful');
  } catch (err) {
    console.error('Logout exception:', err);
    // Optionally show an alert to the user
    alert('Logout failed. Please try again.');
  }
};

    const value = {
        user,
        profile,
        loading,
        login,
        logout,
        isAdmin: profile?.role === 'admin',
        isEditor: profile?.role === 'editor',
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

