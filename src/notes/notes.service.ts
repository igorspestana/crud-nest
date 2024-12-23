import { Injectable, NotFoundException } from '@nestjs/common';
import { Note } from './entities/note.entity';

@Injectable()
export class NotesService {
  private lastId = 1;
  private notes: Note[] = [
    {
      id: this.lastId,
      text: 'This is a note',
      from: 'me',
      to: 'you',
      read: false,
      createdAt: new Date(),
    },
  ];

  findAll(): Note[] {
    return this.notes;
  }

  findOne(id: string): Note {
    const note = this.notes.find((note) => note.id === +id);

    if (note) {
      return note;
    }

    // throw new HttpException('Note not found.', HttpStatus.NOT_FOUND);
    throw new NotFoundException('Note not found.');
  }

  create(note: Note): Note {
    this.lastId++;
    const id = this.lastId;
    const newNote = { id, ...note, createdAt: new Date() };
    this.notes.push(newNote);
    return newNote;
  }

  update(id: string, note: Note): Note {
    const noteIndex = this.notes.findIndex((note) => note.id === +id);

    if (noteIndex < 0) {
      throw new NotFoundException('Note not found.');
    }

    this.notes[noteIndex] = { ...this.notes[noteIndex], ...note };
    return this.notes[noteIndex];
  }

  remove(id: string) {
    const noteIndex = this.notes.findIndex((note) => note.id === +id);

    if (noteIndex < 0) {
      throw new NotFoundException('Note not found.');
    }

    const removedNote = this.notes[noteIndex];

    this.notes.splice(noteIndex, 1);
    return removedNote;
  }
}
