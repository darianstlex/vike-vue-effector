import { todos } from '@/database/todoItems';

export const onNewTodo = async ({ text }: { text: string }) => {
  todos.todo.push({ text });
};
