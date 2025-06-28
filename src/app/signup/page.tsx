import AuthForm from "@/components/auth-form";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

const SignupPage = () => {
  return (
    <div className="mt-20 flex flex-1 flex-col items-center">
      <Card className="w-full max-w-medium">
        <CardHeader className="mb-4">
          <CardTitle className="text-center tet-3xl">Signup</CardTitle>
        </CardHeader>
        <AuthForm type="signup" />
      </Card>
    </div>
  );
};

export default SignupPage;
