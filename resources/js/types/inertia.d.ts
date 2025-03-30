import { UserModel } from '@/models/UserModel';

declare module '@inertiajs/core' {
  interface PageProps {
    auth: {
      user: UserModel;
    };
    [key: string]: any;
  }
}
