export const getDate = str =>
  str
    .slice(0, 10)
    .split('-')
    .reverse()
    .map((item, index) =>
      index === 1
        ? [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
          ][parseInt(item) - 1]
        : item
    )
    .join(' ');

export const mt = m =>
  [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ][parseInt(m) - 1];
