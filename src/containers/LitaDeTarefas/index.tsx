import { useSelector } from 'react-redux'
import Tarefa from '../../components/Tarefa'
import { Container, Resultado } from './styles'
import { RootReducer } from '../../store'
import tarefas from '../../store/reducers/tarefas'

const ListaDeTarefas = () => {
  const { itens } = useSelector((state: RootReducer) => state.tarefas)
  const { termo, criterio, valor } = useSelector(
    (state: RootReducer) => state.filtro
  )

  const filtraTarefa = () => {
    let tarefasFiltradas = itens

    if (termo !== undefined) {
      tarefasFiltradas = tarefasFiltradas.filter(
        (i) => i.titulo.toLowerCase().search(termo.toLowerCase()) >= 0
      )

      if (criterio === 'prioridade') {
        tarefasFiltradas = tarefasFiltradas.filter(
          (i) => i.prioridade === valor
        )
      } else if (criterio === 'status') {
        tarefasFiltradas = tarefasFiltradas.filter((i) => i.status === valor)
      }

      return tarefasFiltradas
    } else {
      return itens
    }
  }

  const exibeResultFiltrage = (quantidade: number) => {
    let mensagem = ''
    const complementacao =
      termo !== undefined && termo.length > 0 ? `e  "${termo}"` : ''

    if (criterio === 'todas') {
      mensagem = `${quantidade} tarefa(s) encontrada(s) como: todas ${complementacao}`
    } else {
      mensagem = `${quantidade} tarefa(s) encontrada(s) "${`${criterio} = ${valor}`}" ${complementacao}`
    }

    return mensagem
  }

  const tarefas = filtraTarefa()
  const mensagem = exibeResultFiltrage(tarefas.length)

  return (
    <Container>
      <Resultado>{mensagem}</Resultado>
      <ul>
        <li>
          {tarefas.map((t) => (
            <li key={t.titulo}>
              <Tarefa
                id={t.id}
                desc={t.desc}
                titulo={t.titulo}
                prioridade={t.prioridade}
                status={t.status}
              />
            </li>
          ))}
        </li>
      </ul>
    </Container>
  )
}

export default ListaDeTarefas
