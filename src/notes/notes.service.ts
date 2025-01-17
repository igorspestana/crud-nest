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

  async update(id: number, updateNoteDto: UpdateNoteDto) {
    const partialUpdateNoteDto = {
      read: updateNoteDto?.read,
      text: updateNoteDto?.text,
    };

    const updatedNote = await this.noteRepository.preload({
      id,
      ...partialUpdateNoteDto,
    });

    if (!updatedNote) {
      throw new NotFoundException('Note not found.');
    }

    await this.noteRepository.save(updatedNote);

    return updatedNote;
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

    await this.noteRepository.remove(removedNote);

    return removedNote;
  }
}
