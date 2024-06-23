export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Product = {
  id: string;
  name: string;
  cost: number;
  date_of_manufacturing: string;
  manufacturer: string;
  units: string;
};
export type Seller = {
  id: string;
  organization: string;
  address: string;
  phone: number;
  checking_account: number;
  name_of_representative: string;
};
export type SalesRecords = {
  id: string;
  product_name: string; //reference to Product.id or Product.name, dont know how would be the best
  transaction_id: string; // some sort of W0LMM3FI, XIR3RNW2, so on
  date_of_purchase: string;
  quantity: number;
  total_cost: number;
  seller_organization: string; //reference to Seller.organization
};

export type Revenue = {
  month: string;
  revenue: number;
};
