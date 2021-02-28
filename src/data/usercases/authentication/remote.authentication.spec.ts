import { HttpPostClientSpy } from '@/data/test/HttpPostClientSpy'
import { RemoteAuthentication } from '@/data/usercases/authentication/remote.authentication'
import faker from 'faker'
import { MockAuthentication } from '@/data/test/MockAuthentication'
import { HttpStatuscode } from '@/data/protocols/http/http-response'
import { InvalidCredentialsError } from '@/domain/erros/invalid-credentials-error'

type SutTypes = {
  sut: RemoteAuthentication,
  httpPostClientSpy: HttpPostClientSpy
}


const makeSut = (url: string = faker.internet.url()): SutTypes => {
  
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
    
    const mock = new MockAuthentication()
    
    await sut.auth(mock.mockAuthentication())
    
    expect(httpPostClientSpy.url).not.toBe(url)
  })

  test('Should call HttpPostClient with correct BODY', async () => {
    
    const { sut, httpPostClientSpy } = makeSut()
    
    const mock = new MockAuthentication()
    
    await sut.auth(mock.mockAuthentication())

    expect(httpPostClientSpy.body).toEqual(mock.mockAuthentication())
  })

  test('Should throw Invalid Credentials if HttpPostClient returns 401', async  () =>{
    const { sut, httpPostClientSpy} = makeSut()

    httpPostClientSpy.response ={
      statusCode: HttpStatuscode.unathorized
    }
    
    const mock = new MockAuthentication()

    const promise = sut.auth(mock.mockAuthentication())
    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })

})
