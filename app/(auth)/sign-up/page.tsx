import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { APP_NAME } from "@/lib/constants";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SignUpForm from "./sign-up-form";

export const metadata: Metadata = {
  title: "Sign Up",
};

interface Props {
  searchParams: Promise<{ callbackUrl?: string }>;
}

const SignUpPage = async ({ searchParams }: Props) => {
  const { callbackUrl } = await searchParams;
  const session = await auth();
  if (session) redirect(callbackUrl || "/");

  return (
    <div className="mx-auto w-full max-w-md">
      <Card>
        <CardHeader className="flex flex-col items-center space-y-4">
          <Link href="/">
            <Image
              src="/images/logo.svg"
              alt={`${APP_NAME} logo`}
              width={100}
              height={100}
              priority
            />
          </Link>
          <CardTitle className="text-center text-2xl">Sign Up</CardTitle>
        </CardHeader>
        <CardDescription className="text-center">
          Enter your information to sign up
        </CardDescription>
        <CardContent className="space-y-4">
          <SignUpForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpPage;
