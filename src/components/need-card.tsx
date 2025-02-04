"use client";

import { CreditCardIcon } from "lucide-react";
import { Button } from "./ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function NeedACard() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="mr-3">
          <CreditCardIcon size="4" />
          Need a card?
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Demo Card</h4>
          <p className="text-sm text-muted-foreground">
            This app is for demonstration purposes only. You can use the
            following credit card details to test the billing system.
          </p>
          <p className="text-sm">
            <span className="font-semibold">Card number:</span> 4242 4242 4242
            4242
          </p>
          <p className="text-sm">
            <span className="font-semibold">Name:</span> Your name
          </p>
          <p className="text-sm">
            <span className="font-semibold">Expiry:</span> 01/27
          </p>
          <p className="text-sm">
            <span className="font-semibold">CVC:</span> 123
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
}
