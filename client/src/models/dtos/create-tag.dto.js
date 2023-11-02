import { TagDto } from './tag.dto';

export class CreateTagDto extends TagDto {
  constructor(key, name) {
    super();

    this.key = key;
    this.name = name;
  }
}
