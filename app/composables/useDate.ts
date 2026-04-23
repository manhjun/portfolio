import type { ExperienceItem } from '@/types/experience';

export const useDate = () => {
  const parseDate = (date: string) => {
    return new Date(date);
  };

  const formatDate = (date: Date | string) => {
    if (typeof date === 'string') {
      date = new Date(date);
    }

    return date.toLocaleString('en-US', { month: 'short', year: 'numeric' });
  };

  const calculateDuration = (
    startDate: Date | string,
    endDate: Date | string | 'present',
  ): string => {
    const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
    const end =
      endDate === 'present'
        ? new Date()
        : typeof endDate === 'string'
          ? new Date(endDate)
          : endDate;

    const diffInDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

    if (diffInDays < 30) {
      return `${diffInDays} day${diffInDays !== 1 ? 's' : ''}`;
    }

    const diffInMonths =
      (end.getFullYear() - start.getFullYear()) * 12 + end.getMonth() - start.getMonth();

    const years = Math.floor(diffInMonths / 12);
    const months = diffInMonths % 12;

    if (years === 0) {
      return `${months} mo${months === 1 ? '' : 's'}`;
    }
    if (months === 0) {
      return `${years} yr${years === 1 ? '' : 's'}`;
    }
    return `${years} yr${years === 1 ? '' : 's'} ${months} mo${months === 1 ? '' : 's'}`;
  };

  const calculateTotalCompanyDuration = (experience: ExperienceItem): string => {
    let earliestStart =
      typeof experience.position.startDate === 'string'
        ? new Date(experience.position.startDate)
        : experience.position.startDate;

    let latestEnd =
      typeof experience.position.endDate === 'string' && experience.position.endDate !== 'present'
        ? new Date(experience.position.endDate)
        : experience.position.endDate;

    if (experience.promotions && experience.promotions.length > 0) {
      for (const position of experience.promotions) {
        if (typeof position.startDate === 'string') {
          position.startDate = new Date(position.startDate);
        }
        if (typeof position.endDate === 'string' && position.endDate !== 'present') {
          position.endDate = new Date(position.endDate);
        }

        if (position.startDate < earliestStart) {
          earliestStart = position.startDate;
        }
        if (
          position.endDate !== 'present' &&
          latestEnd !== 'present' &&
          position.endDate > (latestEnd as Date)
        ) {
          latestEnd = position.endDate;
        }
      }
    }

    return calculateDuration(earliestStart, latestEnd);
  };

  const getEndDateText = (endDate: Date | string | 'present', showPresent: boolean): string => {
    if (typeof endDate === 'string' && endDate !== 'present') {
      endDate = new Date(endDate);
    }

    if (endDate === 'present') {
      return 'Present';
    }
    if (showPresent) {
      return 'Current';
    }
    return formatDate(endDate as Date);
  };

  const getLatestEndDate = (experience: ExperienceItem): Date => {
    let latestEnd =
      typeof experience.position.endDate === 'string' && experience.position.endDate !== 'present'
        ? new Date(experience.position.endDate)
        : experience.position.endDate;

    if (experience.promotions && experience.promotions.length > 0) {
      for (const position of experience.promotions) {
        if (typeof position.endDate === 'string' && position.endDate !== 'present') {
          position.endDate = new Date(position.endDate);
        }

        const isPromotionNewer =
          position.endDate !== 'present' &&
          latestEnd !== 'present' &&
          position.endDate > (latestEnd as Date);

        if (isPromotionNewer) {
          latestEnd = position.endDate;
        }
      }
    }

    return latestEnd === 'present' ? new Date() : (latestEnd as Date);
  };

  const sortByEndDate = (items: ExperienceItem[]): ExperienceItem[] => {
    return [...items].sort((a, b) => {
      const endDateA = getLatestEndDate(a);
      const endDateB = getLatestEndDate(b);
      return endDateB.getTime() - endDateA.getTime();
    });
  };

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
