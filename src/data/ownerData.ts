export interface OwnerContactInfo {
  brandName: string;
  brandSub: string;
  phone: string;
  phoneFormatted: string;
  whatsappUrl: string;
  email: string;
  mailtoUrl: string;
  telegramBotUrl: string;
  telegramBotUsername: string;
  websites: {
    name: string;
    domain: string;
    url: string;
    description: string;
    badge: string;
  }[];
}

export const OWNER_CONTACT: OwnerContactInfo = {
  brandName: 'رقيب برو | RqeebPro',
  brandSub: 'مركز الأمان الرقمي وخدمات استرجاع الحسابات وحمايتها',
  phone: '+967785502919',
  phoneFormatted: '+967 785 502 919',
  whatsappUrl: 'https://wa.me/967785502919?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20%D8%B1%D9%82%D9%8A%D8%A8%20%D8%A8%D8%B1%D9%88%D8%8C%20%D9%84%D8%AF%D9%8A%20%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%AD%D9%88%D9%84%20%D8%A7%D8%B3%D8%AA%D8%B1%D8%AC%D8%A7%D8%B9%20%D8%AD%D8%B3%D8%A7%D8%A8%20%D9%85%D8%AE%D8%AA%D8%B1%D9%82',
  email: 'rqeebpro@gmail.com',
  mailtoUrl: 'mailto:rqeebpro@gmail.com?subject=%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%A7%D8%B3%D8%AA%D8%B1%D8%AC%D8%A7%D8%B9%20%D8%AD%D8%B3%D8%A7%D8%A8%20-%20%D8%B1%D9%82%D9%8A%D8%A8%20%D8%A8%D8%B1%D9%88',
  telegramBotUrl: 'https://t.me/Rqeebpro_bot',
  telegramBotUsername: '@Rqeebpro_bot',
  websites: [
    {
      name: 'موقع رقيب برو الرسمي',
      domain: 'rqeebpro.online',
      url: 'https://rqeebpro.online',
      description: 'المنصة الرئيسية للحلول التقنية، التوعية الأمنية وحماية الهويات الرقمية.',
      badge: 'الرئيسي'
    },
    {
      name: 'متجر رقيب برو',
      domain: 'rqeebpro.store',
      url: 'https://rqeebpro.store',
      description: 'متجر الخدمات الرقمية الموثوقة، أدوات الحماية والاستشارات التقنية.',
      badge: 'المتجر الرسمي'
    }
  ]
};
