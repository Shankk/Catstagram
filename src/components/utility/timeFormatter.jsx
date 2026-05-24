export default function formatTimestamp(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString);
  const now = new Date();
  const diff = (now - date) / 1000; // seconds

  if (diff < 60) return "Just now";
  if (diff < 3600) return Math.floor(diff / 60) + "m";
  if (diff < 86400) return Math.floor(diff / 3600) + "h";

  const days = Math.floor(diff / 86400);
  if (days === 1) return "Yesterday";
  if (days < 7) return days + "d";

  // fallback: show date
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric"
  });
}
