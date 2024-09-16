import { useDispatch, useSelector } from 'react-redux'
import FiltroCard from '../../components/FiltroCard'

import * as S from './styles'
import { RootReducer } from '../../store'
import { alteraTermo } from '../../store/reducers/filtro'

const BarraLateral = () => {
  const dispatch = useDispatch()
  const { termo } = useSelector((state: RootReducer) => state.filtro)

  return (
    <S.Aside>
      <S.Campo
        type="text"
        placeholder="Buscar"
        value={termo}
        onChange={(e) => dispatch(alteraTermo(e.target.value))}
      />
      <S.Filtros>
        <FiltroCard legenda="pendentes" contador={1} />
        <FiltroCard legenda="concluidas" contador={1} />
        <FiltroCard legenda="urgentes" contador={1} />
        <FiltroCard legenda="importantes" contador={1} />
        <FiltroCard legenda="normal" contador={1} />
        <FiltroCard legenda="todas" contador={5} ativo />
      </S.Filtros>
    </S.Aside>
  )
}

export default BarraLateral
