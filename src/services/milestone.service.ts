import axios from "axios";

const API =
  `${import.meta.env.VITE_API_URL}/milestones`

export const getProjectMilestones =
  async (
    projectId: string
  ) => {

    const token =
      localStorage.getItem(
        "token"
      );

    const response =
      await axios.get(
        `${API}/${projectId}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };

export const approveMilestone =
  async (
    milestoneId: string
  ) => {

    const token =
      localStorage.getItem(
        "token"
      );

    const response =
      await axios.patch(
        `${API}/approve/${milestoneId}`,
        {},
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };