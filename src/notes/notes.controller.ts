import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('notes')
export class NotesController {
  @HttpCode(HttpStatus.OK)
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

  @HttpCode(201)
  @Post()
  create(@Body() body: any) {
    return body;
  }

  @Patch('note/:id')
  update(@Param('id') id: string, @Body() body: any) {
    return {
      id,
      ...body,
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This route remove the note ${id}`;
  }
}
