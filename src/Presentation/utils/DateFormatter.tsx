import React from "react";

export const DateFormatter = (timestamp: number): string => {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  const year = date.getFullYear(); // YYYY
  const month = ("0" + (date.getMonth() + 1)).slice(-2); //MM
  const day = ("0" + date.getDay()).slice(-2); //DD
  const hours = ("0" + date.getHours()).slice(-2); //HH
  const minutes = ("0" + date.getMinutes()).slice(-2); //mm
  return `${day}/${month}/${year} ${hours}:${minutes}`;
};
