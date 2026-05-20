import { ChildEntity } from 'typeorm'
import Task from './Task.js'

@ChildEntity()
export default class SingleAnswerTask extends Task {}
