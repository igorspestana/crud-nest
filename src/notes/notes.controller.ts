import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { NotesService } from './notes.service';

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
  findOneAlt(@Param('id') id: string) {
    console.log(id);
    return this.notesService.findOne(id);
  }

  @HttpCode(201)
  @Post()
  create(@Body() body: any) {
    return this.notesService.create(body);
  }

  @Patch('note/:id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.notesService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notesService.remove(id);
  }
}
