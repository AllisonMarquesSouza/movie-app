export default function formatDate(dateString) {
  if (!dateString) return "N/A";

  const date = new Date(`${dateString}T00:00:00`);

  return new Intl.DateTimeFormat("en-US", {
    month: "long", //long means text, name of the month
    day: "numeric",
    year: "numeric",
  }).format(date);
}
