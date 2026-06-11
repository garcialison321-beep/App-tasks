export interface ActivityLog {
  _id: string;
  action: string;
  description: string;
  taskId?: string;
  userId?: string;
  createdAt: string;
}