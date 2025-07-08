export interface UserRegister {
    email: string,
    password: string,
    role: string,
    cpf: string,
    nomeCompleto: string,
    especialidade?: string
}

export interface UserLogin {
    email: string,
    password: string,
}