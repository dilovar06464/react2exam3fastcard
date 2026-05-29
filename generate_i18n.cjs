const fs = require('fs');

const extractKeysJson = fs.readFileSync('extracted_keys.json', 'utf16le');
let parsedEn;
try {
  // Strip BOM if present
  let content = extractKeysJson.charCodeAt(0) === 0xFEFF ? extractKeysJson.slice(1) : extractKeysJson;
  parsedEn = JSON.parse(content);
} catch (e) {
  // Try utf8 fallback just in case
  const utf8Content = fs.readFileSync('extracted_keys.json', 'utf8');
  parsedEn = JSON.parse(utf8Content.charCodeAt(0) === 0xFEFF ? utf8Content.slice(1) : utf8Content);
}

const flatRu = {
  "footer.faq": "Вопросы и ответы",
  "cart.total": "Итого",
  "details.in_stock": "В наличии",
  "services.guarantee_desc": "Мы возвращаем деньги в течение 30 дней",
  "cart.cart_total": "Сумма в корзине",
  "products.sort_price_low": "Цена: по возрастанию",
  "details.related_item": "Похожие товары",
  "products.sort_price_high": "Цена: по убыванию",
  "checkout.save_info": "Сохранить эту информацию для более быстрого оформления заказа в следующий раз",
  "checkout.apply": "Применить",
  "new_arrival.ps5_title": "PlayStation 5",
  "contact.phone": "Телефон: +88016111122222",
  "auth.phone_placeholder": "Номер телефона",
  "new_arrival.featured": "Рекомендуемое",
  "auth.have_account": "Уже есть аккаунт?",
  "contact.emails_support": "Email: support@exclusive.com",
  "checkout.apartment": "Квартира, этаж и т.д. (необязательно)",
  "footer.copyright": "© Rimel 2022. Все права защищены",
  "flash_sales.hours": "Часы",
  "account.my_orders": "Мои заказы",
  "auth.phone_short": "Номер телефона слишком короткий",
  "account.my_returns": "Мои возвраты",
  "details.no_description": "Описание для этого товара отсутствует.",
  "details.free_delivery": "Бесплатная доставка",
  "products.category": "Категория",
  "auth.password_short": "Пароль должен содержать не менее 6 символов",
  "about.our_story": "Наша история",
  "wishlist.just_for_you": "Специально для вас",
  "brands.title": "Ознакомьтесь с нашими товарами",
  "auth.email_invalid": "Неверный адрес email",
  "account.password_changes": "Изменение пароля",
  "header.my_order": "Мой заказ",
  "products.features": "Характеристики",
  "auth.logging_in": "Вход в систему...",
  "footer.get_off": "Получите скидку 10% на первый заказ",
  "category.subtitle": "Категории",
  "cart.process_checkout": "Оформить заказ",
  "products.max": "Макс",
  "auth.confirm_password_required": "Пожалуйста, подтвердите пароль",
  "checkout.first_name": "Имя",
  "cart.shipping": "Доставка",
  "footer.terms_of_use": "Пользовательское соглашение",
  "new_arrival.title": "Новые поступления",
  "account.save_changes": "Сохранить изменения",
  "account.confirm_new_password": "Подтвердите новый пароль",
  "flash_sales.title": "Горячие распродажи",
  "bsp.loading": "Загрузка самых продаваемых товаров...",
  "footer.support": "Поддержка",
  "checkout.phone": "Номер телефона",
  "account.my_account": "Мой аккаунт",
  "footer.exclusive": "Exclusive",
  "new_arrival.perfume_desc": "GUCCI INTENSE OUD EDP",
  "auth.creating": "Создание...",
  "categories_banner.title": "Улучшите свой опыт прослушивания музыки",
  "contact.your_message": "Ваше сообщение",
  "account.my_cancellations": "Мои отмены",
  "nav.contact": "Контакты",
  "services.delivery_title": "Бесплатная и быстрая доставка",
  "details.return_delivery": "Возврат товара",
  "cart.title": "Корзина",
  "auth.name_required": "Имя обязательно",
  "footer.account": "Аккаунт",
  "checkout.last_name": "Фамилия",
  "flash_sales.days": "Дни",
  "header.search_placeholder": "Что вы ищете?",
  "account.cancel": "Отмена",
  "footer.wishlist": "Избранное",
  "footer.my_account": "Мой аккаунт",
  "categories_banner.buy_now": "Купить сейчас!",
  "home.slide3_title": "Скидка до 20% по купону",
  "flash_sales.minutes": "Минуты",
  "auth.email_placeholder": "Email или номер телефона",
  "brands.loading": "Загрузка наших товаров...",
  "header.logout": "Выйти",
  "auth.name_placeholder": "Имя",
  "products.sort_populary": "Популярные",
  "products.more_products": "Больше товаров",
  "new_arrival.ps5_desc": "Выходит в продажу черно-белая версия PS5.",
  "auth.enter_details": "Введите свои данные ниже",
  "products.condition": "Состояние",
  "home.slide2_title": "Скидка до 15% по купону",
  "cart.product": "Товар",
  "account.my_payment_options": "Мои способы оплаты",
  "footer.subscribe": "Подписаться",
  "details.not_found": "Товар не найден.",
  "footer.address": "111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.",
  "checkout.err_first_name": "Имя обязательно",
  "auth.password_placeholder": "Пароль",
  "auth.confirm_password_placeholder": "Подтвердите пароль",
  "cart.subtotal": "Подытог",
  "account.my_profile": "Мой профиль",
  "bsp.view_all": "Посмотреть все",
  "nav.home": "Главная",
  "checkout.billing_details": "Детали оплаты",
  "header.account": "Аккаунт",
  "cart.empty": "Ваша корзина пуста",
  "services.guarantee_title": "Гарантия возврата денег",
  "categories_banner.subtitle": "Категории",
  "nav.view_cart": "Просмотр корзины",
  "auth.email_placeholder2": "Email",
  "checkout.title": "Оформление заказа",
  "new_arrival.womens_desc": "Рекомендуемые женские коллекции, которые подарят вам другую атмосферу.",
  "auth.email_required": "Необходим email или номер телефона",
  "footer.social": "Мы в соцсетях",
  "cart.return_shop": "Вернуться к покупкам",
  "bsp.this_month": "В этом месяце",
  "account.manage_my_account": "Управление аккаунтом",
  "contact.call_to_us": "Позвоните нам",
  "checkout.err_last_name": "Фамилия обязательна",
  "products.price_range": "Диапазон цен",
  "auth.email_required2": "Email обязателен",
  "checkout.city": "Город",
  "account.address_book": "Адресная книга",
  "footer.enter_email": "Введите свой email",
  "details.size": "Размер:",
  "contact.write_to_us": "Напишите нам",
  "footer.shop": "Магазин",
  "header.about": "О нас",
  "auth.login_title": "Вход в Exclusive",
  "products.see_all": "Смотреть все",
  "checkout.err_street": "Улица обязательна",
  "auth.password_match": "Пароли не совпадают",
  "cart.free": "Бесплатно",
  "auth.signup_google": "Зарегистрироваться через Google",
  "account.welcome": "Добро пожаловать!",
  "details.enter_postal": "Введите свой почтовый индекс для проверки доступности доставки",
  "wishlist.empty": "Ваш список избранного пуст",
  "checkout.place_order": "Разместить заказ",
  "header.signup": "Регистрация",
  "wishlist.move_all_to_bag": "Переместить все в корзину",
  "account.new_password": "Новый пароль",
  "services.support_desc": "Дружелюбная поддержка клиентов 24/7",
  "auth.sign_up_link": "Зарегистрироваться",
  "nav.product": "Товары",
  "products.min": "Мин",
  "header.contact": "Контакты",
  "flash_sales.seconds": "Секунды",
  "footer.contact": "Контакты",
  "contact.available": "Мы доступны 24/7, 7 дней в неделю.",
  "cart.price": "Цена",
  "flash_sales.loading": "Загрузка товаров...",
  "checkout.email": "Email адрес",
  "footer.cart": "Корзина",
  "products.all_products": "Все товары",
  "details.free_30_days": "Бесплатный возврат в течение 30 дней.",
  "nav.about": "О нас",
  "details.loading": "Загрузка информации о товаре...",
  "account.edit_your_profile": "Редактировать профиль",
  "cart.coupon_placeholder": "Код купона",
  "auth.log_in": "Войти",
  "home.slide3_series": "MacBook Pro M3",
  "products.ratings": "Рейтинги",
  "checkout.err_city": "Город обязателен",
  "new_arrival.speakers_title": "Колонки",
  "brands.subtitle": "Наши товары",
  "checkout.bank": "Банковский перевод",
  "services.delivery_desc": "Бесплатная доставка при заказе от $140",
  "auth.password_required": "Пароль обязателен",
  "cart.apply_coupon": "Применить купон",
  "footer.quick_link": "Быстрые ссылки",
  "flash_sales.add_to_cart": "В корзину",
  "home.slide1_title": "Скидка до 10% по купону",
  "products.brands": "Бренды",
  "home.slide1_series": "Серия iPhone 14",
  "home.shop_now": "За покупками",
  "products.no_match": "Нет товаров, соответствующих выбранным фильтрам.",
  "footer.privacy_policy": "Политика конфиденциальности",
  "auth.phone_required": "Номер телефона обязателен",
  "nav.account": "Аккаунт",
  "contact.fill_form": "Заполните нашу форму, и мы свяжемся с вами в течение 24 часов.",
  "contact.send_message": "Отправить сообщение",
  "account.current_password": "Текущий пароль",
  "checkout.street_address": "Улица",
  "new_arrival.perfume_title": "Парфюм",
  "account.my_wishlist": "Мой список избранного",
  "details.details": "Подробнее",
  "category.title": "Обзор по категориям",
  "details.colours": "Цвета:",
  "services.support_title": "Круглосуточная поддержка",
  "auth.phone_digits": "Номер телефона должен содержать только цифры",
  "brands.new": "НОВИНКА",
  "header.home": "Главная",
  "products.sort_newest": "Новинки",
  "auth.signup_title": "Создать аккаунт",
  "nav.wishlist": "Избранное",
  "bsp.title": "Хиты продаж",
  "category.loading": "Загрузка категорий...",
  "home.slide2_series": "Серия iPhone 15",
  "new_arrival.speakers_desc": "Беспроводные колонки Amazon",
  "checkout.cash": "Наличными при получении",
  "cart.quantity": "Количество",
  "auth.create_account": "Создать аккаунт",
  "flash_sales.view_all": "Смотреть все товары",
  "contact.emails_customer": "Email: customer@exclusive.com",
  "about.story_p1": "Запущенный в 2015 году, Exclusive является ведущим рынком онлайн-покупок в Южной Азии с активным присутствием в Бангладеш. Поддерживаемый широким спектром индивидуальных маркетинговых, информационных и сервисных решений, Exclusive имеет 10 500 продавцов и 300 брендов и обслуживает 3 миллиона клиентов по всему региону.",
  "about.story_p2": "В Exclusive представлено более 1 миллиона товаров, и ассортимент растет очень быстро. Exclusive предлагает разнообразный ассортимент в категориях, начиная от потребительских.",
  "about.sallers_active": "Продавцов на нашем сайте",
  "about.monthly_sale": "Ежемесячные продажи",
  "about.customer_active": "Активных клиентов",
  "about.annual_sale": "Годовой объем продаж",
  "about.role_founder": "Основатель и Председатель",
  "about.role_managing_director": "Управляющий Директор",
  "about.role_product_designer": "Продуктовый дизайнер",
  "services.free_delivery_title": "БЕСПЛАТНАЯ И БЫСТРАЯ ДОСТАВКА",
  "services.free_delivery_desc": "Бесплатная доставка при заказе от $140",
  "services.customer_service_title": "ОБСЛУЖИВАНИЕ КЛИЕНТОВ 24/7",
  "services.customer_service_desc": "Дружелюбная поддержка клиентов 24/7",
  "services.money_back_title": "ГАРАНТИЯ ВОЗВРАТА ДЕНЕГ",
  "services.money_back_desc": "Мы возвращаем деньги в течение 30 дней"
};

function unflatten(data) {
    const result = {};
    for (const key in data) {
        const parts = key.split('.');
        let current = result;
        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            if (i === parts.length - 1) {
                current[part] = data[key];
            } else {
                if (!current[part]) {
                    current[part] = {};
                }
                current = current[part];
            }
        }
    }
    return result;
}

const enNested = unflatten(parsedEn);
const ruNested = unflatten(flatRu);

// Make sure target directories exist
if (!fs.existsSync('public/locales/en')) {
  fs.mkdirSync('public/locales/en', { recursive: true });
}
if (!fs.existsSync('public/locales/ru')) {
  fs.mkdirSync('public/locales/ru', { recursive: true });
}

fs.writeFileSync('public/locales/en/translation.json', JSON.stringify(enNested, null, 2), 'utf8');
fs.writeFileSync('public/locales/ru/translation.json', JSON.stringify(ruNested, null, 2), 'utf8');

console.log('Successfully wrote translation files');
