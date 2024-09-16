import { useSelector } from 'react-redux'
import Tarefa from '../../components/Tarefa'
import { Container } from './styles'
import { RootReducer } from '../../store'

const ListaDeTarefas = () => {
  const { itens } = useSelector((state: RootReducer) => state.tarefas)
  const { termo } = useSelector((state: RootReducer) => state.filtro)

  const filtraTarefa = () => {
    return itens.filter(
      (i) => i.titulo.toLowerCase().search(termo.toLowerCase()) >= 0
    )
  }

  return (
    <Container>
      <p>
        2 tarefas marcadas como: &quot;categoria&ldquo; e &quot;{termo}&ldquo;
      </p>
      <ul>
        <li>
          {filtraTarefa().map((t) => (
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
