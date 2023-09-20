import { useState } from "react";
import styled from "styled-components";
import "./index.css";
import corkboard  from "./corkboard.jpeg";
import thumbtack  from "./thumbtack.png";

const Corkboard = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background: url(${corkboard});
  height: 100vh;
  font-family: chalkboard;
`;

const StickyNote = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background: lightblue;
  height: 40vh;
  width: 40vh;
  margin-top: 20vh;
  padding: 10px;
  box-shadow: 0 0 5px rgba(0,0,0,.36);
  right: 5px;
  bottom: 25px;
`;

const Thumbtack = styled.div`
background: url(${thumbtack});
background-repeat: no-repeat;
height: 55px;
width: 250px;
position: relative;
bottom: 30px;
`;

const Button = styled.button`
  display:inline-block;
  flex: 1;
  background-color: white;
  color: black;
  height: 30px;
  width: 60px;
  border: 1px solid black;
  border-radius: 5px;
  cursor: pointer;
  margin:2px;
  text-transform: uppercase;
  `;

const Text = styled.input`
  border: 2px solid #000;
  width: 200px;
  padding: 5px;
  border-radius: 2px;
  margin: 5px;
  font-family: "Chalkboard"

`;
const TaskCount = styled.span`
  margin: 15px;
`;
const Tasks = styled.div`
padding: 10px 0 0 0;

`;
const LIST = styled.li`
    listStyle:"none";
    text-decoration: "line-through";
`;

const title = {
  textAlign: 'center',
  marginTop: 0,
  fontFamily: "Chalkboard",
  fontSize: '3rem',
}

const App = () => {
  //keeps track of user inputs
  const [input, setInput] = useState("");
  //keeps track of the tasks completed on the todo list
  const [completedTaskCount, setCompletedTaskCount] = useState(0);
  //array with the list of all tasks
  const [todoList, setTodoList] = useState([]);

  //adds a task to the todo list
const handleClick = () => {
    const id = todoList.length + 1;
    setTodoList((prev) => [
      ...prev,
      //each task has a unique id, the task based on the input, and a complete/incomplete  state
      {
        id: id,
        task: input,
        complete: false,
      }
    ]);
    //sets the input
    setInput("");
  };

  //clears the list back and sets all states back to original
  const clearList = () => {
    setTodoList([]);
    setCompletedTaskCount(0);
    setInput("");
  };

  //handles the tasks that are marked as completed
  const handleComplete = (id) => {
    let list = todoList.map((task) => {
      let item = {};
      if (task.id === id) {
        if (!task.complete){
            //Task is pending, modifying it to complete and increment the count
            setCompletedTaskCount(completedTaskCount + 1);
        }
        else {
            //Task is complete, modifying it back to pending, decrement Complete count
            setCompletedTaskCount(completedTaskCount - 1);
        }
item = { ...task, complete: !task.complete };
      } else item = { ...task };
return item;
    });
    setTodoList(list);
  };
return (
    <Corkboard>
      <StickyNote>
        <div>
        <Thumbtack/>
          <h2 style={title}>To Do</h2>
          <Text value={input} onInput={(e) =>setInput(e.target.value)} />
          <Button onClick={() => handleClick()}>Add</Button>
          <Button onClick={clearList}>Clear</Button>
        <Tasks>
          <TaskCount>
            <b>Pending Tasks</b> {todoList.length - completedTaskCount}
          </TaskCount>
          <TaskCount>
            <b>Completed Tasks</b> {completedTaskCount}
          </TaskCount>
        </Tasks>
        <div>
          <ul style={{paddingLeft: 15 + 'px'}}>
            {/* create list items for each task */}
            {todoList.map((todo) => {
              return (
                <LIST
                  complete = {todo.complete}
                  id={todo.id}
                  onClick={() => handleComplete(todo.id)}
                  style={{
                    listStyle: "none",
                    textDecoration: todo.complete && "line-through",
                  }}
                >
                  {todo.task}
                </LIST>
              );
            })}
          </ul>
        </div>
      </div>
      </StickyNote>
    </Corkboard>
  );
};
export default App;