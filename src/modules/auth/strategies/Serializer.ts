/* eslint-disable @typescript-eslint/ban-types */
import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { UserService } from 'src/modules/user/user.service';
import { AuthService } from '../auth.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {
    super();
  }

  serializeUser(user: UserEntity, done: Function) {
    done(null, user);
  }

  async deserializeUser(payload: any, done: Function) {
    const user = await this.userService.findUser(payload.id);
    return user ? done(null, user) : done(null, null);
  }
}
