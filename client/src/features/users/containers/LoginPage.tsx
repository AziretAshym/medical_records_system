import LoginForm from '@/features/users/components/LoginForm.tsx';
import { HeartPulse } from 'lucide-react';

const images = [
  '/login/med-1.jpg',
  '/login/med-2.jpg',
  '/login/med-3.jpg',
];

const LoginPage = () => {
  const randomImage = images[Math.floor(Math.random() * images.length)];

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <img
        src={randomImage}
        alt="Medical background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-cyan-900/40" />

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl shadow-xl px-10 py-12 sm:px-12 sm:py-14">
          <div className="flex flex-col items-center mb-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-cyan-600 to-blue-600 text-white shadow-lg mb-4">
              <HeartPulse className="h-7 w-7" strokeWidth={2.5} />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight mb-1">MedCare</h1>
            <p className="text-white/80">Система управления пациентами</p>
          </div>

          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
