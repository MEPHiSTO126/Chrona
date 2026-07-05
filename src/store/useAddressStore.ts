import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Address {
  id: string;
  name: string;
  surname: string;
  houseNo: string;
  street: string;
  landmark?: string;
  postcode: string;
  city: string;
  country: string;
  state: string;
  phone: string;
  isDefault?: boolean;
}

interface AddressState {
  addresses: Address[];
  selectedAddressId: string | null;
  addAddress: (address: Address) => void;
  removeAddress: (id: string) => void;
  selectAddress: (id: string) => void;
}

export const useAddressStore = create<AddressState>()(
  persist(
    (set) => ({
      addresses: [
        {
          id: 'addr-default',
          name: 'Karan',
          surname: 'Singh Lalwai',
          houseNo: 'Siddharanya Nagar',
          street: 'Jalgaon',
          landmark: 'Near Hanuman Temple',
          postcode: '425201',
          city: 'Jalgaon',
          country: 'India',
          state: 'Maharashtra',
          phone: '9990000000',
          isDefault: true,
        }
      ],
      selectedAddressId: 'addr-default',
      addAddress: (address) =>
        set((state) => {
          const updatedAddresses = [...state.addresses, address];
          return {
            addresses: updatedAddresses,
            selectedAddressId: state.selectedAddressId || address.id,
          };
        }),
      removeAddress: (id) =>
        set((state) => {
          const updatedAddresses = state.addresses.filter((a) => a.id !== id);
          return {
            addresses: updatedAddresses,
            selectedAddressId:
              state.selectedAddressId === id
                ? updatedAddresses.length > 0
                  ? updatedAddresses[0].id
                  : null
                : state.selectedAddressId,
          };
        }),
      selectAddress: (id) => set({ selectedAddressId: id }),
    }),
    {
      name: 'address-storage',
    }
  )
);
