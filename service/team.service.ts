import React from "react";
import { FaBookOpen, FaGraduationCap, FaLandmark } from "react-icons/fa";

import data from "../lib/data.json";

const teamData = (data as TeamData).team;
const LEADERS = teamData.leaders;
const SPECIALISTS = teamData.specialists;

export const getMemberOverlayText = (m: Leader | Specialist) =>
  "overlayText" in m ? m.overlayText : m.role;

export function getTeamMemberOrThrow(id?: string): Leader | Specialist {
  if (!id) throw new Response("Team member id missing", { status: 404 });

  const leader = LEADERS.find((m) => m.slug === id);
  const specialist = SPECIALISTS.find((m) => m.slug === id);
  const member = leader ?? specialist;

  if (!member) throw new Response("Team member not found", { status: 404 });

  return member;
}

export const academicIconMap: Record<
  AcademicIcon,
  React.ComponentType<{ className?: string }>
> = {
  "graduation-cap": FaGraduationCap,
  "book-open": FaBookOpen,
  landmark: FaLandmark,
};