import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { APP_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Sign In",
};

const SignInPage = () => {
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
        <CardContent className="space-y-4">{/* form here */}</CardContent>
      </Card>
    </div>
  );
};

export default SignInPage;
