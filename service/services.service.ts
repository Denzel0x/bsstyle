import React from "react";

import data from "../lib/data.json";

import { slugifyServiceTitle } from "../lib/service-slug";

import {
  addOneHourRange,
  formatDateLabel,
  parseConfirmedQuery,
} from "../lib/helper";

// ============================================================================
// ADDED MISSING TYPES (To prevent TS errors)
// ============================================================================
export type MeetingFormat = "virtual" | "in-person";

export type ServiceScheduleState = {
  selectedConsultant?: string;
  setSelectedConsultant: (name: string) => void;
  selectedDay: number;
  setSelectedDay: (day: number) => void;
  selectedTime: string;
  setSelectedTime: (time: string) => void;
  meetingFormat: MeetingFormat;
  setMeetingFormat: (format: MeetingFormat) => void;
  notes: string;
  setNotes: (notes: string) => void;
};

export type BookingConfirmedViewModel = {
  service: any;
  teamData: any;
  confirmationId: string;
  consultantName: string;
  consultant: any;
  dateLabel: string;
  timeRangeLabel: string;
  meetingFormat: MeetingFormat;
  meetingLink: string;
  rescheduleHref: string;
};
// ============================================================================

export function getHomePageData(): HomePageData["homePage"] {
  return (data as HomePageData).homePage;
}

export function getServicesData(): ServicesData["services"] {
  return (data as ServicesData).services;
}

export function getTeamData(): TeamData["team"] {
  return (data as TeamData).team;
}

export function getServiceBySlug(slug?: string) {
  const homePageData = getHomePageData();
  return slug
    ? homePageData.services.items.find(
        (s) => slugifyServiceTitle(s.title) === slug,
      )
    : undefined;
}

export function requireServiceBySlug(slug?: string) {
  const service = getServiceBySlug(slug);
  if (!service) {
    throw new Response("Service not found", { status: 404 });
  }
  return service;
}

export function getServiceDetailsDefaults() {
  const homePageData = getHomePageData();
  return homePageData.services.detailsDefaults;
}

export function getScheduleConsultants(limit = 2) {
  const teamData = getTeamData();
  return teamData.leaders.slice(0, limit).map((c) => ({
    name: c.name,
    roleLabel: c.role,
    imageSrc: c.imageSrc,
    imageAlt: c.imageAlt,
  }));
}

export function useServiceScheduleState(
  defaultConsultant?: string,
  initial?: Partial<
    Pick<
      ServiceScheduleState,
      "selectedDay" | "selectedTime" | "meetingFormat" | "notes"
    >
  >,
): ServiceScheduleState {
  const [selectedConsultant, setSelectedConsultant] = React.useState<
    string | undefined
  >(defaultConsultant);
  const [selectedDay, setSelectedDay] = React.useState<number>(
    initial?.selectedDay ?? 10,
  );
  const [selectedTime, setSelectedTime] = React.useState<string>(
    initial?.selectedTime ?? "10:30 AM",
  );
  const [meetingFormat, setMeetingFormat] = React.useState<MeetingFormat>(
    initial?.meetingFormat ?? "virtual",
  );
  const [notes, setNotes] = React.useState<string>(initial?.notes ?? "");

  return {
    selectedConsultant,
    setSelectedConsultant,
    selectedDay,
    setSelectedDay,
    selectedTime,
    setSelectedTime,
    meetingFormat,
    setMeetingFormat,
    notes,
    setNotes,
  };
}

export function generateBookingId(prefix = "NX") {
  return `${prefix}-${Math.floor(10000 + Math.random() * 90000)}`;
}

export function buildBookingConfirmedSearch(params: {
  id: string;
  consultant: string;
  day: number;
  time: string;
  format: MeetingFormat;
}) {
  const qs = new URLSearchParams({
    id: params.id,
    consultant: params.consultant,
    day: String(params.day),
    time: params.time,
    format: params.format,
  });

  return `?${qs.toString()}`;
}

export function getMeetingLocationLabel(format: MeetingFormat) {
  return format === "virtual" ? "meet.google.com/Invorious" : "Invorious HQ - TBA";
}

export function getBookingConfirmedViewModel(params: {
  slug?: string;
  search: string;
}): BookingConfirmedViewModel {
  const q = parseConfirmedQuery(params.search);

  const service = requireServiceBySlug(params.slug);
  const teamData = getTeamData();

  const confirmationId = q.id ? `#${q.id}` : "#NX-88291";

  const consultantName =
    q.consultant ?? teamData.leaders[0]?.name ?? "Consultant";
  const consultant =
    teamData.leaders.find((m) => m.name === consultantName) ??
    teamData.leaders[0];

  const day = Number(q.day ?? "24");
  const date = new Date(2026, 6, Number.isFinite(day) ? day : 24);
  const dateLabel = formatDateLabel(date);

  const timeLabel = q.time ?? "10:00 AM";
  const { start, end } = addOneHourRange(timeLabel);
  const timeRangeLabel = end ? `${start} - ${end}` : timeLabel;

  const meetingFormat: MeetingFormat = q.format ?? "virtual";
  const meetingLink = getMeetingLocationLabel(meetingFormat);

  const rescheduleHref = `/services/${slugifyServiceTitle(service.title)}/schedule`;

  return {
    service,
    teamData,
    confirmationId,
    consultantName,
    consultant,
    dateLabel,
    timeRangeLabel,
    meetingFormat,
    meetingLink,
    rescheduleHref,
  };
}