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
import { DollarSign, ArrowRight } from "lucide-react";
import { PaymentIcons } from "./payment-icons";
import { cn } from "@/lib/utils";

const paymentMethods = [
  { id: "paypal", name: "PayPal", icon: "paypal" },
  { id: "bank", name: "Bank Transfer", icon: "bank" },
  { id: "crypto", name: "Crypto Wallet", icon: "crypto" },
];

export function WithdrawDialog() {
  const [selectedMethod, setSelectedMethod] = useState("paypal");

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
            Choose your preferred payment method to withdraw your balance.
          </DialogDescription>
        </DialogHeader>
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
        <DialogFooter>
          <Button type="submit" className="w-full">
            Continue <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
