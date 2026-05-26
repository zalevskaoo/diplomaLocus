export const POINT_CATEGORIES = [
  {
    label: 'Доступність',
    value: 'accessibility',
    icon: '♿',
    color: '#9D6F86',
  },
  {
    label: 'Велодоріжки',
    value: 'bike_lane',
    icon: '🚲',
    color: '#000000',
  },
  {
    label: 'Допомога',
    value: 'aid',
    icon: '🤝',
    color: '#855B52',
  },
  {
    label: 'Переробка',
    value: 'recycling',
    icon: '♻️',
    color: '#A9BBBD',
  },
  {
    label: 'Сортування',
    value: 'sorting',
    icon: '🗑️',
    color: '#636563',
  },
  {
    label: 'Укриття',
    value: 'shelter',
    icon: '🛡️',
    color: '#233449',
  },
  {
    label: 'Пункт незламності',
    value: 'invincibility',
    icon: '💡',
    color: '#E1CCAD',
  },
];

export const POINT_FILTER_CATEGORIES = [
  {
    label: 'Усі',
    value: 'all',
    icon: '📍',
    color: '#233449',
  },
  {
    label: 'Збережені',
    value: 'saved',
    icon: '★',
    color: '#9D6F86',
  },
  ...POINT_CATEGORIES,
];

export function getCategoryEmoji(category: string) {
  return POINT_CATEGORIES.find((item) => item.value === category)?.icon ?? '📍';
}

export function getCategoryColor(category: string) {
  return POINT_CATEGORIES.find((item) => item.value === category)?.color ?? '#233449';
}

export function getCategoryLabel(category: string) {
  return (
    POINT_CATEGORIES.find((item) => item.value === category)?.label ??
    category
  );
}