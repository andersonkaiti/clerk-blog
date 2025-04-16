import { EmailAddress } from "./email-address";

export interface User {
  id: string;
  created_at: Date;
  first_name: string;
  image_url: string;
  last_name: string;
  last_sign_in_at: Date;
  profile_image_url: string;
  updated_at: Date;
  username: null;
  email_addresses: EmailAddress[];
}
