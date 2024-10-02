'use client';

import { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { signup } from '@/api';
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
import { Input } from '@/components/ui/input';
import Loader from '@/components/loader';

const formFields: Array<{
  label: string;
  name: 'username' | 'email' | 'password';
  type: 'text' | 'email' | 'password';
}> = [
  {
    label: 'Username',
    name: 'username',
    type: 'text',
  },
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

const formSchema = z.object({
  username: z.string(),
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
  password: z.string().min(4, {
    message: 'Password must be at least 4 char.push) },ters long',
  }),
});

export default function RegisterPage() {
  const { setAuthData } = useContext(AuthContext);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  const { mutate: registerUser, isPending } = useMutation({
    mutationFn: signup,
    onSuccess: (userData) => {
      setAuthData({
        isAuth: true,
        token: userData.token as string,
      });
      toast.success('Signed-up in successfully');
      router.push('/trains-schedule');
      form.reset();
    },
    onError: (error) => {
      toast.error(`Failed to Sign-up: ${error.message}`);
    },
  });

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    await registerUser(formData);
  };

  return (
    <div className="flex items-center justify-center px-2">
      {isPending && <Loader />}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col border rounded-md p-6 w-96"
        >
          <h1 className="text-4xl text-center mb-4">Register</h1>
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
            If you have an account{' '}
            <Link
              href="/login"
              className="underline underline-offset-1 cursor-pointer"
            >
              Login
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
}
