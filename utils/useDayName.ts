const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const months = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];
function formatDate(dateParam: Date) {
  const day = days[dateParam.getDay()];
  const date = dateParam.getDate();
  const month = months[dateParam.getMonth()];
  const year = dateParam.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
}

export const useDayName = () => {
  const getFormattedToday = () => {
    const now = new Date();
    const today = new Date(
      now.toLocaleString("en-US", { timeZone: "Asia/Jakarta" }),
    );
    return formatDate(today);
  };

  const getFormattedTomorrow = () => {
    const now = new Date();
    const today = new Date(
      now.toLocaleString("en-US", { timeZone: "Asia/Jakarta" }),
    );
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    return formatDate(tomorrow);
  };

  const getTodayDay = () => {
    const now = new Date();
    const today = new Date(
      now.toLocaleString("en-US", { timeZone: "Asia/Jakarta" }),
    );
    return days[today.getDay()];
  };

  const getTomorrowDay = () => {
    const now = new Date();
    const today = new Date(
      now.toLocaleString("en-US", { timeZone: "Asia/Jakarta" }),
    );
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    return days[tomorrow.getDay()];
  };
  return {
    getFormattedToday,
    getFormattedTomorrow,
    getTodayDay,
    getTomorrowDay,
  };
};
