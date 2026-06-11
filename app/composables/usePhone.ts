type PhoneFormat = 'e164' | 'national' | 'international' | 'international-parentheses';

export const usePhone = () => {
  const normalizePhone = (phone: string): string => {
    return phone.replace(/[^\d+]/g, '');
  };

  const toE164 = (phone: string): string => {
    const normalized = normalizePhone(phone);

    if (normalized.startsWith('+84')) return normalized;

    if (normalized.startsWith('0')) {
      return `+84${normalized.slice(1)}`;
    }

    return normalized;
  };

  const formatPhone = (phone: string, format: PhoneFormat = 'international'): string => {
    const e164 = toE164(phone);

    const match = e164.match(/^\+84(\d{3})(\d{3})(\d{3})$/);

    if (!match) return phone;

    const [, first, second, third] = match;

    switch (format) {
      case 'e164':
        return e164;

      case 'national':
        return `0${first} ${second} ${third}`;

      case 'international-parentheses':
        return `(+84) ${first} ${second} ${third}`;

      case 'international':
      default:
        return `+84 ${first} ${second} ${third}`;
    }
  };

  const toTelHref = (phone: string): string => {
    return `tel:${toE164(phone)}`;
  };

  return {
    normalizePhone,
    toE164,
    formatPhone,
    toTelHref,
  };
};
