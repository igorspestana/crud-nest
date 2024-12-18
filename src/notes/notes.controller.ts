import { Controller, Get, Param } from '@nestjs/common';

@Controller('notes')
export class NotesController {
  @Get()
  findAll() {
    return 'This route returns all notes';
  }

  @Get('note/:id')
  findOne(@Param() params: any) {
    console.log(params);
    return `This route returns a note with id ${params.id}`;
  }

  @Get('notealt/:id')
  findOneAlt(@Param('id') id: string) {
    console.log(id);
    return `This route returns a note with id ${id}`;
  }
}
