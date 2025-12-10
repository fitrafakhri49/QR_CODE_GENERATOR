import { Request, Response, NextFunction } from "express";
import { supabase } from "../supabase/client";

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;

    // 1. Check header
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Authorization token required" });
    }

    // 2. Extract token
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Token is missing" });
    }

    // 3. Validate token with Supabase
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    // 4. Attach user to request
    (req as any).user = data.user;

    return next();
  } catch (err: any) {
    return res.status(500).json({
      error: "Internal server error",
      message: err.message,
    });
  }
}
