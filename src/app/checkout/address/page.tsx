'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ShoppingCart, 
  MapPin, 
  CreditCard, 
  Plus, 
  X, 
  Navigation, 
  Check, 
  Edit3, 
  Trash2,
  AlertCircle
} from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useAddressStore, Address } from '@/store/useAddressStore';
import { Button } from '@/components/ui/button';

export default function AddressCheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal } = useCartStore();
  const { addresses, selectedAddressId, addAddress, removeAddress, selectAddress } = useAddressStore();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    houseNo: '',
    street: '',
    landmark: '',
    postcode: '',
    city: '',
    country: 'India',
    state: '',
    phone: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const subtotal = getSubtotal();
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + gst;

  const formatPrice = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Required';
    if (!formData.surname.trim()) errors.surname = 'Required';
    if (!formData.houseNo.trim()) errors.houseNo = 'Required';
    if (!formData.street.trim()) errors.street = 'Required';
    if (!formData.postcode.trim() || !/^\d{6}$/.test(formData.postcode)) {
      errors.postcode = 'Must be 6 digits';
    }
    if (!formData.city.trim()) errors.city = 'Required';
    if (!formData.state) errors.state = 'Required';
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone)) {
      errors.phone = 'Must be 10 digits';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const addressData: Address = {
      id: editingAddressId || `addr-${Date.now()}`,
      ...formData,
    };

    if (editingAddressId) {
      // For editing, we need to remove and re-add (since there's no update in store)
      removeAddress(editingAddressId);
    }
    addAddress(addressData);
    setIsModalOpen(false);
    setEditingAddressId(null);
    // Reset form
    setFormData({
      name: '',
      surname: '',
      houseNo: '',
      street: '',
      landmark: '',
      postcode: '',
      city: '',
      country: 'India',
      state: '',
      phone: '',
    });
    setFormErrors({});
  };

  const handleUseCurrentLocation = () => {
    setGpsLoading(true);
    setTimeout(() => {
      setFormData({
        name: 'Karan',
        surname: 'Singh Lalwai',
        houseNo: 'Flat 402, Crest Jewel',
        street: 'Koregaon Park Road',
        landmark: 'Near German Bakery',
        postcode: '411001',
        city: 'Pune',
        country: 'India',
        state: 'Maharashtra',
        phone: '9990000000',
      });
      setGpsLoading(false);
      setFormErrors({});
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20 font-urbanist text-gray-800">
      
      {/* Stepper Header */}
      <div className="bg-white border-b border-gray-200 py-6 mb-8">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between max-w-3xl mx-auto">
            {/* Background Line */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-gray-200 z-0"></div>
            {/* Active connecting line (full first half, up to Address) */}
            <div className="absolute left-0 w-1/2 top-1/2 -translate-y-1/2 h-1 bg-primary z-0"></div>

            {/* Step 1: My Cart */}
            <Link href="/cart" className="relative z-10 flex flex-col items-center gap-2 group">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center border-4 border-white shadow-sm font-bold group-hover:scale-105 transition-transform">
                <ShoppingCart className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-primary tracking-wider uppercase">MY CART</span>
            </Link>

            {/* Step 2: Address */}
            <div className="relative z-10 flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center border-4 border-white shadow-sm font-bold">
                <MapPin className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-primary tracking-wider uppercase">ADDRESS</span>
            </div>

            {/* Step 3: Payment */}
            <div className="relative z-10 flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-white text-gray-400 flex items-center justify-center border-4 border-gray-100 shadow-sm font-bold">
                <CreditCard className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">PAYMENT</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Address List */}
          <div className="lg:col-span-8">
            <h2 className="text-base font-bold text-gray-900 mb-6 uppercase tracking-wider">Delivery To</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Existing Address Cards */}
              {addresses.map((address) => {
                const isSelected = selectedAddressId === address.id;
                return (
                  <div 
                    key={address.id}
                    onClick={() => selectAddress(address.id)}
                    className={`rounded-2xl p-6 border-2 transition-all duration-300 relative flex flex-col justify-between cursor-pointer min-h-[220px] ${
                      isSelected 
                        ? 'border-primary bg-gray-50/50 shadow-sm' 
                        : 'border-gray-100 bg-white hover:border-gray-300'
                    }`}
                  >
                    {/* Selected Badge Star */}
                    {isSelected && (
                      <span className="absolute top-6 right-6 text-primary">
                        <Check className="w-5 h-5 bg-primary/10 p-0.5 rounded-full" />
                      </span>
                    )}

                    <div>
                      <h3 className="font-bold text-gray-900 text-base">
                        {address.name} {address.surname}
                      </h3>
                      <div className="text-xs text-gray-500 font-semibold mt-3 space-y-1.5 leading-relaxed">
                        <p>{address.houseNo}</p>
                        <p>{address.street}</p>
                        {address.landmark && <p>Landmark: {address.landmark}</p>}
                        <p>{address.city}, {address.state}</p>
                        <p>Pin code - {address.postcode}</p>
                        <p className="mt-2 text-gray-700 font-bold">Phone: {address.phone}</p>
                      </div>
                    </div>

                    <div className="flex gap-4 mt-6 border-t border-gray-100 pt-4 text-xs font-bold uppercase tracking-wider">
{/* Edit button */}
<Button
  variant="ghost"
  size="sm"
  onClick={(e: React.MouseEvent) => {
    e.stopPropagation();
    setFormData({
      name: address.name,
      surname: address.surname,
      houseNo: address.houseNo,
      street: address.street,
      landmark: address.landmark || '',
      postcode: address.postcode,
      city: address.city,
      country: address.country,
      state: address.state,
      phone: address.phone,
    });
    setEditingAddressId(address.id);
    setIsModalOpen(true);
  }}
  className="text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-1 cursor-pointer"
>
  <Edit3 className="w-3.5 h-3.5" />
  Edit
</Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeAddress(address.id);
                        }}
                        className="text-gray-400 hover:text-primary transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Remove
                      </Button>
                    </div>
                  </div>
                );
              })}

              {/* Add New Address Card */}
              <Button
                type="button"
                variant="outline"
                className="rounded-2xl border-2 border-dashed border-gray-200 bg-white hover:border-primary hover:bg-gray-50/20 transition-all duration-300 flex flex-col items-center justify-center p-8 gap-3 text-center min-h-[220px] group cursor-pointer w-full"
                onClick={() => {
                  setEditingAddressId(null);
                  setFormData({
                    name: '',
                    surname: '',
                    houseNo: '',
                    street: '',
                    landmark: '',
                    postcode: '',
                    city: '',
                    country: 'India',
                    state: '',
                    phone: '',
                  });
                  setFormErrors({});
                  setIsModalOpen(true);
                }}
              >
                <div className="w-12 h-12 rounded-full border-2 border-dashed border-gray-300 text-gray-400 flex items-center justify-center group-hover:border-primary group-hover:text-primary transition-colors">
                  <Plus className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-gray-500 group-hover:text-primary uppercase tracking-wider">
                  Add New Address
                </span>
              </Button>
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
                  <span>Cart Total ({items.reduce((acc, i) => acc + i.quantity, 0)} items)</span>
                  <span className="text-gray-900 font-bold">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (18%)</span>
                  <span className="text-gray-900 font-bold">{formatPrice(gst)}</span>
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

              {/* Action Button */}
              {selectedAddressId ? (
                <Button
                  onClick={() => router.push('/checkout/payment')}
                  className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl shadow-md shadow-primary/15 transition-all text-xs uppercase tracking-widest cursor-pointer"
                >
                  Continue To Payment
                </Button>
              ) : (
                <div className="flex flex-col gap-2">
                  <button
                    disabled
                    className="w-full bg-gray-200 text-gray-400 font-bold py-4 rounded-xl text-xs uppercase tracking-widest cursor-not-allowed"
                  >
                    Continue To Payment
                  </button>
                  <span className="text-[10px] text-red-500 font-semibold text-center flex items-center justify-center gap-1 animate-pulse">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Please select or add a delivery address
                  </span>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>

      {/* ADD NEW ADDRESS MODAL DIALOG */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop overlay */}
          <div 
            onClick={() => setIsModalOpen(false)}
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-xs transition-opacity"
          />

          {/* Modal Container */}
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto z-10 border border-gray-100 relative animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                {editingAddressId ? 'Edit Address' : 'Add New Address'}
              </h3>
              <button 
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingAddressId(null);
                  setFormData({
                    name: '',
                    surname: '',
                    houseNo: '',
                    street: '',
                    landmark: '',
                    postcode: '',
                    city: '',
                    country: 'India',
                    state: '',
                    phone: '',
                  });
                  setFormErrors({});
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              
              {/* GPS Auto Fill Button */}
              <Button
                type="button"
                variant="secondary"
                onClick={handleUseCurrentLocation}
                disabled={gpsLoading}
                className="w-full text-white font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed shadow-sm"
              >
                <Navigation className={`w-4 h-4 ${gpsLoading ? 'animate-spin' : ''}`} />
                {gpsLoading ? 'GETTING LOCATION...' : 'Use my current location'}
              </Button>

              {/* Name Surname Row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Name *"
                    className={`w-full border rounded-xl px-4 py-2.5 text-xs font-semibold outline-none transition-all ${
                      formErrors.name ? 'border-red-500 bg-red-50/10' : 'border-gray-200 focus:border-primary'
                    }`}
                  />
                  {formErrors.name && <span className="text-[10px] text-red-500 font-bold pl-1">{formErrors.name}</span>}
                </div>
                <div className="flex flex-col gap-1.5">
                  <input
                    type="text"
                    name="surname"
                    value={formData.surname}
                    onChange={handleInputChange}
                    placeholder="Surname *"
                    className={`w-full border rounded-xl px-4 py-2.5 text-xs font-semibold outline-none transition-all ${
                      formErrors.surname ? 'border-red-500 bg-red-50/10' : 'border-gray-200 focus:border-primary'
                    }`}
                  />
                  {formErrors.surname && <span className="text-[10px] text-red-500 font-bold pl-1">{formErrors.surname}</span>}
                </div>
              </div>

              {/* House No / Building */}
              <div className="flex flex-col gap-1.5">
                <input
                  type="text"
                  name="houseNo"
                  value={formData.houseNo}
                  onChange={handleInputChange}
                  placeholder="House No., Building Name *"
                  className={`w-full border rounded-xl px-4 py-2.5 text-xs font-semibold outline-none transition-all ${
                    formErrors.houseNo ? 'border-red-500 bg-red-50/10' : 'border-gray-200 focus:border-primary'
                  }`}
                />
                {formErrors.houseNo && <span className="text-[10px] text-red-500 font-bold pl-1">{formErrors.houseNo}</span>}
              </div>

              {/* Street/Locality */}
              <div className="flex flex-col gap-1.5">
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleInputChange}
                  placeholder="Street, Locality, Area *"
                  className={`w-full border rounded-xl px-4 py-2.5 text-xs font-semibold outline-none transition-all ${
                    formErrors.street ? 'border-red-500 bg-red-50/10' : 'border-gray-200 focus:border-primary'
                  }`}
                />
                {formErrors.street && <span className="text-[10px] text-red-500 font-bold pl-1">{formErrors.street}</span>}
              </div>

              {/* Landmark */}
              <input
                type="text"
                name="landmark"
                value={formData.landmark}
                onChange={handleInputChange}
                placeholder="Landmark"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-semibold outline-none focus:border-primary transition-all"
              />

              {/* Postcode City Row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <input
                    type="text"
                    name="postcode"
                    maxLength={6}
                    value={formData.postcode}
                    onChange={handleInputChange}
                    placeholder="Pin Code *"
                    className={`w-full border rounded-xl px-4 py-2.5 text-xs font-semibold outline-none transition-all ${
                      formErrors.postcode ? 'border-red-500 bg-red-50/10' : 'border-gray-200 focus:border-primary'
                    }`}
                  />
                  {formErrors.postcode && <span className="text-[10px] text-red-500 font-bold pl-1">{formErrors.postcode}</span>}
                </div>
                <div className="flex flex-col gap-1.5">
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="City / District *"
                    className={`w-full border rounded-xl px-4 py-2.5 text-xs font-semibold outline-none transition-all ${
                      formErrors.city ? 'border-red-500 bg-red-50/10' : 'border-gray-200 focus:border-primary'
                    }`}
                  />
                  {formErrors.city && <span className="text-[10px] text-red-500 font-bold pl-1">{formErrors.city}</span>}
                </div>
              </div>

              {/* Country State Row */}
              <div className="grid grid-cols-2 gap-4">
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-semibold outline-none focus:border-primary transition-all bg-white"
                >
                  <option value="India">India</option>
                  <option value="United States">United States</option>
                </select>
                <div className="flex flex-col gap-1.5">
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className={`w-full border rounded-xl px-4 py-2.5 text-xs font-semibold outline-none transition-all bg-white ${
                      formErrors.state ? 'border-red-500 bg-red-50/10' : 'border-gray-200 focus:border-primary'
                    }`}
                  >
                    <option value="">Select State *</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                  </select>
                  {formErrors.state && <span className="text-[10px] text-red-500 font-bold pl-1">{formErrors.state}</span>}
                </div>
              </div>

              {/* Phone Row */}
              <div className="flex flex-col gap-1.5">
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-500">
                    +91
                  </span>
                  <input
                    type="text"
                    name="phone"
                    maxLength={10}
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone Number *"
                    className={`w-full border rounded-xl pl-12 pr-4 py-2.5 text-xs font-semibold outline-none transition-all ${
                      formErrors.phone ? 'border-red-500 bg-red-50/10' : 'border-gray-200 focus:border-primary'
                    }`}
                  />
                </div>
                {formErrors.phone && <span className="text-[10px] text-red-500 font-bold pl-1">{formErrors.phone}</span>}
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-600 font-bold py-3.5 rounded-xl border border-gray-200 text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <Button
                  type="submit"
                  className="flex-1 bg-primary hover:bg-primary-dark text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-sm"
                >
                  {editingAddressId ? 'Save Changes' : 'Save Address'}
                </Button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
