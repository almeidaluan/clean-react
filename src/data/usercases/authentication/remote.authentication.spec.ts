import { HttpPostClientSpy } from '../../test/HttpPostClientSpy'
import { RemoteAuthentication } from './remote.authentication'
import faker from 'faker'


const makeSut = (url: string = faker.internet.url()): any => {
  const httpPostClientSpy = new HttpPostClientSpy()
  const sut = new RemoteAuthentication(url, httpPostClientSpy)
  return {
    sut,
    httpPostClientSpy
  }
}

describe('RemoteAuthentication', () => {
  test('Should call HttpPostClient with incorrect URL', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const url = faker.internet.url()
    await sut.auth()
    expect(httpPostClientSpy.url).not.toBe(url)
  })
})
