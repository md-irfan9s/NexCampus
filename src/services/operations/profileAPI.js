import { useSelector } from "react-redux";
import { apiConnector } from "../apiconnector";
import { profileEndpoints } from "../apis";
import toast from "react-hot-toast";

const { USER_PERSONAL_DETAILS } = profileEndpoints;


export async function getPersonalDetails(token) {
  const toastId = toast.loading("Fetching details...");

  try {
    // const token = localStorage.getItem("token");

    if (!token) throw new Error("User not authenticated");

    const response = await apiConnector(
      "GET",
      USER_PERSONAL_DETAILS,
      null,
      {
        Authorization: `Bearer ${token}`, // correct format
      }
    );

    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Failed to fetch details");
    }

    return response.data.personalDetails;

  } catch (error) {
    console.error("GET PERSONAL DETAILS ERROR:", error);
    toast.error(error.message || "Could not get personal details");
    return null;
  } finally {
    toast.dismiss(toastId);
  }
}
