// The official relationship start date. Edit this single value if needed.
// This is interpreted as midnight in the visitor's local timezone.
export const RELATIONSHIP_START = new Date("2024-07-27T00:00:00");

export type TimeTogether = {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function addYearsClamped(date: Date, years: number): Date {
  const result = new Date(date);
  const originalMonth = result.getMonth();
  result.setFullYear(result.getFullYear() + years);

  if (result.getMonth() !== originalMonth) {
    result.setDate(0);
  }

  return result;
}

function addMonthsClamped(date: Date, months: number): Date {
  const result = new Date(date);
  const originalDay = result.getDate();
  result.setDate(1);
  result.setMonth(result.getMonth() + months);
  const lastDay = new Date(result.getFullYear(), result.getMonth() + 1, 0).getDate();
  result.setDate(Math.min(originalDay, lastDay));
  return result;
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function calculateTimeTogether(now = new Date()): TimeTogether {
  if (now < RELATIONSHIP_START) {
    return { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  let years = now.getFullYear() - RELATIONSHIP_START.getFullYear();
  let cursor = addYearsClamped(RELATIONSHIP_START, years);

  if (cursor > now) {
    years -= 1;
    cursor = addYearsClamped(RELATIONSHIP_START, years);
  }

  let months =
    (now.getFullYear() - cursor.getFullYear()) * 12 + now.getMonth() - cursor.getMonth();
  let monthCursor = addMonthsClamped(cursor, months);

  if (monthCursor > now) {
    months -= 1;
    monthCursor = addMonthsClamped(cursor, months);
  }

  cursor = monthCursor;
  let days = 0;
  let nextDay = addDays(cursor, 1);

  while (nextDay <= now) {
    days += 1;
    cursor = nextDay;
    nextDay = addDays(cursor, 1);
  }

  const remainingMilliseconds = now.getTime() - cursor.getTime();
  const hours = Math.floor(remainingMilliseconds / 3_600_000);
  const minutes = Math.floor((remainingMilliseconds % 3_600_000) / 60_000);
  const seconds = Math.floor((remainingMilliseconds % 60_000) / 1_000);

  return { years, months, days, hours, minutes, seconds };
}

export function startRelationshipTimer(container: HTMLElement): () => void {
  const values = Array.from(container.querySelectorAll<HTMLElement>("[data-time-unit]"));

  const update = () => {
    const time = calculateTimeTogether();
    values.forEach((element) => {
      const unit = element.dataset.timeUnit as keyof TimeTogether;
      element.textContent = String(time[unit]).padStart(2, "0");
    });
  };

  update();
  const interval = window.setInterval(update, 1_000);
  return () => window.clearInterval(interval);
}
