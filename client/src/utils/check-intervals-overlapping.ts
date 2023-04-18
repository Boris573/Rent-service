import moment from "moment";

interface Period {
  dateFrom: string;
  dateTo: string;
}

export const checkIntervalsOverlapping = (periods: Period[]): boolean => {
  const sortedPeriods = [...periods].sort((a, b) => moment(a.dateFrom, 'DD/MM/YYYY').valueOf() - moment(b.dateTo, 'DD/MM/YYYY').valueOf());
  
  for (let i = 0; i < sortedPeriods.length - 1; i++) {
    if (
      sortedPeriods[i].dateTo &&
      sortedPeriods[i + 1].dateTo &&
      moment(sortedPeriods[i].dateTo, 'DD/MM/YYYY').valueOf() >
        moment(sortedPeriods[i + 1].dateFrom, 'DD/MM/YYYY').valueOf()
    ) {
      return true;
    }
  }


  return false;
};
