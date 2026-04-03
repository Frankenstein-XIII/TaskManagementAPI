export interface IUser{
      id: string;
      email: string;
      passwordHash: string; // we never store the actual password 
} 
export class User implements IUser{
      public id: string;
      constructor(public email: string, public passwordHash: string){
            this.id = Math.random().toString(36).substring(2,9);
      }
}