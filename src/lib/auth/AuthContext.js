"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

const AuthContext = createContext(null);

// Built-in high performance demo users (for instant hackathon demo & offline testing)
const DEMO_USERS = {
  "student@internova.in": {
    id: "s1", name: "Priya Sharma", email: "student@internova.in",
    role: "student", avatar: "PS", college: "GHRCEM Jalgaon",
    branch: "Computer Science", year: "3rd Year",
  },
  "faculty@internova.in": {
    id: "f1", name: "Dr. Vivek Deshpande", email: "faculty@internova.in",
    role: "faculty", avatar: "VD", department: "Computer Engineering",
    designation: "Professor",
  },
  "industry@internova.in": {
    id: "c8", name: "Razorpay HR", email: "industry@internova.in",
    role: "industry", avatar: "RZ", company: "Razorpay",
    industry: "Fintech",
  },
  "admin@internova.in": {
    id: "a1", name: "Prof. Ashish Patil", email: "admin@internova.in",
    role: "admin", avatar: "AP", designation: "TPO",
    institution: "GHRCEM Jalgaon",
  },
};

const ROLE_DASHBOARDS = {
  student: "/dashboard/student",
  faculty: "/dashboard/faculty",
  industry: "/dashboard/industry",
  admin: "/dashboard/admin",
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSupabaseConnected, setIsSupabaseConnected] = useState(false);
  const router = useRouter();

  // Load user session on mount (First check Supabase Auth, then local fallback)
  useEffect(() => {
    async function initSession() {
      const isConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder");

      if (isConfigured) {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            // Fetch real user profile from Supabase PostgreSQL
            const { data: profile } = await supabase
              .from("profiles")
              .select("*")
              .eq("id", session.user.id)
              .single();

            if (profile) {
              setUser({
                id: profile.id,
                name: profile.full_name,
                email: profile.email,
                role: profile.role,
                avatar: profile.full_name.slice(0, 2).toUpperCase(),
              });
              setIsSupabaseConnected(true);
              setLoading(false);
              return;
            }
          }
        } catch (e) {
          console.warn("Supabase live connection standby:", e.message);
        }
      }

      // Fallback: Check local storage
      try {
        const saved = localStorage.getItem("internova_user");
        if (saved) setUser(JSON.parse(saved));
      } catch (e) {
        console.error("Local session restore error:", e);
      }

      setLoading(false);
    }

    initSession();

    // Listen to real-time Supabase Auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();

        if (profile) {
          setUser({
            id: profile.id,
            name: profile.full_name,
            email: profile.email,
            role: profile.role,
            avatar: profile.full_name.slice(0, 2).toUpperCase(),
          });
        }
      }
    });

    return () => authListener?.subscription?.unsubscribe();
  }, []);

  // Sync user changes to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("internova_user", JSON.stringify(user));
    }
  }, [user]);

  const login = async (email, password) => {
    // 1. Try real Supabase login if configured
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder")) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (!error && data.user) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", data.user.id)
            .single();

          const safeUser = {
            id: profile.id,
            name: profile.full_name,
            email: profile.email,
            role: profile.role,
            avatar: profile.full_name.slice(0, 2).toUpperCase(),
          };

          setUser(safeUser);
          return { success: true, user: safeUser };
        }
      } catch (e) {
        console.warn("Supabase Auth fallback to demo accounts:", e.message);
      }
    }

    // 2. Demo accounts instant login
    const demoUser = DEMO_USERS[email.toLowerCase()];
    if (demoUser) {
      setUser(demoUser);
      return { success: true, user: demoUser };
    }

    // 3. Local registered user check
    try {
      const registeredUsers = JSON.parse(localStorage.getItem("internova_registered_users") || "[]");
      const found = registeredUsers.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );
      if (found) {
        const { password: _, ...safeUser } = found;
        setUser(safeUser);
        return { success: true, user: safeUser };
      }
    } catch (e) {
      console.error("Login lookup error:", e);
    }

    return { success: false, error: "Invalid email or password. Use demo quick buttons below!" };
  };

  const register = async (userData) => {
    const newUser = {
      id: `user_${Date.now()}`,
      ...userData,
      avatar: userData.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2),
      joinedDate: new Date().toISOString(),
    };

    // Try Supabase Auth Sign Up if keys present
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder")) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email: userData.email,
          password: userData.password,
          options: {
            data: { full_name: userData.name, role: userData.role },
          },
        });

        if (!error && data.user) {
          // Insert profile into database
          await supabase.from("profiles").insert([
            { id: data.user.id, email: userData.email, full_name: userData.name, role: userData.role }
          ]);
        }
      } catch (e) {
        console.warn("Supabase register error fallback:", e.message);
      }
    }

    // Save to local storage
    try {
      const existing = JSON.parse(localStorage.getItem("internova_registered_users") || "[]");
      existing.push(newUser);
      localStorage.setItem("internova_registered_users", JSON.stringify(existing));
    } catch (e) {
      console.error("Register save error:", e);
    }

    const { password: _, ...safeUser } = newUser;
    setUser(safeUser);
    return { success: true, user: safeUser };
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      // Ignore
    }
    setUser(null);
    localStorage.removeItem("internova_user");
    router.push("/login");
  };

  const getDashboardPath = () => {
    if (!user) return "/login";
    return ROLE_DASHBOARDS[user.role] || "/dashboard/student";
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, getDashboardPath, DEMO_USERS, isSupabaseConnected }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { ROLE_DASHBOARDS };
