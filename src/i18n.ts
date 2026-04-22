import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "appName": "EdTech",
      "slogan": "Unleash Your Creative Potential",
      "login": "Login",
      "googleLogin": "Login with Google",
      "facebookLogin": "Login with Facebook",
      "guestLogin": "Explore as Guest",
      "logout": "Logout",
      "welcome": "Welcome, {{name}}",
      "courses": "Available Courses",
      "enroll": "Enroll Now",
      "free": "Free",
      "egp": "EGP",
      "categories": {
        "digital_marketing": "Digital Marketing",
        "digital_creator": "Digital Creator",
        "game_dev": "Game Development",
        "animation": "Animation",
        "game_design": "Game Design"
      },
      "footer": "© 2024 EdTech. Built for designers and developers."
    }
  },
  ar: {
    translation: {
      "appName": "إد-تيك",
      "slogan": "أطلق عنان إمكانياتك الإبداعية",
      "login": "تسجيل الدخول",
      "googleLogin": "تسجيل بواسطة جوجل",
      "facebookLogin": "تسجيل بواسطة فيسبوك",
      "guestLogin": "استكشف كضيف",
      "logout": "تسجيل الخروج",
      "welcome": "مرحباً، {{name}}",
      "courses": "الدورات المتاحة",
      "enroll": "سجل الآن",
      "free": "مجاني",
      "egp": "جنية مصري",
      "categories": {
        "digital_marketing": "التسويق الرقمي",
        "digital_creator": "المبدع الرقمي",
        "game_dev": "تطوير الألعاب",
        "animation": "الرسوم المتحركة",
        "game_design": "تصميم الألعاب"
      },
      "footer": "© 2024 إد-تيك. بني للمصممين والمطورين."
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
