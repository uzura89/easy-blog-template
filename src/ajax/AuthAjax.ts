import axios from "axios";

import * as cons from "@/constants";

// export async function callLoginUser(password: string): Promise<boolean> {
//   try {
//     const response = await axios.post(`${cons.APP_URL}/api/login`, {
//       password,
//     });
//     return true;
//   } catch (err) {
//     return false;
//   }
// }

export const callFetchIsAdmin = async (): Promise<{ isAdmin: boolean }> => {
  try {
    const response = await axios({
      method: "get",
      url: `${cons.APP_URL}/api/is-admin`,
    });

    return response.data;
  } catch (err) {
    return { isAdmin: false };
  }
};
