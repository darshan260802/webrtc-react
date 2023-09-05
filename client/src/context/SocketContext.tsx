import { ReactNode, createContext, useContext, useMemo } from "react";
import { Socket, io } from "socket.io-client";

export const SocketContext = createContext<Socket | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useSocket = () => {
	return useContext(SocketContext) ?? io("http://localhost:7000");
};

export default function SocketProvider({ children }: { children: ReactNode }) {
	const socket = useMemo(() => {
		return io("http://localhost:7000");
	}, []);

	return (
		<SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
	);
}
