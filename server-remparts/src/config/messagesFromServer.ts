export const messagesFromServer = {
  auth: {
    login: {
      notFound: {
        en: 'User not found. Please check your email or password.',
        ua: 'Користувача не знайдено. Перевірте електронну адресу або пароль.',
      },
      unverified: {
        en: 'User’s email is not verified. Please check your inbox or request a new confirmation email.',
        ua: 'Електронну адресу користувача не підтверджено. Перевірте пошту або надішліть запит на новий лист підтвердження.',
      },
      oAuthError: {
        en: 'Google authentication error. Please try again later.',
        ua: 'Помилка аутентифікації Google. Будь ласка, спробуйте ще раз.',
      },
    },

    register: {
      exist: {
        en: 'This email is already in use. Please use a different email address.',
        ua: 'Ця електронна адреса вже використовується. Будь ласка, введіть іншу адресу.',
      },
      success: {
        en: 'User created successfully. Please confirm your email. A confirmation email has been sent.',
        ua: 'Користувача успішно створено. Будь ласка, підтвердьте свою електронну адресу. Лист підтвердження надіслано.',
      },
    },

    confirm: {
      success: {
        en: 'Email successfully confirmed. You can now log in.',
        ua: 'Електронну адресу успішно підтверджено. Тепер ви можете увійти до системи.',
      },
      expired: {
        en: 'The email confirmation token has expired. Please request a new one.',
        ua: 'Термін дії токена підтвердження електронної адреси закінчився. Будь ласка, запросіть новий.',
      },
      notFound: {
        en: 'Email confirmation token not found. Please check the token and try again, or request a new one.',
        ua: 'Токен підтвердження електронної адреси не знайдено. Перевірте токен і спробуйте ще раз або запросіть новий.',
      },
    },

    recovery: {
      notFound: {
        en: 'User not found. Please check your email and try again.',
        ua: 'Користувача не знайдено. Перевірте електронну адресу і спробуйте ще раз.',
      },
      success: {
        en: 'A recovery email has been sent. Please check your inbox and follow the instructions.',
        ua: 'Лист для відновлення пароля надіслано. Перевірте свою електронну пошту та дотримуйтеся інструкцій.',
      },
      tokenNotFound: {
        en: 'Password recovery token not found. Please check the token and try again, or request a new one.',
        ua: 'Токен для відновлення пароля не знайдено. Перевірте токен і спробуйте ще раз або запросіть новий.',
      },
      tokenExpired: {
        en: 'The password recovery token has expired. Please request a new one.',
        ua: 'Термін дії токена для відновлення пароля закінчився. Будь ласка, запросіть новий.',
      },
      succesPasswordChanged: {
        en: 'Your password has been successfully changed. You can now log in with your new password.',
        ua: 'Пароль успішно змінено. Будь ласка, використовуйте новий пароль для входу.',
      },
    },
  },
  cart: {
    addSuccess: {
      en: 'Item was successfully added to cart',
      ua: 'Товар успішно було додано у кошик',
    },
    addError: {
      en: 'Error adding item to cart',
      ua: 'Помилка при додаванні товара у кошик',
    },
    removeSuccess: {
      en: 'Item removed from cart',
      ua: 'Товар видалено з кошика',
    },
    removeError: {
      en: 'Error removing item from cart',
      ua: 'Помилка при видаленні товара з кошика',
    },
    invalidId: {
      en: 'Invalid item ID',
      ua: 'Невірний ідентифікатор товару',
    },
    empty: {
      en: 'Your cart is empty',
      ua: 'Ваш кошик порожній',
    },
  },
};
