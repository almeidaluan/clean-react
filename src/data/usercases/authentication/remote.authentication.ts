import { HttpResponse, HttpStatuscode } from '@/data/protocols/http/http-response'
import { HttpPostClient, HttpPostParams } from '@/data/protocols/http/HttpPostClient'
import { InvalidCredentialsError } from '@/domain/erros/invalid-credentials-error'
import { AuthenticationParams } from '@/domain/usercases/authentication'

export class RemoteAuthentication {
  constructor (private readonly url: string,
    private readonly httpPostClient: HttpPostClient) {}

  async auth (params: AuthenticationParams): Promise<void> {
    const response = await this.httpPostClient.post({
      url: this.url,
      body: params
    })

    switch(response.statusCode){
      case HttpStatuscode.ok: break;
      case HttpStatuscode.unathorized: throw new InvalidCredentialsError() 
      default: return Promise.resolve()  
    }
  }
}
