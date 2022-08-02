import { ApiConnector } from '../lib/api-connector';

type PredictResponse = number[] | string[];

interface ForecastParameters {
  start: string;
  periods: number;
}

interface ForecastItemResponse {
  date: string;
  y: number;
}

interface RecommendationParameters {
  userId: number;
  limit?: number;
}

type RecommendationResponse = number[];

type ForecastResponse = ForecastItemResponse[];

export class Model extends ApiConnector {
  protected name: string;
  protected id: string;

  constructor(apiKey: string, apiSecret: string, name: string) {
    super(apiKey, apiSecret);
    this.name = name;
  }

  public async predict<T>(params: T | T[]): Promise<PredictResponse> {
    const inputs = Array.isArray(params) ? params : [params];
    const response = await this.post(`inference/${this.name}/prediction`, {
      inputs,
    });

    const body = await response.json();

    if (response.status === 200) {
      return body as PredictResponse;
    }

    throw new Error(JSON.stringify(body));
  }

  public async forecast(params: ForecastParameters): Promise<ForecastResponse> {
    const response = await this.post(`inference/${this.name}/forecast`, params);

    const body = await response.json();

    if (response.status === 200) {
      return body as ForecastResponse;
    }

    throw new Error(JSON.stringify(body));
  }

  public async recommendations(params: RecommendationParameters): Promise<RecommendationResponse> {
    const response = await this.post(`inference/${this.name}/recommendation`, params);

    const body = await response.json();

    if (response.status === 200) {
      return body as RecommendationResponse;
    }

    throw new Error(JSON.stringify(body));
  }
}
