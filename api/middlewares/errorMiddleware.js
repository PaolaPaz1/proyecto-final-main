/*
  - Este middleware se encarga de manejar los errores que se generen en la aplicación.
  - Se utiliza un middleware en lugar de un controlador porque los errores pueden
  ocurrir en cualquier parte de la aplicación, no solo en los controladores.
*/
export const errorMiddleware = (err, req, res, next) => {
  console.error(err)
  res.status(err.status || 500).json({ error: err.message || 'Algo salió mal, pero no fue tu culpa' })
}
