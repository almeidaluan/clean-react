import { AuthenticationParams } from "@/domain/usercases/authentication";

export class MockAuthentication {

    mockAuthentication(): AuthenticationParams{
        return  {
            'email': 'a@gmail.com',
            'password': '1234'
        }
    }

}