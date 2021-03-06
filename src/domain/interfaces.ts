export interface MessageItem {
  Created_date?: Date;
  comment: string;
  replies: CommentReply[];
  title: string;
  username: string;
  _id?: string;
  status?: string[];
}

export interface ConversationItem {
  Created_date?: Date;
  title: string;
  to: string;
  replies: CommentReply[];
  userId: string;
  _id?: string;
  status?: string[];
  from?: string;
}

export interface CommentReply {
  Created_date: Date;
  reply: {
    reply: string;
    username: string;
  };
  username: string;
  _id?: string;
}

export interface UserProfile {
  detail: string;
  title: string;
  user: { email: string };
  email: string;
  userId?: string;
}

export interface Organisation {
  _id?: string;
  userId?: string;
  name: string;
  location: string;
  contactNumber: string;
  address: string;
  website: string;
  facebook: string;
  twitter: string;
  Created_date?: Date;
  bedsAvailable: number;
  postCode: number;
  email: string;
}

export interface NotificationItem {
  Created_date?: Date;
  comment: string;
  username: string;
  _id?: string;
  status?: string[];
}

export interface FoundNotification {
  found: NotificationItem[];
}
