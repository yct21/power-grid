export interface User {
  // Unique userId, generated in frontend since we don't care
  id: string,

  // User name, input by user
  name: string,

  // Current name space of socket
  nameSpace: string,

  // Current socket of user, supposed to change in every connections
  socketId: string,
}
