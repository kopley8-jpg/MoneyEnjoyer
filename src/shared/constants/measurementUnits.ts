export const measurementUnits = {
  service: {
    time: {
      normalize: { name: 'ч' },
      variants: {
        year: {
          name: { short: 'г.', full: 'год', many: 'лет' },
          factor: 24 * 365,
        },
        week: {
          name: { short: 'нед.', full: 'неделя', many: 'недель' },
          factor: 24 * 7,
        },
        day: { name: { short: 'дн.', full: 'день', many: 'дней' }, factor: 24 },
        min: {
          name: { short: 'мин.', full: 'минута', many: 'минут' },
          factor: 1 / 60,
        },
      },
    },
  },
  item: {
    mass: {
      normalize: { name: 'кг' },
      variants: {
        t: { name: { short: 'т.', full: 'тонна', many: 'тонн' }, factor: 1000 },
        gr: {
          name: { short: 'гр.', full: 'грамм', many: 'грамм' },
          factor: 1 / 1000,
        },
      },
    },
    volume: {
      normalize: { name: 'л' },
      variants: {
        ml: { name: 'мл', factor: 0.001 },
      },
    },
  },
} as const;
