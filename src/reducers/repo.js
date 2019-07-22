export default function repo(state = [], action) {
  switch (action.type) {
    case "ADD":
      let newState = [...state];
      let length = action.data.length;
      if (newState.length + length <= 10) {
        action.data.forEach(element => {
          newState.push(element);
        });
        return newState.sort((a, b) => a.time - b.time);
      } else {
        newState = newState.slice(length);
        action.data.forEach(element => {
          newState.push(element);
        });
        return newState.sort((a, b) => a.time - b.time);
      }
    default:
      return state;
  }
}
