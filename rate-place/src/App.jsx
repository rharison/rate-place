import './App.css'
import Button from '@mui/material/Button';
import { getPlace } from '../public/uitl-axios.js'
import { useEffect, useState } from 'react'



function App() {
  const [place, setPlace] = useState(null)

  async function setEvaluatedInPlace(place, evaluated) {
    console.log('EVALUETED: ', evaluated)
  }

  useEffect(() => {
    async function getNewPlace() {
      const place = await getPlace()
      setPlace(place)
    }
    document.onkeydown = (e) => {
      const events = {
        'ArrowRight': () => {
          setEvaluatedInPlace(place, true)
        },
        'ArrowLeft': () => {
          setEvaluatedInPlace(place, false)
        },
      }
      events[e.key] && events[e.key]()
    }
    getNewPlace()
  }, [])

  return (
    <div className="App">
      <section className='conteudo'>
        <div className='container containerTexto'>
          <span><b>Nome:</b> {place?.mainName}</span>
          <span><b>Categoria:</b> {place?.category}</span>
          <span><b>Nota: </b> {place?.ratingInformation?.basicRatingInformation?.averageGrade}</span>
          <span><b>Avaliações: </b> {place?.ratingInformation?.basicRatingInformation?.totalOfEvaluations}</span>
          <span><b>Tem comentários?:</b> {place?.topComments.length ? 'Sim' : 'Não' }</span>
        </div>

        <div className='container containerFotos'>
          {place?.featuredPhotos && place?.featuredPhotos.slice(0, 16).map(photo => {
            return <img className='foto' src={photo} alt='foto'/>
          })}
        </div>
      </section>

      <div className='containerBotoes'>
        <Button
          fullWidth
          color="error"
          variant="contained"
          style={{fontSize: '3rem'}}
          onClick={() => setEvaluatedInPlace(place, false)}>RUIM
        </Button>

        <Button
          fullWidth
          color="success"
          variant="contained"
          style={{fontSize: '3rem'}}
          onClick={() => setEvaluatedInPlace(place, true)}>BOM
        </Button>
      </div>
    </div>
  )
}

export default App
