import Role from './Role.js'

export default class User {
    private _guid: string
    private _photo: string | undefined
    private _lastName: string
    private _firstName: string
    private _secondName: string | undefined
    private _login: string
    private _birthday: Date
    private _role: Role
    private _createdAt: Date
    private _updatedAt: Date

    public constructor(
        guid: string,
        lastName: string,
        firstName: string,
        login: string,
        birthday: Date,
        role: Role,
        createdAt: Date,
        updatedAt: Date,
        photo?: string,
        secondName?: string,
    ) {
        this._guid = guid
        this._photo = photo
        this._lastName = lastName
        this._firstName = firstName
        this._secondName = secondName
        this._login = login
        this._birthday = birthday
        this._role = role
        this._createdAt = createdAt
        this._updatedAt = updatedAt
    }

    public get guid() {
        return this._guid
    }

    public set guid(guid: string) {
        this._guid = guid
    }

    public get photo() {
        return this._photo
    }

    public set photo(photo: string | undefined) {
        this._photo = photo
    }

    public get lastName() {
        return this._lastName
    }

    public set lastName(lastName: string) {
        this._lastName = lastName
    }

    public get firstName() {
        return this._firstName
    }

    public set firstName(firstName: string) {
        this._firstName = firstName
    }

    public get secondName() {
        return this._secondName
    }

    public set secondName(secondName: string | undefined) {
        this._secondName = secondName
    }

    public get login() {
        return this._login
    }

    public set login(login: string) {
        this._login = login
    }

    public get birthday() {
        return this._birthday
    }

    public set birthday(birthday: Date) {
        this._birthday = birthday
    }

    public get role() {
        return this._role
    }

    public set role(role: Role) {
        this._role = role
    }

    public get createdAt() {
        return this._createdAt
    }

    public set createdAt(createdAt: Date) {
        this._createdAt = createdAt
    }

    public get updatedAt() {
        return this._updatedAt
    }

    public set updatedAt(updatedAt: Date) {
        this._updatedAt = updatedAt
    }
}
