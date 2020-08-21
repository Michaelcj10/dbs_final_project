export interface MessageItem {
  Created_date: Date;
  comment: string;
  replies: [];
  title: string;
  username: string;
  _id: string;
}

export interface Organisation {
  _id?: string;
  userId?: string;
  name: string;
  location:  string;
  contactNumber:  string;
  address:  string;
  website:  string;
  facebook:  string;
  twitter:  string;
  Created_date?: Date;
}