import { Request, Response } from "express";
import { supabase } from "../supabase/client";
export async function register(req: Request, res: Response) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email dan password wajib diisi" });
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json({ message: "User berhasil didaftarkan", user: data.user });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Email dan password wajib diisi" });

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return res.status(400).json({ error: error.message });

  res.json({ message: "Login berhasil", session: data.session });
}

// export async function googleLogin(req: Request, res: Response) {
//   const { data, error } = await supabase.auth.signInWithOAuth({
//     provider: "google",
//     options: {
//       redirectTo: "http://localhost:4000/api/v1/auth/callback",
//     },
//   });

//   if (error) {
//     return res.status(500).json({ error: error.message });
//   }

//   return res.redirect(data.url);
// }

// export async function googleCallback(req: Request, res: Response) {
//   return res.redirect("http://localhost:3000/dashboard");
// }

export async function googleVerify(req: Request, res: Response) {
  const { token } = req.body; // idToken dari frontend

  const { data, error } = await supabase.auth.signInWithIdToken({
    provider: "google",
    token: token,
  });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json({ message: "Login Google berhasil (Client Side)", session: data.session });
}
