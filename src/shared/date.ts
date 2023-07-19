export function getMonthNames(locale = "pt-BR", format = "short" as const) {
  const formatter = new Intl.DateTimeFormat(locale, {
    month: format,
    timeZone: "UTC",
  });
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((month) => {
    const mm = month < 10 ? `0${month}` : month;
    return new Date(`2017-${mm}-01T00:00:00+00:00`);
  });
  return months.map((date) => {
    let month = formatter.format(date);
    month =
      month.charAt(0).toLocaleUpperCase() +
      month.substring(1, month.length - 1);
    return month;
  });
}
