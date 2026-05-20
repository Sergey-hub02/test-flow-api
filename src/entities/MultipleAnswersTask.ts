import { ChildEntity } from 'typeorm'
import Task from './Task.js'

@ChildEntity()
export default class MultipleAnswersTask extends Task {}
