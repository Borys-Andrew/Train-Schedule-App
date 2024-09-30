'use client';

import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import { login } from '@/api';
import { AuthContext } from '@/context/AuthContext';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import Loader from '@/components/loader';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
  password: z.string().min(4, {
    message: 'Password must be at least 4 char.push) },ters long',
  }),
});

const formFields: Array<{
  label: string;
  name: 'email' | 'password';
  type: 'email' | 'password';
}> = [
  {
    label: 'Email',
    name: 'email',
    type: 'email',
  },
  {
    label: 'Password',
    name: 'password',
    type: 'password',
  },
];

export default function LoginPage() {
  const { setAuthData } = useContext(AuthContext);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutate: loginUser, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (userData) => {
      setAuthData({
        isAuth: true,
        token: userData.token as string,
      });
      router.push('/trains-schedule');
      form.reset();
    },
  });

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    await loginUser(formData);
  };

  return (
    <div className="flex items-center justify-center px-2">
      {isPending && <Loader />}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col border rounded-md p-6 w-96"
        >
          <h1 className="text-4xl text-center mb-4">Login</h1>
          {formFields.map(({ name, label, type }) => {
            return (
              <FormField
                key={name}
                control={form.control}
                name={name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                      <Input
                        type={type}
                        placeholder={`${label}...`}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          })}
          <Button
            type="submit"
            className="mt-4"
          >
            Submit
          </Button>
          <p className="text-xs text-center mt-4">
            If you don&apos;t have an account{' '}
            <Link
              href="/register"
              className="underline underline-offset-1 cursor-pointer"
            >
              Sign up
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
}
