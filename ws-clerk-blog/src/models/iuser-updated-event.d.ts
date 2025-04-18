export interface IUserUpdatedEvent {
  data: IUser;
  event_attributes: IEventAttributes;
  object: string;
  timestamp: number;
  type: "user.updated";
}

export interface IUser {
  birthday: string;
  created_at: Date;
  email_addresses: IEmailAddress[];
  external_accounts: any[];
  external_id: null;
  first_name: string;
  gender: string;
  id: string;
  image_url: string;
  last_name: null;
  last_sign_in_at: Date;
  object: string;
  password_enabled: boolean;
  phone_numbers: any[];
  primary_email_address_id: string;
  primary_phone_number_id: null;
  primary_web3_wallet_id: null;
  private_metadata: IMetadata;
  profile_image_url: string;
  public_metadata: IMetadata;
  two_factor_enabled: boolean;
  unsafe_metadata: IMetadata;
  updated_at: Date;
  username: null;
  web3_wallets: any[];
}

export interface IEmailAddress {
  email_address: string;
  id: string;
  linked_to: any[];
  object: string;
  reserved: boolean;
  verification: IVerification;
}

export interface IVerification {
  attempts: null;
  expire_at: null;
  status: string;
  strategy: string;
}

export interface IMetadata {}

export interface IEventAttributes {
  http_request: IHTTPRequest;
}

export interface IHTTPRequest {
  client_ip: string;
  user_agent: string;
}
