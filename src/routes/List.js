import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../app/listSlice";
import CreateEntry from "../components/CreateEntry";

function List() {
  const dispatch = useDispatch();
  const currList = useSelector(state => state.list.data);
  
  async function updateListSlice() { // updates the data in redux by fetching from the database.
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch("http://localhost:3001/getAllEntries", requestOptions)
      .then(response => response.json())
      .then(resJson => dispatch(setData(resJson)) )
      .catch(error => console.log('error', error));
   }

   useEffect(() => {
    updateListSlice();
   }, []);

   console.log('currlist:')
   console.log(currList);

  return (
    <>
  
      <CreateEntry updateListSlice = {updateListSlice} />

      <div className="list-content">
        {currList?.map((elem, indx) => (
          <div key={indx} className="list-entry">
            {elem.text}
          </div>
        ))}
      </div>
    </>
  );
}

export default List;
