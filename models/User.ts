export type User = {
    id: string,
    first_name: string,
    last_name: string,
    email: string,
    location: string,
    title: string,
    description: string,
    avatar: string,
    language: string,
    tfa_secret: string,
    status: string,
    role: string,
    email_notifications: boolean,
    active_company: string,
    active_tenant: string,
    tags : string[]
}