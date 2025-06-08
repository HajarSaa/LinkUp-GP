export const STATUS_PRESETS = [
  {
    id: "meeting",
    emoji: "📅",
    text: "In a meeting",
    durationMinutes: 60,
  },
  {
    id: "commuting",
    emoji: "🚗",
    text: "Commuting",
    durationMinutes: 30,
  },
  {
    id: "sick",
    emoji: "🤒",
    text: "Out sick",
    durationMinutes: 1440, // Today
  },
  {
    id: "vacation",
    emoji: "🌴",
    text: "Vacationing",
    durationMinutes: null, // No expiration
    dontClear: true,
  },
  {
    id: "remote",
    emoji: "🏡",
    text: "Working remotely",
    durationMinutes: 1440,
  },
];

//generate full customStatus payload from preset_id
export function getStatusPayloadById(presetId) {
  const preset = STATUS_PRESETS.find((p) => p.id === presetId);
  if (!preset) return null;

  const expiresAt = preset.durationMinutes
    ? new Date(Date.now() + preset.durationMinutes * 60 * 1000)
    : null;

  return {
    emoji: preset.emoji,
    text: preset.text,
    expiresAt,
    dontClear: !!preset.dontClear,
  };
}
