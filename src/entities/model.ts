import { ApiConnector } from '../helpers/api-connector';

type PredictResponse = number[] | string[];

export class Model extends ApiConnector {
  protected name: string;
  protected id: string;

  constructor(apiKey: string, apiSecret: string, name: string) {
    super(apiKey, apiSecret);
    this.name = name;
  }

  public async predict<T>(params: T | T[]): Promise<PredictResponse> {
    const inputs = Array.isArray(params) ? params : [params];
    const response = await this.post(`model/${this.name}/inference`, {
      inputs,
    });

    const body = await response.json();

    if (response.status === 200) {
      return body as PredictResponse;
    }

    throw new Error(JSON.stringify(body));
  }
}
