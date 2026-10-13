import React from "react";
import ConfirmReservation from "./ConfirmReservation";

/**
 * ConfirmAppointment
 *
 * NOTE: Previously an unconnected mock page that did not submit to the API.
 * Now cleanly wired to `ConfirmReservation` (the active, API-connected
 * production reservation component for government hospitals).
 */
export default function ConfirmAppointment(props) {
  return <ConfirmReservation {...props} />;
}
