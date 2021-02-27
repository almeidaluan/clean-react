import { HttpPostClientSpy } from '../../test/HttpPostClientSpy'
import { RemoteAuthentication } from './remote.authentication'

const makeSut = (url: string = 'other_url'): any => {
  const httpPostClientSpy = new HttpPostClientSpy()
  const sut = new RemoteAuthentication(url, httpPostClientSpy)
  return {
    sut,
    httpPostClientSpy
  }
}

describe('RemoteAuthentication', () => {
  test('Should call HttpPostClient with correct URL',async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const url = 'other_url'
    await sut.auth()
    expect(httpPostClientSpy.url).toBe(url)
  })
})
