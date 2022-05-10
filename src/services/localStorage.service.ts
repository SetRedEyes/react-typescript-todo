export function getLocalStorageTodos() {
  return JSON.parse(localStorage.getItem('todos') || '[]')
}
