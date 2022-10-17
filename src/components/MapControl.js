import { useState } from 'react'
import styled from 'styled-components'
import { useElementDimension } from '../hook/useElementDimension'
import { Map } from './Map'
import { MapCompareButton } from './MapCompareButton'

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`

const defaultMapObject = {
  currentFeature: null,
  countyId: '',
  townId: '',
  villageId: '',
  activeId: '',
}

export const MapControl = ({ mapData }) => {
  const [mapObject, setMapObject] = useState(defaultMapObject)
  const [compareMode, setCompareMode] = useState(false)
  const { elementRef, dimension } = useElementDimension()

  if (compareMode) {
    const splitDimension = {
      width: dimension.width / 2,
      height: dimension.height,
    }

    return (
      <Wrapper ref={elementRef}>
        {dimension && (
          <>
            <Map
              dimension={splitDimension}
              mapData={mapData}
              id="first"
              mapObject={mapObject}
              setMapObject={setMapObject}
            />
            <Map
              dimension={splitDimension}
              mapData={mapData}
              id="second"
              mapObject={mapObject}
              setMapObject={setMapObject}
            />
          </>
        )}
        <MapCompareButton
          compareMode={compareMode}
          onCompareModeChange={() => {
            setCompareMode((v) => !v)
          }}
        />
      </Wrapper>
    )
  } else {
    return (
      <Wrapper ref={elementRef}>
        {dimension && (
          <Map
            dimension={dimension}
            mapData={mapData}
            id="first"
            mapObject={mapObject}
            setMapObject={setMapObject}
          />
        )}
        <MapCompareButton
          compareMode={compareMode}
          onCompareModeChange={() => {
            setCompareMode((v) => !v)
          }}
        />
      </Wrapper>
    )
  }
}
