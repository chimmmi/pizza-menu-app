import { useSelector } from "react-redux";

function Username() {
  //* Retrieving from the redux store.
  const username = useSelector(state=>state.user.username);

  //* returning immediately if there is no username:
  if(!username) return null;

  return <div className="text-sm font-semibold hidden md:block">{username}</div>;
}

export default Username;
