/**
 * Main
 */

import { isDevelopment } from "./modules/envChecker";

export default async function handler(req: any, res: any) {
  const admin = isDevelopment();
  try {
    return res.status(200).json({ isAdmin: admin || false });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
}
