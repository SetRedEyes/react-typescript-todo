import { useNavigate } from 'react-router-dom'

export const AboutPage = () => {
  const history = useNavigate()

  return (
    <>
      <h1>Information Page</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus ipsum
        nisi consectetur fugiat provident recusandae est excepturi architecto
        eveniet commodi iure maxime inventore aliquam molestiae laboriosam
        neque, deserunt assumenda porro
      </p>
      <button className='btn' onClick={() => history('/')}>
        Return to To-dos List
      </button>
    </>
  )
}
