import React, { useEffect, useRef, useState } from 'react';
import { Map, MapMarker, MapProps } from 'react-kakao-maps-sdk';
// import LatLngBounds from '/Users/jeonghwanmin/ml/kakao-map-sample/node_modules/kakao.maps.d.ts/@types/LatLngBounds';
interface Position {
  lat: number;
  lng: number;
}

interface PropsTypes {
  sw: string;
  ne: string;
}

function KakaoMap() {
  const mapRef = useRef<kakao.maps.Map>(null);
  const [state, setState] = useState<PropsTypes>();

  function getData() {
    setTimeout(() => {
      const map = mapRef.current;
      console.log(map?.getBounds());
    }, 1000);
  }

  useEffect(() => {
    getData();
  }, []);
  // if (mapRef !== null || mapRef !== undefined) {
  //   const map = mapRef.current;
  //   console.log(map?.getBounds());
  // }
  return (
    <>
      <Map // 지도를 표시할 Container
        center={{
          // 지도의 중심좌표
          lat: 33.450701,
          lng: 126.570667,
        }}
        style={{
          width: '100%',
          height: '450px',
        }}
        level={3} // 지도의 확대 레벨
        onBoundsChanged={(map) =>
          setState({
            sw: map.getBounds().getSouthWest().toString(),
            ne: map.getBounds().getNorthEast().toString(),
          })
        }
        ref={mapRef}
      ></Map>
      {!!state && (
        <>
          <p>
            {'영역좌표는 남서쪽 위도, 경도는  ' + state.sw + ' 이고'}
            <br />
            {'북동쪽 위도, 경도는  ' + state.ne + '입니다'}
          </p>
        </>
      )}
    </>
  );
}

export default KakaoMap;
