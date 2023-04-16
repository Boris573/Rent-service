export interface Admin {
  id: string;
  avatar?: string;
  username: string;
  fullName: string;

  [key: string]: any;
}
