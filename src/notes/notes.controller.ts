import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  findAll() {
    return this.notesService.findAll();
  }

  @Get('queryparams')
  findAllWithQueryParams(@Query() queryParams: any) {
    return `This route returns all notes. Limite: ${queryParams.limite}. Offset: ${queryParams.offset}`;
  }

  @Get('note/:id')
  findOne(@Param() params: any) {
    console.log(params);
    return this.notesService.findOne(params.id);
  }

  @Get('notealt/:id')
  findOneAlt(@Param('id', ParseIntPipe) id: number) {
    console.log(id);
    return this.notesService.findOne(id);
  }

  @HttpCode(201)
  @Post()
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(createNoteDto);
  }

  @Patch('note/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNoteDto: UpdateNoteDto,
  ) {
    return this.notesService.update(id, updateNoteDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.notesService.remove(id);
  }
}
