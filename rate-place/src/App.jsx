import './App.css'
import Button from '@mui/material/Button';
import { NextUIProvider, Loading, Dropdown } from '@nextui-org/react';
import { getPlace, setEvaluatedPlace, setEvaluatedCategory } from '../public/uitl-axios.js'
import { useEffect, useState } from 'react'

function App() {
  const [place, setPlace] = useState(null)
  const [modalVisibility, setModalVisibility] = useState(true)

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
      if(e.key === 'ArrowDown') {
        evaluatedPlace('maybe')
      }
    }
  }

  function handleSelectCategory(event) {
    const categorySelected = event.anchorKey
    const valuesToEvatualted = {
      'bom': true,
      'ruim': false,
      'nao-sei': 'maybe'
    }
    const valuetEvaluated = valuesToEvatualted[categorySelected]

    evaluatedCategory(place.category, valuetEvaluated)
  }

  async function evaluatedPlace(evaluated) {
    setModalVisibility(true)
    const response = await setEvaluatedPlace(place, evaluated)
    if (response === 'Place evaluated') {
      getNewPlace()
    }
  }

  async function evaluatedCategory(category, evaluated) {
    setModalVisibility(true)
    const response = await setEvaluatedCategory(category, evaluated)
    if (response === 'Category evaluated') {
      getNewPlace()
    }
  }

  async function getNewPlace() {
    setModalVisibility(true)
    const place = await getPlace()
    setPlace(place)
    setTimeout(() => {
      setModalVisibility(false)
    }, 100)
  }

  return (
    <NextUIProvider>
      {modalVisibility &&
        <div className='loading'>
          <Loading type="points" gradientBackground size="xl"/>
        </div>
      }

      {!modalVisibility && <div className="App">
        <section className='conteudo'>
          <div className='container containerTexto'>
            <span><b>Nome:</b> {place?.mainName}</span>
            <span><b>Categoria:</b> {place?.category}</span>
            <Dropdown>
              <Dropdown.Button flat>Avaliar todos desta categoria?</Dropdown.Button>
              <Dropdown.Menu aria-label="Static Actions" selectionMode="single" onSelectionChange={handleSelectCategory}>
                <Dropdown.Item color='error' key="ruim">RUIM</Dropdown.Item>
                <Dropdown.Item color='warning' key="nao-sei">NÃO SEI</Dropdown.Item>
                <Dropdown.Item color='success' key="bom">BOM</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <span><b>Nota: </b> {place?.ratingInformation?.basicRatingInformation?.averageGrade}</span>
            <span><b>Avaliações: </b> {place?.ratingInformation?.basicRatingInformation?.totalOfEvaluations}</span>
            <span><b>Tem comentários?:</b> {place?.topComments.length ? 'Sim' : 'Não' }</span>
            <span><a href={place?.url} target='_blank'>Google Maps</a></span>
          </div>

          <div className='container containerFotos'>
            {place?.featuredPhotos && place?.featuredPhotos.slice(0, 16).map(photo => {
              return <img key={photo} className='foto' src={photo} alt='foto'/>
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
            color="warning"
            variant="contained"
            style={{fontSize: '3rem'}}
            onClick={() => evaluatedPlace('maybe')}>NÃO SEI
          </Button>

          <Button
            fullWidth
            color="success"
            variant="contained"
            style={{fontSize: '3rem'}}
            onClick={() => evaluatedPlace(true)}>BOM
          </Button>
        </div>
      </div>}
    </NextUIProvider>
  )
}

export default App
