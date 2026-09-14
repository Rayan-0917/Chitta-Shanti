const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

/**
 * Get the medical officer's welfare triage queue.
 *
 * Backend:
 * GET /api/assessment/welfare/triage
 */
export async function getWelfareTriage(token) {
  if (!token) {
    throw new Error(
      "Authentication token not found. Please log in again."
    );
  }

  const response = await fetch(
    `${API_BASE_URL}/api/assessment/welfare/triage`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    let message = "Unable to load welfare triage.";

    try {
      const errorData = await response.json();

      if (typeof errorData?.detail === "string") {
        message = errorData.detail;
      }
    } catch {
      // Keep the default error message.
    }

    if (response.status === 401) {
      message = "Authentication failed. Please log in again.";
    }

    if (response.status === 403) {
      message =
        "You do not have permission to access the welfare triage.";
    }

    throw new Error(message);
  }

  return response.json();
}


/**
 * Record a welfare intervention.
 *
 * Backend:
 * POST /api/assessment/welfare/interventions
 *
 * Payload:
 * {
 *   personnel_id: string,
 *   action_type: string,
 *   notes: string
 * }
 */
export async function recordWelfareIntervention(
  token,
  intervention
) {
  if (!token) {
    throw new Error(
      "Authentication token not found. Please log in again."
    );
  }

  const response = await fetch(
    `${API_BASE_URL}/api/assessment/welfare/interventions`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personnel_id: intervention.personnel_id,
        action_type: intervention.action_type,
        notes: intervention.notes,
      }),
    }
  );

  if (!response.ok) {
    let message = "Unable to record the intervention.";

    try {
      const errorData = await response.json();

      if (typeof errorData?.detail === "string") {
        message = errorData.detail;
      }
    } catch {
      // Keep the default error message.
    }

    if (response.status === 401) {
      message = "Authentication failed. Please log in again.";
    }

    if (response.status === 403) {
      message =
        "You do not have permission to record interventions.";
    }

    throw new Error(message);
  }

  return response.json();
}