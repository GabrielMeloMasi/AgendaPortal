export interface UserRegister {
    email: string,
    password: string,
    role: string,
    cpf: string,
    nomeCompleto: string
}

export interface UserLogin {
    email: string,
    password: string,
}