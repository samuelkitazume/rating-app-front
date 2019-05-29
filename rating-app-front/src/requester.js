import axios from 'axios';

class Requester {
  constructor(config = {}) {
    this.Requester = axios.create(config);
  }

  get(url) {
    return this.Requester.get(url);
  }

  post(url, data) {
    return this.Requester.post(url, data);
  }
}

export default Requester;
