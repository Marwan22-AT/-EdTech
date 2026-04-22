import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, signInAnonymously, signOut } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer, collection, getDocs, setDoc } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();

export async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration.");
    }
  }
}

testConnection();

export interface Course {
  id: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  price: number;
  category: string;
  thumbnail: string;
}

export const staticCourses: Course[] = [
  {
    id: 'digital-marketing',
    title: { en: 'Digital Marketing', ar: 'التسويق الرقمي' },
    description: { en: 'Master the art of social media and SEO.', ar: 'اتقن فنون وسائل التواصل الاجتماعي وتحسين محركات البحث.' },
    price: 1500,
    category: 'digital_marketing',
    thumbnail: 'https://picsum.photos/seed/marketing/800/600'
  },
  {
    id: 'game-dev',
    title: { en: 'Game Development', ar: 'تطوير الألعاب' },
    description: { en: 'Create your own 3D worlds with Unity.', ar: 'اصنع عوالمك ثلاثية الأبعاد باستخدام يونيتي.' },
    price: 3000,
    category: 'game_dev',
    thumbnail: 'https://picsum.photos/seed/gamedev/800/600'
  },
  {
    id: 'animation',
    title: { en: 'Animation', ar: 'الرسوم المتحركة' },
    description: { en: 'Bring characters to life with 2D and 3D animation.', ar: 'اجعل الشخصيات تدب فيها الحياة من خلال الرسوم المتحركة ثنائية وثلاثية الأبعاد.' },
    price: 2500,
    category: 'animation',
    thumbnail: 'https://picsum.photos/seed/animation/800/600'
  },
  {
    id: 'digital-creator',
    title: { en: 'Digital Creator', ar: 'المبدع الرقمي' },
    description: { en: 'Build your personal brand online.', ar: 'ابنِ علامتك التجارية الشخصية عبر الإنترنت.' },
    price: 0,
    category: 'digital_creator',
    thumbnail: 'https://picsum.photos/seed/creator/800/600'
  },
  {
    id: 'game-design',
    title: { en: 'Game Design', ar: 'تصميم الألعاب' },
    description: { en: 'Learn the principles of engaging gameplay.', ar: 'تعلم مبادئ اللعب الممتع والمثير.' },
    price: 0,
    category: 'game_design',
    thumbnail: 'https://picsum.photos/seed/gamedesign/800/600'
  }
];
