import React, { useEffect, useState } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "@/firebase";
import Link from "next/link";

function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "todos"), (snapshot) => {
      setTodos(
        snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            title: doc.data().title,
            detail: doc.data().detail,
          };
        })
      );
    });

    //stop listener so resources wont be wasted all the time
    return unsubscribe;
  }, []);

  return (
    <>
      <div>
        <h1>Todos</h1>
        <ul className="todoList">
          {todos.map((todo) => {
            return (
              <Link key={todo.id} href={"/" + todo.id}>
              <li className="listItem" >
                {todo.title}
              </li>
              </Link>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default TodoList;
