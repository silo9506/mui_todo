import { Button, Container, InputBase } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import IconButton from "@mui/material/IconButton";
import Todos from "components/atoms/Todos";
import { useLocalStorage } from "hooks/useLocalStorage";
import { v4 } from "uuid";
import styled from "@emotion/styled";
import { useTheme, useThemeUpdate } from "modules/ThemeContext";
import Typography from "@mui/material/Typography/Typography";
type Todos = {
  id: string;
  todo: string;
  finish: boolean;
};

const Background = styled("img")`
  object-fit: cover;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  z-index: -1;
`;

function App() {
  const [todos, setTodos] = useLocalStorage<Todos[]>("TODOS", []);
  const [alignment, setAlignment] = React.useState<string | null>("All");
  const [todo, setTodo] = React.useState("");
  const { toggleTheme } = useThemeUpdate();
  const { darkTheme } = useTheme();

  const todoList = React.useMemo(() => {
    return todos.filter((todo) => {
      if (alignment === "All") return true;

      if (alignment === "Active") return todo.finish === false;

      if (alignment === "Completed") return todo.finish === true;

      return false;
    });
  }, [todos, alignment]);

  const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string | null) => {
    setAlignment(newAlignment);
  };

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (todo === "") {
      alert("할일을 입력해주세요");
    } else
      setTodos((prevTodos) => {
        return [...prevTodos, { todo, id: v4(), finish: false }];
      });
    setTodo("");
  };

  const onUpdateTodo = (id: string, newTodo: string, finish: boolean) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, todo: newTodo, finish: finish };
        } else {
          return todo;
        }
      });
    });
  };
  const onDeleteTodo = (id: string) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((note) => note.id !== id);
    });
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        paddingTop: "40px"
      }}
    >
      {darkTheme ? (
        <Background src={require("./asset/img/background01.jpg")} alt="background" />
      ) : (
        <Background src={require("./asset/img/background02.jpg")} alt="background" />
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "16px"
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            letterSpacing: "10px",
            color: "primary"
          }}
        >
          TODO
        </Typography>
        <IconButton
          onClick={toggleTheme}
          size="small"
          sx={{ "& svg": { fill: darkTheme ? "yellow" : "red" } }}
          aria-label="mode"
        >
          <WbSunnyIcon />
        </IconButton>
      </Box>
      <Paper
        elevation={0}
        sx={{
          backgroundColor: "transparent"
        }}
      >
        <Box sx={{ marginBottom: "16px" }}>
          <Paper
            onSubmit={onSubmit}
            component="form"
            sx={{
              backgroundColor: "primary",
              p: "2px 4px",
              display: "flex",
              "& input::placeholder": {
                color: !darkTheme ? "primary.dark" : "primary.light"
              }
            }}
          >
            <InputBase
              sx={{
                ml: 1,
                flex: 1,
                padding: "0px",
                color: !darkTheme ? "primary.dark" : "primary.light"
              }}
              placeholder="Typing Todos"
              inputProps={{ "aria-label": "Search Todos", maxLength: 32 }}
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
            />
            <Button
              type="submit"
              sx={{
                color: !darkTheme ? "primary.dark" : "primary.light"
              }}
            >
              Add
            </Button>
          </Paper>
        </Box>
        <Box
          sx={{
            display: "flex",
            borderBottom: "2px solid #cdcdcd",
            backgroundColor: darkTheme ? "primary.dark" : "primary.light"
          }}
        >
          <ToggleButtonGroup
            color="success"
            exclusive
            value={alignment}
            sx={{
              flex: "1",
              display: "flex",
              justifyContent: "flex-end",
              "& button": { border: "unset", color: "orange" },
              "& button:hover": {
                textDecoration: "underline",
                textUnderlinePosition: "under",
                textDecorationColor: "white",
                textDecorationThickness: "2px"
              }
            }}
            onChange={handleChange}
            aria-label="Platform"
          >
            <ToggleButton value="All">All</ToggleButton>
            <ToggleButton value="Active">Active</ToggleButton>
            <ToggleButton value="Completed">Completed</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column"
          }}
        >
          {todoList.map((todo) => (
            <Todos
              onUpdateTodo={onUpdateTodo}
              onDeleteTodo={onDeleteTodo}
              id={todo.id}
              todo={todo.todo}
              finish={todo.finish}
              key={todo.id}
            />
          ))}

          {todoList.length === 0 && (
            <Paper sx={{ padding: "15px 0px", textAlign: "center", fontSize: "15px" }}>
              🥹 Please enter your to-do list.
            </Paper>
          )}
        </Box>
      </Paper>
      <Box sx={{ flex: 1 }}></Box>
      <Typography variant="caption" sx={{ textAlign: "center", padding: "16px 0px" }}>
        © 2024 TODO. All Right Reserved
      </Typography>
    </Container>
  );
}

export default App;
