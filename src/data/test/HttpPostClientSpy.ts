import { HttpPostClient, HttpPostParams } from '@/data/protocols/http/HttpPostClient'
import { HttpResponse, HttpStatuscode } from '@/data/protocols/http/http-response'

export class HttpPostClientSpy implements HttpPostClient {
  url?: string
  body?: object
  response: HttpResponse = {
    statusCode: HttpStatuscode.ok
  }

  async post (params: HttpPostParams): Promise<HttpResponse> {
    this.url = params.url
    this.body = params.body
    return Promise.resolve(this.response)
  }
}
