import fs from 'node:fs';
import path from 'node:path';
import bcrypt from 'bcryptjs';
import {User} from '../models/User';
import { AppError } from '../utils/AppError';

class UserService{
      private users: User[] = [];
      private readonly dbPath = path.join(__dirname, '../../users.json');
      constructor(){
            this.loadFromFile();
      }

      // register: Hash the passwrod and save 
      async register(email: string, password: string): Promise<User>{
            //check if email already exists 
            if(this.users.some(u => u.email === email)){
                  throw new AppError(400, "User already exist with this email");
            }

            //scrample the password (salt rounds = 10, is industry standard)
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);

            const newUser = new User(email, hash);
            this.users.push(newUser);
            this.saveToFile();

            return newUser;
      }

      async login(email:string, password:string): Promise<User>{
            const user = this.users.find(u=> u.email === email);

            if(!user){
                  throw new AppError(401, "Invalid email or password");
            }

            //compare the plain password with the scambled hash 
            const isMatch = await bcrypt.compare(password, user.passwordHash);
            if(!isMatch){
                  throw new AppError(401, 'Invalid email or password')
            }
            return user;
      }

      private saveToFile(): void{
            fs.writeFileSync(this.dbPath, JSON.stringify(this.users, null, 2));
      }

      private loadFromFile(): void{
            if (!fs.existsSync(this.dbPath)) return ;
            const data = JSON.parse(fs.readFileSync(this.dbPath, 'utf-8'));
            this.users = data.map((u: any) => new User(u.email, u.passwordHash));
      }

}

export const userService = new UserService;