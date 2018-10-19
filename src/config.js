const config = {
  defaultTimes: {
    morning: { hour: 9, minute: 0 },
    evening: { hour: 21, minute: 0 },
  },
  pillCategories: ['morning', 'evening'],
  storageFormat: 'dd-MM-yyyy',
  storageKey: 'arePillsTakenData',
  historyLength: 7,
  days: 2,
};

export default config;