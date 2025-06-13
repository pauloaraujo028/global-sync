"use client";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { FormMessageError } from "@/components/auth/form-message-error";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/schemas/auth";
import { login } from "@/server/actions/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const LoginForm = () => {
  const searchParams = useSearchParams();

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  // const callbackUrl = searchParams.get("callbackUrl");
  const [isPending, startTransition] = useTransition();

  const callbackError = searchParams
    ? searchParams.get("error") === "CredentialsSignin"
      ? "E-mail em uso com provedor diferente"
      : undefined
    : undefined;

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      login(data).then((res) => {
        if (res.error) {
          setError(res.error);
          setSuccess("");
        }
        if (res.success) {
          setError("");
          setSuccess(res.success);
          setTimeout(() => {
            setSuccess("");
          }, 5000);
        }
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Bem vindo de volta"
      // backButtonLabel="Não tem uma conta? Cadastre-se"
      // backButtonHref="/auth/register"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="email@exemplo.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="********"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {callbackError && (
            <FormMessageError
              type="error"
              message={callbackError}
              title="Erro"
              onClearMessage={() => setError("")}
            />
          )}
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <span className="flex items-center justify-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Carregando
              </span>
            ) : (
              "Entrar"
            )}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
