import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks.ts';
import { register } from '@/app/thunks/usersThunks.ts';
import { useNavigate } from 'react-router-dom';
import { selectRegisterError } from '@/app/slices/usersSlice.ts';
import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
import { UserPlus } from 'lucide-react';
import FileInput from '@/components/FileInput/FileInput.tsx';

const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const registerError = useAppSelector(selectRegisterError);

  const [form, setForm] = useState({
    username: '',
    password: '',
    displayName: '',
    avatar: undefined as File | undefined,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, avatar: e.target.files?.[0] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(register(form)).unwrap();
      navigate('/');
    } catch (e) {
      console.error(e);
    }
  };

  const getFieldError = (field: string) => {
    try {
      return registerError?.errors[field].message;
    } catch {
      return undefined;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <label htmlFor="username" className="text-sm font-medium text-white/80">
          Имя пользователя
        </label>
        <Input
          id="username"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Введите имя"
          className="w-full bg-white/20 placeholder-white/80 text-white border-white/30 focus:ring-white/50 focus:border-white/60"
        />
        {getFieldError('username') && (
          <p className="text-sm text-red-500">{getFieldError('username')}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="text-sm font-medium text-white/80">
          Пароль
        </label>
        <Input
          id="password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Введите пароль"
          className="w-full bg-white/20 placeholder-white/80 text-white border-white/30 focus:ring-white/50 focus:border-white/60"
        />
        {getFieldError('password') && (
          <p className="text-sm text-red-500">{getFieldError('password')}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="displayName" className="text-sm font-medium text-white/80">
          Отображаемое имя
        </label>
        <Input
          id="displayName"
          name="displayName"
          value={form.displayName}
          onChange={handleChange}
          placeholder="Введите имя"
          className="w-full bg-white/20 placeholder-white/80 text-white border-white/30 focus:ring-white/50 focus:border-white/60"
        />
        {getFieldError('displayName') && (
          <p className="text-sm text-red-500">{getFieldError('displayName')}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-white/80">Аватар</label>
        <FileInput name="avatar" label="Загрузить" onGetFile={handleFileChange} />
      </div>

      <Button
        type="submit"
        className="mt-6 w-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors h-10"
      >
        <UserPlus className="w-4 h-4 mr-2" />
        Зарегистрироваться
      </Button>
    </form>
  );
};

export default RegisterForm;
