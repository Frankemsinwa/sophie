
"use client";

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { DollarSign, ArrowRight, Loader2, Clock, CheckCircle, XCircle } from "lucide-react";
import { PaymentIcons } from "./payment-icons";
import { cn } from "@/lib/utils";

const paymentMethods = [
  { id: "paypal", name: "PayPal", icon: "paypal" },
  { id: "bank", name: "Bank Transfer", icon: "bank" },
  { id: "crypto", name: "Crypto Wallet", icon: "crypto" },
];

const MAX_WITHDRAWAL_AMOUNT = 50000;

export function WithdrawDialog() {
  const [selectedMethod, setSelectedMethod] = useState("bank");
  const [step, setStep] = useState(1); // 1: method, 2: details, 3: processing, 4: reversed
  const [amount, setAmount] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [bankName, setBankName] = useState("");
  const [amountError, setAmountError] = useState("");

  const handleAccountNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAccountNumber(value);
    if (value.length === 9) {
      setAccountName("Micheal Dabish");
      setBankName("Exchange bank");
    } else {
      setAccountName("");
      setBankName("");
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);
    if (Number(value) > MAX_WITHDRAWAL_AMOUNT) {
      setAmountError(`Maximum withdrawal amount is $${MAX_WITHDRAWAL_AMOUNT.toLocaleString()}.`);
    } else {
      setAmountError("");
    }
  };

  const handleContinue = () => {
    setStep(2);
  };

  const handleWithdraw = () => {
    setStep(3); // Start processing
    setTimeout(() => {
        setStep(4); // Move to reversed after 4 seconds
    }, 4000);
  };

  const resetFlow = () => {
    setStep(1);
    setAmount("");
    setAccountNumber("");
    setAccountName("");
    setBankName("");
    setAmountError("");
  };

  return (
    <Dialog onOpenChange={(open) => !open && resetFlow()}>
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
            {step === 2 && `Enter your details and the amount to withdraw.`}
            {step === 3 && "Processing your withdrawal..."}
            {step === 4 && "Transaction Reversed"}
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
             <div className="space-y-2">
              <Label htmlFor="accountNumber">Account Number</Label>
              <Input
                id="accountNumber"
                placeholder="Enter 9-digit account number"
                value={accountNumber}
                onChange={handleAccountNumberChange}
                maxLength={9}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="accountName">Account Name</Label>
              <Input
                id="accountName"
                placeholder="Account name"
                value={accountName}
                readOnly
                className="bg-muted"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bankName">Bank Name</Label>
              <Input
                id="bankName"
                placeholder="Bank name"
                value={bankName}
                readOnly
                className="bg-muted"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={handleAmountChange}
              />
              {amountError && <p className="text-sm text-red-500">{amountError}</p>}
            </div>
          </div>
        )}
        
        {step === 3 && (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="mt-4 text-muted-foreground">Processing...</p>
          </div>
        )}

        {step === 4 && (
          <div className="flex flex-col items-center justify-center py-8 text-red-500">
            <XCircle className="h-12 w-12" />
            <p className="mt-4 text-center">Sorry, the transaction has been reversed. Please try again later.</p>
          </div>
        )}

        <DialogFooter>
          {step === 1 && (
            <Button type="button" onClick={handleContinue} className="w-full">
              Continue <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
          {step === 2 && (
            <Button 
              type="button" 
              onClick={handleWithdraw} 
              className="w-full" 
              disabled={!amount || parseFloat(amount) <= 0 || !!amountError || !accountName}
            >
              Proceed
            </Button>
          )}
          {(step === 4) && (
            <DialogClose asChild>
                <Button type="button" className="w-full" onClick={resetFlow}>
                Close
                </Button>
            </DialogClose>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
