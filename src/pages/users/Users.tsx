import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, TextField } from "@mui/material";

const Users = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  
  interface Provider {
    todo:string
  }

  const [todo,setTodo] = React.useState<Provider[]>([]);
  const [loading,setLoading] = React.useState(false);

  const handleAdd = () => {
    if (inputRef.current) {
     const inputVal= inputRef.current.value;  
    const todoVal:any = JSON.parse(localStorage.getItem('todo')!)
    console.log(todoVal);
    if(todoVal?.length){
      const list = [...todo,{todo : inputVal}];
      console.log(list)
      localStorage.setItem('todo',JSON.stringify(list))
      setTodo(list)
    }
    else{
      const todo =[{todo:inputVal}]
      localStorage.setItem('todo', JSON.stringify(todo));
      setLoading(true)
    }
    inputRef.current.value="";
  }
  }
  

   React.useEffect(() => {
    const todoVal:any = JSON.parse(localStorage.getItem('todo')!)
    setTodo(todoVal);
  },[inputRef,loading])

  const handleDelete = (id:number) => {
    const todoVal:any = JSON.parse(localStorage.getItem('todo')!)
    const filteredVal = todoVal.filter((it:object,index:number)=> index !== id)
    setTodo(filteredVal)
    localStorage.setItem('todo',JSON.stringify(filteredVal))
  }


  return (
    <div style={{margin: '5rem',border: '1px solid',padding: '5rem' }} className="container m-5">
       <div style={{display:'flex',justifyContent: 'center',alignItems:'center',padding:'2rem 0'}} className="shadow">
       <TextField
          inputRef={inputRef}
          style={{width:'50%'}}
          size="small"
          // helperText="Please enter your name"
          id="demo-helper-text-aligned"
          label="Name"
        />
        {/* <input type="text" name="" ref={inputRef} id="" /> */}
        <Button onClick={handleAdd} variant="contained">Add</Button>
       </div>
      <TableContainer  component={Paper}>
        <Table  aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Todo</TableCell>
              <TableCell align="center">Calories</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todo?.length &&
              todo?.map((td,index)=>{return(
                <TableRow key={index}>
                <TableCell  align="center">todo</TableCell>
               <TableCell align="center">{td.todo}</TableCell>
               <TableCell align="center">
               <Button onClick={()=>handleDelete(index)} variant="outlined" startIcon={<DeleteIcon />}>
                 Delete
               </Button>
               </TableCell>
             </TableRow>
              )})
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Users;
