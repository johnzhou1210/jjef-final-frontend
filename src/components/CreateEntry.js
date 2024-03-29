import React, { useEffect, useState } from "react";
import BoredTodo from "./BoredTodo";
import RiddlesTodo from './RiddlesTodo';
import { useDispatch, useSelector } from "react-redux";
import { setNewEntryTargetListId, setData } from "../app/listSlice";

function CreateEntry({ updateListSlice }) {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [priority, setPriority] = useState(0);
  // const [listNum, setListNum] = useState(1);
  const currActiveListId = useSelector((state) => state.list.currActiveListId);

  const listNum = useSelector((state) => state.list.newEntryTargetListId);

  const endpoint = "http://localhost:3001/createEntry";




  function saveText(e) {
    setText(e.target.value);
  }

  function savePriority(e) {
    setPriority(e.target.value);
  }

  function saveListNum(e) {
    // setListNum(e.target.value);
    dispatch(setNewEntryTargetListId(e.target.value));
  }

  async function handleCreateEntry() {
    if (text.trim() === "") {
      alert("Enter a task!");
      return;
    }

    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: text,
        priority: Number(priority),
        list_id: Number(listNum),
      }),
    })
      .then((response) => console.log(response.status))
      .then(setText(""))
      .catch((error) => console.error(error));
    updateListSlice();
  }

  function handleCreateBoredEntry(activity) {
    setText(activity ? activity : activity);
    setPriority(Number(priority == null ? 0 : priority));
    // setListNum(Number(listNum === null ? 1 : listNum));
    dispatch(setNewEntryTargetListId(listNum === null ? 1 : listNum))
  }

  function handleCreateRiddleEntry(riddle) {
    console.log("riddle :"+riddle)
    setText(riddle);
    setPriority(Number(priority == null ? 0 : priority));
    // setListNum(Number(listNum === null ? 1 : listNum));
    dispatch(setNewEntryTargetListId(listNum === null ? 1 : listNum))
  }
  useEffect(() => {
    updateListSlice();
  }, []);

  return (
    <div className="entry-add-input">
      <BoredTodo handleCreateBoredEntry={handleCreateBoredEntry} />
      <RiddlesTodo handleCreateRiddleEntry={handleCreateRiddleEntry} />

      <div className="input-field">
        <input
          className="entry-taskname-input"
          placeholder="Add a task here"
          type="text"
          value={text}
          onChange={saveText}
        ></input>
      </div>
      {/* <label className="input-label">Set task priority</label>
      <div className="input-field">
        <input
          className="entry-priority-input"
          placeholder="Priority"
          type="number"
          value={priority}
          onChange={savePriority}
        ></input>
      </div> */}
      <label className="input-label">Add to which list?</label>
      <div className="input-field">
        <input
          className="entry-listid-input"
          placeholder="List number"
          type="number"
          value={listNum}
          onChange={saveListNum}
          maxLength={100}
        ></input>
      </div>
      <button className="interactable" onClick={handleCreateEntry}>Create!</button>
    </div>
  );
}

export default CreateEntry;
