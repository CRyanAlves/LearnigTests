import { parseISO, setYear } from "date-fns";

function getFutureDate(date: string ): Date {
  return setYear(parseISO(date), new Date().getFullYear() + 1); 
}

export { getFutureDate }