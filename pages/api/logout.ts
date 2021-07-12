import { axiosAPI } from "@/config/axios";
import type { NextApiRequest, NextApiResponse } from "next";

const logout = async (req: NextApiRequest, res: NextApiResponse) => {
  res = await axiosAPI.post("auth/logout");
};

export { logout };
