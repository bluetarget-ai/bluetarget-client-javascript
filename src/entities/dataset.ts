import { ApiConnector } from '../lib/api-connector';
import { existsSync, createReadStream } from 'fs';
import FormData from 'form-data';

interface DatabaseEntity {
  id: string;
  companyId: string;
  name: string;
  key: string;
  status: string;
  createdAt: string;
}

interface FileUpload {
  formData: {
    [key: string]: string;
  };
  uploadUrl: string;
}

interface CreateDataset {
  name: string;
  file: string;
}

interface AddItemsResponse {
  success: boolean;
}

export class Dataset extends ApiConnector {
  protected name: string;
  protected id: string;

  constructor(apiKey: string, apiSecret: string, id?: string) {
    super(apiKey, apiSecret);
    if (id) {
      this.id = id;
    }
  }

  public async addItems<T>(items: T[]): Promise<AddItemsResponse> {
    const response = await this.post(`dataset/${this.id}/ingest`, { items });

    const body = await response.json();

    if (response.status === 200) {
      return body;
    }

    throw new Error(JSON.stringify(body));
  }

  public async create(params: CreateDataset): Promise<Dataset> {
    const { file, name } = params;

    if (!existsSync(file)) {
      throw new Error(`File ${file} not found`);
    }

    const database = await this.createEntity(name);
    const { formData, uploadUrl } = await this.createFileUpload(database.id);
    await this.uploadFile(uploadUrl, formData, file);

    this.id = database.id;
    this.name = database.name;

    return this;
  }

  protected async createEntity(name: string): Promise<DatabaseEntity> {
    const response = await this.post('dataset', {
      name,
    });

    const body = await response.json();

    if (response.status === 200) {
      return body as DatabaseEntity;
    }

    throw new Error(JSON.stringify(body));
  }

  protected async createFileUpload(id: string): Promise<FileUpload> {
    const response = await this.post(`dataset/${id}/upload`);

    const body = await response.json();

    if (response.status === 200) {
      return body as FileUpload;
    }

    throw new Error(JSON.stringify(body));
  }

  protected async uploadFile(url: string, data: FileUpload['formData'], file: string): Promise<void> {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    const buffer = createReadStream(file);

    formData.append('file', buffer);

    const length = await getFormDataLengthAsync(formData);

    await this.rawPost(url, formData, {
      ...formData.getHeaders(),
      'Content-Length': length,
    });
  }
}

const getFormDataLengthAsync = async (formData: FormData): Promise<number> => {
  return new Promise((res, rej) => {
    formData.getLength((err, length) => {
      if (err) {
        rej(err);
      } else {
        res(length);
      }
    });
  });
};
