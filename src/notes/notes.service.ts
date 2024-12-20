import { Injectable } from '@nestjs/common';

@Injectable()
export class NotesService {
  hello(): string {
    return 'Hello Notes!';
  }
}
