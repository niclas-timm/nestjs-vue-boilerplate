export interface UserInterface {
  name: string;
  email: string;
  password?: string;
  isActive?: boolean;
  email_verified?: boolean;
  social_channel?: string;
  avatar?: string;
  created_at?: Date;
  updated_at?: Date;
}
