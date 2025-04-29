export interface UserProfile {
    username: string;
    email: string;
    phone: string;
    company: string;
    role: string;
    industry: string;
    authorizations: string;
    interestAreas: string[];
    password?: string;
    repeatPassword?: string;
  }
  