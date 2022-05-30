import { ApiConnector } from './lib/api-connector';
import { Model } from './entities/model';
import { Dataset } from './entities/dataset';

export class Client extends ApiConnector {
  public model(name: string): Model {
    return new Model(this.apiKey, this.apiSecret, name);
  }

  public dataset(id?: string): Dataset {
    return new Dataset(this.apiKey, this.apiSecret, id);
  }

  public async createDataset(name: string, file: string): Promise<Dataset> {
    return this.dataset().create({
      name,
      file,
    });
  }
}
