export type MayBe<T> = T | null;
export type AuthId = string;
export interface Picture {
  small: string;
  medium: string;
  large: string;
}

export interface Notifications {
  added_as_friend: boolean;
  added_to_group: boolean;
  expense_added: boolean;
  expense_updated: boolean;
  bills: boolean;
  payments: boolean;
  monthly_summary: boolean;
  announcements: boolean;
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  picture: Picture;
  custom_picture: boolean;
  email: string;
  registration_status: string;
  force_refresh_at: Date;
  locale: string;
  country_code: string;
  date_format: string;
  default_currency: string;
  default_group_id: number;
  notifications_read: Date;
  notifications_count: number;
  notifications: Notifications;
}

export interface Friend {
  id: number;
  first_name: string;
  last_name?: string;
  email: string;
  registration_status: string;
  picture: Picture;
  balance: Balance[];
  groups: Group[];
  updated_at: string;
}

export interface Balance {
  currency_code: string;
  amount: string;
}

export interface Group {
  group_id: number;
  balance: GroupBalance[];
}

export interface GroupBalance {
  currency_code: string;
  amount: string;
}
