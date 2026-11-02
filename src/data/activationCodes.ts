export interface ActivationCodeItem {
  code: string;
  category: 'gmail' | 'face' | 'whats' | 'insta' | 'tik' | 'snap' | 'custom';
  isUsed: boolean;
  usedBy?: string;
  usedAt?: string;
  createdAt?: string;
}

export const PRELOADED_ACTIVATION_CODES: string[] = [
  // Gmail codes
  'R-4821-gmail', 'R-9310-gmail', 'R-1568-gmail', 'R-7402-gmail', 'R-3694-gmail',
  'R-8053-gmail', 'R-2147-gmail', 'R-6891-gmail', 'R-4035-gmail', 'R-5726-gmail',
  'R-1983-gmail', 'R-9420-gmail', 'R-3215-gmail', 'R-7849-gmail', 'R-6012-gmail',
  'R-2538-gmail', 'R-8964-gmail', 'R-4170-gmail', 'R-5319-gmail', 'R-1087-gmail',
  'R-7652-gmail', 'R-3841-gmail', 'R-9204-gmail', 'R-6158-gmail', 'R-2490-gmail',
  'R-5831-gmail', 'R-1379-gmail', 'R-7024-gmail', 'R-4916-gmail', 'R-8350-gmail',
  'R-2609-gmail', 'R-6482-gmail', 'R-1193-gmail', 'R-9547-gmail', 'R-3720-gmail',
  'R-7481-gmail', 'R-5096-gmail', 'R-2834-gmail', 'R-8165-gmail', 'R-4312-gmail',
  'R-6903-gmail', 'R-1527-gmail', 'R-9840-gmail', 'R-3461-gmail', 'R-7218-gmail',
  'R-5692-gmail', 'R-2045-gmail', 'R-8739-gmail', 'R-4106-gmail', 'R-6351-gmail',
  'R-1284-gmail', 'R-9935-gmail', 'R-3072-gmail', 'R-7564-gmail', 'R-4890-gmail',
  'R-2153-gmail', 'R-8401-gmail', 'R-6297-gmail', 'R-1738-gmail', 'R-5412-gmail',
  'R-9083-gmail', 'R-3625-gmail', 'R-7149-gmail', 'R-2860-gmail', 'R-5391-gmail',
  'R-8014-gmail', 'R-4268-gmail', 'R-6935-gmail', 'R-1450-gmail', 'R-9721-gmail',
  'R-3184-gmail', 'R-7609-gmail', 'R-5238-gmail', 'R-1896-gmail', 'R-8452-gmail',
  'R-4071-gmail', 'R-6513-gmail', 'R-2304-gmail', 'R-9167-gmail', 'R-3580-gmail',
  'R-7092-gmail', 'R-1246-gmail', 'R-8831-gmail', 'R-4659-gmail', 'R-5920-gmail',
  'R-2715-gmail', 'R-6384-gmail', 'R-1098-gmail', 'R-9432-gmail', 'R-3816-gmail',
  'R-7250-gmail', 'R-5143-gmail', 'R-8609-gmail', 'R-2471-gmail', 'R-6982-gmail',
  'R-1357-gmail', 'R-9046-gmail', 'R-4521-gmail', 'R-7830-gmail', 'R-3195-gmail',

  // Facebook codes
  'R-5614-face', 'R-8279-face', 'R-1903-face', 'R-6428-face', 'R-2385-face',
  'R-7156-face', 'R-4802-face', 'R-9364-face', 'R-3510-face', 'R-8097-face',
  'R-1629-face', 'R-6741-face', 'R-2953-face', 'R-5208-face', 'R-7491-face',
  'R-4165-face', 'R-9824-face', 'R-3037-face', 'R-6180-face', 'R-1572-face',
  'R-8935-face', 'R-2419-face', 'R-7603-face', 'R-5348-face', 'R-1120-face',
  'R-8761-face', 'R-4695-face', 'R-6234-face', 'R-3908-face', 'R-9512-face',
  'R-2804-face', 'R-7359-face', 'R-5081-face', 'R-1426-face', 'R-8190-face',
  'R-4375-face', 'R-6921-face', 'R-2068-face', 'R-9643-face', 'R-3250-face',
  'R-7815-face', 'R-5739-face', 'R-1804-face', 'R-8427-face', 'R-4156-face',
  'R-6093-face', 'R-2641-face', 'R-9382-face', 'R-3105-face', 'R-7524-face',
  'R-5490-face', 'R-1273-face', 'R-8906-face', 'R-4632-face', 'R-6718-face',
  'R-2195-face', 'R-9054-face', 'R-3481-face', 'R-7230-face', 'R-5912-face',
  'R-1658-face', 'R-8347-face', 'R-4029-face', 'R-6491-face', 'R-2370-face',
  'R-9765-face', 'R-3142-face', 'R-7680-face', 'R-5214-face', 'R-1938-face',
  'R-8501-face', 'R-4286-face', 'R-6159-face', 'R-2704-face', 'R-9418-face',
  'R-3591-face', 'R-7106-face', 'R-5839-face', 'R-1320-face', 'R-8065-face',
  'R-4742-face', 'R-6930-face', 'R-2481-face', 'R-9152-face', 'R-3824-face',
  'R-7593-face', 'R-5107-face', 'R-1694-face', 'R-8629-face', 'R-4350-face',
  'R-6218-face', 'R-2095-face', 'R-9841-face', 'R-3406-face', 'R-7371-face',
  'R-5528-face', 'R-1183-face', 'R-8924-face', 'R-4610-face', 'R-6795-face',

  // WhatsApp codes
  'R-2563-whats', 'R-9237-whats', 'R-3041-whats', 'R-7812-whats', 'R-5390-whats',
  'R-1408-whats', 'R-8156-whats', 'R-4923-whats', 'R-6371-whats', 'R-2204-whats',
  'R-9685-whats', 'R-3712-whats', 'R-7450-whats', 'R-5069-whats', 'R-1823-whats',
  'R-8471-whats', 'R-4139-whats', 'R-6084-whats', 'R-2915-whats', 'R-9302-whats',
  'R-3561-whats', 'R-7194-whats', 'R-5628-whats', 'R-1249-whats', 'R-8803-whats',
  'R-4417-whats', 'R-6592-whats', 'R-2038-whats', 'R-9510-whats', 'R-3294-whats',
  'R-7761-whats', 'R-5183-whats', 'R-1702-whats', 'R-8395-whats', 'R-4860-whats',
  'R-6241-whats', 'R-2415-whats', 'R-9076-whats', 'R-3850-whats', 'R-7312-whats',
  'R-5469-whats', 'R-1928-whats', 'R-8631-whats', 'R-4052-whats', 'R-6914-whats',
  'R-2783-whats', 'R-9201-whats', 'R-3429-whats', 'R-7645-whats', 'R-5130-whats',
  'R-1592-whats', 'R-8204-whats', 'R-4371-whats', 'R-6089-whats', 'R-2265-whats',
  'R-9743-whats', 'R-3108-whats', 'R-7856-whats', 'R-5641-whats', 'R-1390-whats',
  'R-8512-whats', 'R-4720-whats', 'R-6394-whats', 'R-2051-whats', 'R-9182-whats',
  'R-3674-whats', 'R-7095-whats', 'R-5231-whats', 'R-1860-whats', 'R-8942-whats',
  'R-4125-whats', 'R-6580-whats', 'R-2904-whats', 'R-9461-whats', 'R-3359-whats',
  'R-7512-whats', 'R-5803-whats', 'R-1476-whats', 'R-8130-whats', 'R-4682-whats',
  'R-6091-whats', 'R-2745-whats', 'R-9318-whats', 'R-3860-whats', 'R-7529-whats',
  'R-5147-whats', 'R-1904-whats', 'R-8635-whats', 'R-4281-whats', 'R-6793-whats',
  'R-2016-whats', 'R-9452-whats', 'R-3189-whats', 'R-7624-whats', 'R-5370-whats',
  'R-1849-whats', 'R-8962-whats', 'R-4513-whats', 'R-6238-whats', 'R-2970-whats',

  // Instagram codes
  'R-9041-insta', 'R-3715-insta', 'R-7482-insta', 'R-5269-insta', 'R-1630-insta',
  'R-8394-insta', 'R-4157-insta', 'R-6820-insta', 'R-2093-insta', 'R-9576-insta',
  'R-3241-insta', 'R-7819-insta', 'R-5062-insta', 'R-1438-insta', 'R-8905-insta',
  'R-4672-insta', 'R-6319-insta', 'R-2584-insta', 'R-9127-insta', 'R-3460-insta',
  'R-7098-insta', 'R-5831-insta', 'R-1245-insta', 'R-8703-insta', 'R-4961-insta',
  'R-6124-insta', 'R-2839-insta', 'R-9650-insta', 'R-3178-insta', 'R-7405-insta',
  'R-5926-insta', 'R-1582-insta', 'R-8349-insta', 'R-4017-insta', 'R-6790-insta',
  'R-2354-insta', 'R-9821-insta', 'R-3608-insta', 'R-7294-insta', 'R-5137-insta',
  'R-1760-insta', 'R-8425-insta', 'R-4983-insta', 'R-6512-insta', 'R-2049-insta',
  'R-9376-insta', 'R-3810-insta', 'R-7643-insta', 'R-5298-insta', 'R-1065-insta',
  'R-8732-insta', 'R-4419-insta', 'R-6280-insta', 'R-2957-insta', 'R-9104-insta',
  'R-3538-insta', 'R-7861-insta', 'R-5429-insta', 'R-1196-insta', 'R-8653-insta',
  'R-4320-insta', 'R-6078-insta', 'R-2741-insta', 'R-9895-insta', 'R-3264-insta',
  'R-7530-insta', 'R-5187-insta', 'R-1409-insta', 'R-8972-insta', 'R-4635-insta',
  'R-6108-insta', 'R-2381-insta', 'R-9754-insta', 'R-3027-insta', 'R-7691-insta',
  'R-5416-insta', 'R-1832-insta', 'R-8569-insta', 'R-4203-insta', 'R-6940-insta',
  'R-2175-insta', 'R-9386-insta', 'R-3651-insta', 'R-7028-insta', 'R-5794-insta',
  'R-1263-insta', 'R-8410-insta', 'R-4875-insta', 'R-6302-insta', 'R-2969-insta',
  'R-9524-insta', 'R-3190-insta', 'R-7846-insta', 'R-5013-insta', 'R-1687-insta',
  'R-8352-insta', 'R-4709-insta', 'R-6231-insta', 'R-2498-insta', 'R-9065-insta',

  // TikTok codes
  'R-3512-tik', 'R-7940-tik', 'R-5286-tik', 'R-1609-tik', 'R-8374-tik',
  'R-4091-tik', 'R-6725-tik', 'R-2458-tik', 'R-9130-tik', 'R-3867-tik',
  'R-7014-tik', 'R-5692-tik', 'R-1235-tik', 'R-8901-tik', 'R-4578-tik',
  'R-6143-tik', 'R-2809-tik', 'R-9462-tik', 'R-3127-tik', 'R-7850-tik',
  'R-5094-tik', 'R-1738-tik', 'R-8415-tik', 'R-4260-tik', 'R-6983-tik',
  'R-2316-tik', 'R-9741-tik', 'R-3058-tik', 'R-7624-tik', 'R-5389-tik',
  'R-1962-tik', 'R-8530-tik', 'R-4175-tik', 'R-6049-tik', 'R-2713-tik',
  'R-9880-tik', 'R-3426-tik', 'R-7193-tik', 'R-5637-tik', 'R-1054-tik',
  'R-8721-tik', 'R-4398-tik', 'R-6265-tik', 'R-2902-tik', 'R-9537-tik',
  'R-3280-tik', 'R-7615-tik', 'R-5448-tik', 'R-1893-tik', 'R-8066-tik',
  'R-4731-tik', 'R-6104-tik', 'R-2579-tik', 'R-9242-tik', 'R-3918-tik',
  'R-7053-tik', 'R-5826-tik', 'R-1490-tik', 'R-8637-tik', 'R-4201-tik',
  'R-6974-tik', 'R-2138-tik', 'R-9405-tik', 'R-3762-tik', 'R-7329-tik',
  'R-5196-tik', 'R-1853-tik', 'R-8020-tik', 'R-4687-tik', 'R-6354-tik',
  'R-2911-tik', 'R-9584-tik', 'R-3247-tik', 'R-7810-tik', 'R-5473-tik',
  'R-1036-tik', 'R-8799-tik', 'R-4362-tik', 'R-6025-tik', 'R-2698-tik',
  'R-9151-tik', 'R-3884-tik', 'R-7407-tik', 'R-5930-tik', 'R-1263-tik',
  'R-8540-tik', 'R-4117-tik', 'R-6780-tik', 'R-2343-tik', 'R-9016-tik',
  'R-3679-tik', 'R-7232-tik', 'R-5505-tik', 'R-1978-tik', 'R-8431-tik',
  'R-4804-tik', 'R-6167-tik', 'R-2730-tik', 'R-9393-tik', 'R-3066-tik',

  // Snapchat codes
  'R-7419-snap', 'R-5082-snap', 'R-1635-snap', 'R-8904-snap', 'R-4271-snap',
  'R-6598-snap', 'R-2143-snap', 'R-9810-snap', 'R-3477-snap', 'R-7034-snap',
  'R-5601-snap', 'R-1268-snap', 'R-8535-snap', 'R-4902-snap', 'R-6179-snap',
  'R-2846-snap', 'R-9413-snap', 'R-3080-snap', 'R-7757-snap', 'R-5324-snap',
  'R-1991-snap', 'R-8668-snap', 'R-4335-snap', 'R-6002-snap', 'R-2779-snap',
  'R-9146-snap', 'R-3813-snap', 'R-7480-snap', 'R-5157-snap', 'R-1724-snap',
  'R-8391-snap', 'R-4068-snap', 'R-6935-snap', 'R-2602-snap', 'R-9279-snap',
  'R-3546-snap', 'R-7113-snap', 'R-5880-snap', 'R-1457-snap', 'R-8124-snap',
  'R-4791-snap', 'R-6368-snap', 'R-2035-snap', 'R-9702-snap', 'R-3369-snap',
  'R-7936-snap', 'R-5603-snap', 'R-1270-snap', 'R-8837-snap', 'R-4504-snap',
  'R-6171-snap', 'R-2848-snap', 'R-9515-snap', 'R-3182-snap', 'R-7749-snap',
  'R-5416-snap', 'R-1083-snap', 'R-8650-snap', 'R-4327-snap', 'R-6994-snap',
  'R-2561-snap', 'R-9238-snap', 'R-3905-snap', 'R-7172-snap', 'R-5849-snap',
  'R-1416-snap', 'R-8083-snap', 'R-4750-snap', 'R-6417-snap', 'R-2084-snap',
  'R-9751-snap', 'R-3328-snap', 'R-7995-snap', 'R-5662-snap', 'R-1339-snap',
  'R-8906-snap', 'R-4573-snap', 'R-6240-snap', 'R-2817-snap', 'R-9484-snap',
  'R-3151-snap', 'R-7818-snap', 'R-5485-snap', 'R-1152-snap', 'R-8729-snap',
  'R-4396-snap', 'R-6063-snap', 'R-2730-snap', 'R-9307-snap', 'R-3674-snap',
  'R-7241-snap', 'R-5908-snap', 'R-1575-snap', 'R-8242-snap', 'R-4819-snap',
  'R-6486-snap', 'R-2153-snap', 'R-9720-snap', 'R-3387-snap', 'R-7054-snap'
];

export function getInitialActivationCodes(): ActivationCodeItem[] {
  return PRELOADED_ACTIVATION_CODES.map((code) => {
    let category: ActivationCodeItem['category'] = 'custom';
    if (code.endsWith('-gmail')) category = 'gmail';
    else if (code.endsWith('-face')) category = 'face';
    else if (code.endsWith('-whats')) category = 'whats';
    else if (code.endsWith('-insta')) category = 'insta';
    else if (code.endsWith('-tik')) category = 'tik';
    else if (code.endsWith('-snap')) category = 'snap';

    return {
      code,
      category,
      isUsed: false,
      createdAt: new Date().toISOString(),
    };
  });
}
