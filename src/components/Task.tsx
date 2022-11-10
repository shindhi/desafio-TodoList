import { ChangeEvent } from 'react';
import { Trash } from 'phosphor-react';

import { TaskProps } from './InputTask';

import styles from './Task.module.css'

interface ComponentTaskProps {
  task: TaskProps;
  onMarkTask: (taskId: string, checked: boolean) => void;
  onDeleteTask: (taskId: string) => void;
}

export function Task({ task, onMarkTask, onDeleteTask }: ComponentTaskProps) {
  function handleMarkTask(event: ChangeEvent<HTMLInputElement>) {
    onMarkTask(task.id, event.target.checked)
  }

  function handleDeleteTask() {
    onDeleteTask(task.id)
  }

  // TODO: Taxar o texto da label, qyando a tarefa for marcada como finalizada
  return (
    <div className={styles.task}>
      <label className={styles.container}>
        {task.value}
        <input type="checkbox" onChange={handleMarkTask} checked={task.checked} />
        <span className={styles.checkmark}></span>
      </label>

      <button
        className={styles.deleteTask}
        onClick={handleDeleteTask}
      >
        <Trash />
      </button>
    </div>
  );
}