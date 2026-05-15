export default class Role {
    private _guid: string
    private _name: string
    private _code: string
    private _description: string
    private _createdAt: Date
    private _updatedAt: Date

    public constructor(
        guid: string,
        name: string,
        code: string,
        description: string,
        createdAt = new Date(),
        updatedAt = new Date()
    ) {
        this._guid = guid
        this._name = name
        this._code = code
        this._description = description
        this._createdAt = createdAt
        this._updatedAt = updatedAt
    }

    public get guid() {
        return this._guid
    }

    public set guid(guid: string) {
        this._guid = guid
    }

    public get name() {
        return this._name
    }

    public set name(name: string) {
        this._name = name
    }

    public get code() {
        return this._code
    }

    public set code(code: string) {
        this._code = code
    }

    public get description() {
        return this._description
    }

    public set description(description: string) {
        this._description = description
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
