"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, CreditCard } from "lucide-react";

export default function CheckoutPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold uppercase mb-8 text-center">Checkout</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
          {/* Payment Form */}
          <div className="bg-white border-4 border-border p-6 shadow-[8px_8px_0px_0px_#a8a6ff]">
              <h2 className="text-xl font-bold uppercase mb-6 flex items-center gap-2">
                  <CreditCard className="w-6 h-6" /> Payment Details
              </h2>
              
              <form className="space-y-4">
                  <div className="space-y-2">
                      <Label className="font-bold">CARDHOLDER NAME</Label>
                      <Input placeholder="John Doe" className="border-2 border-border h-12 font-bold focus:ring-0" />
                  </div>
                  <div className="space-y-2">
                      <Label className="font-bold">CARD NUMBER</Label>
                      <Input placeholder="0000 0000 0000 0000" className="border-2 border-border h-12 font-bold focus:ring-0" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                          <Label className="font-bold">EXPIRY</Label>
                          <Input placeholder="MM/YY" className="border-2 border-border h-12 font-bold focus:ring-0" />
                      </div>
                      <div className="space-y-2">
                          <Label className="font-bold">CVC</Label>
                          <Input placeholder="123" className="border-2 border-border h-12 font-bold focus:ring-0" />
                      </div>
                  </div>
                  
                  <Button className="w-full h-14 text-xl font-bold border-2 border-border bg-black text-white hover:bg-gray-800 shadow-[4px_4px_0px_0px_#a8a6ff] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#a8a6ff] transition-all mt-4">
                      PAY $49.00
                  </Button>
                  
                  <div className="flex items-center justify-center gap-2 text-xs font-bold text-gray-500 mt-4">
                      <Lock className="w-3 h-3" /> Secure 256-bit SSL Encrypted payment
                  </div>
              </form>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
               <Card className="border-4 border-border bg-secondary shadow-[8px_8px_0px_0px_#a8a6ff] rounded-none">
                  <CardHeader className="border-b-2 border-border">
                      <CardTitle className="font-bold uppercase">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                      <div className="flex gap-4 mb-4">
                          <div className="w-20 h-20 bg-white border-2 border-border shrink-0"></div>
                          <div>
                              <h3 className="font-bold text-lg leading-tight mb-1">Mastering Neo Brutalism</h3>
                              <p className="text-sm font-bold text-gray-600">Lifetime Access</p>
                          </div>
                      </div>
                      
                      <div className="space-y-2 border-t-2 border-border pt-4 mb-4">
                          <div className="flex justify-between font-bold">
                              <span>Original Price</span>
                              <span>$49.00</span>
                          </div>
                          <div className="flex justify-between font-bold text-gray-500">
                              <span>Discounts</span>
                              <span>-$0.00</span>
                          </div>
                      </div>
                      
                      <div className="flex justify-between font-bold text-2xl border-t-2 border-border pt-4">
                          <span>Total</span>
                          <span>$49.00</span>
                      </div>
                  </CardContent>
               </Card>
               
               <div className="bg-yellow-100 border-2 border-border p-4 text-sm font-bold">
                   <p>By completing your purchase you agree to these Terms of Service.</p>
               </div>
          </div>
      </div>
    </div>
  );
}
