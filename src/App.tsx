import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LogIn, 
  Globe, 
  LogOut, 
  BookOpen, 
  Gamepad2, 
  Megaphone, 
  PenTool, 
  Video, 
  User as UserIcon,
  ShoppingBag,
  Facebook,
  Chrome
} from 'lucide-react';
import { auth, googleProvider, facebookProvider, staticCourses, Course } from './firebase';
import { signInWithPopup, signInAnonymously, onAuthStateChanged, User, signOut } from 'firebase/auth';

const App: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  const handleLogin = async (provider: 'google' | 'facebook' | 'guest') => {
    try {
      if (provider === 'google') await signInWithPopup(auth, googleProvider);
      else if (provider === 'facebook') await signInWithPopup(auth, facebookProvider);
      else if (provider === 'guest') await signInAnonymously(auth);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const filteredCourses = selectedCategory 
    ? staticCourses.filter(c => c.category === selectedCategory)
    : staticCourses;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-bg-polish font-sans transition-colors duration-300 ${i18n.language === 'ar' ? 'rtl' : ''}`}>
      {/* Header */}
      <nav className="bg-white h-16 border-b border-slate-200 sticky top-0 z-50 flex items-center">
        <div className="w-full px-10 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold shadow-sm">
              E
            </div>
            <span className="text-xl font-extrabold tracking-tight text-primary uppercase">{t('appName')}</span>
          </div>

          <div className="flex items-center gap-6">
            {!user && (
               <div className="hidden md:flex flex-col items-end mr-4">
                 <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Language / اللغة</span>
                 <button 
                   onClick={toggleLanguage}
                   className="text-xs font-semibold text-primary hover:text-accent transition-colors"
                 >
                   English | العربية
                 </button>
               </div>
            )}
            
            {user && (
              <div className="flex items-center gap-6">
                <button 
                  onClick={toggleLanguage}
                  className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-medium hover:bg-slate-50 transition-colors"
                >
                  {i18n.language === 'en' ? 'العربية' : 'English'}
                </button>
                <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
                  <div className="flex flex-col items-end">
                    <span className="text-xs font-bold text-primary">{user.isAnonymous ? t('guestLogin') : (user.displayName || user.email)}</span>
                    <button 
                      onClick={() => signOut(auth)}
                      className="text-[10px] text-red-500 font-bold hover:underline"
                    >
                      {t('logout')}
                    </button>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 border border-slate-200 overflow-hidden">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    ) : (
                      <UserIcon size={18} />
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {!user && (
              <button 
                onClick={toggleLanguage}
                className="md:hidden p-2 text-slate-500"
              >
                <Globe size={20} />
              </button>
            )}
          </div>
        </div>
      </nav>

      <main className="flex-1">
        <AnimatePresence mode="wait">
          {!user ? (
            <motion.div 
              key="auth"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-[420px_1fr] min-h-[calc(100vh-64px)]"
            >
              {/* Auth Panel */}
              <div className="bg-white border-r border-slate-200 p-8 lg:p-12 flex flex-col justify-center">
                <div className="mb-10">
                  <h1 className="text-3xl font-bold text-primary mb-2">Welcome Back</h1>
                  <p className="text-slate-500 text-sm">ابدأ رحلة التعلم الخاصة بك اليوم</p>
                </div>

                <div className="space-y-3">
                  <button 
                    onClick={() => handleLogin('google')}
                    className="w-full flex items-center justify-center gap-3 p-3 border border-slate-200 rounded-lg font-semibold text-primary hover:bg-slate-50 transition-all group"
                  >
                    <img src="https://www.google.com/favicon.ico" width="18" alt="Google" />
                    {t('googleLogin')}
                  </button>
                  
                  <button 
                    onClick={() => handleLogin('facebook')}
                    className="w-full flex items-center justify-center gap-3 p-3 border border-slate-200 rounded-lg font-semibold text-primary hover:bg-slate-50 transition-all group"
                  >
                    <img src="https://www.facebook.com/favicon.ico" width="18" alt="Facebook" />
                    {t('facebookLogin')}
                  </button>
                  
                  <div className="relative py-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-200"></div>
                    </div>
                    <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold">
                       <span className="bg-white px-3 text-slate-400">Or Explore</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => handleLogin('guest')}
                    className="w-full bg-slate-900 text-white p-3 rounded-lg font-semibold hover:bg-black transition-colors shadow-lg shadow-slate-200"
                  >
                    {t('guestLogin')}
                  </button>
                </div>

                <p className="mt-10 text-[10px] text-slate-400 text-center uppercase tracking-wider font-medium">
                  By continuing, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>

              {/* Preview Panel */}
              <div className="hidden lg:block bg-bg-polish p-10 overflow-y-auto">
                <div className="flex justify-between items-end mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-primary">Featured Courses</h2>
                    <p className="text-slate-400 text-sm">Specialized programs for modern creators</p>
                  </div>
                  <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                    Budget Friendly / أسعار مخفضة
                  </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
                  {staticCourses.slice(0, 5).map((course) => (
                    <div key={course.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden h-[280px] shadow-sm hover:shadow-md transition-shadow flex flex-col">
                       <div className="h-32 bg-slate-100 relative group overflow-hidden">
                         <img 
                           src={course.thumbnail} 
                           alt={course.id} 
                           className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all" 
                           referrerPolicy="no-referrer"
                         />
                         <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors" />
                       </div>
                       <div className="p-4 flex-1 flex flex-col justify-between">
                         <div>
                            <h3 className="font-bold text-primary">{i18n.language === 'en' ? course.title.en : course.title.ar}</h3>
                            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">
                              {i18n.language === 'ar' ? course.title.en : course.title.ar}
                            </p>
                         </div>
                         <div className={`text-lg font-black ${course.price === 0 ? 'text-accent' : 'text-emerald-500'}`}>
                           {course.price === 0 ? 'FREE / مجاناً' : `${course.price} EGP`}
                         </div>
                       </div>
                    </div>
                  ))}
                  <div className="bg-slate-50 rounded-xl border border-slate-200 border-dashed flex flex-col items-center justify-center p-6 text-center">
                     <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">More Coming Soon</p>
                     <p className="text-[10px] text-slate-300">قريباً</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-10 container mx-auto max-w-7xl"
            >
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div>
                  <h1 className="text-4xl font-extrabold text-primary tracking-tight mb-2">{t('courses')}</h1>
                  <p className="text-slate-400">{t('slogan')}</p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {['digital_marketing', 'game_dev', 'animation', 'digital_creator', 'game_design'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                      className={`px-4 py-2 rounded-lg text-xs font-bold tracking-wide transition-all border ${
                        selectedCategory === cat 
                        ? 'bg-primary text-white border-primary shadow-lg shadow-slate-200' 
                        : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {t(`categories.${cat}` as any)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCourses.map((course, idx) => (
                  <motion.div
                    key={course.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="group bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col shadow-sm hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img 
                        src={course.thumbnail} 
                        alt="Course"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 right-4">
                        <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${
                          course.price === 0 ? 'bg-blue-500 text-white' : 'bg-white text-emerald-600 border border-slate-100'
                        }`}>
                          {course.price === 0 ? t('free') : `${course.price} ${t('egp')}`}
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="mb-4">
                        <h3 className="text-lg font-bold text-primary group-hover:text-accent transition-colors leading-tight mb-1">
                          {i18n.language === 'ar' ? course.title.ar : course.title.en}
                        </h3>
                        <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                          {i18n.language === 'ar' ? course.title.en : course.title.ar}
                        </p>
                      </div>
                      
                      <p className="text-slate-500 text-xs mb-8 line-clamp-2">
                        {i18n.language === 'ar' ? course.description.ar : course.description.en}
                      </p>
                      
                      <button className="mt-auto w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-3 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-black transition-all active:scale-95">
                        {t('enroll')}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="py-10 text-center">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{t('footer')}</p>
      </footer>
    </div>
  );
};

export default App;
