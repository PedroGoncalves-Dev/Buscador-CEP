import { FiSearch } from 'react-icons/fi'
import { Skeleton } from 'antd'
import './App.css'
import { useEffect, useState,useRef } from 'react'

function App() {

  const [input , setInput] = useState('')
  const [loading, setLoading] =useState(false)
  const [error, setError] = useState('')
  const [endereco, setEndereco] = useState({})

  const prevInputRef = useRef()

  const urlCep = `https://viacep.com.br/ws/${input}/json/`

  const handleSearch = async (e) => {
       
    
        prevInputRef.current = input //recebe o valor anterior do 'input' a cada vez que ele atualizar

        setLoading(true)
        setError('')

        try {
          
          const res = await fetch(urlCep);
          const dados = await res.json()

          if(res.ok) {
            console.log('cep recebido')

            setEndereco(dados)

            console.log(dados)
          }

        } catch (error) {
          console.log('erro na requizição' , error.message)

          setError('Erro na busca do cep', error.message)
          
        } finally {
          setLoading(false)

          setInput('')
        }

      }


      const prevInput = prevInputRef.current //a variavel prevInput esta recendo o valor anterior passado do input

  return (
    <div className='container'>
      <h1 className='titulo'>Buscador CEP</h1>

      <div className='containerInput'>
        <input type="text"
        placeholder='Digite o seu cep...'
        value={input}
        onChange={(e) => setInput(e.target.value)}
         />

         <button className='buttonSearch' onClick={handleSearch}>
          <FiSearch size={25} color='#fff' />
         </button>

      </div>
         <main className='main'>
          <h2>CEP: {prevInput}</h2>

          {loading && !error &&(
            <>
              <Skeleton />
              
            </>
          )}

          {!loading && error && (
              <>
                 <h3 style={{color: 'red'}}>{error}</h3>
              </>
          )}

          {!loading && !error  &&endereco && endereco.cep && ( // Verifica se existe um endereço válido
              <>
              <span>Rua: {endereco.logradouro}</span>
              <span>Bairro: {endereco.bairro}</span>
              <span>Cidade: {endereco.localidade}</span>
              <span>Estado: {endereco.uf}</span>
            </>        
          )}

         

          {!loading && !error && (!endereco || !endereco.cep) &&  ( //se o loading for false e error falso e (endereco falso ou endereco.cep falso)

              <h2 style={{color:'#363636'}}>Digite um cep para poder mostrar o endereço...</h2>

          )}


         </main>
    </div>
    
  )
}

export default App
