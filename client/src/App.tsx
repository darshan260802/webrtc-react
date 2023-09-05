import { FormEvent, useCallback, useEffect, useState } from "react";
import "./App.css";
import { useSocket } from "./context/SocketContext";

function App() {
	const socket = useSocket();

  const [room , setRoom] = useState("");

	useEffect(() => {
		socket.on("room:join", (data) => {
			console.log("Room Joined :", data);
      setRoom(data.room);
		});
	}, [socket]);

	const handleJoinRoom = useCallback((event: FormEvent) => {
		event.preventDefault();
    const email = (event.target as HTMLFormElement)['email'].value;
    const room = (event.target as HTMLFormElement)['room'].value;
    
    socket.emit("room:join", {
      email, room
    })

	}, [socket]);

	return (
		<>
			<h1>Hello</h1>
			<form onSubmit={handleJoinRoom}>
				<input
					type="text"
					name="email"
					id="email"
					placeholder="Enter Your Email Here..."
				/>
				<input type="text" name="room" id="room" />
				<button type="submit">Join Room </button>
			</form>

      <hr />
      {!!room && <h1>Room : {room}</h1>}
		</>
	);
}

export default App;

