export type ZodiacSign = {
  id: string;
  nameJa: string;
  nameEn: string;
  symbol: string;
  period: string;
};

export const zodiacSigns: ZodiacSign[] = [
  { id: 'aries', nameJa: '牡羊座', nameEn: 'Aries', symbol: '♈', period: '3/21 - 4/19' },
  { id: 'taurus', nameJa: '牡牛座', nameEn: 'Taurus', symbol: '♉', period: '4/20 - 5/20' },
  { id: 'gemini', nameJa: '双子座', nameEn: 'Gemini', symbol: '♊', period: '5/21 - 6/21' },
  { id: 'cancer', nameJa: '蟹座', nameEn: 'Cancer', symbol: '♋', period: '6/22 - 7/22' },
  { id: 'leo', nameJa: '獅子座', nameEn: 'Leo', symbol: '♌', period: '7/23 - 8/22' },
  { id: 'virgo', nameJa: '乙女座', nameEn: 'Virgo', symbol: '♍', period: '8/23 - 9/22' },
  { id: 'libra', nameJa: '天秤座', nameEn: 'Libra', symbol: '♎', period: '9/23 - 10/23' },
  { id: 'scorpio', nameJa: '蠍座', nameEn: 'Scorpio', symbol: '♏', period: '10/24 - 11/22' },
  { id: 'sagittarius', nameJa: '射手座', nameEn: 'Sagittarius', symbol: '♐', period: '11/23 - 12/21' },
  { id: 'capricorn', nameJa: '山羊座', nameEn: 'Capricorn', symbol: '♑', period: '12/22 - 1/19' },
  { id: 'aquarius', nameJa: '水瓶座', nameEn: 'Aquarius', symbol: '♒', period: '1/20 - 2/18' },
  { id: 'pisces', nameJa: '魚座', nameEn: 'Pisces', symbol: '♓', period: '2/19 - 3/20' },
];

export type HoroscopePeriod = 'today' | 'week' | 'month';

export const horoscopePeriods: { id: HoroscopePeriod; label: string }[] = [
  { id: 'today', label: '今日' },
  { id: 'week', label: '今週' },
  { id: 'month', label: '今月' },
];
