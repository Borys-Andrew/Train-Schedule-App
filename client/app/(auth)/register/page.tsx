'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

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
import Link from 'next/link';
import { signup } from '@/api';

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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    try {
      const data = await signup(formData);
    } catch (error) {
      console.log('🚀 ~ onSubmit ~ error:', error);
    }
  };

  return (
    <div className="flex items-center justify-center px-2">
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
