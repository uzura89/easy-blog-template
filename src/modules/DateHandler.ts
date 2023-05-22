export function formatDate(dateString: string) {
  const year = dateString.split("-")[0];
  const month = new Date(dateString.split("-")[1] + "/01/2000").toLocaleString(
    "en",
    { month: "long" }
  );
  const day = dateString.split("-")[2];

  return `${year} ${month.slice(0, 3)} ${day}`;
}

export function convertDateToSlug(date: Date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}
