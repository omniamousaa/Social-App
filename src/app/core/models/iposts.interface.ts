export interface Iposts {
  _id: string;
  image: string;
  body: string;
  privacy: string;
  user: User;
  sharedPost: null;
  likes: any[];
  createdAt: string;
  commentsCount: number;
  topComment: null;
  sharesCount: number;
  likesCount: number;
  isShare: boolean;
  id: string;
  bookmarked: boolean;
}

interface User {
  _id: string;
  name: string;
  username: string;
  photo: string;
}


export interface IUserData {
  _id: string;
  name: string;
  username: string;
  email: string;
  photo: string;
  cover: string;
}