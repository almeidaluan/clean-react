import { HttpPostClientSpy } from '@/data/test/HttpPostClientSpy'
import { RemoteAuthentication } from '@/data/usercases/authentication/remote.authentication'
import faker from 'faker'
import { MockAuthentication } from '@/data/test/MockAuthentication'

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

  test('Should call HttpPostClient with correct BODY', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const mock = new MockAuthentication()
    
    await sut.auth(mock.mockAuthentication())

    expect(httpPostClientSpy.body).toEqual(mock.mockAuthentication())
  })
})
