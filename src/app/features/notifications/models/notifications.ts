export interface Notification {

  _id?: string;

  message: string;

  read: boolean;

  createdAt?: Date;

  userId?: string;

}