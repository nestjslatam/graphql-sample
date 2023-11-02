import { v4 as uuidv4 } from 'uuid';

import TagRepository from './tagRepository';

class TagService {
  static async create(tag) {
    tag.id = uuidv4();
    tag.trackId = uuidv4();

    await TagRepository.create(tag);
  }

  static async enable(id) {
    await TagRepository.enable(id);
  }
  static async disable(id) {
    await TagRepository.disable(id);
  }
  static async remove(id) {
    await TagRepository.remove(id);
  }
}

export default TagService;
