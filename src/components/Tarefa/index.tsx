import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import * as S from './styles'

import * as enums from '../../utils/enums/Tarefa'
import { remover, editar } from '../../store/reducers/tarefas'
import TarefaClass from '../../models/Tarefa'

type Props = TarefaClass

const Tarefa = ({
  titulo,
  desc: descOriginal,
  status,
  prioridade,
  id
}: Props) => {
  const dispatch = useDispatch()
  const [estaEditando, setEstaEditando] = useState(false)
  const [desc, setDesc] = useState('')

  useEffect(() => {
    if (descOriginal.length > 0) {
      setDesc(descOriginal)
    }
  }, [descOriginal])

  function cancelarEdicao() {
    setEstaEditando(false)
    setDesc(descOriginal)
  }

  return (
    <S.Card>
      <S.Titulo>{titulo}</S.Titulo>
      <S.Tag parametro="prioridade" prioridade={prioridade}>
        {prioridade}
      </S.Tag>
      <S.Tag parametro="status" status={status}>
        {status}
      </S.Tag>
      <S.Desc
        disabled={!estaEditando}
        value={desc}
        onChange={(evento) => setDesc(evento.target.value)}
      />
      <S.BarraAcoes>
        {estaEditando ? (
          <>
            <S.BotaoSalvar
              onClick={() => {
                dispatch(
                  editar({
                    titulo,
                    desc,
                    status,
                    prioridade,
                    id
                  })
                )
                setEstaEditando(false)
              }}
            >
              Salvar
            </S.BotaoSalvar>
            <S.BotaoCancelRemov onClick={() => cancelarEdicao()}>
              Cancelar
            </S.BotaoCancelRemov>
          </>
        ) : (
          <>
            <S.Botao onClick={() => setEstaEditando(true)}>Editar</S.Botao>
            <S.BotaoCancelRemov onClick={() => dispatch(remover(id))}>
              Remover
            </S.BotaoCancelRemov>
          </>
        )}
      </S.BarraAcoes>
    </S.Card>
  )
}

export default Tarefa
