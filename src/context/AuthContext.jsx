import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../api/supabaseClient';
import { setAccessToken } from '../api/tokenStore';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

// ---------- sessionStorage helpers (survive refresh, cleared on tab close) ----------
const SESSION_KEY = 'ecn_cms_session';

const saveSession = (user, profile, token, refreshToken = null) => {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ user, profile, token, refreshToken }));
  } catch (_) {}
};

const loadSession = () => {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (_) {
    return null;
  }
};

const clearSession = () => {
  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch (_) {}
};
// ----------------------------------------------------------------------------------

export const AuthProvider = ({ children }) => {
  // ── Restore from sessionStorage synchronously so loading resolves immediately ──
  const saved = loadSession();
  const [user, setUser] = useState(saved?.user ?? null);
  const [profile, setProfile] = useState(saved?.profile ?? null);
  // If we already have a saved session, skip the loading spinner entirely
  const [loading, setLoading] = useState(!saved);

  useEffect(() => {
    if (saved?.token) {
      // Restore the in-memory token so write operations (createArticle etc.) work
      setAccessToken(saved.token);
    }

    // Still try to get a fresh session from Supabase (handles SIGNED_IN on page load)
    // but only update state if we get something meaningful back
    const getSession = async () => {
      console.log('Fetching session...');
      // 1. Manually inject the saved session into the Supabase client so it doesn't freeze or drop on F5
      if (saved?.token && saved?.refreshToken) {
         try {
           await supabase.auth.setSession({
             access_token: saved.token,
             refresh_token: saved.refreshToken
           });
         } catch(e) {}
      }

      const { data: { session } } = await supabase.auth.getSession();
      console.log('Session:', session);
      if (session?.user) {
        setAccessToken(session.access_token);
        setUser(session.user);
        const freshProfile = await fetchProfile(session.user.id);
        saveSession(session.user, freshProfile, session.access_token, session.refresh_token);
      }
      // Only call setLoading(false) here if we had no saved session
      // (otherwise it was already set to false above)
      if (!saved) setLoading(false);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session);
      if (session?.user) {
        setAccessToken(session.access_token);
        setUser(session.user);
        const freshProfile = await fetchProfile(session.user.id);
        saveSession(session.user, freshProfile, session.access_token, session.refresh_token);
      } else {
        // Prevent F5 reload from obliterating session
        if (event === 'INITIAL_SESSION' && saved?.token) {
           return; // let getSession() handle manual restore
        }
        // Genuine sign-out or token expiry — clear everything
        setAccessToken(null);
        setUser(null);
        setProfile(null);
        clearSession();
      }
      setLoading(false);
    });

    // Heartbeat to keep session alive and prevent JWT expiry hangs (runs every 5 mins)
    const refresher = setInterval(async () => {
      const current = loadSession();
      if (current?.token && current?.refreshToken) {
         console.log('Proactively refreshing session to prevent hangs...');
         const { error } = await supabase.auth.refreshSession();
         if (error) console.error('Background refresh failed', error);
      }
    }, 5 * 60 * 1000);

    return () => {
      subscription.unsubscribe();
      clearInterval(refresher);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Returns the profile object so callers can use it; also updates state
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
      return null;
    } else if (data && data.length > 0) {
      setProfile(data[0]);
      return data[0];
    } else {
      setProfile(null);
      return null;
    }
  };

  const login = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    // onAuthStateChange will fire SIGNED_IN and handle saving
  };

  const logout = async () => {
    try {
      console.log('Logging out...');
      clearSession(); // clear immediately so UI updates fast
      setUser(null);
      setProfile(null);
      setAccessToken(null);
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Logout error:', error);
        throw error;
      }
      console.log('Logout successful');
    } catch (err) {
      console.error('Logout exception:', err);
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
