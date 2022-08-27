import './App.css'
import Button from '@mui/material/Button';
import { NextUIProvider, Modal, Loading } from '@nextui-org/react';
import { getPlace, setEvaluatedPlace } from '../public/uitl-axios.js'
import { useEffect, useState } from 'react'

function App() {
  const [place, setPlace] = useState(null)
  const [modalVisibility, setModalVisibility] = useState(false)

  useEffect(() => {
    getNewPlace()
  }, [])

  useEffect(() => {
    setEventsKey()
  }, [place])

  function setEventsKey() {
    document.onkeydown = (e) => {
      if(e.key === 'ArrowLeft') {
        evaluatedPlace(false)
      }
      if(e.key === 'ArrowRight') {
        evaluatedPlace(true)
      }
    }
  }
  async function evaluatedPlace(evaluated) {
    console.log('place', place)
    setModalVisibility(true)
    const response = await setEvaluatedPlace(place, evaluated)
    if (response === 'Place evaluated') {
      getNewPlace()
    }
    setModalVisibility(false)
  }

  async function getNewPlace() {
    setModalVisibility(true)
    const place = await getPlace()
    setPlace(place)
    setModalVisibility(false)
  }

  return (
    <NextUIProvider>
      {modalVisibility &&
        <div className='loading'>
          <Loading type="points" gradientBackground size="xl"/>
        </div>
      }

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
              return <img onLoad={(e) => console.log(e)} key={photo} className='foto' src={photo} alt='foto'/>
            })}
            {place?.featuredPhotos?.length === 0 && <span>Não há fotos</span>}
          </div>
        </section>

        <div className='containerBotoes'>
          <Button
            fullWidth
            color="error"
            variant="contained"
            style={{fontSize: '3rem'}}
            onClick={() => evaluatedPlace(false)}>RUIM
          </Button>

          <Button
            fullWidth
            color="success"
            variant="contained"
            style={{fontSize: '3rem'}}
            onClick={() => evaluatedPlace(true)}>BOM
          </Button>
        </div>
      </div>
    </NextUIProvider>
  )
}

export default App
