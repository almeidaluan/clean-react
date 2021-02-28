import { HttpPostClient } from 'data/protocols/http/HttpPostClient'

export class RemoteAuthentication {
  constructor (private readonly url: string,
    private readonly httpPostClient: HttpPostClient) {}

  async auth (): Promise<void> {
    this.httpPostClient.post({ url: this.url })
  }
}
