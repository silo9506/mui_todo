import { Button, Container, Divider, InputBase } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import React from "react"
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import IconButton from '@mui/material/IconButton';
import Todos from "components/atoms/Todos";
import { useLocalStorage } from "hooks/useLocalStorage";
import {v4 } from "uuid"
type Todos ={
  id:string,
  todo:string,
  finish:boolean
}

function App() {
  const [todos,setTodos] =useLocalStorage<Todos[]>("TODOS",[])
  const [alignment, setAlignment] = React.useState('All');
  const [todo,setTodo] = React.useState("");

  const inputRef = React.useRef<HTMLInputElement>(null)
  const todoList = React.useMemo(() => {
    return todos.map((todo) => {
      return { ...todo, };
    });
  }, [todos]);

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);
  };

  const onSubmit =(e:React.SyntheticEvent,)=>{
    e.preventDefault()
    // console.log(inputRef!.current as HTMLInputElement)
    // let todo =(inputRef.current?.firstChild as HTMLInputElement).value
    setTodos((prevTodos)=>{
      return [...prevTodos,{todo, id:v4(),finish:false} ]
    })
    setTodo("")
    console.log(todo)
  }

  const onUpdateTodo = (id:string,newTodo:string,finish:boolean)=>{
    setTodos((prevTodos)=>{
      return prevTodos.map((todo)=>{
        if(todo.id === id){return {...todo,todo:newTodo,finish:finish}}
        else{
          return todo
        }
      })
    })
  }
  const onDeleteTodo = (id:string)=>{
    setTodos((prevTodos)=>{
      return prevTodos.filter((note)=>note.id !==id)
    })
  }

  console.log(todoList)

  return (
    <div >
      <Container >
        <Paper elevation={3} sx={{ backgroundColor:"black",}} >
          <Box sx={{display:'flex',borderBottom:"2px solid #cdcdcd"}}>
            <IconButton size="small" sx={{"& svg":{fill:"white"}}} aria-label="mode">
              <WbSunnyIcon />
            </IconButton>
            <ToggleButtonGroup
                color="primary"
                value={alignment}
                sx={{flex:"1" ,display:'flex',justifyContent:'flex-end',"& button":{border:'unset',color:'orange'},"& button:hover":{textDecoration:"underline", textUnderlinePosition:"under",textDecorationColor:"white", textDecorationThickness:"2px"}, }}
                onChange={handleChange}
                aria-label="Platform">
              <ToggleButton value="web">All</ToggleButton>
              <ToggleButton value="android">Active</ToggleButton>
              <ToggleButton value="ios">Completed</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Box sx={{backgroundColor:"#00172d",minHeight:"500px",display:'flex',flexDirection:'column'}}>
            {todoList.map((todo)=>(
            <Todos onUpdateTodo={onUpdateTodo} onDeleteTodo={onDeleteTodo} id={todo.id} todo={todo.todo} finish={todo.finish}  key={todo.id}/>
            ))}
          </Box>


          <Box sx={{backgroundColor:"black",padding:"10px"}}>          
            <Paper
                onSubmit={onSubmit}
                component="form"
                sx={{ p: '2px 4px',display:'flex'}}>
                  <InputBase
                  ref={inputRef}
                  sx={{ ml: 1, flex: 1,padding:"0px" }}
                  placeholder="Typing Todos"
                  inputProps={{ 'aria-label': 'Search Todos' }}
                  value={todo}
                  onChange={(e)=>setTodo(e.target.value)}
              />
              <Button type="submit" sx={{borderTopLeftRadius:"0px",borderBottomLeftRadius:"0px"}} variant="contained">Add</Button>
            </Paper>
          </Box>

        </Paper>
      </Container>
    </div>
  );
}

export default App;
