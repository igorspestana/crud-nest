import { UpdateNoteDto } from './dto/update-note.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Note } from './entities/note.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class NotesService {
  // Para ter acesso ao repositório
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
  ) {}

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

  async findAll() {
    const notes = await this.noteRepository.find();
    return notes;
  }

  async findOne(id: number) {
    const note = await this.noteRepository.findOne({
      where: {
        id,
      },
    });

    if (note) {
      return note;
    }

    // throw new HttpException('Note not found.', HttpStatus.NOT_FOUND);
    throw new NotFoundException('Note not found.');
  }

  async create(createNoteDto: CreateNoteDto) {
    const newNote = {
      ...createNoteDto,
      read: false,
      createdAt: new Date(),
    };

    const createdNote = await this.noteRepository.create(newNote);
    return this.noteRepository.save(createdNote);
  }

  update(id: number, updateNoteDto: UpdateNoteDto) {
    const noteIndex = this.notes.findIndex((note) => note.id === id);

    if (noteIndex < 0) {
      throw new NotFoundException('Note not found.');
    }

    this.notes[noteIndex] = { ...this.notes[noteIndex], ...updateNoteDto };
    return this.notes[noteIndex];
  }

  async remove(id: number) {
    const removedNote = await this.noteRepository.findOne({
      where: {
        id,
      },
    });

    if (!removedNote) {
      throw new NotFoundException('Note not found.');
    }

    return this.noteRepository.remove(removedNote);
  }
}
