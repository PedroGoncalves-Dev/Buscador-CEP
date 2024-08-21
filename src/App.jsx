import { FiSearch } from 'react-icons/fi'
import './App.css'

function App() {
 

  return (
    <div className='container'>
      <h1 className='titulo'>Buscador CEP</h1>

      <div className='containerInput'>
        <input type="text"
        placeholder='Digite o seu cep...'
         />

         <button className='buttonSearch'>
          <FiSearch size={25} color='#fff' />
         </button>

      </div>
         <main className='main'>
          <h2>CEP: 2834238472</h2>

          <span>Rua teste</span>
          <span>Complemento</span>
          <span>Vila </span>
          <span>Cidade</span>

         </main>
    </div>
    
  )
}

export default App
