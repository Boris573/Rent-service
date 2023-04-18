export interface Admin {
  id: string;
  avatar?: string;
  username: string;
  fullName: string;
  role?: string;

  [key: string]: any;
}

export interface AdminBody extends Omit<Admin, 'id'> {}

export enum ADMIN_ROLES {
  ADMIN = 'ADMIN',
  USER = 'USER'
}
