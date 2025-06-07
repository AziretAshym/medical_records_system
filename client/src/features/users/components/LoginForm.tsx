import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks.ts';
import { login } from '@/app/thunks/usersThunks.ts';
import { useNavigate } from 'react-router-dom';
import { selectLoginError } from '@/app/slices/usersSlice.ts';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Lock } from 'lucide-react';

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loginError = useAppSelector(selectLoginError);

  const [form, setForm] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(login(form)).unwrap();
      navigate('/');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      {loginError && (
        <div className="text-sm text-red-600 bg-red-100/40 border border-red-300 p-3 rounded-md flex items-center gap-2">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {loginError.error}
        </div>
      )}
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="username" className="block text-sm font-medium text-white/80">
            Имя пользователя
          </label>
          <Input
            id="username"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Введите имя"
            className="w-full bg-white/20 placeholder-white/80 text-white border-white/30 focus:ring-white/50 focus:border-white/60"
            autoComplete="username"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="block text-sm font-medium text-white/80">
            Пароль
          </label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={form.password}
              onChange={handleChange}
              placeholder="Введите пароль"
              className="w-full pr-10 bg-white/20 placeholder-white/80 text-white border-white/30 focus:ring-white/50 focus:border-white/60"
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(prev => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
            </button>
          </div>
        </div>
      </div>

      <Button
        type="submit"
        className="mt-6 w-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors h-10"
      >
        <Lock className="w-4 h-4 mr-2"/>
        Войти
      </Button>
    </form>
  );
};

export default LoginForm;
