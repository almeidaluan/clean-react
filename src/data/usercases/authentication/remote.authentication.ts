import { HttpPostClient, HttpPostParams } from 'data/protocols/http/HttpPostClient'
import { AuthenticationParams } from 'domain/usercases/authentication'

export class RemoteAuthentication {
  constructor (private readonly url: string,
    private readonly httpPostClient: HttpPostClient) {}

  async auth (params: AuthenticationParams): Promise<void> {
    this.httpPostClient.post({
      url: this.url,
      body: params
    })
  }
}
