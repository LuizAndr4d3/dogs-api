import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { readFile, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';
import * as bcrypt from 'bcryptjs';
import { User } from './user.interface';
import { RegisterDto, LoginDto } from './auth.dtos';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
    private readonly usersFilePath = join(process.cwd(), 'users.json');

    constructor(private jwtService: JwtService) {}

    private async readUsersFile(): Promise<User[]> {
        try {
            if (!existsSync(this.usersFilePath)) {
                return [];
            }

            const fileContent = await readFile(this.usersFilePath, 'utf-8');
            
            if (!fileContent.trim()) {
                return [];
            }

            const data = JSON.parse(fileContent);
            
            return Array.isArray(data) ? data : [];
        } catch (error) {
            if (error instanceof SyntaxError) {
                return [];
            }
            throw error;
        }
    }

    private async writeUsersFile(users: User[]): Promise<void> {
        try {
            const jsonString = JSON.stringify(users, null, 2);
            await writeFile(this.usersFilePath, jsonString, 'utf-8');
        } catch (error) {
            throw error;
        }
    }

    async register(registerDto: RegisterDto): Promise<{ access_token: string; user: { id: string; username: string } }> {
        const users = await this.readUsersFile();
        
        const existingUser = users.find(u => u.username === registerDto.username);
        if (existingUser) {
            throw new ConflictException('Username already exists');
        }

        const hashedPassword = await bcrypt.hash(registerDto.password, 10);
        
        const newUser: User = {
            id: uuidv4(),
            username: registerDto.username,
            password: hashedPassword,
            createdAt: new Date().toISOString(),
        };

        users.push(newUser);
        await this.writeUsersFile(users);

        const payload = { sub: newUser.id, username: newUser.username };
        const access_token = this.jwtService.sign(payload);

        return {
            access_token,
            user: {
                id: newUser.id,
                username: newUser.username,
            },
        };
    }

    async login(loginDto: LoginDto): Promise<{ access_token: string; user: { id: string; username: string } }> {
        const users = await this.readUsersFile();
        
        const user = users.find(u => u.username === loginDto.username);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { sub: user.id, username: user.username };
        const access_token = this.jwtService.sign(payload);

        return {
            access_token,
            user: {
                id: user.id,
                username: user.username,
            },
        };
    }

    async validateUser(userId: string): Promise<User | null> {
        const users = await this.readUsersFile();
        return users.find(u => u.id === userId) || null;
    }
}
