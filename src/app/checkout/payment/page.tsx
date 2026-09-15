'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  ShoppingCart, 
  MapPin, 
  CreditCard, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  AlertCircle,
  QrCode,
  ShieldCheck,
  CheckCircle2,
  DollarSign
} from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useAddressStore } from '@/store/useAddressStore';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/format';

type PaymentMethodType = 'upi' | 'card' | 'netbanking' | 'cod';

export default function PaymentCheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, clearCart } = useCartStore();
  const { addresses, selectedAddressId } = useAddressStore();
  
  const [activeAccordion, setActiveAccordion] = useState<PaymentMethodType | null>('upi');
  const [selectedUpiApp, setSelectedUpiApp] = useState<'phonepe' | 'paytm' | ''>('phonepe');
  const [selectedBank, setSelectedBank] = useState<string>('');
  
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });

  const [cardErrors, setCardErrors] = useState<Record<string, string>>({});
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Get selected address
  const deliveryAddress = addresses.find(a => a.id === selectedAddressId) || addresses[0];

  useEffect(() => {
    // If no items in cart, redirect to cart
    if (items.length === 0 && !isSuccessModalOpen) {
      router.push('/cart');
    }
  }, [items, router, isSuccessModalOpen]);

  const subtotal = getSubtotal();
  const vat = Math.round(subtotal * 0.075);
  const total = subtotal + vat;

  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    if (name === 'number') {
      value = value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
    } else if (name === 'expiry') {
      value = value.replace(/\D/g, '');
      if (value.length > 2) {
        value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
      }
      value = value.slice(0, 5);
    } else if (name === 'cvv') {
      value = value.replace(/\D/g, '').slice(0, 3);
    }
    
    setCardDetails(prev => ({ ...prev, [name]: value }));
    if (cardErrors[name]) {
      setCardErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateCardForm = () => {
    const errors: Record<string, string> = {};
    if (cardDetails.number.replace(/\s/g, '').length !== 16) {
      errors.number = 'Card number must be 16 digits';
    }
    if (!cardDetails.name.trim()) {
      errors.name = 'Cardholder name is required';
    }
    if (!cardDetails.expiry || !/^\d{2}\/\d{2}$/.test(cardDetails.expiry)) {
      errors.expiry = 'Must be MM/YY';
    }
    if (cardDetails.cvv.length !== 3) {
      errors.cvv = 'CVV must be 3 digits';
    }

    setCardErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (activeAccordion === 'card') {
      if (!validateCardForm()) return;
    }

    setIsProcessing(true);

    // Simulate payment authorization
    setTimeout(() => {
      setIsProcessing(false);
      setOrderId(`CHRONA-${Math.floor(100000 + Math.random() * 900000)}`);
      setIsSuccessModalOpen(true);
    }, 1500);
  };

  const handleSuccessClose = () => {
    setIsSuccessModalOpen(false);
    clearCart();
    router.push('/');
  };

  const toggleAccordion = (method: PaymentMethodType) => {
    setActiveAccordion(prev => (prev === method ? null : method));
  };

  if (!deliveryAddress) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 font-urbanist p-4">
        <AlertCircle className="w-12 h-12 text-primary mb-3" />
        <h1 className="text-xl font-bold text-gray-900">Address Required</h1>
        <p className="text-gray-500 text-sm mt-1 mb-6 text-center">
          You need to select a delivery address before choosing a payment method.
        </p>
        <Link 
          href="/checkout/address" 
          className="bg-primary hover:bg-primary-dark text-white font-bold py-2.5 px-6 rounded-xl transition-all text-sm"
        >
          Go to Address
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20 font-urbanist text-gray-800">
      
      {/* Stepper Header */}
      <div className="bg-white border-b border-gray-200 py-6 mb-8">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between max-w-3xl mx-auto">
            {/* Background Line */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-gray-200 z-0"></div>
            {/* Active connecting line (Fully completed) */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-primary z-0"></div>

            {/* Step 1: My Cart */}
            <Link href="/cart" className="relative z-10 flex flex-col items-center gap-2 group">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center border-4 border-white shadow-sm font-bold group-hover:scale-105 transition-transform">
                <ShoppingCart className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-primary tracking-wider uppercase">MY CART</span>
            </Link>

            {/* Step 2: Address */}
            <Link href="/checkout/address" className="relative z-10 flex flex-col items-center gap-2 group">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center border-4 border-white shadow-sm font-bold group-hover:scale-105 transition-transform">
                <MapPin className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-primary tracking-wider uppercase">ADDRESS</span>
            </Link>

            {/* Step 3: Payment */}
            <div className="relative z-10 flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center border-4 border-white shadow-sm font-bold">
                <CreditCard className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-primary tracking-wider uppercase">PAYMENT</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Selected Address Summary Top Bar */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-8 flex justify-between items-center shadow-sm">
          <div className="flex flex-col gap-1 pr-6">
            <span className="text-xs font-bold text-primary uppercase tracking-wider">
              Deliver To: {deliveryAddress.name} {deliveryAddress.surname}, {deliveryAddress.postcode}
            </span>
            <span className="text-xs text-gray-500 font-semibold truncate max-w-[280px] sm:max-w-xl">
              {deliveryAddress.houseNo}, {deliveryAddress.street}, {deliveryAddress.city}, {deliveryAddress.state}
            </span>
          </div>
          <Link 
            href="/checkout/address"
            className="text-xs font-bold text-cyan-500 hover:text-cyan-600 border border-cyan-500 px-4 py-2 rounded-xl transition-all whitespace-nowrap uppercase tracking-wider"
          >
            Change
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Payment Methods Accordion */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            <h2 className="text-base font-bold text-gray-900 mb-2 uppercase tracking-wider">Payment Method</h2>
            
            {/* 1. UPI Option */}
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
              <button
                onClick={() => toggleAccordion('upi')}
                className="w-full px-6 py-5 flex items-center justify-between font-bold text-sm text-gray-900 cursor-pointer"
              >
                <span className="flex items-center gap-3">
                  <QrCode className="w-5 h-5 text-primary" />
                  UPI
                </span>
                {activeAccordion === 'upi' ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
              </button>
              
              {activeAccordion === 'upi' && (
                <div className="px-6 pb-6 border-t border-gray-50 pt-5 space-y-4 animate-in slide-in-from-top-2 duration-200">
                  <div 
                    onClick={() => setSelectedUpiApp('phonepe')}
                    className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${
                      selectedUpiApp === 'phonepe' ? 'border-primary bg-gray-50/50' : 'border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center overflow-hidden">
                        <span className="font-extrabold text-[#5f259f] text-xs">PP</span>
                      </div>
                      <span className="text-xs font-bold text-gray-700">PhonePe</span>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      selectedUpiApp === 'phonepe' ? 'border-cyan-500' : 'border-gray-300'
                    }`}>
                      {selectedUpiApp === 'phonepe' && <div className="w-2 h-2 rounded-full bg-cyan-500"></div>}
                    </div>
                  </div>

                  <div 
                    onClick={() => setSelectedUpiApp('paytm')}
                    className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${
                      selectedUpiApp === 'paytm' ? 'border-primary bg-gray-50/50' : 'border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-8 h-8 rounded-lg bg-cyan-50 flex items-center justify-center overflow-hidden">
                        <span className="font-extrabold text-[#00b9f5] text-[10px]">Paytm</span>
                      </div>
                      <span className="text-xs font-bold text-gray-700">Paytm</span>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      selectedUpiApp === 'paytm' ? 'border-cyan-500' : 'border-gray-300'
                    }`}>
                      {selectedUpiApp === 'paytm' && <div className="w-2 h-2 rounded-full bg-cyan-500"></div>}
                    </div>
                  </div>
                </div>
              )}
            </div>

{/* 2. Credit & Debit Card Option */}
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
              <button
                onClick={() => toggleAccordion('card')}
                className="w-full px-6 py-5 flex items-center justify-between font-bold text-sm text-gray-900 cursor-pointer"
              >
                <span className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-primary" />
                  Credit & Debit Card
                </span>
                {activeAccordion === 'card' ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
              </button>
              
              {activeAccordion === 'card' && (
                <div className="px-6 pb-6 border-t border-gray-50 pt-5 space-y-4 animate-in slide-in-from-top-2 duration-200">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Card Number</label>
                    <input
                      type="text"
                      name="number"
                      value={cardDetails.number}
                      onChange={handleCardInputChange}
                      placeholder="1234 5678 9876 5432"
                      className={`w-full border rounded-xl px-4 py-2.5 text-xs font-semibold outline-none focus:border-primary transition-all bg-white ${
                        cardErrors.number ? 'border-red-500 bg-red-50/10' : 'border-gray-200'
                      }`}
                    />
                    {cardErrors.number && <span className="text-[10px] text-red-500 font-bold">{cardErrors.number}</span>}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Cardholder Name</label>
                    <input
                      type="text"
                      name="name"
                      value={cardDetails.name}
                      onChange={handleCardInputChange}
                      placeholder="Name on card"
                      className={`w-full border rounded-xl px-4 py-2.5 text-xs font-semibold outline-none focus:border-primary transition-all bg-white ${
                        cardErrors.name ? 'border-red-500 bg-red-50/10' : 'border-gray-200'
                      }`}
                    />
                    {cardErrors.name && <span className="text-[10px] text-red-500 font-bold">{cardErrors.name}</span>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">Expiry Date</label>
                      <input
                        type="text"
                        name="expiry"
                        placeholder="MM/YY"
                        value={cardDetails.expiry}
                        onChange={handleCardInputChange}
                        className={`w-full border rounded-xl px-4 py-2.5 text-xs font-semibold outline-none focus:border-primary transition-all bg-white text-center ${
                          cardErrors.expiry ? 'border-red-500 bg-red-50/10' : 'border-gray-200'
                        }`}
                      />
                      {cardErrors.expiry && <span className="text-[10px] text-red-500 font-bold">{cardErrors.expiry}</span>}
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">CVV</label>
                      <input
                        type="password"
                        name="cvv"
                        placeholder="123"
                        maxLength={3}
                        value={cardDetails.cvv}
                        onChange={handleCardInputChange}
                        className={`w-full border rounded-xl px-4 py-2.5 text-xs font-semibold outline-none focus:border-primary transition-all bg-white text-center ${
                          cardErrors.cvv ? 'border-red-500 bg-red-50/10' : 'border-gray-200'
                        }`}
                      />
                      {cardErrors.cvv && <span className="text-[10px] text-red-500 font-bold">{cardErrors.cvv}</span>}
                    </div>
                  </div>
                </div>
              )}
            </div>

{/* 3. Net Banking Option */}
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
              <button
                onClick={() => toggleAccordion('netbanking')}
                className="w-full px-6 py-5 flex items-center justify-between font-bold text-sm text-gray-900 cursor-pointer"
              >
                <span className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  Net Banking
                </span>
                {activeAccordion === 'netbanking' ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
              </button>
              
              {activeAccordion === 'netbanking' && (
                <div className="px-6 pb-6 border-t border-gray-50 pt-5 space-y-4 animate-in slide-in-from-top-2 duration-200">
<div className="grid grid-cols-2 gap-3">
                    {['HDFC Bank', 'ICICI Bank', 'SBI', 'Axis Bank'].map((bank) => (
                      <div 
                        key={bank}
                        onClick={() => setSelectedBank(bank)}
                        className={`flex items-center gap-2.5 p-3.5 border rounded-xl cursor-pointer transition-all ${
                          selectedBank === bank ? 'border-primary bg-gray-50/50' : 'border-gray-100 hover:border-gray-200'
                        }`}
                      >
                        <div className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          selectedBank === bank ? 'border-cyan-500' : 'border-gray-300'
                        }`}>
                          {selectedBank === bank && <div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>}
                        </div>
                        <span className="text-xs font-bold text-gray-700 truncate">{bank}</span>
                      </div>
                    ))}
                  </div>

                  <select
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-semibold outline-none focus:border-primary transition-all bg-white"
                  >
                    <option value="">Choose Other Bank</option>
                    <option value="Kotak Bank">Kotak Mahindra Bank</option>
                    <option value="Yes Bank">Yes Bank</option>
                    <option value="PNB">Punjab National Bank</option>
                  </select>
                </div>
              )}
            </div>

{/* 4. Cash On Delivery */}
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
              <button
                onClick={() => toggleAccordion('cod')}
                className="w-full px-6 py-5 flex items-center justify-between font-bold text-sm text-gray-900 cursor-pointer"
              >
                <span className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-primary" />
                  Cash on Delivery
                </span>
                {activeAccordion === 'cod' ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
              </button>
              
              {activeAccordion === 'cod' && (
                <div className="px-6 pb-6 border-t border-gray-50 pt-5 text-xs font-semibold text-gray-500 space-y-2 animate-in slide-in-from-top-2 duration-200">
                  <p className="leading-relaxed">
                    Pay in cash or scan QR code on delivery. Additional charges may apply depending on location.
                  </p>
                  <div className="bg-emerald-50 text-emerald-800 border border-emerald-100 p-3 rounded-xl flex items-start gap-2 mt-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Free shipping policy still applies. No COD convenience fees charged!</span>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* RIGHT COLUMN: Billing Details */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col gap-5 shadow-sm">
              <h2 className="text-sm font-bold tracking-wider text-gray-900 uppercase border-b border-gray-100 pb-3">
                BILLING DETAILS
              </h2>

              <div className="flex flex-col gap-3.5 text-sm font-medium text-gray-500">
                <div className="flex justify-between">
                  <span>Price Total ({items.reduce((acc, i) => acc + i.quantity, 0)} items)</span>
                  <span className="text-gray-900 font-bold">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>VAT (7.5%)</span>
                  <span className="text-gray-900 font-bold">{formatPrice(vat)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping Charges</span>
                  <span className="text-red-500 font-bold">Free</span>
                </div>
                <div className="h-px bg-gray-100 my-1"></div>
                <div className="flex justify-between text-base font-bold text-gray-900">
                  <span>TOTAL</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <div className="text-xs font-semibold text-gray-400 text-center py-1">
                Estimated Delivery by: <span className="text-gray-800 font-bold">12 Oct, 2026</span>
              </div>

              {/* Place Order Button */}
              <Button
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl shadow-md shadow-primary/15 transition-all text-xs uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer disabled:bg-red-800 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    PROCESSING PAYMENT...
                  </>
                ) : (
                  'Place Order'
                )}
              </Button>

            </div>
          </div>

        </div>
      </div>

      {/* SUCCESS CONFIRMATION MODAL */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-xs" />
          
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 z-10 border border-gray-100 relative text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-bold text-gray-900 font-syne uppercase">Order Placed Successfully!</h3>
            
            <p className="text-xs text-gray-500 font-medium mt-3 leading-relaxed">
              Thank you for shopping with Chrona. Your order has been placed successfully. 
              We'll send you an email configuration and tracking link shortly.
            </p>

            <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 my-6 text-center">
              <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Order ID</span>
              <span className="text-sm font-bold text-gray-800 mt-1 block">{orderId}</span>
            </div>

            <Button
              onClick={handleSuccessClose}
              className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-widest transition-all cursor-pointer shadow-sm shadow-primary/10"
            >
              Back to Home
            </Button>
          </div>
        </div>
      )}

    </div>
  );
}
