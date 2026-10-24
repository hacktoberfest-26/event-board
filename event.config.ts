import type { EventConfig } from "./src/lib/types";

export const EVENT_CONFIG = {
  event: {
    name: "Hacktoberfest Fest",
    edition: "2026",
    venue: "H-FARM",
    date: "2026-10-24",
    startsAt: "09:00",
    endsAt: "21:00",
  },

  agenda: [
    {
      start: "09:00",
      end: "09:45",
      type: "logistics",
      title: "Welcome & check-in",
    },
    {
      start: "09:45",
      end: "10:00",
      type: "ceremony",
      title: "H-FARM & Hacktoberfest",
      speaker: "H-FARM / Fabricode",
    },
    {
      start: "10:00",
      end: "10:15",
      type: "ceremony",
      title: "Challenge & rules",
    },
    {
      start: "10:15",
      end: "10:30",
      type: "talk",
      title: "Alessandro De Concini",
    },
    { start: "10:30", end: "12:00", type: "sprint", title: "Hack time" },
    { start: "12:00", end: "12:15", type: "talk", title: "Alessia Borsan" },
    { start: "12:15", end: "13:15", type: "break", title: "Lunch time" },
    { start: "13:15", end: "13:45", type: "sprint", title: "Hack time" },
    { start: "13:45", end: "14:00", type: "talk", title: "Gabriele Provenza" },
    { start: "14:00", end: "15:30", type: "sprint", title: "Hack time" },
    { start: "15:30", end: "15:45", type: "talk", title: "Valeria Salis" },
    { start: "15:45", end: "17:00", type: "sprint", title: "Hack time" },
    { start: "17:00", end: "17:15", type: "talk", title: "Annapaola Vacanti" },
    {
      start: "17:15",
      end: "19:15",
      type: "sprint",
      title: "Hack time",
      note: "Last sprint.",
    },
    {
      start: "19:15",
      end: "19:20",
      type: "logistics",
      title: "Project submission",
    },
    {
      start: "19:20",
      end: "20:45",
      type: "ceremony",
      title: "Demo night",
      note: "Every team demos at its own table: walk around, watch, learn and network.",
    },
    {
      start: "20:45",
      end: "21:00",
      type: "ceremony",
      title: "Awards ceremony",
    },
    { start: "21:00", end: "21:15", type: "ceremony", title: "Closing" },
  ],

  info: [
    {
      icon: "wifi",
      label: "WiFi",
      value: "H-GUEST",
      hint: "open network, no password",
    },
    {
      icon: "github",
      label: "GitHub org",
      value: "hacktoberfest-26",
      hint: "github.com/hacktoberfest-26",
    },
    {
      icon: "circle-question",
      label: "Need help?",
      value: "Ask a mentor",
      hint: "look for a mentor badge",
    },
    {
      icon: "qrcode",
      label: "Photos",
      value: "Share your shots",
      hint: "scan a QR code in the room to upload",
    },
    {
      icon: "hashtag",
      label: "Hashtag",
      value: "#hacktoberfest",
      hint: "use it in your posts",
    },
  ],

  hosts: [
    { name: "Fabricode", logo: "fc-logo-white.svg", height: 3.2 },
    { name: "H-FARM", logo: "h-farm-logo-white.png", height: 3.2 },
  ],

  display: {
    infoRotationSeconds: 14,
    locale: "en-GB",
  },
} satisfies EventConfig;

export default EVENT_CONFIG;
