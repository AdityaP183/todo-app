import React, { useState, useEffect } from "react";

const TodosList = () => {
	const [todos, setTodos] = useState([]);
	const [todo, setTodo] = useState("");

	const addTodo = (e) => {
		e.preventDefault();
		if (todo.trim() !== "") {
			const newTodos = [...todos, todo.trim()];
			setTodos(newTodos);
			localStorage.setItem("todos", JSON.stringify(newTodos));
			setTodo("");
		}
	};

	const removeTodo = (index) => {
        const newTodos = todos.filter((_, i) => i !== index);
        setTodos(newTodos);
        localStorage.setItem("todos", JSON.stringify(newTodos));
      };

	useEffect(() => {
		const savedTodos = localStorage.getItem("todos");
		if (savedTodos) {
			setTodos(JSON.parse(savedTodos));
		}
	}, []);

	return (
		<div className="todo-list">
			<div className="add-todo">
				<form onSubmit={addTodo}>
					<input
						type="text"
						value={todo}
						onChange={(e) => setTodo(e.target.value)}
						placeholder="Enter a new todo"
					/>
					<button type="submit">Add Todo</button>
				</form>
			</div>

			<hr className="divider" />

			<div className="todo-items">
				{todos.length === 0 ? (
					<p>No todos available</p>
				) : (
					<ul>
						{todos.map((item, index) => (
							<li key={index}>
								<div>
									<h4>{item}</h4>
									<button onClick={() => removeTodo(index)}>
										Delete
									</button>
								</div>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};

export default TodosList;
