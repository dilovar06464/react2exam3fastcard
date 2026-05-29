const fs = require('fs');

const enPath = 'public/locales/en/translation.json';
const ruPath = 'public/locales/ru/translation.json';

const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const ru = JSON.parse(fs.readFileSync(ruPath, 'utf8'));

// auth.no_account
en.auth = en.auth || {};
en.auth.no_account = "Don't have account?";
ru.auth.no_account = 'Нет аккаунта?';

// new_arrival.womens_title
en.new_arrival = en.new_arrival || {};
en.new_arrival.womens_title = "Women's Collections";
ru.new_arrival.womens_title = 'Женские коллекции';

// flash_sales.todays
en.flash_sales = en.flash_sales || {};
en.flash_sales.todays = "Today's";
ru.flash_sales.todays = 'Сегодня';

fs.writeFileSync(enPath, JSON.stringify(en, null, 2));
fs.writeFileSync(ruPath, JSON.stringify(ru, null, 2));
console.log('Updated translations');
