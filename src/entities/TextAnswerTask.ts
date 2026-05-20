import { ChildEntity, Column } from 'typeorm'
import Task from './Task.js'

@ChildEntity()
export default class TextAnswerTask extends Task {
    @Column('text')
    public correctText: string
}
