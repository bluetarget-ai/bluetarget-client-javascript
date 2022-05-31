import fetch, { BodyInit, Response } from 'node-fetch';

const __AI_BRIDGE_API_URL = 'https://api.bluetarget.ai';

interface Headers {
  [key: string]: any;
}

interface Body {
  [key: string]: any;
}

export class ApiConnector {
  protected apiKey: string;
  protected apiSecret: string;

  constructor(apiKey: string, apiSecret: string) {
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
  }

  protected async post(url: string, body?: Body): Promise<Response> {
    return fetch(`${__AI_BRIDGE_API_URL}/${url}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        API_KEY: this.apiKey,
        API_SECRET: this.apiSecret,
      },
    });
  }

  protected async rawPost(url: string, body?: BodyInit, headers?: Headers): Promise<Response> {
    return fetch(url, {
      method: 'POST',
      body,
      headers: {
        ...headers,
        API_KEY: this.apiKey,
        API_SECRET: this.apiSecret,
      },
    });
  }
}
