import * as axios from 'axios';

const mainPath = `${process.env.REACT_APP_APIGATEWAY_ENDPOINT}/tags`;

class TagRepository {
  static async create(tag) {
    if (!tag) throw new Error('Repository.create: payload is required');

    try {
      axios.post(`${mainPath}`, { tag }).then((res) => {
        return res.data;
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  static async enable(id) {
    try {
      axios.put(`${mainPath}/emable/${id}`).then((res) => {
        return res.data;
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  static async disable(id) {
    try {
      axios.put(`${mainPath}/diable/${id}`).then((res) => {
        return res.data;
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  static async remove(id) {
    try {
      axios.delete(`${mainPath}/${id}`).then((res) => {
        return res.data;
      });

      console.log('removed');
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default TagRepository;
