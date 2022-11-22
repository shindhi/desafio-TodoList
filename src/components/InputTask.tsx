import { ChangeEvent, FormEvent, useState } from 'react';
import { PlusCircle } from 'phosphor-react';
import { v4 as uuidv4 } from 'uuid'

import { Task } from './Task';

import ClipboardImg from '../assets/clipboard.svg'

import styles from './InputTask.module.css'

export interface TaskProps {
  id: string;
  value: string;
  checked: boolean;
}

export function InputTask() {
  const [tasks, setTasks] = useState<TaskProps[]>([])
  const [newTask, setNewTask] = useState('')

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    if (newTask === '')
      return

    const newTaskData: TaskProps = {
      id: uuidv4(),
      value: newTask,
      checked: false,
    }

    setTasks([...tasks, newTaskData])
    setNewTask('')
  }
 
  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTask(event.target.value)  
  }

  function markTask(taskId: string) {
    setTasks((state) => {
      const newState = state.map(task => {
        if (task.id === taskId) {
          return {
            ...task,
            checked: !task.checked
          }
        }

        return task
      })

      return newState
    })

    countTasksCompleted()
  }

  function countTasksCompleted() {
    const initialValue = 0
    const countTasksCompleted = tasks
      .filter(task => task.checked === true)
      .reduce((acc) => acc + 1, initialValue)

    return countTasksCompleted
  }
   
  function deleteTask(taskId: string) {
    const taskWithoutTaskSelected = tasks.filter(task => {
      return task.id !== taskId
    })

    setTasks(taskWithoutTaskSelected)
  }

  // TODO: Bloquear o botão de Criar Tarefa, caso o campo de input esteja vazio
  return (
    <article>
      <form onSubmit={handleCreateNewTask} className={styles.todoForm}>
        <input
          type="text"
          placeholder="Adicione uma tarefa"
          value={newTask}
          onChange={handleNewTaskChange}
        />
        <button type="submit">
          Criar
          <PlusCircle size={16} weight="bold" />
        </button>
      </form>

      <div className={styles.info}>
        <strong className={styles.tasksCreated}>
          Tarefas criada <span>{tasks.length}</span>
        </strong>

        <strong className={styles.completed}>
          Concluídas <span>{countTasksCompleted()} de {tasks.length}</span>
        </strong>
      </div>

      <div className={styles.taskList}>
        {
          tasks.length > 0 ?
            (tasks.map(task => {
              return (
                <Task 
                  key={task.id}
                  task={task} 
                  onMarkTask={markTask}
                  onDeleteTask={deleteTask}
                />
              )
            })) :
            (
              <div className={styles.semTarefas}>
                <img src={ClipboardImg} alt="Clipbord" />
                <p className={styles.aviso}>
                  <strong>Você ainda não tem tarefas cadastradas</strong>
                  Crie tarefas e organize seus itens a fazer
                </p>
              </div>
            )
        }
      </div>
    </article>
  );
}