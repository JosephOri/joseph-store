import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { APP_NAME } from "@/lib/constants";
import CredentialsSignInForm from "./credentials-signin-form";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign In",
};

interface Props {
  searchParams: Promise<{ callbackUrl?: string }>;
}

const SignInPage = async ({ searchParams }: Props) => {
  const { callbackUrl } = await searchParams;
  const session = await auth();
  if (session) redirect(callbackUrl || "/");

  return (
    <div className="w-full max-w-md -mx-auto">
      <Card>
        <CardHeader className="space-y-4">
          <Link href="/">
            <Image src="/images/logo.svg" alt={`${APP_NAME} logo`} width={100} height={100} priority />
          </Link>
          <CardTitle className="text-center">Sign In</CardTitle>
        </CardHeader>
        <CardDescription className="text-center">Sign in to your account</CardDescription>
        <CardContent className="space-y-4">
          <CredentialsSignInForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default SignInPage;
