export interface IUser {
  data: Data;
  instance_id: string;
  object: string;
  timestamp: number;
  type: string;
}

export interface Data {
  created_at: Date;
  email_addresses: EmailAddress[];
  first_name?: string;
  id: string;
  image_url?: string;
  last_name?: string;
  last_sign_in_at: Date;
  profile_image_url?: string;
  updated_at: Date;
  username?: null;
}

export interface EmailAddress {
  email_address: string;
  id: string;
  linked_to: any[];
  object: string;
  verification: Verification;
}

export interface Verification {
  status: string;
  strategy: string;
}

export interface Metadata {}
