"use client";

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { DollarSign, ArrowRight, Loader2, XCircle } from "lucide-react";
import { PaymentIcons } from "./payment-icons";
import { cn } from "@/lib/utils";

const paymentMethods = [
  { id: "paypal", name: "PayPal", icon: "paypal" },
  { id: "bank", name: "Bank Transfer", icon: "bank" },
  { id: "crypto", name: "Crypto Wallet", icon: "crypto" },
];

export function WithdrawDialog() {
  const [selectedMethod, setSelectedMethod] = useState("bank");
  const [step, setStep] = useState(1); // 1: method selection, 2: amount input, 3: processing, 4: error
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleContinue = () => {
    setStep(2);
  };

  const handleWithdraw = () => {
    setIsLoading(true);
    setError(false);
    setTimeout(() => {
      setIsLoading(false);
      setError(true); // Simulate an error after 4 seconds
      setStep(4);
    }, 4000);
  };

  const handleTryAgain = () => {
    setStep(1);
    setAmount("");
    setError(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="w-full sm:w-auto">
          <DollarSign className="mr-2 h-4 w-4" /> Withdraw
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline">Withdraw Funds</DialogTitle>
          <DialogDescription>
            {step === 1 && "Choose your preferred payment method to withdraw your balance."}
            {step === 2 && `Enter the amount to withdraw via ${paymentMethods.find(m => m.id === selectedMethod)?.name}.`}
            {step === 3 && "Processing your withdrawal..."}
            {step === 4 && "Withdrawal failed."}
          </DialogDescription>
        </DialogHeader>

        {step === 1 && (
          <div className="grid gap-4 py-4">
            <RadioGroup value={selectedMethod} onValueChange={setSelectedMethod}>
              {paymentMethods.map((method) => (
                <Label
                  key={method.id}
                  htmlFor={method.id}
                  className={cn("flex items-center justify-between rounded-md border-2 p-4 cursor-pointer transition-colors",
                      selectedMethod === method.id ? 'border-primary bg-muted' : 'border-muted bg-transparent hover:border-accent'
                  )}
                >
                  <div className="flex items-center gap-4">
                    <PaymentIcons name={method.icon} className="h-6 w-6 text-muted-foreground" />
                    <span className="font-semibold">{method.name}</span>
                  </div>
                  <RadioGroupItem value={method.id} id={method.id} />
                </Label>
              ))}
            </RadioGroup>
          </div>
        )}

        {step === 2 && (
          <div className="grid gap-4 py-4">
            <Label htmlFor="amount" className="sr-only">Amount</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="col-span-3"
            />
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="mt-4 text-muted-foreground">Please wait...</p>
          </div>
        )}

        {step === 4 && error && (
          <div className="flex flex-col items-center justify-center py-8 text-red-500">
            <XCircle className="h-12 w-12" />
            <p className="mt-4">An error occurred during withdrawal. Please try again.</p>
          </div>
        )}

        <DialogFooter>
          {step === 1 && (
            <Button type="button" onClick={handleContinue} className="w-full">
              Continue <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
          {step === 2 && (
            <Button type="button" onClick={handleWithdraw} className="w-full" disabled={!amount || parseFloat(amount) <= 0}>
              Proceed
            </Button>
          )}
          {step === 4 && (
            <Button type="button" onClick={handleTryAgain} className="w-full">
              Try Again
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
