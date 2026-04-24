import type { ExperienceItem } from '@/types/experience';

export const useDate = () => {
  const toDate = (date: Date | string | 'present'): Date => {
    if (date === 'present') return new Date();
    if (typeof date === 'string') return new Date(date);
    return date;
  };

  const parseDate = (date: string): Date => new Date(date);

  const formatDate = (date: Date): string =>
    date.toLocaleString('en-US', { month: 'short', year: 'numeric' });

  const calculateDuration = (
    startDate: Date | string,
    endDate: Date | string | 'present',
  ): string => {
    const start = toDate(startDate);
    const end = toDate(endDate);

    const diffInDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

    if (diffInDays < 30) {
      return `${diffInDays} day${diffInDays === 1 ? '' : 's'}`;
    }

    const diffInMonths =
      (end.getFullYear() - start.getFullYear()) * 12 + end.getMonth() - start.getMonth();

    const years = Math.floor(diffInMonths / 12);
    const months = diffInMonths % 12;

    if (years === 0) return `${months} mo${months === 1 ? '' : 's'}`;
    if (months === 0) return `${years} yr${years === 1 ? '' : 's'}`;
    return `${years} yr${years === 1 ? '' : 's'} ${months} mo${months === 1 ? '' : 's'}`;
  };

  const getEndDateText = (endDate: Date | string | 'present', showPresent: boolean): string => {
    if (endDate === 'present') return 'Present';
    if (showPresent) return 'Current';
    return formatDate(toDate(endDate));
  };

  const getExperienceDateRange = (
    experience: ExperienceItem,
  ): { earliest: Date; latest: Date | 'present' } => {
    let earliest = toDate(experience.position.startDate);
    let latest: Date | 'present' =
      experience.position.endDate === 'present' ? 'present' : toDate(experience.position.endDate);

    for (const position of experience.promotions ?? []) {
      const start = toDate(position.startDate);
      if (start < earliest) earliest = start;

      if (position.endDate === 'present') {
        latest = 'present';
      } else if (latest !== 'present') {
        const end = toDate(position.endDate);
        if (end > latest) latest = end;
      }
    }

    return { earliest, latest };
  };

  const calculateTotalCompanyDuration = (experience: ExperienceItem): string => {
    const { earliest, latest } = getExperienceDateRange(experience);
    return calculateDuration(earliest, latest);
  };

  const getLatestEndDate = (experience: ExperienceItem): Date => {
    const { latest } = getExperienceDateRange(experience);
    return latest === 'present' ? new Date() : latest;
  };

  const sortByEndDate = (items: ExperienceItem[]): ExperienceItem[] =>
    [...items].sort((a, b) => getLatestEndDate(b).getTime() - getLatestEndDate(a).getTime());

  return {
    parseDate,
    formatDate,
    calculateDuration,
    calculateTotalCompanyDuration,
    getEndDateText,
    getLatestEndDate,
    sortByEndDate,
  };
};
